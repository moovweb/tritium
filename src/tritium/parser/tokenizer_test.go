package parser

import (
  "testing"
  "fmt"
)

func TestBlah(t *testing.T) {
  tkzer := Tokenizer{Source: []byte(`'hello \'cruel\' world`), LineNum:1}
  tkzer.discardWhitespaceAndComments()
  fmt.Println(string(tkzer.Source), tkzer.LineNum)
  tk := tkzer.munch()
  fmt.Println(lexemeName[tk.Lexeme], tk.Value, tk.ExtraValue)
}