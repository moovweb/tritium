package parser

import (
	"code.google.com/p/goprotobuf/proto"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	tp "tritium/proto"
	. "tritium/parser/tokenizer"
	"tritium/constants"
	. "tritium/tritstrings"
	"tritium/dependencies/butler/fileutil"
)

type Parser struct {
	*Tokenizer
	ProjectPath string // the project path (probably absolute)
	ScriptPath  string // the folder containing the script file being parsed (relative to the project path)
	FileName    string // the base-name of the script file being parsed
	FullPath    string
	Lookahead   *Token
	counter     int
	header      bool
	RootFile    bool
	Namespaces  []string
	Defspace    string
	inFunc      bool
	CompilingMixer bool // Am I compiling a mixer?
	ActiveLayers map[string]bool
}

var TritiumParserShowRewriterFileName = false
var IncludeSelectorInfo = false

func (p *Parser) gensym() string {
	p.counter++
	return fmt.Sprintf("__TRITIUM_INTERNAL__%s:%s", filepath.Join(p.ScriptPath, p.FileName), string(p.counter))
}

func (p *Parser) peek() *Token {
	return p.Lookahead
}

func (p *Parser) pop() *Token {
	val := p.Lookahead
	p.Lookahead = p.Tokenizer.Pop()
	return val
}

func (p *Parser) error(msg string) {
	formatString := "%s:%d -- %s; found unexpected %s"
	numVals := 0
	val1 := ""
	val2 := ""
	if p.peek().Value != "" {
		formatString += ": %s"
		numVals++
		val1 = p.peek().Value
		if p.peek().Lexeme == STRING {
			val1 = strconv.Quote(val1)
		}
		if p.peek().ExtraValue != "" {
			formatString += ", %s"
			numVals++
			val2 = p.peek().ExtraValue
		}
	}
	var fullMsg string
	switch numVals {
	case 0:
		fullMsg = fmt.Sprintf(formatString,
			p.FullPath,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme])
	case 1:
		fullMsg = fmt.Sprintf(formatString,
			p.FullPath,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme],
			val1)
	case 2:
		fullMsg = fmt.Sprintf(formatString,
			p.FullPath,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme],
			val1,
			val2)
	}
	panic(fullMsg)
}

func MakeParser(src, projectPath, scriptPath, fileName string, isRootFile bool, compilingMixer bool, activeLayers []string) *Parser {
	fullpath := filepath.Join(projectPath, scriptPath, fileName)
	fullpath, _ = filepath.Abs(fullpath)
	scriptPath = filepath.Clean(scriptPath)
	projectPath = filepath.Clean(projectPath)
	p := &Parser{
		Tokenizer:      MakeTokenizer([]byte(src)),
		ProjectPath:    projectPath, // the project path (probably absolute)
		ScriptPath:     scriptPath,  // the folder containing the script file being parsed (relative to the project path)
		FileName:       fileName,    // the base-name of the script file being parsed
		FullPath:       fullpath,
		Lookahead:      nil,
		counter:        0,
		RootFile:       isRootFile,
		Namespaces:     make([]string, 1),
		Defspace:       "tritium",
		inFunc:         false,
		CompilingMixer: compilingMixer,
		ActiveLayers:   make(map[string]bool),
	}
	for _, name := range activeLayers {
		p.ActiveLayers[name] = true
	}
	p.Namespaces[0] = "tritium"
	p.pop()
	return p
}

func (p *Parser) updateDefspace() {
	p.Defspace = strings.Split(p.Namespaces[len(p.Namespaces)-1], ",")[0]
}

func (p *Parser) pushNamespace(ns string) string {
	p.Namespaces = append(p.Namespaces, ns)
	return ns
}

func (p *Parser) popNamespace() string {
	last := len(p.Namespaces)-1
	ns := p.Namespaces[last]
	p.Namespaces = p.Namespaces[:last]
	p.updateDefspace()
	return ns
}

func (p *Parser) currentNamespace() string {
	return p.Namespaces[len(p.Namespaces)-1]
}

