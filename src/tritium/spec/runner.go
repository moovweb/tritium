package spec

import(
	. "tritium"
	. "tritium/engine"
)

func RunTests() {
	eng := NewEngine()
	RunTest(eng, "blank_test")
}

func RunTest(eng Transformer, named string) bool {
	//eng.Run(transform, input, vars)
	println("Ran test!", named)
	return true
}