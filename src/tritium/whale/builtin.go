package whale

import tp "athena/src/athena/proto"

type builtInFunc func(*Ctx, *Scope, *tp.Instruction, []interface{}) interface{}

var builtInFunctions map[string]builtInFunc

func init() {
	builtInFunctions = make(map[string]builtInFunc)

	builtInFunctions["yield"] = yield_
	builtInFunctions["var_Text"] = var_Text
	builtInFunctions["var_Text_Text"] = var_Text_Text
	builtInFunctions["match_Text"] = match_Text
	builtInFunctions["html_doc_Text_Text"] = html_doc_Text_Text
	builtInFunctions["xml"] = xml_Text_Text
	builtInFunctions["select.Text"] = select_Text
	builtInFunctions["export.Text"] = export_Text
	builtInFunctions["set.Text"] = set_Text
	builtInFunctions["remove"] = remove_
	builtInFunctions["concat.Text.Text"] = concat_Text_Text
	builtInFunctions["var.Text"] = var_Text
	builtInFunctions["var.Text.Text"] = var_Text_Text
	builtInFunctions["position.Text"] = position_Text
	builtInFunctions["insert_at.Position.Text"] = insert_at_Position_Text
	builtInFunctions["attribute.Text"] = attribute_Text
	builtInFunctions["value"] = value
}
