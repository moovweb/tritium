module Tritium
  module Parser
    module Instructions
      class Instruction
        @@tab = "  "

        attr :line_num
        attr :is_arg, true
        attr :parent, true
        attr :statements, true
        attr :scope_name, true

        def initialize(filename, line_num)
          @line_num = line_num
        end

        def debug_info
          "Line #{@line_num} in #{@filename}"
        end
        
        def literal?
          false
        end
        
        def regexp?
          false
        end
        
        def valid?
          true
        end
        
        def to_script
          to_s
        end

        alias unquote to_script
        
        alias is_arg? is_arg
      end
    end
  end
end
