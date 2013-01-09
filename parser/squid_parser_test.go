package parser

import (
	"testing"
	//"fmt"
	"io/ioutil"
	"path/filepath"
	"os"
)

func TestBlah(t *testing.T) {
	//fmt.Println("BEGINNING TEST RUN")
	wd, _ := os.Getwd()

	a, _ := ioutil.ReadFile("instructions.ts")
	b, _ := ioutil.ReadFile("functions.ts")

	p := MakeParser(string(a), filepath.Join(wd, "scripts", "instructions.ts"))
	q := MakeParser(string(b), filepath.Join(wd, "scripts", "instructions.ts"))

	script1 := p.Parse()
	//fmt.Println("OUTPUT FOR INSTRUCTIONS:")
	script1.String()

	script2 := q.Parse()
	//fmt.Println("OUTPUT FOR FUNCTIONS:")
	script2.String()
}
