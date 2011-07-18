module Tritium
  module Parser
    module Instructions
      class Literal < Instruction
        attr :value
        def initialize(filename, line_num, value)
          super(filename, line_num)
          @value = value
        end
      
        def to_s(depth = 0)
          "#{@@tab * depth}#{@value.inspect}"
        end
      
        def unquote
          val = eval(self.to_s)
          Regexp === val ? val.inspect : val
        end
      end
    end
  end
end