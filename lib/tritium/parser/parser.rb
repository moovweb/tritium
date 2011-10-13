require "logger"
require_relative "tokenizer"
require_relative "instructions"
require_relative "macro_expander"

module Tritium
  module Parser
    class Parser
      class << self
        @@import_cache = []
        @@dependancies = []

        def print_dependancies(log, filename, level = 0)
          log.debug("\n") if level == 0
          log.debug("#{"  " * level}#{File.basename(filename)}")
          @@dependancies.each do |dep|
            if dep[:importer] == filename
              print_dependancies(log, dep[:importee], level + 1)
            end
          end
        end

        def clear_cache
          @@import_cache = []
          @@dependancies = []
        end
      end

      require_relative 'parser_errors'
      include Instructions

      attr :filename
      attr :path
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
        
        @filename     = options[:filename]     || "MAIN"
        @path         = options[:path]         || File.dirname(__FILE__)
        @logger       = options[:logger]       || Logger.new(STDOUT)
        @expander     = options[:expander]     || MacroExpander.new
        @errors       = options[:errors]       || ScriptErrors.new
        @is_expansion = options[:is_expansion] || false
        
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
          @result.post_process!# unless @is_expansion
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
          return reference
        when :ID then
          return invocation
        else
          raise_error("invalid statement")
        end
      end
      
      def get_cached_import(filename)
        @@import_cache.each do |cached_import|
          return cached_import if cached_import[:filename] == filename
        end
        nil
      end

      def cache_valid?(filename)
        cache_is_valid = true
        cached_import = get_cached_import(filename)
        if !cached_import
          cache_is_valid = false
        end
        @@dependancies.each do |dep|
          if dep[:importer] == filename
            if !cache_valid?(dep[:importee])
              cached_import[:stamp] = ""
              cache_is_valid = false
            end
          end
        end
        if (File.ctime(filename) != cached_import[:stamp])
          cached_import[:stamp] = ""
          cache_is_valid = false
        end
        return cache_is_valid
      end

      def import
        import_name = pop!.value
        filename = File.join(@path, import_name)
        cached_import = get_cached_import(filename)

        @@dependancies << { importer: File.join(@path, @filename), importee: filename }
        @@dependancies.uniq!

        if cached_import and cache_valid?(filename)
          return cached_import[:script]
        end

        parser = nil
        if !File.exists?(filename)
          raise_error("missing import file (#{import_name})")
        end
        begin
          script_string = File.read(filename)
          parser = Parser.new(script_string,
                              filename: import_name,
                              path:     @path,
                              errors:   @errors,
                              logger:   @logger)
        rescue Exception => e
          @errors << e
          return nil
        end

        rendered_block = parser.inline_block
        if cached_import
          cached_import[:script] = rendered_block
          cached_import[:stamp] = File.ctime(filename)
          @logger.debug("Recompiled: #{import_name}")
        else
          @@import_cache << { script:   rendered_block,
                             filename: filename,
                             stamp:    File.ctime(filename) }
        end
        return rendered_block
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
        # If you have any number of keyword arguments, it only counts as one arg
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
          return cmd(Invocation, "var", [var_name], {}, stmts)
        end
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
          instruction_klass = Invocation
          if (func_name == :concat) || (func_name == :log)
            instruction_klass = NestedInvocation
          end
          return cmd(instruction_klass, func_name, args[:pos], args[:kwd], *stmts)
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
          when :STRING, :REGEXP, :VAR, :ID, :READ
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
          file_to_read = File.join(@path, @token.value)
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
