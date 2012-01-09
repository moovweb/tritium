package parser

import (
  "testing"
  //"fmt"
)

func TestBlah(t *testing.T) {
  tk := Tokenizer{Source: []byte("  //comment \n  /* a /* b */ \n c */  \n\nhello"), LineNum:1}
  tk.discardWhitespaceAndComments()
  //fmt.Println(string(tk.Source), tk.LineNum)
  if string(tk.Source) != "hello" || tk.LineNum != 5 {
    t.Error("Didn't tokenize correctly!")
  }
}