package parser

import (
  "testing"
  "fmt"
)

func TestBlah(t *testing.T) {
  tkzer := Tokenizer{Source: []byte("  //comment \n  /* a /* b */ \n c */  \n\n="), LineNum:1}
  tkzer.discardWhitespaceAndComments()
  fmt.Println(string(tkzer.Source), tkzer.LineNum)
  tk := tkzer.munch()
  fmt.Println(lexemeName[tk.Lexeme], tk.Value)
}