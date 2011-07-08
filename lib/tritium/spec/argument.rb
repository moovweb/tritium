require_relative 'base'

module Tritium
  class Spec
    class Argument < Base

      def self.defaults
        {:hide => false,
         :returns => true,
         :default => nil,
         :deprecated => false, #string otherwise
         :alias => nil,        #string otherwise
         :doc => "",
         :positional => false }
      end
      
      def expansion?
        self['expansion']
      end

      def optional?
        expansion? || self['optional']
      end

      def formatted_name
        result = @name.downcase.gsub(" ", "_")
        if optional?
          result = "<em>#{result}</em>"
        end
        if @data['default']
          result += " = #{@data['default'].inspect}"
        end
        result
      end
    end
  end
end