func (p *Parser) collectNamespaces() string {
	p.pop() // pop the `@namespace` or `@include` keyword (should be peeked by the caller)
	nsList := make([]string, 0)

	if p.peek().Lexeme != ID {
		p.error(fmt.Sprintf("namespaces must be lowercase identifiers; `%s` is not a valid name for a namespace", p.peek().Value))
	}
	nsList = append(nsList, p.pop().Value)
	for p.peek().Lexeme == COMMA {
		p.pop() // pop the comma
		if p.peek().Lexeme != ID {
			p.error(fmt.Sprintf("namespaces must be lowercase identifiers; `%s` is not a valid name for a namespace", p.peek().Value))
		}
		nsList = append(nsList, p.pop().Value)
	}

	return strings.Join(nsList, ",")
}

func (p *Parser) namespaces() {
	p.pushNamespace(p.collectNamespaces())
	p.updateDefspace()
}

func (p *Parser) open(dup bool) {
	inclusions := p.collectNamespaces()
	top := len(p.Namespaces)-1
	if dup {
		p.pushNamespace(p.Namespaces[top]) // dup the topmost namespace set
		top = len(p.Namespaces)-1 // length has changed
	}
	// the included namespaces should be searched first, so put them at the front of the list
	p.Namespaces[top] = inclusions + "," + p.Namespaces[top]
}

func (p *Parser) Parse() *tp.ScriptObject {
	script := new(tp.ScriptObject)
	// script.Name = proto.String(p.FullPath)

	if !p.RootFile || TritiumParserShowRewriterFileName {
		script.Name = proto.String(filepath.Join(p.ScriptPath, p.FileName))
	} else {
		script.Name = proto.String("__rewriter__")
	}

	stmts := tp.ListInstructions()
	defs := make([]*tp.Function, 0) // Add a new constructor in instruction.go

	// Look for the namespace directive first.
	if p.peek().Lexeme == NAMESPACE {
		p.namespaces()
	}

	for p.peek().Lexeme != EOF {
		switch p.peek().Lexeme {
		case FUNC:
			defs = append(defs, p.definition())
		case OPEN:
			p.open(false)
		default:
			stmt := p.statement()
			stmts = append(stmts, stmt)
			// need to intersperse imports with definitions
			if constants.Instruction_InstructionType_name[int32(stmt.GetType())] == "IMPORT" {
				// Make a special function stub that represents the import.
				// Need to do this because we can't mix definitions and instructions in
				// the same array.
				imp := new(tp.Function)
				imp.Name = proto.String("@import")
				imp.Description = proto.String(stmt.GetValue())
				defs = append(defs, imp)
			}
		}
	}

	if len(defs) == 0 {
		defs = nil
	}

	var line int32
	if len(stmts) == 0 {
		stmts = nil
	} else {
		line = *stmts[0].LineNumber
	}

	script.Functions = defs
	script.Root = tp.MakeBlock(stmts, line)

	// if defs == nil && p.currentNamespace() != "tritium" {
	// 	panic(fmt.Sprintf("%s: %d -- custom modules may only be declared in function definition files", p.FileName, moduleLineNum))
	// }

	return script
}

