require_relative "tokenizer"
require_relative "instruction"

$macro_calls = []
$imports = []

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

  def parse()
    puts "parse"
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
      puts "statement: id"
      return invocation()
    else
      puts peek
    end  # ADD ERROR HANDLING
  end
      
  def import()
    import_name = pop!.value
    script_string = File.read(File.join(@path, import_name))
    parser = Parser.new(script_string, filename: import_name, path: @path)
    $imports << { importer: @filename, importee: import_name }
    return parser.parse()
  end

  def reference()
    var_name, value = pop!.value, nil
    if peek.lexeme == :EQUAL then
      pop!
      value = term()
    end
    return cmd(value ? Assignment : Reference, var_name, *value)
  end

  def invocation()
    puts "invocation"
    func_name = pop!.value
    if peek.lexeme == :LPAREN then
      args = arguments()
    end  # ADD ERROR HANDLING
    stmts = peek.lexeme == :LBRACE ? block() : nil
    signature = [func_name, args.length]
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
    else
      stmts = stmts ? [stmts] : []
      if not(stmts.empty?) then puts "invocation with block" end
      return cmd(stmts.empty? ? Invocation : InvocationWithBlock,
                 func_name, args[:pos], args[:kwd], *stmts)
    end
  end

  def arguments()
    puts "arguments"
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
    puts "term"
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
