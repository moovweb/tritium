class Tritium::Engines::Debug
  class Step::Text < Step

    def set(text)
      @object = text.to_s.dup
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
      @object = text + @object
    end

    def rewrite(what)
      @object.gsub!(Regexp.new(@env["rewrite_#{what}_matcher"]),  @env["rewrite_#{what}_replacement"])
    end
  end
end