func (p *Parser) statement() (node *tp.Instruction) {
	switch p.peek().Lexeme {
	case IMPORT, OPTIONAL:
		optional := false
		if p.peek().Lexeme == OPTIONAL {
			optional = true
		}
		if p.inFunc {
			panic(fmt.Sprintf("|%s:%d -- imports not allowed inside function definitions", p.FileName, p.peek().LineNumber))
		}
		token := p.pop() // pop the "@import" or "@optional" token (includes importee)
		importPath := token.Value

		layered := false
		theOnlyLayer := ""
		if strings.Index(importPath, "@") != -1 {

			if len(p.ActiveLayers) == 0 {
				if !optional {
					panic(fmt.Sprintf(SQUID_PARSER_LAYER_NOT_GIVEN_ERR, p.FileName, token.LineNumber))
				} else {
					// make a no-op if the import is optional and no layer has been provided
					node = tp.MakeText("", token.LineNumber)
					return
				}
			}

			if len(p.ActiveLayers) > 1 {
				panic(fmt.Sprintf(SQUID_PARSER_AMBIGUOUS_LAYER_IMPORT_ERR, p.FileName, token.LineNumber))
			}

			for only, _ := range p.ActiveLayers {
				theOnlyLayer = only
				break
			}
			importPath = strings.Replace(importPath, "@", theOnlyLayer, -1)
			layered = true
		}

		scriptLocationInProject := filepath.Clean(filepath.Join(p.ScriptPath, importPath))

		// extract the root script folder from the relative path of the importee
		// (would be easier if filepath.FromSlash worked as advertised)
		dir, base := filepath.Split(p.ScriptPath)
		if len(dir) == 0 {
			dir = base
			base = ""
		}
		if dir[len(dir)-1] == os.PathSeparator {
			dir = dir[0:len(dir)-1]
		}
		for len(base) > 0 {
			dir, base = filepath.Split(dir)
			if len(dir) == 0 {
				dir = base
				base = ""
			}
			if dir[len(dir)-1] == os.PathSeparator {
				dir = dir[0:len(dir)-1]
			}
		}
		// make sure that the importee is under the right subfolder
		if !strings.HasPrefix(scriptLocationInProject, dir) {
			msg := fmt.Sprintf("%s:%d -- imported file must exist under the `%s` folder", p.FileName, token.LineNumber, dir)
			panic(msg)
		}

		// now make sure the file exists and give a helpful message if it's a layer file
		exists, exErr := fileutil.Exists(filepath.Join(p.ProjectPath, scriptLocationInProject))
		if !exists || exErr != nil {
			if optional {
				// make a no-op if the import is optional
				node = tp.MakeText("", token.LineNumber)
				return
			} else if layered {
				panic(fmt.Sprintf(SQUID_PARSER_LAYER_FILE_NOT_FOUND_ERR, p.FileName, p.LineNumber, theOnlyLayer, scriptLocationInProject))
			} else {
				panic(fmt.Sprintf("%s:%d -- file to import not found (%s)", p.FileName, p.LineNumber, scriptLocationInProject))
			}
		}

		node = tp.MakeImport(scriptLocationInProject, token.LineNumber)
		// if layered {
		// 	node.Namespace = proto.String(p.ActiveLayers[0]) // re-use this slot to specify which layer the import is targeting
		// }

	case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
		node = p.expression()
	case NAMESPACE:
		p.error("`@namespace` directive must occur at the top of a file or code block")
	default:
		p.error("statement must consist of import or expression")
	}
	return node
}

func (p *Parser) expression() (node *tp.Instruction) {
	terms := tp.ListInstructions(p.term())
	for p.peek().Lexeme == PLUS {
		p.pop() // pop the plus sign
		switch p.peek().Lexeme {
		case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
			rhs := p.term()
			last := len(terms)-1
			if terms[last].GetType() == constants.Instruction_TEXT && rhs.GetType() == constants.Instruction_TEXT {
				terms[last] = tp.MakeText(terms[last].GetValue() + rhs.GetValue(), terms[last].GetLineNumber())
			} else {
				terms = append(terms, rhs)
			}
		default:
			p.error("argument to `+` must be a self-contained expression")
		}
	}
	if len(terms) > 1 {
		node = tp.FoldLeft("concat", terms[0], terms[1:len(terms)])
	} else {
		node = terms[0]
	}
	return node
}

