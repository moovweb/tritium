package whale

import (
	"fmt"
	"goconv"
	"gokogiri/css"
	"gokogiri/html"
	"gokogiri/xml"
	"icu4go"
	"net/url"
	"rubex"
	"strconv"
	"strings"
	"time"
	tp "tritium/proto"
	"unicode/utf8"
)

//The string value of me
func this_(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = scope.Value
	return
}

func yield_(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	myYieldBlock := ctx.PopYieldBlock()
	if ctx.HasYieldBlock() {
		ctx.Filename = myYieldBlock.Filename
		for _, child := range myYieldBlock.Ins.Children {
			returnValue = ctx.RunInstruction(scope, child)
		}

		if returnValue == nil {
			returnValue = "false"
		}
	} else {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "yield(): %s", "no block")
	}
	ctx.PushYieldBlock(myYieldBlock)
	return
}

func var_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	val := ctx.GetEnv(args[0].(string))
	returnValue = val
	if len(ins.Children) > 0 {
		ts := &Scope{Value: returnValue}
		for _, child := range ins.Children {
			ctx.RunInstruction(ts, child)
		}
		returnValue = ts.Value
		ctx.SetEnv(args[0].(string), returnValue.(string))
	}
	return
}

func var_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ctx.SetEnv(args[0].(string), args[1].(string))
	returnValue = args[1].(string)
	if len(ins.Children) > 0 {
		ts := &Scope{Value: returnValue}
		for _, child := range ins.Children {
			ctx.RunInstruction(ts, child)
		}
		returnValue = ts.Value
		ctx.SetEnv(args[0].(string), returnValue.(string))
	}
	return
}

func match_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	// Setup stacks
	against := args[0].(string)
	ctx.PushMatchStack(against)
	ctx.PushShouldContinueStack(true)

	// Run children
	for _, child := range ins.Children {
		ctx.RunInstruction(scope, child)
	}
	if ctx.ShouldContinue() {
		returnValue = "false"
	} else {
		returnValue = "true"
	}

	// Clear
	ctx.PopShouldContinueStack()
	ctx.PopMatchStack()
	return
}

func with_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.ShouldContinue() {
		if args[0].(string) == ctx.MatchTarget() {
			for _, child := range ins.Children {
				ctx.RunInstruction(scope, child)
			}
			ctx.SetShouldContinue(false)
			returnValue = "true"
		}
	}
	return
}

func with_Regexp(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.ShouldContinue() {
		//println(matcher.MatchAgainst, matchWith)
		if (args[0].(*rubex.Regexp)).Match([]uint8(ctx.MatchTarget())) {
			for _, child := range ins.Children {
				ctx.RunInstruction(scope, child)
			}
			ctx.SetShouldContinue(false)
			returnValue = "true"
		}
	}
	return
}

func not_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.ShouldContinue() {
		if args[0].(string) != ctx.MatchTarget() {
			ctx.SetShouldContinue(false)
			for _, child := range ins.Children {
				ctx.RunInstruction(scope, child)
			}
			returnValue = "true"
		}
	}
	return
}

func not_Regexp(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.ShouldContinue() {
		//println(matcher.MatchAgainst, matchWith)
		if !(args[0].(*rubex.Regexp)).Match([]uint8(ctx.MatchTarget())) {
			ctx.SetShouldContinue(false)
			for _, child := range ins.Children {
				ctx.RunInstruction(scope, child)
			}
			returnValue = "true"
		}
	}
	return
}

func else_(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	if ctx.ShouldContinue() {
		ctx.SetShouldContinue(false)
		for _, child := range ins.Children {
			ctx.RunInstruction(scope, child)
		}
		returnValue = "true"
	}
	return
}

func regexp_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	pattern := args[0].(string)
	options := args[1].(string)
	returnValue = ctx.GetRegexp(pattern, options)
	return
}

func export_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	val := make([]string, 2)
	val[0] = args[0].(string)
	ts := &Scope{Value: ""}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	val[1] = ts.Value.(string)
	ctx.AddExport(val)
	return
}

