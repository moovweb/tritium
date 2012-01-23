package parser

import (
  "goprotobuf.googlecode.com/hg/proto"
  ir "tritium/proto"
  "io/ioutil"
  "path/filepath"
  . "tritium/tokenizer" // was meant to be in this package
  "path"
  // "fmt"
)

type Parser struct {
  *Tokenizer
  FileName string
  DirName string
  FullPath string
  Lookahead *Token
  counter int
  header bool
}

func (p *Parser) gensym() string {
  p.counter++
  return p.FullPath + string(p.counter)
}

func (p *Parser) peek() *Token {
  return p.Lookahead
}

func (p *Parser) pop() *Token {
  val := p.Lookahead
  p.Lookahead = p.Tokenizer.Pop()
  return val
}

func MakeParser(fullpath string) *Parser {
  fullpath, _ = filepath.Abs(fullpath)
  src, _ := ioutil.ReadFile(fullpath)
  d, f := path.Split(fullpath)
  p := &Parser {
    Tokenizer: MakeTokenizer(src),
    FileName: f,
    DirName: d,
    FullPath: fullpath,
    Lookahead: nil,
    counter: 0,
  }
  p.pop()
  return p
}

func (p *Parser) Parse() *ir.ScriptObject {
  script := new(ir.ScriptObject)
  script.Name = proto.String(p.FullPath)
  
  
  stmts := ir.ListInstructions()
  defs := make([]*ir.Function, 0) // Add a new constructor in instruction.go
  
  switch p.peek().Lexeme {
  case FUNC:
    for p.peek().Lexeme != EOF {
      defs = append(defs, p.definition())
    }
    if len(defs) == 0 {
      defs = nil
    }
    script.Functions = defs
  default:
    for p.peek().Lexeme != EOF {
      stmts = append(stmts, p.statement())
    }
    line := int32(0)
    if len(stmts) == 0 {
      stmts = nil
    } else {
      line = *stmts[0].LineNumber	
    }
    
    script.Root = ir.MakeBlock(stmts, line)
    
    // script.Root = &ir.Instruction {
    //   Type: ir.NewInstruction_InstructionType(ir.Instruction_BLOCK),
    //   Children: stmts,
    // }
  }
  return script
}

func (p *Parser) statement() (node *ir.Instruction) {
  switch p.peek().Lexeme {
  case IMPORT:
    token := p.pop() // pop the "@import" token (includes importee)
    
    node = ir.MakeImport(path.Join(p.DirName, token.Value), token.LineNumber)
    
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_IMPORT)
    // importPath := path.Join(p.DirName, token.Value)
    // node.Value = proto.String(importPath)
  default:
    node = p.expression()
  }
  return node
}

func (p *Parser) expression() (node *ir.Instruction) {
  node = p.term()
  rest := ir.ListInstructions()  
  for p.peek().Lexeme == PLUS {
    p.pop() // pop the plus sign
    rest = append(rest, p.term())
  }
  if len(rest) > 0 {
    node = ir.FoldLeft("concat", node, rest)
  }
  return node
}

func (p *Parser) term() (node *ir.Instruction) {
  switch p.peek().Lexeme {
  case STRING, REGEXP, POS:
    node = p.literal()
  case READ:
    node = p.read()
  case ID:
    node = p.call()
  case TYPE:
    node = p.cast()
  case GVAR, LVAR:
    node = p.variable()
  case LPAREN:
    p.pop() // pop the lparen
    node = p.expression()
    if p.peek().Lexeme != RPAREN {
      panic("unclosed parenthesis")
    }
    p.pop() // pop the rparen
  default:
    panic("malformed expression")
  }
  return node
}