func (p *Parser) term() (node *tp.Instruction) {
	switch p.peek().Lexeme {
	case STRING, REGEXP, POS:
		node = p.literal()
	case READ:
		node = p.read()
	case ID, TYPE:
		names := p.name()
		next := p.peek().Lexeme
		/*
		if only one name:
			if followed by var:
				it's module.var
			else if followed by paren:
				it's funcall(...) or typecast(...)
		else if [type, id]:
			it's Type.funcall(...)
		else if [id, id]:
			it's module.funcall(...)
		else if [id, type]:
			it's module.typecast(...)
		else if [id, type, id]:
			it's module.type.funcall(...)
		else:
			error
		*/
		switch len(names) {
		case 1:
			n0 := names[0]
			if next == GVAR {
				if n0.Lexeme != ID {
					p.error("global variable reference may only be qualified by a namespace")
				}
				node = p.variable(n0.Value) // qualified global variable
				// node.Namespace = proto.String("tritium") // $name syntax should always work by calling tritium.var("name"...)
			} else if next == LPAREN {
				if n0.Lexeme == ID {
					node = p.call(n0)
				} else if n0.Lexeme == TYPE {
					node = p.cast(n0)
				}
				node.Namespace = proto.String(p.currentNamespace())
			} else {
				// error
				p.error("parenthesized argument list expected in call to " + n0.Value)
			}
		// OMIT THE CASES FOR EXPLICIT TYPE QUALIFICATION
		case 2:
			n0, n1 := names[0], names[1]
			/* if n0.Lexeme == TYPE && n1.Lexeme == ID {
				node = p.call(n1)
				node.Namespace = proto.String(p.Module)
				node.TypeQualifier = proto.String(n0.Value)
			} else */ if n0.Lexeme == ID && n1.Lexeme == ID {
				node = p.call(n1)
				node.Namespace = proto.String(n0.Value)
			} else if n0.Lexeme == ID && n1.Lexeme == TYPE {
				node = p.cast(n1)
				node.Namespace = proto.String(n0.Value)
			} else {
				p.error("invalid name resolution (only namespaces may be used as qualifiers")
			}
		/*
		case 3:
			n0, n1, n2 := names[0], names[1], names[2]
			if n0.Lexeme == ID && n1.Lexeme == TYPE && n2.Lexeme == ID {
				node = p.call(n2)
				node.Namespace = proto.String(n0.Value)
				node.TypeQualifier = proto.String(n1.Value)
			} else {
				p.error("invalid name resolution (should be `moduleName.TypeName.functionName`)")
			}
		*/
		default:
			p.error("invalid name resolution (too many qualifiers)")
		}
	// case ID:
	// 	node = p.call()
	// case TYPE:
	// 	node = p.cast()
	case GVAR, LVAR:
		node = p.variable(p.Defspace) // unqualified vars are fetched from the current namespace
		// node.Namespace = proto.String("tritium") // again, $name should always work as tritium.var("name"...)
	case LPAREN:
		p.pop() // pop the lparen
		node = p.expression()
		if p.peek().Lexeme != RPAREN {
			p.error("unclosed parenthesis")
		}
		p.pop() // pop the rparen
	default:
		// will never get to this point because p.statement() and p.expression() check first
		p.error("expression begins with invalid element")
	}
	return node
}

func (p *Parser) literal() (node *tp.Instruction) {
	token := p.pop()
	switch token.Lexeme {
	case STRING:
		node = tp.MakeText(token.Value, token.LineNumber)
	case REGEXP:
		node = tp.MakeFunctionCall("regexp",
			tp.ListInstructions(tp.MakeText(token.Value, token.LineNumber),
				tp.MakeText(token.ExtraValue, token.LineNumber)),
			nil,
			token.LineNumber)
	case POS:
		node = tp.MakePosition(token.Value, token.LineNumber)
	}
	return node
}

func (p *Parser) read() (node *tp.Instruction) {
	p.pop() // pop the "read" keyword
	readLineNo := p.peek().LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("argument list expected for read")
	}
	p.pop() // pop the lparen
	if p.peek().Lexeme != STRING {
		p.error("`read` requires a literal string argument")
	}
	readPath := p.pop().Value
	readDir  := ""
	if p.peek().Lexeme == COMMA {
		p.pop()
		if p.peek().Lexeme != STRING {
			p.error("second argument to `read` must be a literal string")
		}
		readDir = p.pop().Value
		if filepath.IsAbs(readDir) {
			panic(fmt.Sprintf("%s:%d -- second argument to `read` must be a relative path", p.FileName, readLineNo))
		}
	}
	if p.peek().Lexeme != RPAREN {
		p.error("unterminated argument list in read")
	}
	p.pop() // pop the rparen

	// make sure we're not trying to read outside the project folder
	fullReadPath := ""
	if len(readDir) > 0 {
		fullReadPath = filepath.Clean(filepath.Join(p.ProjectPath, readDir, readPath))
	} else {
		fullReadPath = filepath.Clean(filepath.Join(p.ProjectPath, p.ScriptPath, readPath))
	}
	absReadPath, err := filepath.Abs(fullReadPath)
	if err != nil {
		msg := fmt.Sprintf("%s:%d -- `read` could not resolve the full path to %s", p.FileName, readLineNo, readPath)
		panic(msg)
	}
	if !strings.HasPrefix(absReadPath, filepath.Join(p.ProjectPath)) {
		msg := fmt.Sprintf("%s:%d -- `read` cannot open files outside the project folder", p.FileName, readLineNo)
		panic(msg)
	}

	contents, err := ioutil.ReadFile(absReadPath)
	if err != nil { // can't use p.error because it's not a syntax error
		var msgPath string
		if len(readDir) == 0 {
			msgPath = filepath.Join(p.ScriptPath, readPath)
		} else {
			msgPath = filepath.Join(readDir, readPath)
		}
		msg := fmt.Sprintf("%s:%d -- `read` could not open %s", p.FileName, readLineNo, msgPath)
		panic(msg)
	}
	node = tp.MakeText(string(contents), readLineNo)
	return node
}

