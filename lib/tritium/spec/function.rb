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
         :opens => nil }
      end
      setup_defaults!
      
      def self.child_klass; Argument; end
      
      def initialize(name, attributes, parent)
        super
        load_children!(self.arguments)
      end
    end
  end
end