func (p *Parser) literal() (node *ir.Instruction) {
  token := p.pop()
  switch token.Lexeme {
  case STRING:
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    // node.Value = proto.String(token.Value)
    
    node = ir.MakeText(token.Value, token.LineNumber)
  case REGEXP:
    // pattern := new(ir.Instruction)
    // options := new(ir.Instruction)
    // po := make([]*ir.Instruction, 2)
    // pattern.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    // pattern.Value = proto.String(token.Value)
    // options.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    // options.Value = proto.String(token.ExtraValue)
    // po[0] = pattern
    // po[1] = options
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    // node.Value = proto.String("regexp")
    // node.Arguments = po
    
    node = ir.MakeFunctionCall("regexp",
                               ir.ListInstructions(ir.MakeText(token.Value, token.LineNumber),
                                                   ir.MakeText(token.ExtraValue, token.LineNumber)),
                               nil,
                               token.LineNumber)
    
  case POS:
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_POSITION)
    // node.Value = proto.String(token.Value)
    
    node = ir.MakePosition(token.Value, token.LineNumber)
  }
  return node
}

func (p *Parser) read() (node *ir.Instruction) {
  p.pop() // pop the "read" keyword
  readLineNo := p.peek().LineNumber
  if p.peek().Lexeme != LPAREN {
    panic("argument list expected for read")
  }
  p.pop() // pop the lparen
  if p.peek().Lexeme != STRING {
    panic("read requires a literal string argument")
  }
  readPath := p.pop().Value
  // pathLineNo := p.peek().LineNumber
  if p.peek().Lexeme != RPAREN {
    panic("unterminated argument list in read")
  }
  p.pop() // pop the rparen
  contents, _ := ioutil.ReadFile(path.Join(p.DirName, readPath))
  // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
  // node.Value = proto.String(string(contents))
  
  
  node = ir.MakeText(string(contents), readLineNo)
  
  return node
}

func (p *Parser) call() (node *ir.Instruction) {
  funcName := p.pop().Value // grab the function name
  funcLineNo := p.peek().LineNumber
  if p.peek().Lexeme != LPAREN {
    panic("argument list expected for call to " + funcName)
  }
  p.pop() // pop the lparen
  ords, kwdnames, kwdvals := p.arguments() // gather the arguments
  if p.peek().Lexeme != RPAREN {
    panic("unterminated argument list in call to " + funcName)
  }
  p.pop() // pop the rparen
  var block []*ir.Instruction
  if p.peek().Lexeme == LBRACE {
    block = p.block()
  }
  
  // Expand keyword args
  if kwdnames != nil && kwdvals != nil {
    kwdToGensym := make(map[string]string, len(kwdnames))
    outer := ir.ListInstructions()
    for i, k := range kwdnames {
      // temp := new(ir.Instruction)
      // temp.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      // temp.Value = proto.String("var")
      // temp.Arguments = make([]*ir.Instruction, 2)
      // tempName := p.gensym()
      // temp.Arguments[0] = &ir.Instruction {
      //   Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
      //   Value: proto.String(tempName),
      // }
      // temp.Arguments[1] = v
      // outer = append(outer, temp)
      // kwdToGensym[k] = tempName
      
      tempname := p.gensym()
      tempvar := ir.MakeFunctionCall("var",
                                     ir.ListInstructions(ir.MakeText(tempname, funcLineNo),
                                                         kwdvals[i]),
                                     nil, funcLineNo)
      outer = append(outer, tempvar)
      kwdToGensym[k] = tempname
    }
    inner := ir.ListInstructions()
    for _, k := range kwdnames {
      // getter := new(ir.Instruction)
      // getter.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      // getter.Value = proto.String("var")
      // getter.Arguments = make([]*ir.Instruction, 1)
      // getter.Arguments[0] = &ir.Instruction {
      //   Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
      //   Value: proto.String(kwdToGensym[k]),
      // }      
      // setter := new(ir.Instruction)
      // setter.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      // setter.Value = proto.String("set")
      // setter.Arguments = make([]*ir.Instruction, 2)
      // setter.Arguments[0] = &ir.Instruction {
      //   Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
      //   Value: proto.String(k),
      // }
      // setter.Arguments[1] = getter
      // inner = append(inner, setter)
      
      getter := ir.MakeFunctionCall("var",
                                    ir.ListInstructions(ir.MakeText(kwdToGensym[k], funcLineNo)),
                                    nil, funcLineNo)
      setter := ir.MakeFunctionCall("set",
                                    ir.ListInstructions(ir.MakeText(k, funcLineNo), getter),
                                    nil, funcLineNo)
      inner = append(inner, setter)
    }    
    
    // theCall := new(ir.Instruction)
    // theCall.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    // theCall.Value = proto.String(funcName)
    // theCall.Arguments = ords
    // 
    // if block == nil {
    //   block = inner
    // } else {
    //   for _, v := range block {
    //     inner = append(inner, v)
    //   }
    // }
    
    if block != nil {
      for _, v := range block {
        inner = append(inner, v)
      }
    }
    
    theCall := ir.MakeFunctionCall(funcName, ords, inner, funcLineNo)
    outer = append(outer, theCall)
    
    node = ir.MakeBlock(outer, funcLineNo)
    
    
    // theCall.Children = inner
    // outer = append(outer, theCall)
    // 
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_BLOCK)
    // node.Children = outer
    
  } else {
    // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    // node.Value = proto.String(funcName)
    // node.Arguments = ords
    // node.Children = block
    
    node = ir.MakeFunctionCall(funcName, ords, block, funcLineNo)
  }
  return node
}
  
