require_relative 'instruction'

# The Parser::Reader is what actually evals the script
# and returns a tree of Instruction objects.
#
# Currently, the parser does *NO* validation.
#
# You must pass in an pre-processed script.

module Tritium::Parser
  class Reader
    # This is the method that actually runs the 
    # parsing. The ruby interpreter runs the string
    # and keeps hitting the method_missing method below
    # for every instruction that goes through.
    # 
    # This actually returns an Instruction object that is
    # the fully built parse tree.
    #
    # ONLY accepts a pre-processed Tritium script
    def read(script_string)
      @root_instruction = Instruction.new
      @stack = [@root_instruction]

      eval(script_string)

      @root_instruction
    end
    
    # For some reasons, select is defined on Object. Bastards.
    def select(*args, &block)
      method_missing('select', *args, &block)
    end
   
    # This is where the parsing magic happens.
    # We hijack the ruby interpreter to do our parsing
    # and take note of the stack with each block that
    # gets called.
    def method_missing(name, *args, &block)
      ins = Instruction.new(name.to_s, args)
      @stack.last.add(ins)
      if block
        @stack.push(ins)
        block.call
        @stack.pop
      end
    end
  end
end