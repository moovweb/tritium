package parser

import (
	"testing"
	//"fmt"
	"io/ioutil"
	"os"
)

func TestBlah(t *testing.T) {
	//fmt.Println("BEGINNING TEST RUN")

	wd, _ := os.Getwd()

	a, _ := ioutil.ReadFile("instructions.ts")
	b, _ := ioutil.ReadFile("functions.ts")

	p := MakeParser(string(a), wd, "scripts", "instructions.ts", false, false, make([]string, 0))
	q := MakeParser(string(b), wd, "scripts", "instructions.ts", false, false, make([]string, 0))

	script1 := p.Parse()
	//fmt.Println("OUTPUT FOR INSTRUCTIONS:")
	script1.String()

	script2 := q.Parse()
	//fmt.Println("OUTPUT FOR FUNCTIONS:")
	script2.String()
}
