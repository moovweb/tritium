require_relative '../scope'

module Tritium
  class TextScope < Scope
    def initialize(text, root, parent)
      @text = text
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

    def text
      @text
    end

    def asset(path)
      # TODO AC: Figure out the proper way to specify the asset server URL
      asset_server = "/assets"
      @text = File.join(asset_server, path)
    end

  end
end
