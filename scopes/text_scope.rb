require_relative '../scope'

module Tritium
  module Scope
    class Text < Base
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

      def prepend(text)
        @text.insert(0,text)
      end

      def text
        @text
      end
    end
  end
end
