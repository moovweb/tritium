package whale

import tp "athena/src/athena/proto"

type builtInFunc func(EngineContext, *Scope, *tp.Instruction, []interface{}) interface{}

var builtInFunctions map[string]builtInFunc

func init() {
	builtInFunctions = make(map[string]builtInFunc)

	builtInFunctions["this"] = this_
	builtInFunctions["yield"] = yield_
	builtInFunctions["var_Text"] = var_Text
	builtInFunctions["var_Text_Text"] = var_Text_Text
	builtInFunctions["match_Text"] = match_Text
	builtInFunctions["html_doc_Text_Text"] = html_doc_Text_Text
	builtInFunctions["xml"] = xml_Text_Text
	builtInFunctions["select.Text"] = select_Text
	builtInFunctions["export.Text"] = export_Text
	builtInFunctions["set.Text"] = set_Text
	builtInFunctions["concat.Text.Text"] = concat_Text_Text
	builtInFunctions["var.Text"] = var_Text
	builtInFunctions["var.Text.Text"] = var_Text_Text
	builtInFunctions["position.Text"] = position_Text
	builtInFunctions["insert_at.Position.Text"] = insert_at_Position_Text
	builtInFunctions["attribute.Text"] = attribute_Text
	builtInFunctions["value"] = value
	builtInFunctions["move.XMLNode.XMLNode.Position"] = move_XMLNode_XMLNode_Position
	builtInFunctions["move.Node.Node.Position"] = move_XMLNode_XMLNode_Position
	builtInFunctions["inner"] = inner
	builtInFunctions["html_doc.Text.Text"] = html_doc_Text_Text
	builtInFunctions["match.Text"] = match_Text
	builtInFunctions["with.Text"] = with_Text
	builtInFunctions["remove.Text"] = remove_Text
	builtInFunctions["remove"] = remove_

	builtInFunctions["log.Text"] = log_Text

	builtInFunctions["equal.XMLNode.XMLNode"] = equal_XMLNode_XMLNode
	builtInFunctions["equal.Node.Node"] = equal_XMLNode_XMLNode
	builtInFunctions["move_children_to.Node.Position"] = move_children_to_XMLNode_Position
	builtInFunctions["move_children_to.XMLNode.Position"] = move_children_to_XMLNode_Position

	builtInFunctions["name"] = name

	builtInFunctions["append.Text"] = append_Text
	builtInFunctions["html_fragment.Text"] = html_fragment_Text

	builtInFunctions["regexp.Text.Text"] = regexp_Text_Text
	builtInFunctions["replace.Regexp"] = replace_Regexp
	builtInFunctions["inner_text"] = inner_text
	builtInFunctions["text"] = text

	builtInFunctions["dup"] = dup
	builtInFunctions["with.Regexp"] = with_Regexp

	builtInFunctions["replace.Text"] = replace_Text

	builtInFunctions["fetch.Text"] = fetch_Text

	builtInFunctions["prepend.Text"] = prepend_Text

	builtInFunctions["deprecated.Text"] = deprecated_Text

	builtInFunctions["index.XMLNode"] = index_XMLNode
	builtInFunctions["index.Node"] = index_XMLNode

	builtInFunctions["cdata.Text"] = cdata_Text

	builtInFunctions["else"] = else_

	builtInFunctions["inject_at.Position.Text"] = inject_at_Position_Text

	builtInFunctions["not.Text"] = not_Text
	builtInFunctions["not.Regexp"] = not_Regexp
	builtInFunctions["path"] = path
	builtInFunctions["css.Text"] = css_Text
	builtInFunctions["wrap_text_children.Text"] = wrap_text_children_Text
}

func LookupBuiltIn(name string) builtInFunc {
	return builtInFunctions[name]
}
