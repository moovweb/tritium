module Tritium
  module Parser
    module Instructions
      class Block < Instruction
        def initialize(filename, line_num, statements = [])
          @filename, @line_num, @statements = filename, line_num, statements
          @id = "0"
          set_parents!
        end
        
      
        def to_s(depth = 0)
          (@statements.collect { |stmt| stmt.to_s(depth) }).join("\n")
        end
        
        def add_statements(instructions)
          @statements += instructions
          set_parents!
        end
        
        def each(&block)
          @statements.each do |statement|
            block.call(statement)
            if statement.respond_to?("each")
              statement.each(&block)
            end
          end
        end
        
        def opens
          scope
        end
        
        def set_parents!
          @statements.each_with_index do |statement, index|
            statement.parent = self
            statement.id = self.id + "_#{index}"
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
        def to_s(depth = 0)
          return (@statements.collect { |s| s.to_s(depth) }).join("\n")
        end
        
        def add_statements(instructions)
          if @statements.last
            @statements.last.add_statements(instructions)
            set_parents!
          else
            super
          end
        end
      end
    end
  end
end