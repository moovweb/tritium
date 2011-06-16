require_relative "tokenizer"
require_relative "instruction"

module Tritium
  module Parser
    class SyntaxError
      attr_reader :filename, :line_num, :message, :value
      def initialize(filename, line_num, message, value)
        @filename, @line_num = filename, line_num
        @message, @value = message, value
      end
    end

    $macro_calls = []
    $imports = []
    $errors = []

    class Parser
      @@macros = { }
      
      def initialize(script_string, options = {})
        @filename = options[:filename] || "MAIN"
        @path = options[:path] || File.dirname(__FILE__)
        @tokens = Tokenizer.new(script_string, filename: @filename)
        @line_num = @tokens.peek.line_num
      end

      def peek
        @tokens.peek
      end
      private :peek

      def pop!
        @token = @tokens.pop!
        @line_num = @token.line_num
        return @token
      end
      private :pop!

      def cmd(klass, *rest)
        klass.new(@filename, @line_num, *rest)
      end
      private :cmd

      def raise_error(message)
        unexpected = pop!
        case unexpected.lexeme
        when :ERROR
          raise unexpected
        else
          raise SyntaxError.new(@filename, @line_num, message, unexpected)
        end
      end

      def parse()
        begin
          return inline_block()
        rescue SyntaxError => err
          puts err.message
        end
      end

      def inline_block()
        statements = []
        while not(peek.lexeme == :EOF) do
          statements << statement()
        end
        return cmd(InlineBlock, statements)
      end

      def statement()
        case peek.lexeme
        when :IMPORT then
          return import()
        when :VAR then
          return reference()
        when :ID then
          return invocation()
        else
          raise_error("statement cannot begin with")
        end
      end
      
      def import()
        import_name = pop!.value
        script_string = File.read(File.join(@path, import_name))
        parser = Parser.new(script_string, filename: import_name, path: @path)
        $imports << { importer: @filename, importee: import_name }
        return parser.inline_block()
      end

      def reference()
        var_name, value = pop!.value, nil
        case peek.lexeme
        when :EQUAL
          pop!
          case peek.lexeme
          when :STRING, :REGEXP, :VAR, :ID
            value = term()
          else
            raise_error("assigned value is not a valid term")
          end
        end
        return cmd(value ? Assignment : Reference, var_name, *value)
      end

      def invocation()
        func_name = pop!.value
        case peek.lexeme
        when :LPAREN then
          args = arguments()
        else
          raise_error("function call is missing argument list")
        end
        stmts = peek.lexeme == :LBRACE ? block() : nil
        signature = [func_name, args[:pos].length]
        if @@macros[signature] then
          stub = cmd(stmts ? InvocationWithBlock : Invocation,
                     :"macro-expansion stub")
          $macro_calls << {
            name: func_name,
            pos_args: args[:pos],
            kwd_args: args[:kwd],
            block: stmts,
            expansion_site: stub
          }
          return stub
        else
          stmts = stmts ? [stmts] : []
          return cmd(stmts.empty? ? Invocation : InvocationWithBlock,
                     func_name, args[:pos], args[:kwd], *stmts)
        end
      end

      def arguments() # LEFT OFF HERE (2011/06/15)
        pos_args, kwd_args = [], {}
        pop!
        if peek.lexeme == :RPAREN then
          pop!
          return { pos: pos_args, kwd: kwd_args }
        end
        if peek.lexeme == :KWD then
          kwd_args[pop!.value] = term()
        else
          pos_args << term()
        end
        while not(peek.lexeme == :RPAREN) do
          pop!  # CHECK FOR COMMA
          if peek.lexeme == :KWD then
            kwd_args[pop!.value] = term()
          else
            pos_args << term()
          end
        end
        pop!
        return { pos: pos_args, kwd: kwd_args }
      end

      def term()
        case pop!.lexeme
        when :STRING, :REGEXP
          return cmd(Literal, @token.value)
        when :VAR
          return cmd(Reference, @token.value)
        when :ID
          # CHECK FOR LPAREN
          func_name = @token.value
          args = arguments()
          return cmd(Invocation, func_name, args[:pos], args[:kwd])
        end  # ADD ERROR HANDLING
      end

      def block()
        stmts = []
        pop!
        while not(peek.lexeme == :RBRACE) do
          stmts << statement()
        end
        pop!
        return stmts
      end
    end

  end
end
