module Tritium
  module Parser
    module Instructions
      class InlineBlock < Instruction
        attr :statements, true
        def initialize(filename, line_num, statements = [])
          @filename, @line_num, @statements = filename, line_num, statements
        end
      
        def to_s(depth = 0)
          result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
          @statements.each { |stmt| result << stmt.to_s(depth) << "\n" }
          result << "#{@@tab * depth}# LEAVING FILE: #{@filename}"
          return result
        end
      end
    
      # This class is ONLY used to indicate that the inline block used was
      # an expansion block. Walk over this and ignore it.
      class ExpansionInlineBlock < InlineBlock
        def to_s(depth)
          return (@statements.collect { |s| s.to_s(depth) }).join("\n")
        end
      end
    end
  end
end