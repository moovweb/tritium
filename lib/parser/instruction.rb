require 'yaml'
require_relative '../config'
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

      def scope_spec; @scope_spec ||= Tritium.spec[scope]; end
      def information; @information ||= parent.scope_spec[@name]; end
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
          @information = scope_spec[name]
        end

        # Debug information
        @line_number = options[:line_number] || options["line_number"] || 0
        @line = options[:line] || options["line"] || ''
        @script_name = options[:script_name] || options["script_name"] || ''
        @processed_line = options[:processed_line] || options["processed_line"] || ''
      end

      def add(name, options = {})
        if scope_spec[name].nil?
          raise Invalid, "Line #{@line_number} in #{@script_name}\nNo such method #{name.inspect} allowed here!\nOnly allow: #{scope_spec.keys.join(", ")}\n#{self.line}"
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
        "#{name}(#{arg_list.join(", ")})"
      end
      
      def to_script
        result = stub
        if children.size > 0
          if parent_arg?
            result = "(" + result
          end
          result << " {  "
          if !is_arg
            result << "\n"
          end
          children.each do |child|
            unless child.is_arg
              if !parent_arg?
                result << "  "
              end
              result <<  child.to_script.lines.to_a.join("  ")
            end
          end
          result << "}"
          if parent_arg?
            result << ")"
          end
        end
        if !is_arg
          result << "\n"
        end
        if parent_arg?
          result.gsub!("\n", "; ")
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
      
      def location
        "#{script_name}:#{line_number}"
      end
      
      def ==(to)
        (to.name == name) && compare_args(to) && compare_children(to) && true
      end
      
      def compare_args(to)
        to.args.each_with_index do |arg, index|
          return false unless args[index] == arg
        end
      end
      
      def compare_children(to)
        children.each_with_index do |child, index|
          return false unless to.children[index] == child
        end
      end
      
      # I'm somewhere nested in an arg list. Useful for #to_script
      def parent_arg?
        is_arg || (parent ? parent.is_arg : false)
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
              arg.clean_args!
            end
          end
          child.clean_args!
        end
      end
      
      class Invalid < StandardError
      end
    end
  end
end