func (p *Parser) name() (names []*Token) {
	names = make([]*Token, 0)
	names = append(names, p.pop())

	for p.peek().Lexeme == DOT {
		p.pop() // pop the dot
		if next := p.peek().Lexeme; next == ID || next == TYPE {
			names = append(names, p.pop())
		}
	}

	return names
}

func (p *Parser) call(funcName *Token) (node *tp.Instruction) {
	funcNameStr := funcName.Value // grab the function name
	funcLineNo  := funcName.LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("parenthesized argument list expected in call to " + funcNameStr)
	}
	p.pop() // pop the lparen

	ords, kwdnames, kwdvals := p.arguments(funcNameStr) // gather the arguments
	numArgs := len(ords)

	// this will never happen because p.arguments() only returns when it encounters an rparen
	if p.peek().Lexeme != RPAREN {
		p.error("unterminated argument list in call to " + funcNameStr)
	}
	p.pop() // pop the rparen
	var block []*tp.Instruction
	if p.peek().Lexeme == LBRACE {
		block = p.block()
	}

	// Expand keyword args
	if kwdnames != nil && kwdvals != nil {
		kwdToGensym := make(map[string]string, len(kwdnames))
		outer := tp.ListInstructions()
		for i, k := range kwdnames {
			tempname := p.gensym()
			tempvar := tp.MakeFunctionCall("var",
				tp.ListInstructions(tp.MakeText(tempname, funcLineNo),
					kwdvals[i]),
				nil, funcLineNo)
			outer = append(outer, tempvar)
			kwdToGensym[k] = tempname
		}
		inner := tp.ListInstructions()
		for _, k := range kwdnames {
			getter := tp.MakeFunctionCall("var",
				tp.ListInstructions(tp.MakeText(kwdToGensym[k], funcLineNo)),
				nil, funcLineNo)
			setter := tp.MakeFunctionCall("set",
				tp.ListInstructions(tp.MakeText(k, funcLineNo), getter),
				nil, funcLineNo)
			inner = append(inner, setter)
		}
		if block != nil {
			for _, v := range block {
				inner = append(inner, v)
			}
		}
		theCall := tp.MakeFunctionCall(funcNameStr, ords, inner, funcLineNo)
		outer = append(outer, theCall)
		node = tp.MakeBlock(outer, funcLineNo)

	} else if funcNameStr == "concat" && numArgs > 2 {
		// expand variadic concat into nested binary concats
		lhs := tp.FoldLeft("concat", ords[0], ords[1:numArgs-1])
		rhs := ords[numArgs-1]
		node = tp.MakeFunctionCall("concat", tp.ListInstructions(lhs, rhs), block, funcLineNo)
	} else if funcNameStr == "log" && numArgs > 1 {
		// expand variadic log into composition of log and concat
		cats := tp.FoldLeft("concat", ords[0], ords[1:])
		node = tp.MakeFunctionCall("log", tp.ListInstructions(cats), block, funcLineNo)
	} else {
		node = tp.MakeFunctionCall(funcNameStr, ords, block, funcLineNo)
	}
	// if it's not a root file, we can assume that it's a user-called function
	if !p.CompilingMixer /* p.RootFile == false && IncludeSelectorInfo == true */ {
		node.IsUserCalled = proto.Bool(true)
	}
	return node
}