func (p *Parser) arguments() (ords []*ir.Instruction, kwdnames []string, kwdvals []*ir.Instruction) {
  ords, kwdnames, kwdvals = make([]*ir.Instruction, 0), make([]string, 0), make([]*ir.Instruction, 0)
  counter := 0
  for p.peek().Lexeme != RPAREN {
    if counter > 0 {
      if p.peek().Lexeme != COMMA {
        panic("arguments must be separated by commas")
      }
      p.pop() // pop the comma
    }
    if p.peek().Lexeme == KWD {
      k := p.pop().Value
      kwdnames = append(kwdnames, k)
      // TO DO: CHECK EXPRESSION FIRST-SET
      kwdvals = append(kwdvals, p.expression())
    } else {
      ords = append(ords, p.expression())
    }
    counter++
  }
  if len(ords) == 0 {
    ords = nil
  }
  if len(kwdnames) == 0 || len(kwdvals) == 0 {
    kwdnames = nil
    kwdvals = nil
  }
  return ords, kwdnames, kwdvals
}

func (p *Parser) cast() (node *ir.Instruction) {
  typeName := p.pop().Value // grab the function name
  typeLineNo := p.peek().LineNumber
  if p.peek().Lexeme != LPAREN {
    panic("expression needed in typecast")
  }
  p.pop() // pop the lparen
  expr := p.expression()
  if p.peek().Lexeme != RPAREN {
    panic("typecast missing closing parenthesis")
  }
  p.pop() // pop the rparen
  var block []*ir.Instruction
  if p.peek().Lexeme == LBRACE {
    block = p.block()
  }
  
  node = ir.MakeFunctionCall(typeName, ir.ListInstructions(expr), block, typeLineNo)
  return node
}

func (p *Parser) variable() (node *ir.Instruction) {
  token := p.pop()
  lexeme, name, lineNo := token.Lexeme, token.Value, token.LineNumber
  var val *ir.Instruction
  var block []*ir.Instruction
  if p.peek().Lexeme == EQUAL {
    p.pop() // pop the equal sign
    // TO DO: check for expression first-set
    val = p.expression()
  }
  if p.peek().Lexeme == LBRACE {
    block = p.block()
  }
  if lexeme == LVAR {
    node = ir.MakeLocalVar(name, val, block, lineNo)
  } else {
    args := ir.ListInstructions(ir.MakeText(name, lineNo))
    if val != nil {
      args = append(args, val)
    }
    node = ir.MakeFunctionCall("var", args, block, lineNo)
  }
  return node
  
  
  // switch p.peek().Lexeme {
  // case LVAR:
  //   // node.Type = ir.NewInstruction_InstructionType(ir.Instruction_LOCAL_VAR)
  //   // node.Value = proto.String(p.pop().Value)
  //   // if p.peek().Lexeme == EQUAL {
  //   //   p.pop() // pop the equal sign
  //   //   node.Arguments = make([]*ir.Instruction, 1)
  //   //   node.Arguments[0] = p.expression()
  //   // }
  //   token := p.pop()
  //   name, lineNo := token.Value, token.LineNumber
  //   var args []*ir.Instruction
  //   if p.peek().Lexeme == EQUAL {
  //     p.pop() // pop the equal sign
  //     args = ir.ListInstructions(p.expression())
  //     if len(args) == 0 {
  //       args = nil
  //     }
  //   }
  //   node = ir.MakeLocalVar(name, args, nil, lineNo)
  //     
  // case GVAR:
  //   node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
  //   node.Value = proto.String("var")
  //   name := p.pop().Value
  //   value := new(ir.Instruction)
  //   if p.peek().Lexeme == EQUAL {
  //     p.pop() // pop the equal sign
  //     value = p.expression()
  //   } else {
  //     value = nil
  //   }
  //   if value == nil {
  //     node.Arguments = make([]*ir.Instruction, 1)
  //   } else {
  //     node.Arguments = make([]*ir.Instruction, 2)
  //     node.Arguments[1] = value
  //   }
  //   node.Arguments[0] = &ir.Instruction {
  //     Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
  //     Value: proto.String(name),
  //   }
  //   
  //   token := p.pop()
  //   name, lineNo := token.Value, token.LineNumber
  //   var args []*ir.Instruction
  //   
  // }
  // if p.peek().Lexeme == LBRACE {
  //   node.Children = p.block()
  // }
  // return node
}

