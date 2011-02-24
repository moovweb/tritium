module Tritium
  module Parser
    class Instruction
      attr :name, true
      attr :args, true
      attr :children, true
      attr :parent, true
      attr :root, true
    
      def initialize(name = nil, args = [])
        @name = name
        @args = args
        @parent = nil
        @children = []
        @root = self
      end
    
      def add(child)
        child.parent = self
        child.root = root
        children << child
      end
      
      def root?
        root == self
      end
    end
  end
end