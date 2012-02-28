package tokenizer

import (
	"testing"
	//"fmt"
	"io/ioutil"
)

func TestBlah(t *testing.T) {
	//fmt.Println("BEGINNING TEST RUN")

	src, _ := ioutil.ReadFile("blah.ts")

	//fmt.Println("SOURCE FILE IS:")
	//fmt.Println(string(src))

	tokenizer := MakeTokenizer(src)

	//fmt.Println("OUTPUT IS:")
	// fmt.Println(tokenizer.Lookahead.Inspect())

	for token := tokenizer.Pop(); token.Lexeme != EOF; token = tokenizer.Pop() {
		token.Inspect()
	}
}
