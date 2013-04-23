package whale

import tp "tritium/proto"

type builtInFunc func(*EngineContext, *Scope, *tp.Instruction, []interface{}) interface{}

var builtInFunctions map[string]builtInFunc

func init() {
	builtInFunctions = make(map[string]builtInFunc)

	builtInFunctions["tritium.time"] = time_
	builtInFunctions["tritium.this"] = this_
	builtInFunctions["tritium.yield"] = yield_
	builtInFunctions["tritium.var_Text"] = var_Text
	builtInFunctions["tritium.var_Text_Text"] = var_Text_Text
	builtInFunctions["tritium.match_Text"] = match_Text
	builtInFunctions["tritium.html_doc_Text_Text"] = html_doc_Text_Text

	builtInFunctions["tritium.xml"] = xml_Text_Text
	builtInFunctions["tritium.select.Text"] = select_Text
	builtInFunctions["tritium.export.Text"] = export_Text
	builtInFunctions["tritium.set.Text"] = set_Text
	builtInFunctions["tritium.concat.Text.Text"] = concat_Text_Text
	builtInFunctions["tritium.var.Text"] = var_Text
	builtInFunctions["tritium.var.Text.Text"] = var_Text_Text
	builtInFunctions["tritium.position.Text"] = position_Text
	builtInFunctions["tritium.insert_at.Position.Text"] = insert_at_Position_Text
	builtInFunctions["tritium.attribute.Text"] = attribute_Text
	builtInFunctions["tritium.value"] = value
	builtInFunctions["tritium.move.XMLNode.XMLNode.Position"] = move_XMLNode_XMLNode_Position
	builtInFunctions["tritium.move.Node.Node.Position"] = move_XMLNode_XMLNode_Position
	builtInFunctions["tritium.inner"] = inner
	builtInFunctions["tritium.html_doc.Text.Text"] = html_doc_Text_Text
	builtInFunctions["tritium.match.Text"] = match_Text
	builtInFunctions["tritium.with.Text"] = with_Text
	builtInFunctions["tritium.remove.Text"] = remove_Text
	builtInFunctions["tritium.remove"] = remove_

	builtInFunctions["tritium.log.Text"] = log_Text

	builtInFunctions["tritium.equal.XMLNode.XMLNode"] = equal_XMLNode_XMLNode
	builtInFunctions["tritium.equal.Node.Node"] = equal_XMLNode_XMLNode
	builtInFunctions["tritium.move_children_to.Node.Position"] = move_children_to_XMLNode_Position
	builtInFunctions["tritium.move_children_to.XMLNode.Position"] = move_children_to_XMLNode_Position

	builtInFunctions["tritium.name"] = name

	builtInFunctions["tritium.append.Text"] = append_Text
	builtInFunctions["tritium.html_fragment_doc.Text.Text"] = html_fragment_doc_Text_Text

	builtInFunctions["tritium.regexp.Text.Text"] = regexp_Text_Text
	builtInFunctions["tritium.replace.Regexp"] = replace_Regexp
	builtInFunctions["tritium.capture.Regexp"] = capture_Regexp
	builtInFunctions["tritium.inner_text"] = text
	builtInFunctions["tritium.text"] = text

	builtInFunctions["tritium.dup"] = dup
	builtInFunctions["tritium.with.Regexp"] = with_Regexp

	builtInFunctions["tritium.replace.Text"] = replace_Text

	builtInFunctions["tritium.fetch.Text"] = fetch_Text

	builtInFunctions["tritium.prepend.Text"] = prepend_Text

	builtInFunctions["tritium.deprecated.Text"] = deprecated_Text

	builtInFunctions["tritium.index.XMLNode"] = index_XMLNode
	builtInFunctions["tritium.index.Node"] = index_XMLNode

	builtInFunctions["tritium.cdata.Text"] = cdata_Text

	builtInFunctions["tritium.else"] = else_

	builtInFunctions["tritium.inject_at.Position.Text"] = inject_at_Position_Text

	builtInFunctions["tritium.not.Text"] = not_Text
	builtInFunctions["tritium.not.Regexp"] = not_Regexp
	builtInFunctions["tritium.path"] = path
	builtInFunctions["tritium.css.Text"] = css_Text
	builtInFunctions["tritium.wrap_text_children.Text"] = wrap_text_children_Text
	builtInFunctions["tritium.convert_encoding.Text.Text"] = convert_encoding_Text_Text
	builtInFunctions["tritium.downcase.Text"] = downcase_Text
	builtInFunctions["tritium.upcase.Text"] = upcase_Text
	builtInFunctions["tritium.guess_encoding"] = guess_encoding
	builtInFunctions["tritium.length.Text"] = length_Text
	builtInFunctions["tritium.rewrite_to_upstream.Text.Text.Text"] = rewrite_to_upstream_Text_Text_Text
	builtInFunctions["tritium.rewrite_to_proxy.Text.Text"] = rewrite_to_proxy_Text_Text
	builtInFunctions["tritium.rewrite_cookie_domain.Text.Text.Text"] = rewrite_cookie_domain_Text_Text_Text

	//TODO rewrite_link should be deprecated soon
	builtInFunctions["tritium.rewrite_link.Text.Text"] = rewrite_to_proxy_Text_Text

	builtInFunctions["tritium.url_v1.Text"] = url_v1_Text
	builtInFunctions["tritium.comp_v1.Text"] = comp_v1_Text
	builtInFunctions["tritium.param_v1.Text"] = param_v1_Text
	builtInFunctions["tritium.remove_param_v1.Text"] = remove_param_v1_Text

	builtInFunctions["tritium.to_json_v1.Text"] = to_json_v1_Text
	builtInFunctions["tritium.json_to_xml_v1"] = json_to_xml_v1

	builtInFunctions["tritium.base64_v1.Text.Text"] = base64_v1_Text_Text

	builtInFunctions["tritium.parse_headers_v1"] = parse_headers_v1
	builtInFunctions["tritium.header_comp_v1.Text"] = header_comp_v1_Text
}

func LookupBuiltIn(name string) builtInFunc {
	return builtInFunctions[name]
}
