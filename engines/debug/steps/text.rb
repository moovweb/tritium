class Tritium::Engines::Debug
  class Step::Text < Step

    def set(text)
      @object = text
    end

    def replace(matcher)
      @object.gsub!(matcher) do |match|
        $~.captures.each_with_index do |arg, index|
          @env["#{index + 1}"] = arg
        end
        replacement = execute_children_on(match)
        replacement.gsub(/\\([\d])/) do
          @env[$1]
        end
      end
    end
  
    def remove(matcher = nil)
      if matcher
        replace(matcher, "")
      else
        @object = ""
      end
    end
    
    def doc(parse_as = "xhtml")
      parser_klass = Tritium::Engines.xml_parsers[parse_as]
      doc = parser_klass.parse(@object)
      execute_children_on(doc)
      @object = doc.send("to_" + parse_as)
    end
  
    def append(text)
      @object << text
    end

    def prepend(text)
      @object.insert(0,text)
    end

    def rewrite(what)
      @object.gsub!(Regexp.new(@env["rewrite_#{what}_matcher"]),  @env["rewrite_#{what}_to"] + @env["proxy_domain"])

      # AF: HACK: Set the port properly for development
      if (@object =~ /^https/)
        @object.gsub(/\:3000/, ":3002")
      elsif (@object =~ /^http\:/)
        @object.gsub(/\:3002/, ":3000")
      end
    end
  end
end