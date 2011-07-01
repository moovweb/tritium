module Tritium
  module Parser
    class Macro
      # The location of the built-in macros
      @@location = File.expand_path(File.join(File.dirname(__FILE__), "../../lib/parser/macros/"))
      def self.location; @@location; end
      
      attr :name
      attr :arg_length
      attr :signature

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
        @signature = [@name.intern, @arg_length]
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
      
      def self.load_defaults
        load(*Dir.glob(File.join(Macro.location, "/*")))
      end
    
      def self.load_file(filename)
        name, arg_length, filetype = filename.split("/").last.split(".")
        if filetype == "macro"
          load_macro_file(filename, name, arg_length.to_i)
        elsif filetype == "rb"
          load_rb_macro_file(filename, name, arg_length.to_i)
        end
      end
    
      def self.load_macro_file(filename, name, arg_length)
        macro_text = File.open(filename).read

        # Build a new Macro object and pass in the block to convert the macro
        # file into a proper Proc for the expansion.
        Macro.new(name, arg_length) do |args|
          # Go through each passed in arg and replace it in the macro file. 
          arg_length.times do |index|
            # We are using index instead of each on the args, because
            # we want to make sure that if one is nil, then its still replaced!
            value = args[index]
            
            # The @ variables start counting at 1. So, increase the index by one
            num = index + 1

            if value.is_a?(Hash)
              value = (value.collect {|k,v| "#{k}: #{v.inspect}"}).join(", ")
            end

            # If you want a non-inspected value, then use #{@1} (or whatever number matches)
            macro_text = macro_text.gsub("\#{@#{num}}", (value.respond_to?(:unquote) ? value.unquote : value.to_s))
            # If you want the inspected value, use @1
            macro_text = macro_text.gsub("@#{num}", value.inspect)
          end
          macro_text
        end
      end
    
      def self.load_rb_macro_file(filename, name, arg_length)
        macro_text = File.open(filename).read
        expansion_block = eval(macro_text)
        Macro.new(name, arg_length, &expansion_block)
      end
      
      # This is the heart of the Macro. It does the actual expansion
      def expand(*args)
        # Code so we can handle run(*args) and run(args)
        if args.size == 1 && args[0].is_a?(Array)
          args = args.first
        end
        @expansion_block.call(args)
      end
    end
  end
end
