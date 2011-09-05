module Tritium
  module Parser
    module Instructions
      class Instruction
        @@tab = "  "

        attr :filename
        attr :line_num
        attr :is_arg, true
        attr :parent, true
        attr :id, true
        attr :statements, true

        def initialize(filename, line_num)
          @filename, @line_num = filename, line_num
          @statements = []
          @id = "0"
        end
        
        def post_process!
          assign_ids(@statements)
          @statements.each do |statement|
            statement.parent = self
          end
        end
        
        def assign_ids(instructions)
          instructions.each_with_index do |statement, index|
            statement.id = self.id + "_#{index}"
            if statement.is_arg?
              statement.id += "arg"
            end
            statement.post_process!
          end
        end
        
        def scope
          if @parent
            @parent.opens
          else
            Tritium.spec.default_scope
          end
        end
        
        def opens
          scope
        end
        
        def delete
          @parent.statements.delete(self)
        end
        
        def to_tritium
          to_s
        end
        
        def to_script
          to_s
        end
        
        def debug_info
          "Line #{@line_num} in #{@filename}"
        end

        def ruby_debug_line(depth = 0)
          return ""
          ["#/*",
            "@_line_number = #{@line_num.inspect}",
            "@_script = #{@filename.inspect}",
            "@_line = ''",
            "#*/"].join("\n#{@@tab * depth}")
        end
        alias unquote to_s
        
        alias is_arg? is_arg
      end
    end
  end
end
