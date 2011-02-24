require_relative 'instruction'

module Tritium::Parser
  class Reader
    def initialize()
      @root_instruction = Instruction.new
      @stack = [@root_instruction]
    end
    
    def read(script_string)
      eval(script_string)
      @root_instruction
    end
    
    # For some reasons, select is defined on Object. Bastards.
    def select(*args, &block)
      method_missing('select', *args, &block)
    end
   
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