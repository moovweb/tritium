require "logger"
require_relative "tokenizer"
require_relative "instructions"
require_relative "macro_expander"

module Tritium
  module Parser
    class Parser
      require_relative 'parser_errors'
      include Instructions

      attr :file_path
      attr :expander
      attr :errors
      attr :tokens
      attr :script_string
      
      def initialize(path, options = {})
        @file_path         = path
        @errors       = options[:errors]       || ScriptErrors.new
        @starting_scope = options[:starting_scope] || "Text"
        @is_expansion = false

        @script_string = File.read(@file_path)

        @tokens = Tokenizer.new(@script_string, file_path: @file_path)
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
        klass.new(nil, @line_num, *rest)
      end
      private :cmd

      def raise_error(message)
        unexpected = pop!
        case unexpected.lexeme
        when :ERROR
          errobj = LexicalError.new(unexpected)
          @errors << errobj
        else
          errobj = SyntaxError.new(@file_path, @line_num, message, unexpected)
          @errors << errobj
        end
        raise errobj
      end

      def parse
        if @result
          throw "Can only call parse once"
        end
        begin
          @result = inline_block
          @result.scope_name = @starting_scope
          #@result.post_process!# unless @is_expansion
        rescue ScriptErrors
          # dont' do anything
        rescue ParserError => e
          # If its some other error, then add it to e
          @errors << e
        rescue StandardError => e
          raise e
        end
        raise @errors if @errors.any?
        @result
      end

      def inline_block
        begin
          stmts = []
          while not(peek.lexeme == :EOF) do
            stmts << statement
          end
          return cmd(InlineBlock, stmts)
        rescue => err
          @tokens.each do |token|
            @errors << LexicalError.new(token) if token.lexeme == :ERROR
          end
          raise err
        end
      end

      def statement
        case peek.lexeme
        when :IMPORT then
          return import
        when :VAR then
          # TODO: Handle LVAR later
          return reference
        when :LVAR then
          return lvar
        when :ID then
          return invocation
        when :STRING, :REGEXP
          return term
        else
          raise_error("invalid statement")
        end
      end
      
      def import
        import_name = pop!.value
        import_file = File.absolute_path(File.join(File.dirname(@file_path), import_name))
        return cmd(Import, import_file)
      end

      def reference
        var_name, value = cmd(Literal, pop!.value.to_s), nil
        case peek.lexeme
        when :EQUAL
          pop!  # pop the equal sign
          case peek.lexeme
          when :STRING, :VAR, :ID, :LVAR
            value = term
          else
            raise_error("assigned value is not a valid term")
          end
        end
        stmts = peek.lexeme == :LBRACE ? block : nil
        if value
          args = { pos: [ var_name, value ] }
        else
          args = { pos: [ var_name ] }
        end
        signature = [:var, args[:pos].length]
        return cmd(Invocation, "var", [var_name], {}, stmts || [])
      end
      
      def lvar
        var_name, value = cmd(Literal, pop!.value.to_s), nil
        case peek.lexeme
        when :EQUAL
          pop!  # pop the equal sign
          case peek.lexeme
          when :STRING, :VAR, :ID, :LVAR
            value = term
          else
            raise_error("assigned value is not a valid term")
          end
        end
        stmts = peek.lexeme == :LBRACE ? block : nil
        if value
          args = { pos: [ var_name, value ] }
        else
          args = { pos: [ var_name ] }
        end
        signature = [:var, args[:pos].length]
        return cmd(LocalVar, "lvar", [var_name], {}, stmts || [])
      end

      def invocation
        func_name = pop!.value
        if func_name == "$".intern
          func_name = :select
        end
        raise_error("function call is missing a valid argument list") if
          peek.lexeme != :LPAREN
        args = arguments
        stmts = peek.lexeme == :LBRACE ? block : nil
        signature = [func_name, args[:pos].length]
        # keywords are args too!
        if args[:kwd].any?
          signature[1] += 1
        end
        stmts = stmts ? [stmts] : []
        instruction_klass = Invocation
        if (func_name == :concat) || (func_name == :log)
          instruction_klass = NestedInvocation
        end
        return cmd(instruction_klass, func_name, args[:pos], args[:kwd], *stmts)

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
        when :STRING, :REGEXP, :VAR, :ID, :READ, :LVAR
          arg = term
          arg.is_arg = true
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
          when :STRING, :REGEXP, :VAR, :ID, :READ, :LVAR
            arg = term
            arg.is_arg = true
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
        case peek.lexeme
        when :STRING, :REGEXP
          pop!
          return cmd(Literal, @token.value)
        when :VAR
          pop!
          return cmd(Reference, @token.value.to_s)
        when :LVAR
          pop!
          return cmd(LocalVar, @token.value.to_s)
        when :ID
          # func_name = @token.value
          # raise_error("function call is missing a valid argument list") if
          #   peek.lexeme != :LPAREN
          # args = arguments
          # return cmd(Invocation, func_name, args[:pos], args[:kwd])
          return invocation
        when :READ
          pop!
          # Read relative to the current script file
          directory = File.join( File.split(@file_path)[0..-2] )
          file_to_read = File.join(directory, @token.value)
          val = open(file_to_read).read
          return cmd(Literal, val)
        else
          pop!
          raise_error("invalid term")
          return 
        end
      end

      def block
        stmts = []
        pop! # pop the lbrace
        while not(peek.lexeme == :RBRACE or peek.lexeme == :EOF) do
          stmts << statement
        end
        raise_error("unterminated block") if peek.lexeme == :EOF
        pop! # pop the rbrace
        return stmts
      end
    end

  end
end
