class Tokenizer
  class Token
    attr_reader :filename, :line_num, :lexeme, :value

    def initialize(filename, line_num, lexeme, value = nil)
      @filename, @line_num = filename, line_num
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

  def initialize(script_string, options = {})
    @filename = options[:filename] || "MAIN"
    @lines = script_string.lines.to_a
    @line_num = 0
    next_line!
    @lookahead = munch!
  end

  def next_line!
    @line = @lines[@line_num] and @line_num += 1
    @fresh_line = true
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
    pop_match!(/^#\[/)
    depth = 1
    while depth > 0 and @line do
      skip_whitespace!
      case
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
  private :skip_multicomment!

  def skip_whitespace_and_comments!
    while skip_whitespace! and @line do
      case
      when @line[/^#\[/]
        skip_multicomment!
        next
      when @line[/^#/]
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
    while @line do
      if @fresh_line
        if m = pop_match!(/^\s*(#.*)?$/)
          m.chomp!
          t = token(:BLANKLINE, m)
          next_line!
          return t
        else
          @line.lstrip!
          @fresh_line = false
        end
      end
      @line.lstrip!
      if @line.empty?
        next_line!
        next
      end
      case
      when m = pop_match!(/^\s*#.*$/)
        # t = token(:TRAILER, m)
        next_line!
        # return t
        next # too hard for the parser to keep trailing comments
      when m = pop_match!(/^(=|,|\(|\)|\{|\})/)
        return token(@@symbols[m])
      when m = pop_match!(/^\d+/)
        return token(:STRING, m)
      when m = @line[/^("(\\.|[^"\\])*")\s*=>/] # Don't intern Ruby kwds!
        @line[0, m.length] = "" if m
        return token(:OLDKWD, eval($1))
      when m = @line[/^('(\\.|[^'\\])*')\s*=>/]
        @line[0, m.length] = "" if m
        return token(:OLDKWD, eval($1))
      when @line[/^("|'|\/)/]
        if m = pop_match!(@@string_matchers[@line[0]]) then
          m = eval m
          return token(Regexp === m ? :REGEXP : :STRING, m)
        else
          return munch_error!("unterminated string or regexp #{@line}")
        end
      when m = pop_match!(/^\$\w+/)
        return token(:VAR, m[1, m.length].intern)
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
  
  def print_each
    self.each { |t| print(t,"\n") }
  end

  def to_a
    result = []
    self.each { |t| result << t }
    result
  end
end

class Base
  @@tab = "  "

  attr :filename
  attr :line_num
  def initialize(filename, line_num)
    @filename, @line_num = filename, line_num
  end

  def ruby_debug_line(depth = 0)
    return ""
    ["#{@@tab * depth}#[",
      "@_line_number = #{@line_num.inspect}",
      "@_script = #{@filename.inspect}",
      "@_line = ''",
      "#]#\n"].join("\n#{@@tab * depth}")
  end

  alias unquote to_s
end

class Blank < Base
  def initialize(filename, line_num, whatever)
    super(filename, line_num)
    @whatever = whatever
  end
  
  def to_s(depth = 0)
    @whatever
  end
end

class Import < Base
  def initialize(filename, line_num, import_name)
    super(filename, line_num)
    @import_name = import_name
  end
  
  def to_s(depth = 0)
    "#{@@tab * depth}@import #{@import_name}"
  end
end

class Literal < Base
  def initialize(filename, line_num, value)
    super(filename, line_num)
    @value = value
  end

  def to_s(depth = 0)
    "#{@@tab * depth}#{@value.inspect}"
  end

  def unquote
    val = eval(self.to_s)
    Regexp === val ? val.inspect : val
  end
end

class Reference < Base
  def initialize(filename, line_num, name, statements = [])
    super(filename, line_num)
    @name = name.intern
    @statements = statements
  end

  def to_s(depth = 0)
    result = "#{@@tab * depth}$#{@name}"
    if @statements.any?
      result << " {\n"
      depth += 1
      @statements.each { |stm| result << stm.to_s(depth) << "\n" }
      depth -= 1
      result << "#{@@tab * depth}}"
    end
    return result
  end
end

class Invocation < Base
  attr :name, true
  attr :pos_args
  attr :statements
  def initialize(filename, line_num,
                 name = nil, pos_args = [], kwd_args = {})
    super(filename, line_num)
    @statements = []
    @name, @pos_args, @kwd_args = name.intern, pos_args, kwd_args
  end

  def to_s(depth = 0)
    #name = @name.to_s.gsub(/\$/, "select")
    name = @name.to_s
    result = ruby_debug_line(depth) + "#{@@tab * depth}#{name}("
    @pos_args.each { |arg| result << "#{arg}, " }
    @kwd_args.each do |kwd, arg|
      if kwd.is_a? String
        result << "#{kwd.inspect} => #{arg}, "
      else
        result << "#{kwd}: #{arg}, "
      end
    end
    result[-2,2] = "" if result.end_with? ", "
    result << ")"
    return result
  end
end

class InvocationWithBlock < Invocation
  attr :name, true
  attr :statements, true
  def initialize(filename, line_num,
                 name = nil, pos_args = [], kwd_args = {}, statements = [])
    super(filename, line_num, name, pos_args, kwd_args)
    @statements = statements
  end

  def to_s(depth = 0)
    case @name
    when :top, :bottom, :before, :after
      result = ""
      @statements.each do |s|
        if (s.is_a? Invocation) and (s.name == :insert or s.name == :inject)
          s.name = s.name.to_s + "_" + @name.to_s
        end
        result << s.to_s(depth) << "\n"
      end
      return result.chomp
    end

    result = super(depth)
    result << " {\n"
    depth += 1
    @statements.each { |stm| result << stm.to_s(depth) << "\n" }
    depth -= 1
    result << "#{@@tab * depth}}"
    return result
  end
end

class InlineBlock < InvocationWithBlock
  attr :statements, true
  def initialize(filename, line_num, statements = [])
    @filename, @line_num, @statements = filename, line_num, statements
  end

  def to_s(depth = 0)
#    result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
    result = ""
    @statements.each { |stmt| result << stmt.to_s(depth) << "\n" }
#    result << "#{@@tab * depth}# LEAVING FILE: #{@filename}"
    return result
  end
end

class ExpansionInlineBlock < InlineBlock
  def to_s(depth)
    return (@statements.collect { |s| s.to_s(depth) }).join("\n")
  end
end

class Parser
  class ScriptErrors < StandardError
    def initialize
      @errors = []
    end
    
    def messages
      @errors.collect &:message
    end
      
    def message
      messages.join("\n--------------\n")
    end
    
    def to_s
      message
    end
    
    # Pass through to the error list
    def method_missing(name, *args, &block)
      @errors.send(name, *args, &block)
    end
  end
  
  class LexicalError < StandardError
    def initialize(error_token)
      @error_token = error_token
    end

    def message
      @error_token.to_s
    end
  end

  class SyntaxError < StandardError
    attr_reader :filename, :line_num, :message, :value

    def initialize(filename, line_num, message, value)
      @filename, @line_num = filename, line_num
      @message, @value = message, value
    end

    def message
      return "Syntax error in #{@filename}, line #{@line_num}:\n" \
             "#{@message}; found unexpected #{@value}\n\n"
    end
  end
end

class Parser
  attr :filename
  attr :path
  attr :errors

  def initialize(script_string, options = {})
    @filename    = options[:filename]    || "MAIN"
    @path        = options[:path]        || File.dirname(__FILE__)
    @errors      = options[:errors]      || ScriptErrors.new

    prefix, base = File.dirname(@filename), File.basename(@filename)
    @path = File.join(@path, prefix)
    @filename = base

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
      errobj = LexicalError.new(unexpected)
      @errors << errobj
    else
      errobj = SyntaxError.new(@filename, @line_num, message, unexpected)
      @errors << errobj
    end
    raise errobj
  end

  def parse
    begin
      result = inline_block
    rescue
      raise @errors if @errors.any?
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
      @tokens.each do |token|
        @errors << LexicalError.new(token) if token.lexeme == :ERROR
      end
      raise err
    end
  end

  def statement
    case peek.lexeme
    when :BLANKLINE then
      return blank
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

  def blank
    whatever = pop!.value
    return cmd(Blank, whatever)
  end

  def import
    import_name = pop!.value
    return cmd(Import, import_name)
  end

  def reference
    var_name = pop!.value.to_s
    stmts    = peek.lexeme == :LBRACE ? block : []
    return cmd(Reference, var_name, stmts)
  end

  def invocation
    func_name = pop!.value
    func_name = "inject" if func_name == :insert
    func_name = "insert" if func_name == :insert_tag
    raise_error("function call is missing a valid argument list") if
      peek.lexeme != :LPAREN
    args = arguments
    stmts = peek.lexeme == :LBRACE ? block : nil
    stmts = stmts ? [stmts] : []
    return cmd(stmts.empty? ? Invocation : InvocationWithBlock,
               func_name, args[:pos], args[:kwd], *stmts)
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
    kwd = pop!.value if peek.lexeme == :KWD or peek.lexeme == :OLDKWD
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
      kwd = pop!.value if peek.lexeme == :KWD or peek.lexeme == :OLDKWD
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
      return cmd(Reference, @token.value.to_s, [])
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
    while not(peek.lexeme == :RBRACE or peek.lexeme == :EOF) do
      stmts << statement
    end
    raise_error("unterminated block") if peek.lexeme == :EOF
    pop! # pop the rbrace
    return stmts
  end
end

files = Dir.glob("**/*.ts")
mapping = {}
errors = false

files.each do |filename|
  begin
    mapping[filename] = Parser.new(File.read(filename), filename: filename).parse.to_s
  rescue => err
    errors = true
    print err
  end
end

if errors
  print("Syntax errors found; please fix and re-run this program.\n")
  exit
end

mapping.each do |filename, source|
  print("Converting ", filename, "\n")
  outfile = File.open(filename, "w")
  outfile.write(source)
  outfile.close
end

print("All files converted. Remember to test thoroughly before committing.\n")