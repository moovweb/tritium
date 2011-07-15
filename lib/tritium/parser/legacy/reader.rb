require_relative 'reader_instruction'

# The Parser::Reader is what actually evals the script
# and returns a tree of ReaderInstruction objects.
#
# Currently, the parser does *NO* validation.
#
# You must pass in an pre-processed script.

module Tritium
  module Parser
    class Reader

      def initialize(logger=nil)
        @logger = logger || Logger.new(STDOUT)
      end

      # This is the method that actually runs the 
      # parsing. The ruby interpreter runs the string
      # and keeps hitting the method_missing method below
      # for every instruction that goes through.
      # 
      # This actually returns an ReaderInstruction object that is
      # the fully built parse tree.
      #
      # ONLY accepts a pre-processed Tritium script
      def _read(script_string, path = nil)
        @path = path
        @root_instruction = ReaderInstruction.root(@logger)
        @stack = [@root_instruction]

        begin
          eval(script_string)
        rescue StandardError => e
          msg =  "ERROR AT: #{@_script}:#{@_line_number}\n"
          msg << "SCRIPT LINE: #{@_line}\n"
          msg << "PROCESSED SCRIPT: #{@_processed_line}\n"
          msg << @stack.inspect
          @logger.error msg
          @logger.error e.backtrace.join("\n")
          raise e
        end
      
        # Makes sure to de-parent and mark any arg-ReaderInstructions
        @root_instruction.clean_args!
        @root_instruction
      end
   
      # This is where the parsing magic happens.
      # We hijack the ruby interpreter to do our parsing
      # and take note of the stack with each block that
      # gets called.
      def method_missing(name, *args, &block)
        add_cmd(name, *args, &block)
      end
    
      def add_cmd(name, *args, &block)
        args.each do |arg|
          if arg.is_a?(ReaderInstruction) && !arg.information["returns"]
            raise ReaderInstruction::Invalid.new(arg)
          end
        end
        
        ins = @stack.last.add(name.to_s, :args => args, :processed_line => @_processed_line, :line => @_line, :line_number => @_line_number, :script_name => @_script)

        if block
          @stack.push(ins)
          block.call(self, ins)
          @stack.pop
        end
        ins
      end
    
      # For some reasons, select is defined on Object. Bastards.
      def select(*args, &block)
        add_cmd('select', *args, &block)
      end
      # For some reasons, remove is defined on Rake Object. Bastards.
      def remove(*args, &block)
        add_cmd('remove', *args, &block)
      end
    end
  end
end