func (p *Parser) arguments(funcName string) (ords []*tp.Instruction, kwdnames []string, kwdvals []*tp.Instruction) {
	ords, kwdnames, kwdvals = make([]*tp.Instruction, 0), make([]string, 0), make([]*tp.Instruction, 0)
	counter := 0
	for p.peek().Lexeme != RPAREN {
		if counter > 0 {
			if p.peek().Lexeme != COMMA {
				p.error("arguments must be separated by commas")
			}
			p.pop() // pop the comma
		}
		if p.peek().Lexeme == KWD {
			k := p.pop().Value
			kwdnames = append(kwdnames, k)
			// TO DO: CHECK EXPRESSION FIRST-SET
			switch p.peek().Lexeme {
			case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
				kwdvals = append(kwdvals, p.expression())
			default:
				p.error("value for keyword argument " + strconv.Quote(k) + " in call to " + funcName + " is not a valid expression")
			}
		} else {
			switch p.peek().Lexeme {
			case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
				ords = append(ords, p.expression())
			default:
				p.error("value for ordinal argument in call to " + funcName + " is not a valid expression")
			}
		}
		counter++
	}
	if len(ords) == 0 {
		ords = nil
	}
	if len(kwdnames) == 0 || len(kwdvals) == 0 {
		kwdnames = nil
		kwdvals = nil
	}
	return ords, kwdnames, kwdvals
}

func (p *Parser) cast(typeName *Token) (node *tp.Instruction) {
	typeNameStr := typeName.Value // grab the function name
	typeLineNo  := typeName.LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("parenthesized argument needed for typecast to " + typeNameStr)
	}
	p.pop() // pop the lparen
	expr := p.expression()
	if p.peek().Lexeme != RPAREN {
		p.error("single argument to " + typeNameStr + " typecast is missing closing parenthesis")
	}
	p.pop() // pop the rparen
	var block []*tp.Instruction
	if p.peek().Lexeme == LBRACE {
		block = p.block()
	}

	node = tp.MakeFunctionCall(typeNameStr, tp.ListInstructions(expr), block, typeLineNo)
	return node
}

func (p *Parser) variable(ns string) (node *tp.Instruction) {
	// ns = strings.Split(ns, ",")[0] // only use the first namespace -- can't efficiently search namespaces for global vars
	token := p.pop()
	lexeme, name, lineNo := token.Lexeme, token.Value, token.LineNumber
	sigil := "$"
	if lexeme == LVAR {
		sigil = "%"
	}
	var val *tp.Instruction
	var block []*tp.Instruction
	if p.peek().Lexeme == EQUAL {
		p.pop() // pop the equal sign
		switch p.peek().Lexeme {
		case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
			val = p.expression()
		default:
			p.error("invalid expression in assignment to " + sigil + name)
		}
	}
	if p.peek().Lexeme == LBRACE {
		block = p.block()
	}
	if lexeme == LVAR {
		node = tp.MakeLocalVar(name, val, block, lineNo)
	} else {
		fullVarName := name
		// if the namespace is 'tritium', leave it off -- necessary to avoid breaking all that global capture stuff
		if ns != "tritium" {
			fullVarName = fmt.Sprintf("%s.%s", ns, name)
		}
		args := tp.ListInstructions(tp.MakeText(fullVarName, lineNo))
		if val != nil {
			args = append(args, val)
		}
		node = tp.MakeFunctionCall("var", args, block, lineNo)
	}
	return node
}

func (p *Parser) block() (stmts []*tp.Instruction) {
	stmts = tp.ListInstructions()
	p.pop() // pop the lbrace

	// check for a localized namespace declaration at the top of the block
	pushedNamespace := false
	if p.peek().Lexeme == NAMESPACE {
		p.namespaces()
		pushedNamespace = true
	}

	for p.peek().Lexeme != RBRACE {
		if p.peek().Lexeme == OPEN {
			dup := false
			if !pushedNamespace {
				dup = true
				pushedNamespace = true
			}
			p.open(dup)
		} else {
			stmts = append(stmts, p.statement())
		}
	}
	p.pop() // pop the rbrace
	if pushedNamespace {
		p.popNamespace() // restore the previous namespace if we pushed a new one
	}
	if len(stmts) == 0 {
		stmts = nil
	}
	return stmts
}

