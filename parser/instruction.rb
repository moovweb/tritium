module Tritium
  module Parser
    class Instruction
      attr :name, true
      attr :args, true
      attr :children, true
      attr :parent, true
      attr :root, true
      attr :line_number
      attr :line
      attr :processed_line
    
      def initialize(name = nil, options = {})
        # Primary Attributes
        @name = name
        @args = options[:args] || options["args"] || []
        
        # Default Setup
        @parent = nil
        @children = []
        @root = self

        # Debug information
        @line_number = options[:line_number] || options["line_number"] || 0
        @line = options[:line] || options["line"] || ''
        @processed_line = options[:processed_line] || options["processed_line"] || ''
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