package whale

import (
	"strings"
	"os"
	"gokogiri/html"
	"gokogiri/xml"
	"gokogiri/xpath"
	"fmt"
	//log "log4go"
	tp "athena/src/athena/proto"
	"rubex/lib"
	//"css2xpath"
	"goconv"
)

func yield_(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	myYieldBlock := ctx.yieldBlock()
	ctx.Yields = ctx.Yields[:(len(ctx.Yields) - 1)]
	if ctx.yieldBlock() != nil {
		returnValue = ctx.runChildren(scope, myYieldBlock.Ins)
		if returnValue == nil {
			returnValue = "false"
		}
	} else {
		ctx.Log.Error("yield() failure")
	}
	ctx.Yields = append(ctx.Yields, myYieldBlock)
	return
}

func var_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	val := ctx.Env[args[0].(string)]
	returnValue = val
	if len(ins.Children) > 0 {
		ts := &Scope{Value: returnValue}
		ctx.runChildren(ts, ins)
		returnValue = ts.Value
		ctx.Env[args[0].(string)] = returnValue.(string)
	}
	return
}

func var_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = args[1].(string)
	ctx.Env[args[0].(string)] = returnValue.(string)

	if len(ins.Children) > 0 {
		ts := &Scope{Value: returnValue}
		ctx.runChildren(ts, ins)
		returnValue = ts.Value
		ctx.Env[args[0].(string)] = returnValue.(string)
	}
	return
}

func match_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	// Setup stacks
	against, ok := args[0].(string)
	if !ok {
		ctx.Log.Error("AH!")
	}
	ctx.MatchStack = append(ctx.MatchStack, against)
	ctx.MatchShouldContinue = append(ctx.MatchShouldContinue, true)

	// Run children
	ctx.runChildren(scope, ins)

	if ctx.matchShouldContinue() {
		returnValue = "false"
	} else {
		returnValue = "true"
	}

	// Clear
	ctx.MatchShouldContinue = ctx.MatchShouldContinue[:len(ctx.MatchShouldContinue)-1]
	ctx.MatchStack = ctx.MatchStack[:len(ctx.MatchStack)-1]
	return
}

func with_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.matchShouldContinue() {
		if args[0].(string) == ctx.matchTarget() {
			ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
			ctx.runChildren(scope, ins)
			returnValue = "true"
		}
	}
	return
}

func with_Regex(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.matchShouldContinue() {
		//println(matcher.MatchAgainst, matchWith)
		if (args[0].(*rubex.Regexp)).Match([]uint8(ctx.matchTarget())) {
			ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
			ctx.runChildren(scope, ins)
			returnValue = "true"
		}
	}
	return
}

func not_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.matchShouldContinue() {
		if args[0].(string) != ctx.matchTarget() {
			ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
			ctx.runChildren(scope, ins)
			returnValue = "true"
		}
	}
	return
}

func not_Regex(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.matchShouldContinue() {
		//println(matcher.MatchAgainst, matchWith)
		if !(args[0].(*rubex.Regexp)).Match([]uint8(ctx.matchTarget())) {
			ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
			ctx.runChildren(scope, ins)
			returnValue = "true"
		}
	}
	return
}

func else_(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.matchShouldContinue() {
		ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
		ctx.runChildren(scope, ins)
		returnValue = "true"
	}
	return
}

func regexp_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	pattern := args[0].(string) + "/" + args[1].(string)
	if r := ctx.RegexpCache[pattern]; r != nil {
		returnValue = r
	} else {
		mode := rubex.ONIG_OPTION_DEFAULT
		if strings.Index(args[1].(string), "i") >= 0 {
			mode = rubex.ONIG_OPTION_IGNORECASE
		}
		if strings.Index(args[1].(string), "m") >= 0 {
			mode = rubex.ONIG_OPTION_MULTILINE
		}
		var err os.Error
		r, err = rubex.NewRegexp(args[0].(string), mode)
		if err != nil {
			ctx.Log.Error("Invalid regexp")
		}
		ctx.RegexpCache[pattern] = r
		returnValue = r
	}
	return
}

