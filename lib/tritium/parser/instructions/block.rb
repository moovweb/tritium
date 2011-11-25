module Tritium
  module Parser
    module Instructions
      class Block < Instruction
        def initialize(filename, line_num, statements = [])
          super(filename, line_num)
          @statements = statements
        end
      
        def to_script(depth = 0)
          (@statements.collect { |stmt| stmt.to_script(depth) }).join("\n")
        end
        
        def add_statements(instructions)
          @statements += instructions
        end
        
        def each(&block)
          @statements.each do |statement|
            block.call(statement)
            if statement.respond_to?("each")
              statement.each(&block)
            end
          end
        end
        
        def returns
          @statements.last ? @statements.last.returns : nil
        end
        
        def opens
          scope
        end
      end
      
      # Class used as an invisible container
      class InlineBlock < Block
        def to_script(depth = 0)
          result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
          result << super
          result << "\n#{@@tab * depth}# LEAVING FILE: #{@filename}"
          return result
        end
      end
    
      # This class is ONLY used to indicate that the inline block used was
      # an expansion block. Walk over this and ignore it.
      class ExpansionInlineBlock < InlineBlock
        def to_script(depth = 0)
          return (@statements.collect { |s| s.to_script(depth) }).join("\n")
        end
        
        def post_process!
          argify!
          super
        end
        
        def argify!
          if self.is_arg?
            @statements.last.is_arg = true
          end
        end
        
        def add_statements(instructions)
          if @statements.last
            @statements.last.add_statements(instructions)
          else
            super
          end
        end
      end
    end
  end
end