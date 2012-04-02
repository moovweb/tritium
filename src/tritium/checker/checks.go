package checker

import(
	tp "athena/src/athena/proto"
	proto "code.google.com/p/goprotobuf/proto"
	//. "strings"
	. "rubex"
)

func (result *CheckResult) CheckForSelectText(script *tp.ScriptObject) {
	tester := MustCompile("([^\\[\\(^]|^)(text|comment)\\(\\)([^=]|$)")
	iterate(script, func (ins *tp.Instruction) {
		if *ins.Type == tp.Instruction_FUNCTION_CALL {
			name := proto.GetString(ins.Value)
			if name == "$" || name == "select" || name == "move_here" || name == "move_to" || name == "move" {

				for _, arg := range(ins.Arguments) {				 
					xpath := proto.GetString(arg.Value)
					if tester.Match([]byte(xpath)) {
						result.AddWarning(script, ins, "Shouldn't use comment()/text() in '" + xpath + "'")
					}
				}
			}
		}
		
	})
}

func (result *CheckResult) CheckForNotMisuse(script *tp.ScriptObject) {
	iterate(script, func (ins *tp.Instruction) {
		if *ins.Type == tp.Instruction_FUNCTION_CALL {
			name := proto.GetString(ins.Value)
			if name == "match" || name == "with" {
				if ins.Arguments != nil {
					for _, arg := range(ins.Arguments) {
						if *arg.Type == tp.Instruction_FUNCTION_CALL {
							if proto.GetString(arg.Value) == "not" {
								result.AddWarning(script, ins, "Possible misuse of not()– remember not is the opposite of with!")
							}
						}
					}
				}
				
			}
		}
		
	})
}
