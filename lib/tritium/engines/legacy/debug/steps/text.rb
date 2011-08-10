class Tritium::Engines::Debug
  class Step::Text < Step

    def set(text)
      @object = text.to_s.dup
    end

    def replace(matcher)
      @object.gsub!(Regexp.new(matcher)) do |match|
        $~.captures.each_with_index do |arg, index|
          @env["#{index + 1}"] = arg
        end
        replacement = execute_children_on(match)
        replacement.gsub(/[\\\$]([\d])/) do
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
    
    def xml
      doc "xml"
    end

    def xhtml
      doc "xhtml"
    end

    def html_fragment
      doc "html_fragment"
    end

    def html
      doc "html"
    end
  
    def append(text)
      @object << text
    end

    def prepend(text)
      @object = text + @object
    end

    def rewrite(what)
      replacement =  @env["rewrite_#{what}_replacement"].gsub(/\$([\d]+)/, "\\\\1")
      @object.gsub!(Regexp.new(@env["rewrite_#{what}_matcher"]), replacement)
    end
  end
end
