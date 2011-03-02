require_relative '../scope'

module Tritium::Engines::Reference::Scope
  class Text < Base
    attr :text

    def initialize(text, root, parent)
      @object = @text = text
      super
    end

    def set(text)
      @text = text
    end

    def replace(matcher, replacement)
      if matcher.is_a? String
        matcher = Regexp.new(matcher)
      end
      @text.gsub!(matcher, replacement)
    end
  
    def remove(matcher = nil)
      if matcher
        replace(matcher, "")
      else
        @text = ""
      end
    end
  
    def append(text)
      @text << text
    end

    def prepend(text)
      @text.insert(0,text)
    end

    def rewrite(what)
      replace(env["rewrite_#{what}_matcher"], env["rewrite_#{what}_to"] + env["proxy_domain"])
    end
  end
end
