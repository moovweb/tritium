require_relative "tokenizer.rb"

class Parser
  @@macros = { }
  
  def initialize(script_string, options = {})
    @filename = options[:filename] || "MAIN"
    @path = options[:path] || File.dirname(__FILE__)
    @tokens = Tokenizer.new(script_string, @filename)
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
    statements = []
    while not(peek === :EOF) do
      statements << statement()
    end
    return cmd(InlineBlock, statements)
  end

  def statement()
    case peek
    when :IMPORT then
      return import()
    when :VAR then
      return reference()
    when :ID then
      return invocation()
    end  # ADD ERROR HANDLING
  end
      
  def import()
    import_name = pop!.value
    script_string = File.read(import_name)
    parser = Parser.new(script_string, filename: import_name)
    $imports << { importer: @filename, importee: import_name }
    return parser.parse()
  end

  def reference()
    var_name, value = pop!.value, nil
    if peek === :EQUAL then
      pop!
      value = term()
    end
    return cmd(value ? Assignment : Reference, var_name, *value)
  end

  def invocation()
    func_name = pop!.value
    if peek === :LPAREN then
      args = arguments()
    end  # ADD ERROR HANDLING
    stmts = peek === :LBRACE ? block() : nil
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
      return cmd(stmts ? InvocationWithBlock : Invocation,
                 func_name, args[:pos], args[:kwd], *stmts)
    end
  end

  def arguments()
    pos_args, kwd_args = [], {}
    pop!
    if peek === :RPAREN then
      pop!
      return { pos: pos_args, kwd: kwd_args }
    end
    if peek === :KWD then
      kwd_args[pop!.value] = term()
    else
      pos_args << term()
    end
    while not(peek === :RPAREN) do
      pop!  # CHECK FOR COMMA
      if peek === :KWD then
        kwd_args[pop!.value] = term()
      else
        pos_args << term()
      end
    end
    pop!
    return { pos: pos_args, kwd: kwd_args }
  end

  def term()
    case pop!
    when :STRING, :REGEXP
      return cmd(Literal, @token.value)
    when :VAR
      return cmd(Reference, @token.value)
    when :ID
      # CHECK FOR LPAREN
      args = arguments()
      return cmd(Invocation, @token.value, args[:pos], args[:kwd])
    end  # ADD ERROR HANDLING
  end

  def block()
    stmts = []
    pop!
    while not(peek === :RBRACE) do
      stmts << statement()
    end
    return stmts
  end
end
