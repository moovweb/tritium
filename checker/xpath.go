package checker

import (
	"gokogiri/xpath"
	"butler/null"
	tp "tritium/proto"
)

var xpath_funcs[] string = []string{
	"copy_here",
	"copy_to",
	"fetch",
	"move_here",
	"move_to",
	"remove",
	"select",
	"$",
}

func (result *CheckResult) CheckXpath(script *tp.ScriptObject) {
	iterate(script, func(ins *tp.Instruction) {
		if *ins.Type == tp.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			// These all take xpath as the first param
			for _, xpath_func := range xpath_funcs {
				if name == xpath_func {
					if ins.Arguments != nil {
						test_xpath := null.GetString(ins.Arguments[0].Value)
						err := xpath.Check(test_xpath)
						if err != nil {
							result.AddXpathWarning(script, ins, err.Error())
						}
					}
				}
			}
		}
	})
}

