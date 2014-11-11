package whale

import "tritium/protoface"

type builtInFunc func(*EngineContext, *Scope, protoface.Instruction, []interface{}) interface{}

var builtInFunctions map[string]builtInFunc

func init() {
	builtInFunctions = make(map[string]builtInFunc)

	// tritium/base_primitives
	builtInFunctions["tritium.var.Text"] = var_Text
	builtInFunctions["tritium.var.Text.Text"] = var_Text_Text
	builtInFunctions["tritium.time"] = time_
	builtInFunctions["tritium.match.Text"] = match_Text
	builtInFunctions["tritium.log.Text"] = log_Text
	builtInFunctions["tritium.deprecated.Text"] = deprecated_Text
	builtInFunctions["tritium.not.Text"] = not_Text
	builtInFunctions["tritium.not.Regexp"] = not_Regexp
	builtInFunctions["tritium.with.Text"] = with_Text
	builtInFunctions["tritium.with.Regexp"] = with_Regexp
	builtInFunctions["tritium.convert_encoding.Text.Text"] = convert_encoding_Text_Text
	builtInFunctions["tritium.guess_encoding"] = guess_encoding
	builtInFunctions["tritium.length.Text"] = length_Text
	builtInFunctions["tritium.else"] = else_
	builtInFunctions["tritium.yield"] = yield_
	builtInFunctions["tritium.this"] = this_
	builtInFunctions["tritium.regexp.Text.Text"] = regexp_Text_Text
	builtInFunctions["tritium.concat.Text.Text"] = concat_Text_Text
	builtInFunctions["tritium.export.Text"] = export_Text
	builtInFunctions["tritium.upcase.Text"] = upcase_Text
	builtInFunctions["tritium.downcase.Text"] = downcase_Text
	builtInFunctions["tritium.set.Text"] = set_Text
	builtInFunctions["tritium.replace.Regexp"] = replace_Regexp
	builtInFunctions["tritium.replace.Text"] = replace_Text
	builtInFunctions["tritium.prepend.Text"] = prepend_Text
	builtInFunctions["tritium.append.Text"] = append_Text
	builtInFunctions["tritium.capture.Regexp"] = capture_Regexp
	builtInFunctions["tritium.rewrite_to_upstream.Text.Text.Text"] = rewrite_to_upstream_Text_Text_Text
	builtInFunctions["tritium.rewrite_to_proxy.Text.Text"] = rewrite_to_proxy_Text_Text
	builtInFunctions["tritium.rewrite_cookie_domain.Text.Text.Text"] = rewrite_cookie_domain_Text_Text_Text
	builtInFunctions["tritium.rewrite_link.Text.Text"] = rewrite_to_proxy_Text_Text //TODO rewrite_link should be deprecated soon
	builtInFunctions["tritium.base64_v1.Text.Text"] = base64_v1_Text_Text

	// tritium/node_primitives
	builtInFunctions["tritium.index.Node"] = index_XMLNode
	builtInFunctions["tritium.index.XMLNode"] = index_XMLNode // not defined
	builtInFunctions["tritium.fetch.Text"] = fetch_Text
	//builtInFunctions["tritium.this"] = this_
	builtInFunctions["tritium.position.Text"] = position_Text
	builtInFunctions["tritium.select.Text"] = select_Text
	// builtInFunctions["tritium.must_select.Text"] = must_select_Text
	// builtInFunctions["tritium.must_select_v1.Text.Text"] = must_select_v1_Text_Text
	builtInFunctions["tritium.warn_v1.Text"] = warn_v1_Text
	builtInFunctions["tritium.env.Text"] = env_Text
	builtInFunctions["tritium.text"] = text
	builtInFunctions["tritium.move.Node.Node.Position"] = move_XMLNode_XMLNode_Position
	builtInFunctions["tritium.move.XMLNode.XMLNode.Position"] = move_XMLNode_XMLNode_Position // not defined
	builtInFunctions["tritium.dup"] = dup
	builtInFunctions["tritium.name"] = name
	builtInFunctions["tritium.remove.Text"] = remove_Text
	builtInFunctions["tritium.path"] = path
	builtInFunctions["tritium.insert_at.Position.Text"] = insert_at_Position_Text
	builtInFunctions["tritium.inject_at.Position.Text"] = inject_at_Position_Text
	builtInFunctions["tritium.inject_at_v1.Position.Text"] = inject_at_v1_Position_Text
	//builtInFunctions["tritium.set.Text"] = set_Text

	// tritium/libxml_primitives
	builtInFunctions["tritium.css.Text"] = css_Text
	builtInFunctions["tritium.xml"] = xml_Text_Text
	builtInFunctions["tritium.html_doc.Text.Text"] = html_doc_Text_Text
	builtInFunctions["tritium.html_fragment_doc.Text.Text"] = html_fragment_doc_Text_Text
	builtInFunctions["tritium.cdata.Text"] = cdata_Text
	builtInFunctions["tritium.remove"] = remove_
	builtInFunctions["tritium.inner"] = inner
	builtInFunctions["tritium.inner_text"] = text
	builtInFunctions["tritium.attribute.Text"] = attribute_Text
	builtInFunctions["tritium.equal.XMLNode.XMLNode"] = equal_XMLNode_XMLNode
	builtInFunctions["tritium.equal.Node.Node"] = equal_XMLNode_XMLNode
	builtInFunctions["tritium.wrap_text_children.Text"] = wrap_text_children_Text
	builtInFunctions["tritium.move_children_to.Node.Position"] = move_children_to_XMLNode_Position
	builtInFunctions["tritium.move_children_to.XMLNode.Position"] = move_children_to_XMLNode_Position // not defined
	//builtInFunctions["tritium.remove.Text"] = remove_Text
	builtInFunctions["tritium.value"] = value
	//builtInFunctions["tritium.name"] = name

	// url/url_primitives
	builtInFunctions["tritium.url_v1.Text"] = url_v1_Text
	builtInFunctions["tritium.comp_v1.Text"] = comp_v1_Text
	builtInFunctions["tritium.param_v1.Text"] = param_v1_Text
	builtInFunctions["tritium.remove_param_v1.Text"] = remove_param_v1_Text

	// jsonlib/jsonlib_primitives
	builtInFunctions["tritium.to_json_v1.Text"] = to_json_v1_Text
	builtInFunctions["tritium.json_to_xml_v1"] = json_to_xml_v1

	// core-rewriter/header_primitives
	builtInFunctions["tritium.parse_headers_v1"] = parse_headers_v1
	builtInFunctions["tritium.header_comp_v1.Text"] = header_comp_v1_Text

	// layers/layer_primitives
	builtInFunctions["tritium.active_layers"] = active_layers_
	builtInFunctions["tritium.query_layer.Text"] = query_layer_Text
}

func LookupBuiltIn(name string) builtInFunc {
	return builtInFunctions[name]
}
