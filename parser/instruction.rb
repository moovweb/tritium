require 'yaml'
YAML::ENGINE.yamler= 'syck'

module Tritium
  module Parser
    class Instruction
      attr :name, true
      attr :args, true
      attr :children, true
      attr :parent, true
      attr :is_arg, true
      attr :root, true
      attr :scope
      attr :line_number
      attr :script_name
      attr :line
      attr :processed_line
      attr :iid
      
      def self.root
        Instruction.new("script", :scope => "Text")
      end
      
      def self.map
        @@map ||= YAML.load(File.read(File.dirname(__FILE__) + "/../spec.yml"))
      end
      def map; self.class.map; end
      def scope_map; @scope_map ||= map[scope]; end
      def information; @information ||= parent.scope_map[@name]; end
      def opens; information['opens'] || parent.opens; end;

      def initialize(name, options = {})
        # Primary Attributes
        @name   = name
        @args   =[options[:args]   || options["args"]  || []].flatten
        @root   = options[:root]   || options["root"]  || self
        @parent = options[:parent] || options["parent"]
        @scope  = options[:scope]  || options["scope"] || information["opens"] || @parent.scope
        
        if @parent
          @iid = @parent.iid + "_#{@parent.children.size}"
        else
          @iid = "0"
        end

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
      
      def stub
        arg_list = args.collect { |a| a.respond_to?("to_script") ? a.to_script : a.inspect}
        "#{name}(#{arg_list.join(",\n" + (' ' * (name.size + 1)))})"
      end
      
      def to_script
        result = stub
        if children.size > 0
          result << " {  \n"
          children.each do |child|
            result << "  " + child.to_script.lines.to_a.join("  ")
          end
          result << "}"
        end
        if !is_arg
          result = result + "\n"
        end
        result
      end
      
      def to_hash
        { :line_number => @line_number,
          :line => @line,
          :script_name => @script_name,
          :processed_line => @processed_line,
          :args => @args,
          :scope => @scope,
          :name => @name,
          :stub => stub }
      end
      
      def inspect
        "<TS:#{stub}@#{line_number}>"
      end
      
      def ==(to)
        (to.name == name) && match_args(to) && match_children(to) && true
      end
      
      def match_args(to)
        to.args.each_with_index do |arg, index|
          return false unless args[index] == arg
        end
      end
      
      # During reading, if this Instruction has an Arg that is an Instruction, that instruction
      # will be tracked by the parent Instruction as a child. We don't really want that, so this
      # is run recusively after reading is complete.
      def clean_args!
        children.each do |child|
          child.args.each do |arg|
            if arg.is_a?(Instruction)
              arg.is_arg = true
              # Deparent any args
              self.children.delete(arg)
            end
          end
          child.clean_args!
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
