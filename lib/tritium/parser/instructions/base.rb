module Tritium
  module Parser
    module Instructions
      class Instruction
        @@tab = "  "

        attr :filename
        attr :line_num
        def initialize(filename, line_num)
          @filename, @line_num = filename, line_num
        end

        def ruby_debug_line(depth = 0)
          return ""
          ["#{@@tab * depth}#[",
            "@_line_number = #{@line_num.inspect}",
            "@_script = #{@filename.inspect}",
            "@_line = ''",
            "#]#\n"].join("\n#{@@tab * depth}")
        end

        alias unquote to_s
      end
    end
  end
end
