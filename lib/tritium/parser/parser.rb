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
      attr :imports
      attr :logger
      attr :expander
      attr :errors
      attr :tokens
      attr :script_string
      
      def initialize(script_string, options = {})
        if script_string.is_a?(Hash)
          options = script_string
          script_string = nil
        end
        
        @filename    = options[:filename]    || "MAIN"
        @path        = options[:path]        || File.dirname(__FILE__)
        @imports     = options[:imports]     || []
        @logger      = options[:logger]      || Logger.new(STDOUT)
        @expander    = options[:expander]    || MacroExpander.new
        @errors      = options[:errors]      || ScriptErrors.new
        
        prefix, base = File.dirname(@filename), File.basename(@filename)
        prefix = "" if prefix == "."
        @path = File.join(@path, prefix)
        @filename = base
        
        if script_string.nil?
          script_string = File.read(File.join(@path, @filename))
        end
        
        @script_string = script_string.clone
        
        @tokens = Tokenizer.new(@script_string, filename: @filename)
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
          errobj = LexicalError.new(unexpected)
          @errors << errobj
        else
          errobj = SyntaxError.new(@filename, @line_num, message, unexpected)
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
        rescue
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
                            filename: import_name,
                            path: @path,
                            imports: @imports,
                            errors: @errors)
        @imports << { importer: @filename, importee: import_name }
        return parser.inline_block
      end

      def reference
        var_name, value = cmd(Literal, pop!.value.to_s), nil
        case peek.lexeme
        when :EQUAL
          pop!  # pop the equal sign
          case peek.lexeme
          when :STRING, :REGEXP, :VAR, :ID
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
        if @expander.is_macro?(signature)
          stub = cmd(ExpansionInlineBlock)
          macro_call = {
            signature: signature,
            pos_args: args[:pos],
            kwd_args: args[:kwd],
            block:    stmts,
            parser:   self,
            expansion_site: stub
          }
          @expander.expand(macro_call)
          return stub
        else
          if stmts
            return cmd(InvocationWithBlock, "var", [var_name], {}, stmts)
          else
            return cmd(Invocation, "var", [var_name], {})
          end
        end
      end

      def invocation
        func_name = pop!.value
        raise_error("function call is missing a valid argument list") if
          peek.lexeme != :LPAREN
        args = arguments
        stmts = peek.lexeme == :LBRACE ? block : nil
        signature = [func_name, args[:pos].length]
        if @expander.is_macro?(signature)
          stub = cmd(ExpansionInlineBlock)
          macro_call = { signature: signature,
                         pos_args: args[:pos],
                         kwd_args: args[:kwd],
                         block:    stmts,
                         parser:   self,
                         expansion_site: stub}
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
        when :STRING, :REGEXP, :VAR, :ID, :READ
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
          when :STRING, :REGEXP, :VAR, :ID, :READ
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
        when :READ
          # Read relative to the current script file
          return cmd(Literal, File.read(File.join(@path, @token.value)))
        else
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
