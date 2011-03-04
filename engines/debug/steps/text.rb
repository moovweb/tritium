class Tritium::Engines::Debug
  class Step::Text < Step

    def set(text)
      @object = text
    end

    def replace(matcher, replacement)
      if matcher.is_a? String
        matcher = Regexp.new(matcher)
      end
      @object.gsub!(matcher, replacement)
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
      replace(@env["rewrite_#{what}_matcher"], @env["rewrite_#{what}_to"] + @env["proxy_domain"])
    end
  end
end