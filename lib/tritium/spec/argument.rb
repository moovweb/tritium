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
         :expansion => false,
         :optional => false,
         :positional => false }
      end
      
      def expansion?
        !!@expansion
      end

      def optional?
        expansion? || !!@optional
      end

      def formatted_name
        result = (@name || "unnamed").downcase.gsub(" ", "_")
        if optional?
          result = "<em>#{result}</em>"
        end
        if @default
          result += " = #{@default.inspect}"
        end
        result
      end
    end
  end
end