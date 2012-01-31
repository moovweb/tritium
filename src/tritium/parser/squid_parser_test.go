package parser

import (
	"testing"
	"fmt"
	//"io/ioutil"
)

func TestBlah(t *testing.T) {
	fmt.Println("BEGINNING TEST RUN")

	p := MakeParser("instructions.ts")
	q := MakeParser("functions.ts")

	script1 := p.Parse()
	fmt.Println("OUTPUT FOR INSTRUCTIONS:")
	fmt.Println(script1.String())

	script2 := q.Parse()
	fmt.Println("OUTPUT FOR FUNCTIONS:")
	fmt.Println(script2.String())
}
