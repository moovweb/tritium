module Tritium
  module Parser
    module Instructions
      class Literal < Instruction
        attr :value
        def initialize(filename, line_num, value)
          super(filename, line_num)
          @value = value
        end
        
        def literal?
          true
        end
        
        def regexp?
          value.is_a?(Regexp)
        end
        
        def value_string
          @value.inspect
        end
      
        def to_script(depth = 0)
          "#{@@tab * depth}#{value_string}"
        end
      
        def unquote
          val = eval(self.to_script)
          Regexp === val ? val.inspect : val
        end
      end
    end
  end
end