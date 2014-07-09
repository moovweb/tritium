package checker

import (
	"tritium/dependencies/butler/null"
	. "rubex"
	tp "tritium/proto"
	"tritium/constants"
)

func (result *CheckResult) CheckForSelectText(script *tp.ScriptObject) {
	tester := MustCompile("([^\\[\\(^]|^)(text|comment)\\(\\)([^=]|$)")
	iterate(script, func(ins *tp.Instruction) {
		if *ins.Type == constants.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			if name == "$" || name == "select" || name == "move_here" || name == "move_to" || name == "move" {

				for _, arg := range ins.Arguments {
					xpath := null.GetString(arg.Value)
					if tester.Match([]byte(xpath)) {
						result.AddScriptWarning(script, ins, "Shouldn't use comment()/text() in '"+xpath+"'")
					}
				}
			}
		}

	})
}

func (result *CheckResult) CheckForNotMisuse(script *tp.ScriptObject) {
	iterate(script, func(ins *tp.Instruction) {
		if *ins.Type == constants.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			if name == "match" || name == "with" {
				if ins.Arguments != nil {
					for _, arg := range ins.Arguments {
						if *arg.Type == constants.Instruction_FUNCTION_CALL {
							if null.GetString(arg.Value) == "not" {
								result.AddScriptWarning(script, ins, "Possible misuse of not()– remember not is the opposite of with!")
							}
						}
					}
				}

			}
		}

	})
}

func (result *CheckResult) CheckForLocationExport(script *tp.ScriptObject) {
	iterate(script, func(ins *tp.Instruction) {
		if *ins.Type == constants.Instruction_FUNCTION_CALL {
			name := null.GetString(ins.Value)
			if name == "export" {
				if ins.Arguments != nil {
					if null.GetString(ins.Arguments[0].Value) == "location" {
						result.AddScriptWarning(script, ins, "Incorrect export of location! Use \"Location\" not \"location\"")
					}
				}
			}
		}
	})
}
