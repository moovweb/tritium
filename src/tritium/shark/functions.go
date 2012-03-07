package shark

import (
	"strings"
	"os"
	"gokogiri/libxml"
	"fmt"
	log "log4go"
	xml "gokogiri/libxml/tree"
	tp "athena/src/athena/proto"
	"gokogiri/libxml/xpath"
	"rubex/lib"
	"css2xpath"
	"goconv"
)

var (
	InnerReplacer = rubex.MustCompile(`[\\$](\d)`)
)

func (ctx *Ctx) runBuiltIn(fun *Function, scope *Scope, ins *tp.Instruction, args []interface{}) (returnValue interface{}) {
	returnValue = ""
	switch fun.Name {
	case "this":
		returnValue = scope.Value
	case "yield":
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

	case "var.Text", "var.Text.Text":
		val := ctx.Env[args[0].(string)]
		if len(args) > 1 {
			returnValue = args[1].(string)
			ctx.Env[args[0].(string)] = returnValue.(string)
		} else {
			returnValue = val
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: returnValue}
			ctx.runChildren(ts, ins)
			returnValue = ts.Value
			ctx.Env[args[0].(string)] = returnValue.(string)
		}
	case "deprecated.Text":
		ctx.Log.Info(args[0].(string))
	case "match.Text":
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
	case "with.Text":
		returnValue = "false"
		if ctx.matchShouldContinue() {
			if args[0].(string) == ctx.matchTarget() {
				ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
				ctx.runChildren(scope, ins)
				returnValue = "true"
			}
		}
	case "with.Regexp":
		returnValue = "false"
		if ctx.matchShouldContinue() {
			//println(matcher.MatchAgainst, matchWith)
			if (args[0].(*rubex.Regexp)).Match([]uint8(ctx.matchTarget())) {
				ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
				ctx.runChildren(scope, ins)
				returnValue = "true"
			}
		}
	case "not.Text":
		returnValue = "false"
		if ctx.matchShouldContinue() {
			if args[0].(string) != ctx.matchTarget() {
				ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
				ctx.runChildren(scope, ins)
				returnValue = "true"
			}
		}
	case "not.Regexp":
		returnValue = "false"
		if ctx.matchShouldContinue() {
			//println(matcher.MatchAgainst, matchWith)
			if !(args[0].(*rubex.Regexp)).Match([]uint8(ctx.matchTarget())) {
				ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
				ctx.runChildren(scope, ins)
				returnValue = "true"
			}
		}
	case "else":
		returnValue = "false"
		if ctx.matchShouldContinue() {
			ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1] = false
			ctx.runChildren(scope, ins)
			returnValue = "true"
		}
	case "regexp.Text.Text":
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
			//println("new regexp:", pattern)
		}
	case "export.Text":
		val := make([]string, 2)
		val[0] = args[0].(string)
		ts := &Scope{Value: ""}
		ctx.runChildren(ts, ins)
		val[1] = ts.Value.(string)
		ctx.Exports = append(ctx.Exports, val)
	case "log.Text":
		ctx.Logs = append(ctx.Logs, args[0].(string))
		returnValue = args[0].(string)

	// ATOMIC FUNCTIONS
	case "concat.Text.Text":
		//println("Concat:", args[0].(string), "+", args[1].(string))
		returnValue = args[0].(string) + args[1].(string)
	case "concat.Text.Text.Text": //REMOVE
		returnValue = args[0].(string) + args[1].(string) + args[2].(string)
	case "downcase.Text":
		returnValue = strings.ToLower(args[0].(string))
		return
	case "upcase.Text":
		returnValue = strings.ToUpper(args[0].(string))
		return
	case "index.XMLNode", "index.Node":
		returnValue = fmt.Sprintf("%d", scope.Index+1)

	// TEXT FUNCTIONS
	case "set.Text":
		scope.Value = args[0]
	case "append.Text":
		scope.Value = scope.Value.(string) + args[0].(string)
	case "prepend.Text":
		scope.Value = args[0].(string) + scope.Value.(string)
	case "replace.Text":
		ts := &Scope{Value: ""}
		ctx.runChildren(ts, ins)
		scope.Value = strings.Replace(scope.Value.(string), args[0].(string), ts.Value.(string), -1)
	case "replace.Regexp":
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
			return InnerReplacer.GsubFunc(replacementScope.Value.(string), func(_ string, numeric_captures map[string]string) string {
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
	case "convert_encoding.Text.Text":
		input := scope.Value.(string)
		fromCode  := args[0].(string)
		toCode    := args[1].(string)
		ic, err := goconv.OpenWithFallback(fromCode, toCode, goconv.KEEP_UNRECOGNIZED)
		if err == nil {
			outputBytes, _ := ic.Conv([]byte(input))
			scope.Value = string(outputBytes)
			ic.Close()
		} else {
			scope.Value = input
		}
		returnValue = scope.Value
	// XML FUNCTIONS
	case "xml":
		doc := libxml.XmlParseString(scope.Value.(string))
		ns := &Scope{Value: doc}
		ctx.runChildren(ns, ins)
		scope.Value = doc.String()
		returnValue = scope.Value
		doc.Free()
	case "html_doc.Text.Text":
		inputEncoding  := args[0].(string)
		outputEncoding    := args[1].(string)
		doc := xml.HtmlParseString(scope.Value.(string), inputEncoding)
		ns := &Scope{Value: doc}
		ctx.runChildren(ns, ins)
		if err := doc.SetMetaEncoding(outputEncoding); err != nil {
			//ctx.Log.Warn("executing html:" + err.String())
		}
		scope.Value = doc.DumpHTML()
		returnValue = scope.Value
		doc.Free()
	case "html_fragment.Text":
		inputEncoding  := args[0].(string)
		doc := xml.HtmlParseFragment(scope.Value.(string), inputEncoding)
		ns := &Scope{Value: doc.RootElement()}
		ctx.runChildren(ns, ins)
		//output is always utf-8 because the content is internal to Doc.
		scope.Value = ns.Value.(xml.Node).Content()
		returnValue = scope.Value
		doc.Free()
	case "select.Text":
		// TODO reuse XPath object
		node := scope.Value.(xml.Node)
		xpCtx := xpath.NewXPath(node.Doc())
		if xpCtx == nil {
			ctx.Logs = append(ctx.Logs, "cannot create new xpath context")
			returnValue = "0"
			return
		}
		defer xpCtx.Free()

		xpath := xpath.CompileXPath(args[0].(string))
		if xpath == nil {
			ctx.Logs = append(ctx.Logs, "Invalid XPath used: " + args[0].(string))
			returnValue = "0"
			return
		}
		defer xpath.Free()
		
		nodeSet := xpCtx.SearchByCompiledXPath(node, xpath).Slice()

		
		if len(nodeSet) == 0 {
			returnValue = "0"
		} else {
			returnValue = fmt.Sprintf("%d", len(nodeSet))
		}

		for index, node := range nodeSet {
			if node != nil {
				if doc, ok := node.(*xml.Doc); ok {
					node = doc.RootElement()
				}
				if (node != nil) && node.IsLinked() {
					if _, ok := node.(*xml.Element); ok {
						ns := &Scope{Value: node, Index: index}
						ctx.runChildren(ns, ins)
					}
					if _, text := node.(*xml.Text); text {
						ctx.Logs = append(ctx.Logs, "You have just selected a text() node... THIS IS A TERRIBLE IDEA. Please run 'moov check' and sort it out!")
					}
				}
			}
		}
	case "css.Text":
		returnValue = css2xpath.Convert(args[0].(string), css2xpath.LOCAL)
	case "position.Text":
		returnValue = Positions[args[0].(string)]

	// SHARED NODE FUNCTIONS
	case "remove":
		node := scope.Value.(xml.Node)
		node.Remove()
		node.Free()
	case "remove.Text": //Only for XMLNode
		elem, _ := scope.Value.(xml.Node)

		xpCtx := xpath.NewXPath(elem.Doc())
		if xpCtx == nil {
			ctx.Logs = append(ctx.Logs, "cannot create new xpath context")
			returnValue = "0"
			return
		}
		defer xpCtx.Free()

		xpath := xpath.CompileXPath(args[0].(string))
		if xpath == nil {
			ctx.Logs = append(ctx.Logs, "Invalid XPath used: " + args[0].(string))
			returnValue = "0"
			return
		}
		defer xpath.Free()
		
		nodeSet := xpCtx.SearchByCompiledXPath(elem, xpath).Slice()

		if len(nodeSet) == 0 {
			returnValue = "0"
		} else {
			returnValue = fmt.Sprintf("%d", len(nodeSet))
		}

		for _, node := range nodeSet {
			if node != nil {
				if doc, ok := node.(*xml.Doc); ok {
					node = doc.RootElement()
				}
				if (node != nil) && node.IsLinked() {
					node.Remove()
				}
			}
		}
		
	case "inner":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		elem, ok := node.(*xml.Element)
		if ok && node.IsLinked() {
			elem.Clear()
			elem.AppendHtmlContent(val)
		}
		returnValue = val
	case "inner_text", "text":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		_, ok := node.(*xml.Element)
		if ok && node.IsLinked() {
			node.SetContent(val)
		}
		returnValue = val
	case "value":
		node := scope.Value.(xml.Node)
		ts := &Scope{Value: node.Content()}
		ctx.runChildren(ts, ins)
		val := ts.Value.(string)
		_, ok := node.(*xml.Attribute)
		if ok && node.IsLinked() {
			node.SetContent(val)
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
		newNode := node.Duplicate()
		_, isElement := node.(*xml.Element)
		if isElement {
			MoveFunc(newNode, node, AFTER)
		}
		ns := &Scope{Value: newNode}
		ctx.runChildren(ns, ins)
	case "fetch.Text":
		searchNode := scope.Value.(xml.Node)
		xPathObj := xpath.NewXPath(searchNode.Doc())
		nodeSet := xPathObj.Search(searchNode, args[0].(string))
		if nodeSet.Size() > 0 {
			node := nodeSet.First()
			attr, ok := node.(*xml.Attribute)
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
		
		xPathObj.Free()
	case "path":
		returnValue = scope.Value.(xml.Node).Path()

	// LIBXML FUNCTIONS
	case "insert_at.Position.Text":
		node := scope.Value.(xml.Node)
		position := args[0].(Position)
		tagName := args[1].(string)
		element, err := node.Doc().NewElement(tagName)
		if err != nil {
			log.Error("Problem with insert_at(Pos, '" + tagName + "') - " + err.String())
			returnValue = "false"
		} else {
			MoveFunc(element, node, position)
			ns := &Scope{Value: element}
			ctx.runChildren(ns, ins)
			returnValue = "true"
		}
	case "inject_at.Position.Text":
		node := scope.Value.(xml.Node)
		position := args[0].(Position)
		nodeSet := node.Doc().ParseHtmlFragment(args[1].(string), node.Doc().GetEncoding())
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
			child := node.First();
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
	return
}
