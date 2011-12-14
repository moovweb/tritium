module Tritium
  module Parser
    class Tokenizer
      class Token
        attr_reader :filename, :line_num, :lexeme, :value

        def initialize(filename, line_num, lexeme, value = nil)
          @line_num = line_num
          @lexeme, @value = lexeme, value
        end

        def to_s
          if @lexeme != :ERROR then
            return @value ? "[#{@lexeme}: #{@value}]" : "[#{@lexeme}]"
          else
            return "Lexical error in #{@filename}, line #{@line_num}:\n" \
                   "#{@value}\n\n"
          end
        end
      end

      @@symbols = {
        "=" => :EQUAL, "," => :COMMA,
        "(" => :LPAREN, ")" => :RPAREN,
        "{" => :LBRACE, "}" => :RBRACE
      }
      @@string_matchers = {
        '"' => /^"(\\.|[^"\\])*"/,
        "'" => /^'(\\.|[^'\\])*'/,
        '/' => /^\/(\\.|[^\/\\])*\/[imxouesn]*/
      }
      @@multiline = {
        :open  => /^\/\*/,
        :close => /^\*\//
      }
      
      attr :lines

      def initialize(script_string, options = {})
        @filename = options[:filename] || "MAIN"
        @lines = script_string.lines.to_a
        @line_num = 0
        next_line!
        @lookahead = munch!
      end

      def next_line!
        @line = @lines[@line_num] and @line_num += 1
      end
      private :next_line!

      def skip_whitespace!
        while @line and (@line.empty? or @line.lstrip! and @line.empty?) do
          next_line!
        end
        return true
      end
      private :skip_whitespace!

      def pop_match!(rgx)
        m = @line[rgx]
        @line[0, m.length] = "" if m
        return m
      end
      private :pop_match!

      def skip_multicomment!
        pop_match!(@@multiline[:open])
        depth = 1
        start_line = @line_num
        while depth > 0 and @line do
          skip_whitespace!
          if @line.nil?
            require_relative 'parser_errors'
            raise Tritium::Parser::Parser::SyntaxError.new(@filename, 
                                  start_line,
                                  "You opened a multi-line comment with /* begin on #{start_line} and then it never ended. Must end multi-line comments with */",
                                  "*/")
          end
          case
          when pop_match!(@@multiline[:open])
            depth += 1
          when pop_match!(@@multiline[:close])
            depth -= 1
          else
            @line[/^("|'|\/)/] and pop_match!(@@string_matchers[@line[0]]) or
            pop_match!(/^./)
          end
          next
        end
      end
      private :skip_multicomment!

      def skip_whitespace_and_comments!
        while skip_whitespace! and @line do
          case
          when @line[@@multiline[:open]]
            skip_multicomment!
            next
          when @line[/^(#|\/\/)/]
            next_line!
            next
          else break
          end
        end
        return true
      end

      def munch_error!(msg, len = nil)
        error = Token.new(@filename, @line_num, :ERROR, msg)
        if not len then
          next_line!
        else
          @line[0,len] = ""
        end
        return error
      end
      private :munch_error!

      def token(lexeme, value = nil)
        Token.new(@filename, @line_num, lexeme, value)
      end
      private :token

      def munch!
        while skip_whitespace_and_comments! and @line do
          case
          when @line[@@multiline[:close]]
            return munch_error!("unmatched comment terminator")
          when m = pop_match!(/^(=|,|\(|\)|\{|\})/)
            return token(@@symbols[m])
          when m = pop_match!(/^\d+/)
            return token(:STRING, m)
          when @line[/^("|'|\/)/]
            if m = pop_match!(@@string_matchers[@line[0]]) then
              m = eval m
              return token(Regexp === m ? :REGEXP : :STRING, m)
            else
              return munch_error!("unterminated string or regexp #{@line}")
            end
          when m = pop_match!(/^read\s*\(/m)  # More brittle than I like
            skip_whitespace_and_comments!
            source = pop_match!(@@string_matchers[@line[0]])
            skip_whitespace_and_comments!
            rparen = pop_match!(/\)/)
            if source and
               (source = eval source).is_a? String and
               rparen then
              return token(:READ, source)
            else
              return munch_error!("malformed read")
            end
          when m = pop_match!(/^\$\w+/)
            return token(:VAR, m[1, m.length].intern)
          when m = pop_match!(/^\%\w+/)
            return token(:LVAR, m[1, m.length].intern)
          when m = pop_match!(/^[a-zA-Z_:][-\w:.]*:/)
            return token(:KWD, m[0, m.length-1].intern)
          when m = pop_match!(/^(\$|[_a-zA-Z](\w|\$)*)/)
            return token(:ID, m.intern)
          when m = pop_match!(/;/)
            next
          when m = pop_match!(/^@import\b/)
            skip_whitespace_and_comments!
            if not @line then
              return munch_error!("malformed import")
            elsif m = pop_match!(@@string_matchers['"']) or
               m = pop_match!(@@string_matchers["'"]) then
              return token(:IMPORT, eval(m))
            elsif m = pop_match!(/^[-+.*?:\/\w]+/) then
              return token(:IMPORT, m)
            else
              return munch_error!("malformed import")
            end
          else
            return munch_error!("unrecognized tokens in #{@line}")
          end
        end
        if not @done then
          @done = true
          return token(:EOF)
        end
      end
      private :munch!

      def peek
        return @lookahead
      end

      def pop!
        tmp, @lookahead = @lookahead, munch!
        if tmp and tmp.lexeme == :STRING then
          while @lookahead and @lookahead.lexeme == :STRING do
            tmp.value << @lookahead.value
            @lookahead = munch!
          end
        end
        return tmp
      end

      def each
        while t = pop! do
          yield t
        end
      end

      def to_a
        result = []
        self.each { |t| result << t }
        result
      end
    end
  end
end
