package parser

import (
	"testing"
	//"fmt"
	"io/ioutil"
)

func TestBlah(t *testing.T) {
	//fmt.Println("BEGINNING TEST RUN")

	a, _ := ioutil.ReadFile("instructions.ts")
	b, _ := ioutil.ReadFile("functions.ts")

	p := MakeParser(string(a), "instructions.ts", "")
	q := MakeParser(string(b), "instructions.ts", "")

	script1 := p.Parse()
	//fmt.Println("OUTPUT FOR INSTRUCTIONS:")
	script1.String()

	script2 := q.Parse()
	//fmt.Println("OUTPUT FOR FUNCTIONS:")
	script2.String()
}