func log_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ctx.AddLog(args[0].(string))
	returnValue = args[0].(string)
	return
}

func concat_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = args[0].(string) + args[1].(string)
	return
}

func concat_Text_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = args[0].(string) + args[1].(string) + args[2].(string)
	return
}

func downcase_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = strings.ToLower(args[0].(string))
	return
}

func upcase_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = strings.ToUpper(args[0].(string))
	return
}

func set_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = args[0].(string)
	return
}

func append_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = scope.Value.(string) + args[0].(string)
	return
}

func prepend_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	scope.Value = args[0].(string) + scope.Value.(string)
	return
}

func index_XMLNode(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = fmt.Sprintf("%d", scope.Index+1)
	return
}

func index_Node(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = fmt.Sprintf("%d", scope.Index+1)
	return
}

func replace_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ts := &Scope{Value: ""}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	scope.Value = strings.Replace(scope.Value.(string), args[0].(string), ts.Value.(string), -1)
	return
}

func replace_Regexp(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	regexp := args[0].(*rubex.Regexp)
	scope.Value = regexp.GsubFunc(scope.Value.(string), func(match string, captures map[string]string) string {
		usesGlobal := (ctx.GetEnv("use_global_replace_vars") == "true")

		for name, capture := range captures {
			if usesGlobal {
				//println("setting $", name, "to", capture)
				ctx.SetEnv(name, capture)
			}
			ctx.SetVar(name, capture)
		}

		replacementScope := &Scope{Value: match}
		for _, child := range ins.Children {
			ctx.RunInstruction(replacementScope, child)
		}
		//println(ins.String())

		//println("Replacement:", replacementScope.Value.(string))
		return ctx.GetInnerReplacer().GsubFunc(replacementScope.Value.(string), func(_ string, numeric_captures map[string]string) string {
			capture := numeric_captures["1"]
			var val string
			if usesGlobal {
				val = ctx.GetEnv(capture)
			} else {
				val = ctx.GetVar(capture).(string)
			}
			return val
		})
	})
	returnValue = scope.Value
	return
}

func capture_Regexp(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	regexp := args[0].(*rubex.Regexp)
	scope.Value = regexp.GsubFunc(scope.Value.(string), func(match string, captures map[string]string) string {
		usesGlobal := (ctx.GetEnv("use_global_replace_vars") == "true")

		for name, capture := range captures {
			if usesGlobal {
				ctx.SetEnv(name, capture)
			}
			ctx.SetVar(name, capture)
		}

		replacementScope := &Scope{Value: match}
		for _, child := range ins.Children {
			ctx.RunInstruction(replacementScope, child)
		}

		return replacementScope.Value.(string)
	})
	returnValue = scope.Value
	return
}

func convert_encoding_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
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

func xml_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	input := scope.Value.(string)
	doc, err := xml.Parse([]byte(input), nil, nil, xml.DefaultParseOption, nil)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "xml err: %s", err.Error())
		returnValue = "false"
		return
	}

	if doc == nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "xml err: %s", "nil doc")
		returnValue = "false"
		return
	}
	ctx.AddMemoryObject(doc)
	ctx.CurrentDoc = doc
	ns := &Scope{Value: doc}

	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}

	scope.Value = doc.String()
	ctx.CurrentDoc = nil
	returnValue = scope.Value
	//doc.Free()
	return
}

func html_doc_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	inputEncoding := args[0].(string)
	inputEncodingBytes := []byte(inputEncoding)
	outputEncoding := args[1].(string)
	outputEncodingBytes := []byte(outputEncoding)
	input := scope.Value.(string)
	doc, err := html.Parse([]byte(input), inputEncodingBytes, nil, html.DefaultParseOption, outputEncodingBytes)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "html_doc err: %s", err.Error())
		returnValue = "false"
		return
	}
	if doc == nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "html_doc err: %s", "nil doc")
		returnValue = "false"
		return
	}
	ctx.AddMemoryObject(doc)
	ctx.CurrentDoc = doc
	ns := &Scope{Value: doc}

	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}
	if err := doc.SetMetaEncoding(outputEncoding); err != nil {
		//ctx.Log.Warn("executing html:" + err.Error())
	}
	scope.Value = doc.String()
	ctx.CurrentDoc = nil
	returnValue = scope.Value
	//doc.Free()
	return
}

