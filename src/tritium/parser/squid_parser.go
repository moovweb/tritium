package parser

import (
  // ir "tritium/proto"
  "io/ioutil"
  t "tritium/tokenizer"
)

type Parser struct {
  *t.Tokenizer
  Path string
  Lookahead *t.Token
}

func (p *Parser) peek() *t.Token {
  return p.Lookahead
}

func (p *Parser) pop() *t.Token {
  val := p.Lookahead
  p.Lookahead = p.Tokenizer.Pop()
  return val
}

func MakeParser(path string) *Parser {
  src, _ := ioutil.ReadFile(path)
  p := &Parser { Tokenizer: t.MakeTokenizer(src), Path: path, Lookahead: nil }
  p.pop()
  return p
}

// function (p *Parser) script() ir.ScriptObject {
//   switch p.peek().Lexeme {
//     

// func (p *Parser) statement() *ir.Instruction {
//   node := new(ir.Instruction)
//   switch p.peek().Lexeme {
//   case t.IMPORT:
//     token := p.pop()
//     node.Type = ir.Instruction_IMPORT
//     node.Value = ir.String(token.Value)
//   default:
//     node = p.expression
//   }
//   return node
// }
// 
// func (p *Parser) expression() *ir.Instruction {
//   return nil
// }