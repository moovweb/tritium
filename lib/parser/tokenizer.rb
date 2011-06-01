module Tritium
  module Parser
    class Tokenizer
      class Token
        attr_reader :filename, :line_num, :lexeme, :value

        def initialize(filename, line_num, lexeme, value = nil)
          @filename, @line_num = filename, line_num
          @lexeme, @value = lexeme, value
        end

        def to_s
          if @lexeme then
            return @value ? "[#{@lexeme}: #{@value}]" : "[#{lexeme}]"
          else
            return "Error in #{@filename}, line #{@line_num}: #{@value}"
          end
        end

        def ===(symbol)
          @lexeme == symbol
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

      def initialize(script_string, options = {})
        @filename = options[:filename] || "MAIN"
        @lines = script_string.lines.to_a
        @line_num = 0
        next_line!
        @lookahead = munch!
      end

      def next_line!
        @line = @lines[@line_num]
        if @line then
          @line.rstrip!
          @line_num += 1
        end
      end
      private :next_line!

      def pop_match!(rgx)
        m = @line[rgx]
        @line[0, m.length] = "" if m
        return m
      end
      private :pop_match!

      def ignore_multicomment!
        pop_match!(/^#\[/)
        depth = 1
        while depth > 0 and @line do
          @line.lstrip!
          case
          when @line.empty?
            next_line!
          when pop_match!(/^#\[/)
            depth += 1
          when pop_match!(/^\]#/)
            depth -= 1
          else
            pop_match!(/^./)
          end
          next
        end
      end
      private :ignore_multicomment!

      def munch_error!(msg, len = nil)
        error = Token.new(@filename, @line_num, nil, msg)
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
        while @line do
          @line.lstrip!
          case
          when @line.empty?
            next_line!
            next
          when @line[/^#\[/]
            ignore_multicomment!
            next
          when @line[/^\]#/]
            return munch_error!("unmatched comment terminator")
          when @line[/^#/]
            next_line!
            next
          when m = pop_match!(/^(=|,|\(|\)|\{|\})/)
            return token(@@symbols[m])
          when @line[/^("|'|\/)/]
            if m = pop_match!(@@string_matchers[@line[0]]) then
              m = eval m
              return token(Regexp === m ? :REGEXP : :STRING, m)
            else
              return munch_error!("unterminated string or regexp #{@line}")
            end
          when m = pop_match!(/^\$\w+/)
            return token(:VAR, m[1, m.length])
          when m = pop_match!(/^[a-zA-Z_:][-\w:.]*:/)
            return token(:KWD, m[0, m.length-1])
          when m = pop_match!(/^\$|^[_a-zA-Z]\w*/)
            return token(:ID, m)
          when m = pop_match!(/^@import\b/)
            @line.lstrip!
            if m = pop_match!(@@string_matchers['"']) or
               m = pop_match!(@@string_matchers["'"]) then
              return token(:IMPORT, eval(m))
            elsif m = pop_match!(/^(\S)+/) then
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