func export_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	val := make([]string, 2)
	val[0] = args[0].(string)
	ts := &Scope{Value: ""}
	ctx.runChildren(ts, ins)
	val[1] = ts.Value.(string)
	ctx.Exports = append(ctx.Exports, val)
	return
}

func log_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ctx.Logs = append(ctx.Logs, args[0].(string))
	returnValue = args[0].(string)
	return
}

func concat_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = args[0].(string) + args[1].(string)
	return
}

func concat_Text_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = args[0].(string) + args[1].(string) + args[2].(string)
	return
}

func downcase_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = strings.ToLower(args[0].(string))
	return
}

func upcase_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = strings.ToUpper(args[0].(string))
	return
}

func set_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = args[0]
	return
}

func append_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = scope.Value.(string) + args[0].(string)
	return
}

func prepend_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = args[0].(string) + scope.Value.(string)
	return
}

func index_XmlNode(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = fmt.Sprintf("%d", scope.Index+1)
	return
}

func index_Node(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = fmt.Sprintf("%d", scope.Index+1)
	return
}

func replace_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ts := &Scope{Value: ""}
	ctx.runChildren(ts, ins)
	scope.Value = strings.Replace(scope.Value.(string), args[0].(string), ts.Value.(string), -1)
	return
}

func replace_Regexp(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	regexp := args[0].(*rubex.Regexp)
	scope.Value = regexp.GsubFunc(scope.Value.(string), func(match string, captures map[string]string) string {
		usesGlobal := (ctx.Env["use_global_replace_vars"] == "true")

		for name, capture := range captures {
			if usesGlobal {
				//println("setting $", name, "to", capture)
				ctx.Env[name] = capture
			}
			ctx.vars()[name] = capture
		}

		replacementScope := &Scope{Value: match}
		ctx.runChildren(replacementScope, ins)
		//println(ins.String())

		//println("Replacement:", replacementScope.Value.(string))
		return ctx.InnerReplacer.GsubFunc(replacementScope.Value.(string), func(_ string, numeric_captures map[string]string) string {
			capture := numeric_captures["1"]
			var val string
			if usesGlobal {
				val = ctx.Env[capture]
			} else {
				val = ctx.vars()[capture].(string)
			}
			return val
		})
	})
	returnValue = scope.Value
	return
}

func convert_encoding_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	input := scope.Value.(string)
	fromCode := args[0].(string)
	toCode := args[1].(string)
	ic, err := goconv.OpenWithFallback(fromCode, toCode, goconv.KEEP_UNRECOGNIZED)
	if err == nil {
		outputBytes, _ := ic.Conv([]byte(input))
		scope.Value = string(outputBytes)
		ic.Close()
	} else {
		scope.Value = input
	}
	returnValue = scope.Value
	return
}

func xml_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	doc, err := xml.ParseWithBuffer(scope.Value.([]byte), xml.DefaultEncodingBytes, nil, xml.DefaultParseOption, xml.DefaultEncodingBytes, ctx.OutputBuffer)
	if err != nil {
		ctx.Log.Error("xml err: %s", err.String())
		returnValue = "false"
		return
	}
	ns := &Scope{Value: doc}
	ctx.runChildren(ns, ins)
	output := doc.ToXml(nil)
	scope.Value = output
	returnValue = string(output)
	doc.Free()
	return
}

func html_doc_Text_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	inputEncoding := args[0].(string)
	inputEncodingBytes := []byte(inputEncoding)
	outputEncoding := args[1].(string)
	outputEncodingBytes := []byte(outputEncoding)
	input := scope.Value.([]byte)
	doc, err := html.ParseWithBuffer(input, inputEncodingBytes, nil, html.DefaultParseOption, outputEncodingBytes, ctx.OutputBuffer)
	if err != nil {
		ctx.Log.Error("html_doc err: %s", err.String())
		returnValue = "false"
		return
	}
	ns := &Scope{Value: doc}
	ctx.runChildren(ns, ins)
	if err := doc.SetMetaEncoding(outputEncoding); err != nil {
		//ctx.Log.Warn("executing html:" + err.String())
	}
	output := doc.ToHtml(nil)
	scope.Value = output
	returnValue = string(output)
	doc.Free()
	return
}

