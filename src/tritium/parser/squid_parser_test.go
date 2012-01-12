package parser

import (
  "testing"
  "fmt"
  //"io/ioutil"
)

func TestBlah(t *testing.T) {
  fmt.Println("BEGINNING TEST RUN")
  
  p := MakeParser("blah.ts")
  
  fmt.Println("OUTPUT IS:")
  
  script := p.Parse()
  fmt.Println(script.String())
}