require "logger"
require_relative "tokenizer"
require_relative "instruction"

module Tritium
  module Parser
    class Parser
      class LexicalError < StandardError
        def initialize(error_token)
          @error_token = error_token
        end

        def to_s
          @error_token.to_s
        end
      end

      class SyntaxError < StandardError
        attr_reader :filename, :line_num, :message, :value

        def initialize(filename, line_num, message, value)
          @filename, @line_num = filename, line_num
          @message, @value = message, value
        end

        def to_s
          return "Syntax error in #{@filename}, line #{@line_num}:\n" \
                 "#{@message}; found unexpected #{@value}\n\n"
        end
      end

      @@macros = {}
      
      def initialize(script_string, options = {})
        @filename    = options[:filename]    || "MAIN"
        @path        = options[:path]        || File.dirname(__FILE__)
        @macro_calls = options[:macro_calls] || []
        @imports     = options[:imports]     || []
        @logger      = options[:logger]      || Logger.new(STDOUT)
        
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
          raise LexicalError.new(unexpected)
        else
          raise SyntaxError.new(@filename, @line_num, message, unexpected)
        end
      end

      def parse
        begin
          return inline_block
        rescue => err
          @logger.error err
        end
      end

      def inline_block
        begin
          stmts = []
          while not(peek.lexeme == :EOF) do
            stmts << statement
          end
          return cmd(InlineBlock, stmts)
        rescue => err
          @tokens.each { |token| puts token if token.lexeme == :ERROR }
          raise err
        end
      end

      def statement
        case peek.lexeme
        when :IMPORT then
          return import
        when :VAR then
          return reference
        when :ID then
          return invocation
        else
          raise_error("invalid statement")
        end
      end
      
      def import
        import_name = pop!.value
        script_string = File.read(File.join(@path, import_name))
        parser = Parser.new(script_string,
                            filename: import_name, path: @path,
                            imports: @imports, macro_calls: @macro_calls)
        @imports << { importer: @filename, importee: import_name }
        return parser.inline_block
      end

      def reference
        var_name, value = pop!.value, nil
        case peek.lexeme
        when :EQUAL
          pop!
          case peek.lexeme
          when :STRING, :REGEXP, :VAR, :ID
            value = term
          else
            raise_error("assigned value is not a valid term")
          end
        end
        return cmd(value ? Assignment : Reference, var_name, *value)
      end

      def invocation
        func_name = pop!.value
        raise_error("function call is missing a valid argument list") if
          peek.lexeme != :LPAREN
        args = arguments
        stmts = peek.lexeme == :LBRACE ? block() : nil
        signature = [func_name, args[:pos].length]
        if @@macros[signature] then
          # stub = cmd(stmts ? InvocationWithBlock : Invocation,
          #            :"macro-expansion stub")
          stub = cmd(InlineBlock)
          @macro_calls << {
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

      def arguments
        pos_args, kwd_args, kwd = [], {}, nil
        pop! # pop the lparen
        if peek.lexeme == :RPAREN then
          pop!
          return { pos: pos_args, kwd: kwd_args }
        end

        # parse the head of the argument list
        kwd = pop!.value if peek.lexeme == :KWD
        case peek.lexeme
        when :STRING, :REGEXP, :VAR, :ID
          arg = term
        else
          raise_error("invalid argument")
        end
        kwd ? kwd_args[kwd] = arg : pos_args << arg; kwd = nil

        # parse the comma-separated tail of the argument list
        while not(peek.lexeme == :RPAREN) do
          raise_error("arguments must be separated by commas") if
            not peek.lexeme == :COMMA
          pop!
          kwd = pop!.value if peek.lexeme == :KWD
          case peek.lexeme
          when :STRING, :REGEXP, :VAR, :ID
            arg = term
          else
            raise_error("invalid argument")
          end
          kwd ? kwd_args[kwd] = arg : pos_args << arg; kwd = nil
        end

        pop! # pop the rparen
        return { pos: pos_args, kwd: kwd_args }
      end

      def term
        case pop!.lexeme
        when :STRING, :REGEXP
          return cmd(Literal, @token.value)
        when :VAR
          return cmd(Reference, @token.value)
        when :ID
          func_name = @token.value
          raise_error("function call is missing a valid argument list") if
            peek.lexeme != :LPAREN
          args = arguments
          return cmd(Invocation, func_name, args[:pos], args[:kwd])
        else
          raise_error("invalid term")
        end
      end

      def block
        stmts = []
        pop! # pop the lbrace
        while not(peek.lexeme == :RBRACE) do
          stmts << statement
        end
        raise_error("unterminated block") if peek.lexeme != :RBRACE
        pop! # pop the rbrace
        return stmts
      end
    end

  end
end
