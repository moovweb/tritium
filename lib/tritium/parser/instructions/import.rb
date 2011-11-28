module Tritium
  module Parser
    module Instructions
      class Import < Instruction
        attr :location
        
        def initialize(filename, line_num, import_path)
          @filename, @line_num = filename, line_num
          @statements = []
          @location = import_path
        end
      end
    end
  end
end