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