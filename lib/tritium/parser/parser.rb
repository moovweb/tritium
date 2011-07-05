require "logger"
require_relative "tokenizer"
require_relative "instructions"
require_relative "macro_expander"

module Tritium
  module Parser
    class Parser
      require_relative 'parser_errors'
      include Instructions

      attr :filename
      attr :path
      attr :macro_calls
      attr :imports
      attr :logger
      attr :expander
      attr :errors
      
      def initialize(script_string, options = {})
        @filename    = options[:filename]    || "MAIN"
        @path        = options[:path]        || File.dirname(__FILE__)
        @macro_calls = options[:macro_calls] || []
        @imports     = options[:imports]     || []
        @logger      = options[:logger]      || Logger.new(STDOUT)
        @expander    = options[:expander]    || MacroExpander.new
        @errors      = options[:errors]      || ScriptErrors.new
        
        @tokens = Tokenizer.new(script_string, filename: @filename)
        @line_num = @tokens.peek.line_num
      end

      def peek
        @tokens.peek
      end
      private :peek

      def pop!
        @token = @tokens.pop!
        #TODO Linenum should stay consistent in subparsers
        @line_num = @token.line_num if @token
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
          @errors << LexicalError.new(unexpected)
        else
          @errors << SyntaxError.new(@filename, @line_num, message, unexpected)
        end
      end

      def parse
        result = inline_block
        if @errors.any?
          raise @errors
        end
        result
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
        begin
          script_string = File.read(File.join(@path, import_name))
        rescue Exception => e
          @errors << e
          return nil
        end
        parser = Parser.new(script_string,
                            filename: import_name, path: @path,
                            imports: @imports, macro_calls: @macro_calls,
                            errors: @errors)
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
        if @expander.is_macro?(signature)
          stub = cmd(ExpansionInlineBlock)
          macro_call = { signature: signature,
                         pos_args: args[:pos],
                         kwd_args: args[:kwd],
                         block:    stmts,
                         parser:   self,
                         expansion_site: stub}
          @macro_calls << macro_call
          
          @expander.expand(macro_call)

          return stub
        else
          stmts = stmts ? [stmts] : []
          return cmd(stmts.empty? ? Invocation : InvocationWithBlock,
                     func_name, args[:pos], args[:kwd], *stmts)
        end
      end

      def arguments
        default_return = { pos: [], kwd: {}}
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
          return default_return
        end
        kwd ? kwd_args[kwd] = arg : pos_args << arg; kwd = nil

        # parse the comma-separated tail of the argument list
        while not(peek.lexeme == :RPAREN) do
          if peek.lexeme != :COMMA
            raise_error("arguments must be separated by commas")
            return default_return
          end
          pop!
          kwd = pop!.value if peek.lexeme == :KWD
          case peek.lexeme
          when :STRING, :REGEXP, :VAR, :ID
            arg = term
          else
            raise_error("invalid argument")
            return default_return
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
          return 
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
