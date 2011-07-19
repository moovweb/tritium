require_relative 'base'
require_relative 'argument'
module Tritium
  class Spec
    class Function < Base

      def self.defaults
        {:arguments => {},
         :hide => false,
         :returns => false,
         :deprecated => false, #string otherwise
         :alias => nil,        #string otherwise
         :doc => "",
         :positional => false,
         :opens => nil,
         :scopes => [] }
      end
      setup_defaults!
      
      def self.child_klass; Argument; end
      
      def initialize(name, attributes, parent)
        super
        load_children!(self.arguments)
      end
      
      def formatted_name
        result =  "#{@name}(#{arg_list})"
        if @alias
          result = "#{@alias} or " + result
        end
        result
      end
      
      def opens
        Tritium.spec[@opens]
      end

      def arg_list
        (@arguments.values.collect &:formatted_name ).join(", ")
      end
      
      def base?
        @scopes.include?("Base")
      end

      def visible?
        !@hide
      end
    end
  end
end