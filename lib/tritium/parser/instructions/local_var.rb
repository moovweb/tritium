module Tritium
  module Parser
    module Instructions
      class LocalVar < Instruction
        def initialize(name, line_number)
          @name, @line_number = name, line_number
        end
      end
    end
  end
end