func url_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	urlStr := args[0].(string)
	urlParsed, err := url.Parse(urlStr)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "url parse err: %s", err.Error())
		returnValue = "false"
		return
	}
	ns := &Scope{Value: urlParsed}
	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}

	// return the modified URL string (allow strings as well?)
	if urlVal, isURL := ns.Value.(*url.URL); isURL {
		returnValue = urlVal.String()
	} else if urlStr, isStr := ns.Value.(string); isStr {
		returnValue = urlStr
	}
	return
}

func comp_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	component := args[0].(string)
	u := scope.Value.(*url.URL)
	ns := &Scope{}
	switch(component) {
	case("scheme"):
		ns.Value = u.Scheme
	case("host"):
		ns.Value = u.Host
	case("path"):
		ns.Value = u.Path
	case("fragment"):
		ns.Value = u.Fragment
	case("userinfo"):
		if u.User != nil {
			ns.Value = u.User.String()
		} else {
			ns.Value = ""
		}
	}
	if ns.Value != nil {
		for _, child := range ins.Children {
			ctx.RunInstruction(ns, child)
		}

		// write value back to URL (as long as it's a string)
		if newVal, ok := ns.Value.(string); ok {
			switch(component) {
			case("scheme"):
				u.Scheme = newVal
			case("host"):
				u.Host = newVal
			case("path"):
				u.Path = newVal
			case("fragment"):
				u.Fragment = newVal
			case("userinfo"):
				if newVal == "" {
					// remove the userinfo
					u.User = nil
				} else {
					info := strings.Split(newVal, ":")
					newUserinfo := url.User(info[0])
					if len(info) == 2 {
						newUserinfo = url.UserPassword(info[0], info[1])
					}
					u.User = newUserinfo
				}
			}

			returnValue = newVal
		}
	}
	return
}

func param_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	parameter := args[0].(string)
	u := scope.Value.(*url.URL)
	params := u.Query()

	ns := &Scope{Value: params.Get(parameter)}
	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}

	// if child instructions result in a string:
	if newVal, ok := ns.Value.(string); ok {
		// write the ns.Value back to params
		params.Set(parameter, newVal)
		// write params back to u.RawQuery
		u.RawQuery = params.Encode()

		returnValue = newVal
	}
	return
}

func remove_param_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	parameter := args[0].(string)
	u := scope.Value.(*url.URL)
	params := u.Query()

	if params.Get(parameter) != "" {
		params.Del(parameter)
		// write params back to u.RawQuery
		u.RawQuery = params.Encode()
		returnValue = "true"
	} else {
		returnValue = "false"
	}
	return
}

func html_fragment_doc_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	inputEncoding := args[0].(string)
	inputEncodingBytes := []byte(inputEncoding)
	outputEncoding := args[1].(string)
	outputEncodingBytes := []byte(outputEncoding)
	input := scope.Value.(string)
	fragment, err := html.ParseFragment([]byte(input), inputEncodingBytes, nil, html.DefaultParseOption, outputEncodingBytes)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "html_fragment err: %s", err.Error())
		returnValue = "false"
		return
	}
	if fragment == nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "html_fragment err: %s", "nil fragment")
		returnValue = "false"
		return
	}
	ctx.AddMemoryObject(fragment.Node.MyDocument())
	ctx.CurrentDoc = fragment
	ns := &Scope{Value: fragment}
	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}
	//output is always utf-8 because the content is internal to Doc.
	scope.Value = ns.Value.(*xml.DocumentFragment).String()
	ctx.CurrentDoc = nil
	returnValue = scope.Value
	//fragment.Node.MyDocument().Free()
	return
}

