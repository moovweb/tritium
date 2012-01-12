package parser

import (
  "goprotobuf.googlecode.com/hg/proto"
  ir "tritium/proto"
  "io/ioutil"
  . "tritium/tokenizer" // was meant to be in this package
  "path"
  //"fmt"
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
  src, _ := ioutil.ReadFile(fullpath)
  d, f := path.Split(fullpath)
  p := &Parser {
    Tokenizer: MakeTokenizer(src),
    FileName: f,
    DirName: d,
    FullPath: fullpath,
    Lookahead: nil,
    counter: 0,
    header: false,
  }
  p.pop()
  return p
}

func (p *Parser) Parse() *ir.ScriptObject {
  script := new(ir.ScriptObject)
  script.Name = proto.String(p.FullPath)
  
  
  stmts := make([]*ir.Instruction, 0)
  // defs := make([]*ir.Function, 0)
  
  switch p.peek().Lexeme {
  // case FUNC:
  //   for p.peek().Lexeme != EOF {
  //     defs = append(defs, p.definition())
  //   }
  //   if len(defs) == 0 {
  //     defs = nil
  //   }
  //   script.Functions = defs
  // }
  default:
    for p.peek().Lexeme != EOF {
      stmts = append(stmts, p.statement())
    }
    if len(stmts) == 0 {
      stmts = nil
    }
    script.Root = &ir.Instruction {
      Type: ir.NewInstruction_InstructionType(ir.Instruction_BLOCK),
      Children: stmts,
    }
  }
  return script
}

func (p *Parser) statement() *ir.Instruction {
  node := new(ir.Instruction)
  switch p.peek().Lexeme {
  case IMPORT:
    token := p.pop() // pop the "@import" keyword
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_IMPORT)
    node.Value = proto.String(path.Join(p.DirName, token.Value))
  default:
    node = p.expression()
  }
  return node
}

func (p *Parser) expression() *ir.Instruction {
  node := new(ir.Instruction)
  switch p.peek().Lexeme {
  case STRING, REGEXP, POS:
    node = p.literal()
  case READ:
    node = p.read()
  case ID:
    node = p.call()
  case GVAR, LVAR:
    node = p.variable()
  default:
    panic("malformed expression")
  }
  return node
}

func (p *Parser) literal() *ir.Instruction {
  node := new(ir.Instruction)
  token := p.pop()
  switch token.Lexeme {
  case STRING:
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    node.Value = proto.String(token.Value)
  case REGEXP:
    pattern := new(ir.Instruction)
    options := new(ir.Instruction)
    po := make([]*ir.Instruction, 2)
    pattern.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    pattern.Value = proto.String(token.Value)
    options.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
    options.Value = proto.String(token.ExtraValue)
    po[0] = pattern
    po[1] = options
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    node.Value = proto.String("regexp")
    node.Arguments = po
  case POS:
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_POSITION)
    node.Value = proto.String(token.Value)
  }
  return node
}

func (p *Parser) read() *ir.Instruction {
  node := new(ir.Instruction)
  p.pop() // pop the "read" keyword
  if p.peek().Lexeme != LPAREN {
    panic("argument list expected for read")
  }
  p.pop() // pop the lparen
  if p.peek().Lexeme != STRING {
    panic("read requires a literal string argument")
  }
  readPath := p.pop().Value
  if p.peek().Lexeme != RPAREN {
    panic("unterminated argument list in read")
  }
  p.pop() // pop the rparen
  contents, _ := ioutil.ReadFile(path.Join(p.DirName, readPath))
  node.Type = ir.NewInstruction_InstructionType(ir.Instruction_TEXT)
  node.Value = proto.String(string(contents))
  return node
}