func html_fragment_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	inputEncoding := args[0].(string)
	inputEncodingBytes := []byte(inputEncoding)
	input := scope.Value.([]byte)
	fragment, err := html.ParseFragment(input, inputEncodingBytes, nil, html.DefaultParseOption, html.DefaultEncodingBytes, ctx.OutputBuffer)
	if err != nil {
		ctx.Log.Error("html_fragment err: %s", err.String())
		returnValue = "false"
		return
	}
	ns := &Scope{Value: fragment}
	ctx.runChildren(ns, ins)
	//output is always utf-8 because the content is internal to Doc.
	scope.Value = ns.Value.(*xml.DocumentFragment).Content()
	returnValue = scope.Value
	fragment.Node.MyDocument().Free()
	return
}

func select_Text(ctx *Ctx, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)

	xpathStr := args[0].(string)
	expr := ctx.XPathCache[xpathStr]
	if expr == nil {
		expr = xpath.Compile(xpathStr)
		if expr == nil {
			ctx.Log.Error("unable to compile xpath: %s", expr)
			returnValue = "false"
			return
		}
		ctx.XPathCache[xpathStr] = expr
	}
	nodes, err := node.Search(expr)
	if err != nil {
		ctx.Log.Error("select err: %s", err.String())
		returnValue = "false"
		return
	}

	if len(nodes) == 0 {
		returnValue = "0"
	} else {
		returnValue = fmt.Sprintf("%d", len(nodes))
	}

	for index, node := range nodes {
		if node != nil && node.IsValid() {
			t := node.NodeType()
			if t == xml.XML_ELEMENT_NODE {
				ns := &Scope{Value: node, Index: index}
				ctx.runChildren(ns, ins)
			} else if t == xml.XML_TEXT_NODE {
				ctx.Logs = append(ctx.Logs, "You have just selected a text() node... THIS IS A TERRIBLE IDEA. Please run 'moov check' and sort it out!")
			}
		}
	}
	return
}

