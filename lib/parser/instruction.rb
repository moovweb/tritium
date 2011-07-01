module Tritium
  module Parser

    class Instruction
      def initialize(filename, line_num)
        @filename, @line_num = filename, line_num
      end
      
      alias unquote to_s
    end

    class Literal < Instruction
      def initialize(filename, line_num, value)
        super(filename, line_num)
        @value = value
      end
      
      def unquote
        val = eval(self.to_s)
        Regexp === val ? val.inspect : val
      end
    end

    class Reference < Instruction
      def initialize(filename, line_num, name)
        super(filename, line_num)
        @name = name.intern
      end
    end

    class Assignment < Reference
      def initialize(filename, line_num, name, value)
        super(filename, line_num, name)
        @value = value
      end
    end

    class Invocation < Instruction
      def initialize(filename, line_num,
                     name = nil, pos_args = [], kwd_args = {})
        super(filename, line_num)
        @name, @pos_args, @kwd_args = name.intern, pos_args, kwd_args
      end
    end

    class InvocationWithBlock < Invocation
      attr :statements, true
      def initialize(filename, line_num,
                     name = nil, pos_args = [], kwd_args = {}, statements = [])
        super(filename, line_num, name, pos_args, kwd_args)
        @statements = statements
      end
    end

    class InlineBlock < InvocationWithBlock
      attr :statements, true
      def initialize(filename, line_num, statements = [])
        @filename, @line_num, @statements = filename, line_num, statements
      end
    end
    
    # This class is ONLY used to indicate that the inline block used was
    # an expansion block. Walk over this and ignore it.
    class ExpansionInlineBlock < InlineBlock
      def to_s(depth)
        return (@statements.collect { |s| s.to_s(depth) }).join("\n")
      end
    end

    require_relative "instruction_mixins/to_s"

  end
end
