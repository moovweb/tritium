module Tritium
  module Parser
    module Instructions
      class Reference < Instruction
        def initialize(filename, line_num, name)
          super(filename, line_num)
          @name = name.intern
        end

        def to_s(depth = 0)
          "#{@@tab * depth}var(#{@name.to_s.inspect})"
        end
      end
    end
  end
end