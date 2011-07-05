require_relative 'reference'

module Tritium
  module Parser
    module Instructions
      class Assignment < Reference
        def initialize(filename, line_num, name, value)
          super(filename, line_num, name)
          @value = value
        end
      
        def to_s(depth = 0)
          result = ruby_debug_line(depth) + super(depth)
          new_depth = depth + 1
          result[-1,0] = ") {\n#{@@tab * new_depth}set(#{@value})\n#{@@tab * depth}}"
          return result[0..-2]
        end

      end
    end
  end
end