func select_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	xpathStr := args[0].(string)
	expr := ctx.GetXpathExpr(xpathStr)
	if expr == nil {
		returnValue = "false"
		return
	}
	nodes, err := node.SearchByDeadline(expr, &ctx.Deadline)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "select err: %s", err.Error())
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
			if t == xml.XML_DOCUMENT_NODE || t == xml.XML_HTML_DOCUMENT_NODE {
				node = node.MyDocument().Root()
				t = node.NodeType()
			}
			if t == xml.XML_ELEMENT_NODE {
				ns := &Scope{Value: node, Index: index}
				for _, child := range ins.Children {
					ctx.RunInstruction(ns, child)
				}
			} else if t == xml.XML_TEXT_NODE {
				ctx.AddLog("You have just selected a text() node... THIS IS A TERRIBLE IDEA. Please run 'moov check' and sort it out!")
			}
		}
	}
	return
}

func remove_(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	node.Remove()
	return
}

func remove_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)

	xpathStr := args[0].(string)
	expr := ctx.GetXpathExpr(xpathStr)
	if expr == nil {
		returnValue = "0"
		return
	}
	nodes, err := node.SearchByDeadline(expr, &ctx.Deadline)
	if err != nil {
		ctx.Debugger.LogErrorMessage(ctx.MessagePath, "select err: %s", err.Error())
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

	return
}

func position_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = Positions[args[0].(string)]
	return
}

func insert_at_Position_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	position := args[0].(Position)
	tagName := args[1].(string)
	element := node.MyDocument().CreateElementNode(tagName)
	MoveFunc(element, node, position)
	ns := &Scope{Value: element}
	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}
	returnValue = "true"
	return
}

func attribute_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	name := args[0].(string)
	attr := node.Attribute(name)
	if attr == nil {
		node.SetAttr(name, "")
		attr = node.Attribute(name)
	}
	if attr != nil {
		as := &Scope{Value: attr}
		for _, child := range ins.Children {
			ctx.RunInstruction(as, child)
		}
		if attr.Value() == "" {
			attr.Remove()
		}
		returnValue = "true"
	}
	return
}

func value(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	ts := &Scope{Value: node.Content()}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}

	val := ts.Value.(string)
	if attr, ok := node.(*xml.AttributeNode); ok {
		attr.SetValue(val)
	}
	returnValue = val
	return
}

func move_XMLNode_XMLNode_Position(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	MoveFunc(args[0].(xml.Node), args[1].(xml.Node), args[2].(Position))
	return
}

func inner(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	ts := &Scope{Value: node.InnerHtml()}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	val := ts.Value.(string)
	node.SetInnerHtml(val)
	returnValue = val
	return
}

func equal_XMLNode_XMLNode(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	node1 := args[0].(xml.Node)
	node2 := args[1].(xml.Node)
	if node1.NodePtr() == node2.NodePtr() {
		returnValue = "true"
	}
	return
}

func move_children_to_XMLNode_Position(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	destNode := args[0].(xml.Node)
	if destNode.NodeType() == xml.XML_ELEMENT_NODE {
		child := node.FirstChild()
		for child != nil {
			nextChild := child.NextSibling()
			if child.NodePtr() != destNode.NodePtr() {
				returnValue = "true"
				MoveFunc(child, destNode, args[1].(Position))
			}
			child = nextChild
		}
	}
	return
}

func name(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	ts := &Scope{Value: node.Name()}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	node.SetName(ts.Value.(string))
	returnValue = ts.Value.(string)
	return
}

func text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	ts := &Scope{Value: node.Content()}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	val := ts.Value.(string)
	node.SetContent(val)
	returnValue = val
	return
}

func inner_text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	ts := &Scope{Value: node.Content()}
	for _, child := range ins.Children {
		ctx.RunInstruction(ts, child)
	}
	val := ts.Value.(string)
	node.SetInnerHtml(val)
	returnValue = val
	return
}

func dup(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	newNode := node.Duplicate(1)
	if newNode.NodeType() == xml.XML_ELEMENT_NODE {
		MoveFunc(newNode, node, AFTER)
	}
	ns := &Scope{Value: newNode}
	for _, child := range ins.Children {
		ctx.RunInstruction(ns, child)
	}
	return
}