func (p *Parser) block() (stmts []*ir.Instruction) {
  stmts = ir.ListInstructions()
  p.pop() // pop the lbrace
  for p.peek().Lexeme != RBRACE {
    stmts = append(stmts, p.statement())
  }
  p.pop() // pop the rbrace
  if len(stmts) == 0 {
    stmts = nil
  }
  return stmts
}

func (p *Parser) definition() *ir.Function {
  isSignature := false
  node := new(ir.Function)
  
  p.pop() // pop the "@func" keyword
  contextType := ""
  if p.peek().Lexeme == TYPE {
    contextType = p.pop().Value
    if p.peek().Lexeme != DOT {
      panic("function context and function name must be separated by '.'")
    }
    p.pop() // pop the dot
  }
  
  if p.peek().Lexeme != ID {
    panic("invalid function name in definition")
  }
  funcName := p.pop().Value
  
  if p.peek().Lexeme != LPAREN {
    panic("malformed parameter list in function signature")
  }
  p.pop() // pop the lparen
  params := p.parameters()
  if len(params) == 0 {
    params = nil
  }
  p.pop() // pop the rparen
  
  returnType := ""
  opensType := ""
  if p.peek().Lexeme == TYPE {
    isSignature = true
    returnType = p.pop().Value
    if p.peek().Lexeme == TYPE {
      opensType = p.pop().Value
    }
  }
  
  node.Name = proto.String(funcName)
  node.Args = params
  node.ScopeType = proto.String(contextType)
  node.ReturnType = proto.String(returnType)
  node.OpensType = proto.String(opensType)
  
  if isSignature {
    if p.peek().Lexeme == LBRACE {
      panic("body not permitted in function signature")
    }
    node.BuiltIn = proto.Bool(true)
    return node
  }
  node.BuiltIn = proto.Bool(false)
  if p.peek().Lexeme != LBRACE {
    panic("function definition is missing a body")
  }
  funcBody := &ir.Instruction {
    Type: ir.NewInstruction_InstructionType(ir.Instruction_BLOCK),
    Children: p.block(),
  }
  node.Instruction = funcBody
  return node
}

func (p *Parser) parameters() []*ir.Function_Argument {
  params := make([]*ir.Function_Argument, 0)
  counter := 0
  for p.peek().Lexeme != RPAREN {
    if counter > 0 {
      if p.peek().Lexeme != COMMA {
        panic("parameter list must be separated by commas")
      }
      p.pop() // pop the comma
    }
    if p.peek().Lexeme != TYPE {
      panic("function parameter is missing a type")
    }
    param := &ir.Function_Argument {
      TypeString: proto.String(p.pop().Value),
    }
    if p.peek().Lexeme != LVAR {
      panic("function parameter has invalid name")
    }
    param.Name = proto.String(p.pop().Value)
    params = append(params, param)
    counter++
  }
  return params
}