func (p *Parser) definition() *tp.Function {
	isSignature := false
	node := new(tp.Function)
	// functions should be injected only into the first specified namespace
	node.Namespace = proto.String(p.Defspace)

	funcLineNo := p.pop().LineNumber // pop the `@func` keyword
	contextType := ""
	if p.peek().Lexeme == TYPE {
		contextType = p.pop().Value
		if p.peek().Lexeme != DOT {
			p.error("function context and function name must be separated by '.'")
		}
		p.pop() // pop the dot
	}

	if p.peek().Lexeme != ID {
		p.error("invalid function name in definition")
	}

	funcName := p.pop().Value
	funcFile := ""

	if len(p.ScriptPath) > 0 && p.ScriptPath != "." {
		funcFile = filepath.Join(p.ScriptPath, p.FileName)
	}

	if p.peek().Lexeme != LPAREN {
		p.error("parenthesized parameter list expected in function declaration")
	}
	p.pop() // pop the lparen
	params := p.parameters(funcName)
	if len(params) == 0 {
		params = nil
	}
	p.pop() // pop the rparen

	returnType := ""
	opensType := ""
	if p.peek().Lexeme == TYPE {
		isSignature = true
		returnType = p.pop().Value
		if p.peek().Lexeme == TYPE {
			opensType = p.pop().Value
		}
	}

	node.Name = proto.String(funcName)
	if len(funcFile) > 0 {
		node.Filename = proto.String(funcFile)
	}
	node.LineNumber = proto.Int32(funcLineNo)
	node.Args = params
	node.ScopeType = proto.String(contextType)
	node.ReturnType = proto.String(returnType)
	node.OpensType = proto.String(opensType)

	if isSignature {
		if p.peek().Lexeme == LBRACE {
			p.error("body not permitted in signature for built-in " + funcName)
		}
		node.BuiltIn = proto.Bool(true)
		return node
	}
	node.BuiltIn = proto.Bool(false)
	if p.peek().Lexeme != LBRACE {
		p.error("definition for " + funcName + " is missing a body")
	}
	funcBody := &tp.Instruction{
		Type: proto.Int32(constants.Instruction_BLOCK),
		// Children: p.block(),
		// use the wrapper to get a better error message
		Children: p.function_body(*node.Name),
	}
	node.Instruction = funcBody
	return node
}

func (p *Parser) function_body(funcName string) (stmts []*tp.Instruction) {
	p.inFunc = true
	// catch a parsing error and add extra error info about the surrounding definition
	defer func() {
		if r := recover(); r != nil {
			// stupid hack for handling the 'import in a function' error
			fullMessage := r.(string)
			if fullMessage[0] == '|' {
				panic(fullMessage[1:])
			}
			// pull out the actual message without the filename/line-no
			msg := strings.Split(strings.Split(r.(string), "-- ")[1], "; ")[0]
			// re-throw the error with the current filename, line-no, and function-name
			p.error(fmt.Sprintf("in function '%s': %s", funcName, msg))
		}
	}()

	stmts = p.block()
	p.inFunc = false
	return stmts
}

func (p *Parser) parameters(funcName string) []*tp.Function_Argument {
	params := make([]*tp.Function_Argument, 0)
	counter := 0
	for p.peek().Lexeme != RPAREN {
		if counter > 0 {
			if p.peek().Lexeme != COMMA {
				p.error("parameter list for " + funcName + " must be separated by commas")
			}
			p.pop() // pop the comma
		}
		if p.peek().Lexeme != TYPE {
			p.error("parameter for " + funcName + " is missing a type")
		}
		param := &tp.Function_Argument{
			TypeString: proto.String(p.pop().Value),
		}
		if p.peek().Lexeme != LVAR {
			p.error("parameter for " + funcName + " has invalid name")
		}
		param.Name = proto.String(p.pop().Value)
		params = append(params, param)
		counter++
	}
	return params
}
