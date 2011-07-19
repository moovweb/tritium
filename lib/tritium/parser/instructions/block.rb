module Tritium
  module Parser
    module Instructions
      class Block < Instruction
        attr :statements, true
        def initialize(filename, line_num, statements = [])
          @filename, @line_num, @statements = filename, line_num, statements
        end
      
        def to_s(depth = 0)
          (@statements.collect { |stmt| stmt.to_s(depth) }).join("\n")
        end
        
        def add_statements(instructions)
          @statements += instructions
          set_parents!
        end
        
        def set_parents!
          @statements.each do |statement|
            statement.parent = self
          end
        end
      end
      
      # Class used as an invisible container
      class InlineBlock < Block
        def to_s(depth = 0)
          result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
          result << super
          result << "\n#{@@tab * depth}# LEAVING FILE: #{@filename}"
          return result
        end
      end
    
      # This class is ONLY used to indicate that the inline block used was
      # an expansion block. Walk over this and ignore it.
      class ExpansionInlineBlock < InlineBlock
        def to_s(depth)
          return (@statements.collect { |s| s.to_s(depth) }).join("\n")
        end
        
        def add_statements(instructions)
          @statements.last.add_statements(instructions)
          set_parents!
        end
      end
    end
  end
end