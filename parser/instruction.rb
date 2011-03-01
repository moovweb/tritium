require 'yaml'

module Tritium
  module Parser
    class Instruction
      attr :name, true
      attr :args, true
      attr :children, true
      attr :parent, true
      attr :root, true
      attr :scope
      attr :line_number
      attr :script_name
      attr :line
      attr :processed_line
      
      def self.root
        Instruction.new("select", :args => ".", :scope => "Node")
      end
      
      def self.map
        @@map ||= YAML.load(File.open(File.dirname(__FILE__) + "/mappings.yml").read)
      end
      def map; self.class.map; end
      def scope_map; @scope_map ||= map[scope]; end
      def information; @information ||= parent.scope_map[@name]; end

      def initialize(name, options = {})
        # Primary Attributes
        @name = name
        @args   =[options[:args]   || options["args"]  || []].flatten
        @root   = options[:root]   || options["root"]  || self
        @parent = options[:parent] || options["parent"]
        @scope  = options[:scope]  || options["scope"] || information["opens"] || @parent.scope

        # Default Setup
        @children = []
        
        if root?
          # This should only really happen if you are root
          @information = scope_map[name]
        end

        # Debug information
        @line_number = options[:line_number] || options["line_number"] || 0
        @line = options[:line] || options["line"] || ''
        @script_name = options[:script_name] || options["script_name"] || ''
        @processed_line = options[:processed_line] || options["processed_line"] || ''
      end

      def add(name, options = {})
        if scope_map[name].nil?
          raise Invalid, "Line #{@line_number} in #{@script_name}\nNo such method #{name.inspect} allowed here!\nOnly allow: #{scope_map.keys.join(", ")}\n#{self.line}"
        end
        child = Instruction.new(name, options.merge(:root => self.root, :parent => self))
        children << child
        child
      end
      
      def root?
        root == self
      end
      
      def to_script
        result = "#{name}(#{(args.collect &:inspect).join(",")})"
        if children.size > 0
          result << " {\n"
          children.each do |child|
            result << "  " + child.inspect.lines.to_a.join("  ")
          end
          result << "}"
        end
        result + "\n"
      end
      
      def inspect
        to_script
      end
      
      def ==(to)
        (to.name == name) && match_args(to) && match_children(to) && true
      end
      
      def match_args(to)
        to.args.each_with_index do |arg, index|
          return false unless args[index] == arg
        end
      end
      
      def match_children(to)
        children.each_with_index do |child, index|
          return false unless to.children[index] == child
        end
      end
      
      class Invalid < StandardError
      end
    end
  end
end