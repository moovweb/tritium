module Tritium
  class Spec
    class Function
      attr :arguments

      def initialize(name, attributes, parent)
        @name, @parent = name, parent
        @attributes = attributes
      end
      
      def [](attribute)
        @attributes[attribute]
      end
    end
  end
end