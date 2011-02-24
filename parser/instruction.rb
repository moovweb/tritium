module Tritium
  module Parser
    class Instruction
      attr :name, true
      attr :args, true
      attr :children, true
      attr :parent, true
    
      def initialize(name = nil, *args)
        @name = name
        @args = args
        @parent = nil
        @children = []
      end
    
      def add(child)
        child.parent = self
        children << child
      end
    end
  end
end