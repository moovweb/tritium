package checker

import (
	"gokogiri/xpath"
	"butler/null"
	tp "tritium/proto"
)

func (result *CheckResult) CheckXpath(script *tp.ScriptObject) {
	iterate(script, func(ins *tp.Instruction) {
		if *ins.Type == tp.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			if name == "$" || name == "select" {
				if ins.Arguments != nil {
					test_xpath := null.GetString(ins.Arguments[0].Value)
					err := xpath.Check(test_xpath)
					if err != nil {
						result.AddXpathWarning(script, ins, name + "(\"" + test_xpath + "\") " + err.Error())
					}
				}
			}
		}
	})
}