func fetch_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	xpathStr := args[0].(string)
	expr := ctx.GetXpathExpr(xpathStr)
	if expr == nil {
		returnValue = "false"
		return
	}

	nodes, err := node.SearchByDeadline(expr, &ctx.Deadline)
	if err == nil && len(nodes) > 0 {
		node := nodes[0]
		returnValue = node.String()
	}
	if returnValue == nil {
		returnValue = ""
	}
	if len(ins.Children) > 0 {
		ts := &Scope{Value: returnValue}
		for _, child := range ins.Children {
			ctx.RunInstruction(ts, child)
		}
		returnValue = ts.Value
	}
	return
}

func deprecated_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	ctx.Debugger.LogTritiumWarnMessage(ctx.MessagePath, "deprecated: %s", args[0].(string))
	return
}

func cdata_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	if node.NodeType() == xml.XML_ELEMENT_NODE {
		content := args[0].(string)
		cdata := node.MyDocument().CreateCDataNode(content)
		first := node.FirstChild()
		if first != nil {
			node.ResetChildren()
		}
		node.AddChild(cdata)
	}
	return
}

func inject_at_Position_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	node := scope.Value.(xml.Node)
	position := args[0].(Position)
	input := args[1].(string)

	nodes, err := node.Coerce(input)
	if err == nil {
		for _, n := range nodes {
			MoveFunc(n, node, position)
		}
	}
	if len(nodes) > 0 {
		first := nodes[0]
		if first.NodeType() == xml.XML_ELEMENT_NODE {
			// successfully ran scope
			returnValue = "true"
			ns := &Scope{Value: first}
			for _, child := range ins.Children {
				ctx.RunInstruction(ns, child)
			}
		}
	} else {
		returnValue = "false"
	}
	return
}

func path(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = scope.Value.(xml.Node).Path()
	return
}

func css_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = css.Convert(args[0].(string), css.LOCAL)
	return
}

func wrap_text_children_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = "false"
	node := scope.Value.(xml.Node)
	if textNodes, err := node.SearchByDeadline("./text()", &ctx.Deadline); err == nil {
		tagName := args[0].(string)
		tag := fmt.Sprintf("<%s />", tagName)
		for index, textNode := range textNodes {
			textNode.Wrap(tag)
			parent := textNode.Parent()
			if parent == nil {
				continue
			}
			ns := &Scope{parent, index}
			for _, child := range ins.Children {
				ctx.RunInstruction(ns, child)
			}
		}
	}
	return
}

func guess_encoding(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = ""
	input := scope.Value.(string)

	//get the content type from the html header if exisits
	reg := ctx.GetHeaderContentTypeRegex()
	//
	matches := reg.FindStringSubmatch(input)
	contentTypeInHtmlHeader := ""
	if len(matches) == 2 {
		contentTypeInHtmlHeader = matches[1]
	}
	contentTypeInResponseHeader := ctx.GetEnv("content_type")

	charsetInHtmlHeader := GetCharsetFromContentType(contentTypeInHtmlHeader)
	charsetInResponseHeader := GetCharsetFromContentType(contentTypeInResponseHeader)
	ctx.SetEnv("charset_in_html_header", charsetInHtmlHeader)
	ctx.SetEnv("charset_in_response_header", charsetInResponseHeader)
	//both the html response header and the meta tag point to the same charset
	//we should trust it
	if len(charsetInHtmlHeader) > 0 && charsetInHtmlHeader == charsetInResponseHeader {
		returnValue = charsetInHtmlHeader
		return
	}

	// Allow the user to disable charset detection
	if ctx.GetEnv("disable_charset_detection") == "true" {
		if len(charsetInHtmlHeader) > 0 {
			returnValue = charsetInHtmlHeader
		}
		return charsetInResponseHeader
	}

	//use icu to detect if they differ
	cd, err := icu4go.NewCharsetDetector()
	charsetDetected := ""
	if err == nil {
		ctx.AddMemoryObject(cd)
		charsetDetected = cd.GuessCharset([]byte(input))
		charsetDetected = strings.ToLower(charsetDetected)
		ctx.SetEnv("charset_detected", charsetDetected)
		//cd.Free()
	}
	var charsetDetermined string
	if len(charsetDetected) > 0 {
		charsetDetermined = charsetDetected
	} else if len(charsetInHtmlHeader) > 0 {
		charsetDetermined = charsetInHtmlHeader
	} else {
		charsetDetermined = charsetInResponseHeader
	}
	ctx.SetEnv("charset_determined", charsetDetermined)
	returnValue = charsetDetermined
	return
}