/*


	case "css.Text":
		returnValue = css2xpath.Convert(args[0].(string), css2xpath.LOCAL)
	case "position.Text":
		returnValue = Positions[args[0].(string)]

	// SHARED NODE FUNCTIONS
	case "remove":
		node := scope.Value.(xml.Node)
		node.Remove()
	case "remove.Text": //Only for XMLNode
		node := scope.Value.(xml.Node)

		xpathStr := args[0].(string)
		expr := ctx.XPathCache[xpathStr]
		if expr == nil {
			expr = xpath.Compile(xpathStr)
			if expr == nil {
				ctx.Log.Error("unable to compile xpath: %s", expr)
				returnValue = "false"
				return
			}
			ctx.XPathCache[xpathStr] = expr
		}
		nodes, err := node.Search(expr)
		if err != nil {
			ctx.Log.Error("select err: %s", err.String())
			returnValue = "false"
			return
		}

		if len(nodes) == 0 {
			returnValue = "0"
		} else {
			returnValue = fmt.Sprintf("%d", len(nodes))
		}

		for _, node := range nodes {
			if node != nil {
				node.Remove()
			}
		}

	case "inner":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		node.SetInnerHtml(val)
		returnValue = val
	case "inner_text", "text":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		node.SetContent(val)
		returnValue = val
	case "value":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		attr, ok := node.(*xml.AttributeNode)
		if ok {
			attr.SetValue(val)
		}
		returnValue = val
	case "name":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Name()}
		ctx.runChildren(ts, ins)
		node.SetName(ts.Value.(string))
		returnValue = ts.Value.(string)
	case "dup":
		node := scope.Value.(xml.Node)
		newNode := node.Duplicate(1)
		if newNode.NodeType() == xml.XML_ELEMENT_NODE {
			MoveFunc(newNode, node, AFTER)
		}
		ns := &Scope{Value: newNode}
		ctx.runChildren(ns, ins)
	case "fetch.Text":
		node := scope.Value.(xml.Node)
		xpathStr := args[0].(string)
		expr := ctx.XPathCache[xpathStr]
		if expr == nil {
			expr = xpath.Compile(xpathStr)
			if expr == nil {
				ctx.Log.Error("unable to compile xpath: %s", expr)
				returnValue = "false"
				return
			}
			ctx.XPathCache[xpathStr] = expr
		}
		nodes, err := node.Search(expr)

		if len(nodes) > 0 {
			node := nodes[0]
			attr, ok := node.(*xml.AttributeNode)
			if ok {
				returnValue = attr.Content()
			} else {
				returnValue = node.String()
			}
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: returnValue}
			ctx.runChildren(ts, ins)
			returnValue = ts.Value
		}
	case "path":
		returnValue = scope.Value.(xml.Node).Path()

	// LIBXML FUNCTIONS
	case "insert_at.Position.Text":
		node := scope.Value.(xml.Node)
		position := args[0].(Position)
		tagName := args[1].(string)
		element := node.MyDocument().CreateElementNode(tagName)
		MoveFunc(element, node, position)
		ns := &Scope{Value: element}
		ctx.runChildren(ns, ins)
		returnValue = "true"
	case "inject_at.Position.Text":
		node := scope.Value.(xml.Node)
		position := args[0].(Position)
		input := args[1].(string)
		nodeSet := node.MyDocument().ParseHtmlFragment(input, node.Doc().GetEncoding())
		for _, newNode := range nodeSet {
			MoveFunc(newNode, node, position)
		}
		if len(nodeSet) > 0 {
			element, ok := nodeSet[0].(*xml.Element)
			if ok {
				// successfully ran scope
				returnValue = "true"
				ns := &Scope{Value: element}
				ctx.runChildren(ns, ins)
			}
		} else {
			returnValue = "false"
		}
	case "cdata.Text":
		elem, ok := scope.Value.(*xml.Element)
		if ok {
			elem.SetCDataContent(args[0].(string))
		}
	case "move.XMLNode.XMLNode.Position", "move.Node.Node.Position":
		MoveFunc(args[0].(xml.Node), args[1].(xml.Node), args[2].(Position))
	case "wrap_text_children.Text":
		returnValue = "false"
		child := scope.Value.(xml.Node).First()
		index := 0
		tagName := args[0].(string)
		for child != nil {
			text, ok := child.(*xml.Text)
			childNext := child.Next()
			if ok {
				returnValue = "true"
				wrap := text.Wrap(tagName)
				ns := &Scope{wrap, index}
				ctx.runChildren(ns, ins)
				index++
			}
			child = childNext
		}
	case "move_children_to.XMLNode.Position", "move_children_to.Node.Position":
		node := scope.Value.(xml.Node)
		element, ok := args[0].(*xml.Element)
		if ok {
			child := node.First()
			for child != nil {
				newChild := child.Next()
				if child != element {
					returnValue = "true"
					MoveFunc(child, element, args[1].(Position))
				}
				child = newChild
			}
		}
	case "equal.XMLNode.XMLNode", "equal.Node.Node":
		returnValue = "false"
		if args[0] == args[1] {
			returnValue = "true"
		}

	// ATTRIBUTE FUNCTIONS
	case "attribute.Text":
		node := scope.Value.(xml.Node)
		name := args[0].(string)
		if _, ok := node.(*xml.Element); ok {
			attr, _ := node.Attribute(name)
			as := &Scope{Value: attr}
			ctx.runChildren(as, ins)
			if attr.IsLinked() && (attr.Content() == "") {
				attr.Remove()
			}
			if !attr.IsLinked() {
				attr.Free()
			}
			returnValue = "true"
		}
	case "dump":
		returnValue = scope.Value.(xml.Node).String()

	default:
		ctx.Log.Error("Must implement " + fun.Name)
	}
*/
