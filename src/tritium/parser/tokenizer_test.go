package parser

import (
  "testing"
  "fmt"
)

func TestBlah(t *testing.T) {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println(r)
    }
  }()
  tkzer := Tokenizer{Source: []byte(`/* comment`), LineNum:1}
  tkzer.discardWhitespaceAndComments()
  fmt.Println(string(tkzer.Source), tkzer.LineNum)
  tk := tkzer.munch()
  fmt.Println(lexemeName[tk.Lexeme], tk.Value, tk.ExtraValue)
}