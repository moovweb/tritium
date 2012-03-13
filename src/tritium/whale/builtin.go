package shark

import tp "athena/src/athena/proto"

type builtInFunc func(*Ctx, *Scope, *tp.Instruction, []interface{}) interface{}

var builtInFunctions = make(map[string]builtInFunc)

func initBuiltInFunctions() {
	builtInFunctions["yield"] = yield_
	builtInFunctions["var_Text"] = var_Text
	builtInFunctions["var_Text_Text"] = var_Text_Text
	builtInFunctions["match_Text"] = match_Text
	builtInFunctions["html_doc_Text_Text"] = html_doc_Text_Text
}