func length_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	input := args[0].(string)
	var length int
	if ctx.GetEnv("charset_determined") == "utf-8" || ctx.GetEnv("charset_determined") == "utf8" {
		length = utf8.RuneCountInString(input)
	} else {
		length = len(input)
	}
	returnValue = strconv.Itoa(length)
	return
}

func time_(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	start := time.Now()
	for _, child := range ins.Children {
		ctx.RunInstruction(scope, child)
	}
	duration := time.Since(start)
	// I only seem to get 6 significant digits, so output in microseconds
	returnValue = strconv.FormatInt(duration.Nanoseconds()/1000, 10) + "µs"
	return
}

func rewrite_to_upstream_Text_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	//rewrite_type := args[0].(string)
	secure := args[1].(string)
	catchAll := args[2].(string)
	host := strings.ToLower(scope.Value.(string))

	//strip off catchAll
	if len(catchAll) > 0 && strings.HasSuffix(host, catchAll) {
		host = host[:len(host)-len(catchAll)]
		ctx.SetEnv("__catch_all_enabled__", "true")
	}

	key, append_proto, append_slashes := GenerateHostMapKey(host, secure)

	rrules := ctx.Rrules
	returnValue = "false"
	if len(rrules) > 0 {
		for _, rr := range rrules {
			if *rr.Direction == tp.RewriteRule_UPSTREAM_TO_PROXY {
				continue
			}
			if key == *rr.Proxy {
				scope.Value = ReformatHostMapValue(*rr.Upstream, append_proto, append_slashes)
				returnValue = "true"
				break
			}
		}
	}
	return
}

func rewrite_to_proxy_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	secure := args[0].(string)
	catchAll := args[1].(string)
	link := strings.ToLower(scope.Value.(string))
	key, append_proto, append_slashes := GenerateHostMapKey(link, secure)
	rrules := ctx.Rrules
	returnValue = "false"
	if len(rrules) > 0 {
		for _, rr := range rrules {
			if *rr.Direction == tp.RewriteRule_PROXY_TO_UPSTREAM {
				continue
			}
			if key == *rr.Upstream {
				newLink := ReformatHostMapValue(*rr.Proxy, append_proto, append_slashes)
				catchAllEnabled := ctx.GetEnv("__catch_all_enabled__")
				if catchAllEnabled == "true" {
					newLink = newLink + catchAll
				}
				scope.Value = newLink
				returnValue = "true"
				break
			}
		}
	}
	return
}

func rewrite_cookie_domain_Text_Text_Text(ctx *EngineContext, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	host := args[0].(string)
	secure := args[1].(string)
	catchAll := args[2].(string)
	domain := strings.ToLower(scope.Value.(string))
	key, _, _ := GenerateHostMapKey(host, secure)
	rrules := ctx.Rrules
	returnValue = "false"
	if len(rrules) > 0 {
		newDomain := domain
		found := false
		for _, rr := range rrules {
			if *rr.Direction == tp.RewriteRule_PROXY_TO_UPSTREAM {
				continue
			}
			if key == *rr.Upstream {
				newDomain = *rr.CookieDomain
				returnValue = "true"
				found = true
				break
			}
		}
		if found {
			catchAllEnabled := ctx.GetEnv("__catch_all_enabled__")
			if IsDomainCovered(domain, newDomain) { //the new cookie domain is NOT covered by the existing domain
				if !strings.HasPrefix(domain, ".") { //should we do it here???? //TODO
					newDomain = "." + domain
				} else {
					newDomain = domain
				}
			}
			if catchAllEnabled == "true" {
				newDomain = newDomain + catchAll
			}
			scope.Value = newDomain
		}
	}
	return
}
