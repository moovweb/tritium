module Tritium
  module Parser
    class Macro
      # This is the internal initializer for a Macro object.
      # The block is required and MUST have an argv value of 1. 
      # That arg MUST be an array. This allows us to have a common
      # API.
      #
      # For example: 
      #
      #  Macro.new("expander", 2) do |args|
      #    args.is_a?(Array)
      #  end
      #
      # Note: Initializing a macro is NOT the same as registering it with the
      # parser. This is a seperate process.
      #
      def initialize(name, arg_length, &expansion_block)
        @name, @arg_length = name, arg_length
        @expansion_block = expansion_block
      end
    
      # This is the primary method for creating and loading
      # macros. As typically, macros are stored in files.
      #
      # This method accepts a list of files as a splat-arg.
      #
      #  Macro.load("first.2.macro", "second.1.macro")
      #
      # The filenames here are critical. Please review the #load_file
      # method for more information.
      def self.load(*files)
        files.collect do |file|
          load_file(file)
        end
      end
    
      def self.load_file(filename)
        name, arg_length, filetype = filename.split("/").last.split(".")
        if filetype == "macro"
          load_macro_file(filename, name, arg_length.to_i)
        elsif filetype == "rb"
          load_macro_rb_file(filename, name, arg_length.to_i)
        end
      end
    
      def self.load_macro_file(filename, name, arg_length)
        macro = File.open(filename).read

        Macro.new(name, arg_length) do |args|
          # Go through each passed in arg and replace it in the macro file. 
          args.each_with_index do |value, index|
            # The @ variables start counting at 1. So, increase the index by one
            num = index + 1
            macro = macro.gsub("@#{num}", value.inspect)
          end
          macro
        end
      end
    
      def self.load_macro_rb_file(filename)
      end
      
      def expand(*args)
        # Code so we can handle run(*args) and run(args)
        if args.size == 1 && args[0].is_a?(Array)
          args = args.first
        end
        @expansion_block.call(args)
      end
    
      def unquote(node)
        if Literal === node then
          
        else
          return node.to_s
        end
      end

      def splice(options_hash)
        (options_hash.collect { |k,v| "#{k}: #{v}" }).join(", ")
      end
    end
  end
end
