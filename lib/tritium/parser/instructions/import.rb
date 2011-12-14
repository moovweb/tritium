module Tritium
  module Parser
    module Instructions
      class Import < Instruction
        attr :location
        
        def initialize(filename, line_num, import_path)
          @line_num = line_num
          @location = import_path
        end
      end
    end
  end
end