func (p *Parser) call() *ir.Instruction {
  node := new(ir.Instruction)
  funcName := p.pop().Value // grab the function name
  if p.peek().Lexeme != LPAREN {
    panic("argument list expected for call to " + funcName)
  }
  p.pop() // pop the lparen
  ords, kwds := p.arguments() // gather the arguments
  if p.peek().Lexeme != RPAREN {
    panic("unterminated argument list in call to " + funcName)
  }
  p.pop() // pop the rparen
  var block []*ir.Instruction
  if p.peek().Lexeme == LBRACE {
    block = p.block()
  }
  
  // Expand keyword args
  if kwds != nil {
    kwdToGensym := make(map[string]string, len(kwds))
    outer := make([]*ir.Instruction, 0)
    for k, v:= range kwds {
      temp := new(ir.Instruction)
      temp.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      temp.Value = proto.String("var")
      temp.Arguments = make([]*ir.Instruction, 2)
      tempName := p.gensym()
      temp.Arguments[0] = &ir.Instruction {
        Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
        Value: proto.String(tempName),
      }
      temp.Arguments[1] = v
      outer = append(outer, temp)
      kwdToGensym[k] = tempName
    }
    inner := make([]*ir.Instruction, 0)
    for k, _ := range kwds {
      getter := new(ir.Instruction)
      getter.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      getter.Value = proto.String("var")
      getter.Arguments = make([]*ir.Instruction, 1)
      getter.Arguments[0] = &ir.Instruction {
        Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
        Value: proto.String(kwdToGensym[k]),
      }      
      setter := new(ir.Instruction)
      setter.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
      setter.Value = proto.String("set")
      setter.Arguments = make([]*ir.Instruction, 2)
      setter.Arguments[0] = &ir.Instruction {
        Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
        Value: proto.String(k),
      }
      setter.Arguments[1] = getter
      inner = append(inner, setter)
    }    
    
    theCall := new(ir.Instruction)
    theCall.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    theCall.Value = proto.String(funcName)
    theCall.Arguments = ords    

    if block == nil {
      block = inner
    } else {
      for _, v := range block {
        inner = append(inner, v)
      }
    }
    
    theCall.Children = inner
    outer = append(outer, theCall)
    
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_BLOCK)
    node.Children = outer
    
  } else {
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    node.Value = proto.String(funcName)
    node.Arguments = ords
    node.Children = block
  }
  return node
}
  
func (p *Parser) arguments() (ords []*ir.Instruction, kwds map[string]*ir.Instruction) {
  ords, kwds = make([]*ir.Instruction, 0), make(map[string]*ir.Instruction, 0)
  if p.peek().Lexeme != RPAREN {
    if p.peek().Lexeme == KWD {
      k := p.pop().Value
      kwds[k] = p.expression()
    } else {
      ords = append(ords, p.expression())
    }
  }
  for p.peek().Lexeme != RPAREN {
    if p.peek().Lexeme == COMMA {
      p.pop()
    } else {
      panic("arguments must be separated by commas")
    }
    if p.peek().Lexeme == KWD {
      k := p.pop().Value
      kwds[k] = p.expression()
    } else {
      ords = append(ords, p.expression())
    }
  }
  if len(ords) == 0 {
    ords = nil
  }
  if len(kwds) == 0 {
    kwds = nil
  }
  return ords, kwds
}

func (p *Parser) variable() *ir.Instruction {
  node := new(ir.Instruction)
  switch p.peek().Lexeme {
  case LVAR:
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_LOCAL_VAR)
    node.Value = proto.String(p.pop().Value)
    if p.peek().Lexeme == EQUAL {
      p.pop() // pop the equal sign
      node.Arguments = make([]*ir.Instruction, 1)
      node.Arguments[0] = p.expression()
    }
  case GVAR:
    node.Type = ir.NewInstruction_InstructionType(ir.Instruction_FUNCTION_CALL)
    node.Value = proto.String("var")
    name := p.pop().Value
    value := new(ir.Instruction)
    if p.peek().Lexeme == EQUAL {
      p.pop() // pop the equal sign
      value = p.expression()
    } else {
      value = nil
    }
    if value == nil {
      node.Arguments = make([]*ir.Instruction, 1)
    } else {
      node.Arguments = make([]*ir.Instruction, 2)
      node.Arguments[1] = value
    }
    node.Arguments[0] = &ir.Instruction {
      Type: ir.NewInstruction_InstructionType(ir.Instruction_TEXT),
      Value: proto.String(name),
    }
  }
  if p.peek().Lexeme == LBRACE {
    node.Children = p.block()
  }
  return node
}

func (p *Parser) block() []*ir.Instruction {
  stmts := make([]*ir.Instruction, 0)
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

// func (p *Parser) definition() *ir.Function {
//   
//   p.pop() // pop the "@func" keyword
//   opensIn := ""
//   if p.peek().Lexeme == TYPE {
//     opensIn = p.pop().Value
//   }
//   
// }










