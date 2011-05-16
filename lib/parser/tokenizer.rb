module Tritium
  module Parser
    class Tokenizer
      class Error
        attr_reader :filename, :line, :message

        def initialize(filename, line, message)
          @filename, @line, @message = filename, line, message
        end

        def to_s
          "Error in #{@filename}, line #{@line}: #{@message}"
        end
      end

      class Token
        attr_reader :lexeme, :value

        def initialize(lexeme, value = nil, file = nil, line = nil)
          @lexeme, @value, @file, @line = lexeme, value, file, line
        end

        def to_s
          @value ? "[#{@lexeme}: #{@value}]" : "[#{lexeme}]"
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
        '/' => /^\/(\\.|[^\/\\])*\//
      }

      def initialize(filename)
        @filename = filename
        @instream = open @filename
        @line_num = 0
        next_line!
        @lookahead = munch!
      end

      def next_line!
        @line = @instream.gets
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
            @line[0,2] = ""
            return Error.new(@filename,
                             @line_num,
                             "unmatched comment terminator")
          when @line[/^#/]
            next_line!
            next
          when m = pop_match!(/^(=|,|\(|\)|\{|\})/)
            return Token.new(@@symbols[m], nil, @filename, @line_num)
          when @line[/^("|'|\/)/]
            if m = pop_match!(@@string_matchers[@line[0]]) then
              m = eval m
              return Token.new(Regexp === m ? :REGEXP : :STRING,
                               m,
                               @filename,
                               @line_num)
            else
              error = Error.new(@filename,
                                @line_num,
                                "unterminated string or regexp #{@line}")
              next_line!
              return error
            end
          when m = pop_match!(/^\$\w+/)
            return Token.new(:VAR, m[1, m.length], @filename, @line_num)
          when m = pop_match!(/^[_a-zA-Z\-](\w|\-)*:/)
            return Token.new(:KWD, m[0, m.length-1], @filename, @line_num)
          when m = pop_match!(/^\$|^[_a-zA-Z]\w*/)
            return Token.new(:FUNC, m, @filename, @line_num)
          when m = pop_match!(/^@import\b/)
            @line.lstrip!
            if m = pop_match!(@@string_matchers['"']) or
               m = pop_match!(@@string_matchers["'"]) then
              return Token.new(:IMPORT, eval(m), @filename, @line_num)
            elsif m = pop_match!(/^(\S)+/) then
              return Token.new(:IMPORT, m, @filename, @line_num)
            else
              error = Error.new(@filename,
                                @line_num,
                                "malformed import filename #{@line}")
              next_line!
              return error
            end
          else
            error = Error.new(@filename,
                              @line_num,
                              "unrecognized tokens in #{@line}")
            next_line!
            return error
          end
        end
      end
      private :munch!

      def peek
        return @lookahead
      end

      def pop!
        tmp, @lookahead = @lookahead, munch!
        return tmp
      end

      def each
        while token = pop! do
          yield token
        end
      end
    end
  end
end
