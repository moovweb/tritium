package checker

import (
	"tritium/dependencies/butler/null"
	"tritium/github.com/moovweb/gokogiri/xpath"
	tp "tritium/proto"
	"tritium/constants"
)

var xpath_funcs []string = []string{
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
		if *ins.Type == constants.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			// These all take xpath as the first param
			for _, xpath_func := range xpath_funcs {
				if name == xpath_func {
					if ins.Arguments != nil {
						if len(ins.Arguments) > 0 {
							test_xpath := null.GetString(ins.Arguments[0].Value)
							err := xpath.Check(test_xpath)
							if err != nil {
								result.AddXpathWarning(script, ins, err.Error())
							}
						}
					}
				}
			}
		}
	})
}
