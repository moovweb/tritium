package parser

import (
  "testing"
  "fmt"
)

func TestBlah(t *testing.T) {
  tokenizer := MakeTokenizer([]byte("hello /* blah"))
  
  token := tokenizer.Pop()
  
  if token != nil {
  
    fmt.Println(tokenizer.Pop().Inspect())
  } else {
    fmt.Println("Token is nil!")
  }
  
  fmt.Println("--------")
  fmt.Println(string(tokenizer.Source), tokenizer.Lookahead.Inspect())
  
}