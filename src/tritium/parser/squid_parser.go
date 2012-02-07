package parser

import (
	"goprotobuf.googlecode.com/hg/proto"
	ir "athena/proto"
	"io/ioutil"
	"path/filepath"
	. "tritium/tokenizer" // was meant to be in this package
	"path"
	"fmt"
	"strconv"
)

type Parser struct {
	*Tokenizer
	FileName  string
	DirName   string
	FullPath  string
	Lookahead *Token
	counter   int
	header    bool
}

func (p *Parser) gensym() string {
	p.counter++
	return p.FullPath + string(p.counter)
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
			p.FileName,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme])
	case 1:
		fullMsg = fmt.Sprintf(formatString,
			p.FileName,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme],
			val1)
	case 2:
		fullMsg = fmt.Sprintf(formatString,
			p.FileName,
			p.peek().LineNumber,
			msg,
			LexemeName[p.peek().Lexeme],
			val1,
			val2)
	}
	panic(fullMsg)
}

func MakeParser(src, fullpath string) *Parser {
	fullpath, _ = filepath.Abs(fullpath)
	d, f := path.Split(fullpath)
	p := &Parser{
		Tokenizer: MakeTokenizer([]byte(src)),
		FileName:  f,
		DirName:   d,
		FullPath:  fullpath,
		Lookahead: nil,
		counter:   0,
	}
	p.pop()
	return p
}

func (p *Parser) Parse() *ir.ScriptObject {
	script := new(ir.ScriptObject)
	script.Name = proto.String(p.FullPath)

	stmts := ir.ListInstructions()
	defs := make([]*ir.Function, 0) // Add a new constructor in instruction.go

	for p.peek().Lexeme != EOF {
		switch p.peek().Lexeme {
		case FUNC:
			defs = append(defs, p.definition())
		default:
			stmts = append(stmts, p.statement())
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
	script.Root = ir.MakeBlock(stmts, line)

	return script

	// switch p.peek().Lexeme {
	// case FUNC:
	//  for p.peek().Lexeme != EOF {
	//    defs = append(defs, p.definition())
	//  }
	//  if len(defs) == 0 {
	//    defs = nil
	//  }
	//  script.Functions = defs
	// default:
	//  for p.peek().Lexeme != EOF {
	//    stmts = append(stmts, p.statement())
	//  }
	//  line := int32(0)
	//  if len(stmts) == 0 {
	//    stmts = nil
	//  } else {
	//    line = *stmts[0].LineNumber
	//  }
	//  script.Root = ir.MakeBlock(stmts, line)
	// }
	// return script
}

func (p *Parser) statement() (node *ir.Instruction) {
	switch p.peek().Lexeme {
	case IMPORT:
		token := p.pop() // pop the "@import" token (includes importee)
		node = ir.MakeImport(path.Join(p.DirName, token.Value), token.LineNumber)
	case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
		node = p.expression()
	default:
		p.error("statement must consist of import or expression")
	}
	return node
}

func (p *Parser) expression() (node *ir.Instruction) {
	node = p.term()
	rest := ir.ListInstructions()
	for p.peek().Lexeme == PLUS {
		p.pop() // pop the plus sign
		switch p.peek().Lexeme {
		case STRING, REGEXP, POS, READ, ID, TYPE, GVAR, LVAR, LPAREN:
			rest = append(rest, p.term())
		default:
			p.error("argument to + must be a self-contained expression")
		}
	}
	if len(rest) > 0 {
		node = ir.FoldLeft("concat", node, rest)
	}
	return node
}

func (p *Parser) term() (node *ir.Instruction) {
	switch p.peek().Lexeme {
	case STRING, REGEXP, POS:
		node = p.literal()
	case READ:
		node = p.read()
	case ID:
		node = p.call()
	case TYPE:
		node = p.cast()
	case GVAR, LVAR:
		node = p.variable()
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

func (p *Parser) literal() (node *ir.Instruction) {
	token := p.pop()
	switch token.Lexeme {
	case STRING:
		node = ir.MakeText(token.Value, token.LineNumber)
	case REGEXP:
		node = ir.MakeFunctionCall("regexp",
			ir.ListInstructions(ir.MakeText(token.Value, token.LineNumber),
				ir.MakeText(token.ExtraValue, token.LineNumber)),
			nil,
			token.LineNumber)
	case POS:
		node = ir.MakePosition(token.Value, token.LineNumber)
	}
	return node
}

func (p *Parser) read() (node *ir.Instruction) {
	p.pop() // pop the "read" keyword
	readLineNo := p.peek().LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("argument list expected for read")
	}
	p.pop() // pop the lparen
	if p.peek().Lexeme != STRING {
		p.error("read requires a literal string argument")
	}
	readPath := p.pop().Value
	if p.peek().Lexeme != RPAREN {
		p.error("unterminated argument list in read")
	}
	p.pop() // pop the rparen
	contents, err := ioutil.ReadFile(path.Join(p.DirName, readPath))
	if err != nil { // can't use p.error because it's not a syntax error
		msg := fmt.Sprintf("%s:%d -- read could not open %s", p.FileName, readLineNo, readPath)
		panic(msg)
	}
	node = ir.MakeText(string(contents), readLineNo)
	return node
}

func (p *Parser) call() (node *ir.Instruction) {
	funcName := p.pop().Value // grab the function name
	funcLineNo := p.peek().LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("parenthesized argument list expected in call to " + funcName)
	}
	p.pop() // pop the lparen

	ords, kwdnames, kwdvals := p.arguments(funcName) // gather the arguments
	numArgs := len(ords)

	// TO DO: integrate this block for better variadic concat/log expansions
	// if funcName == "concat" && numArgs > 2 {
	//   // expand variadic concat into nested binary concats
	//   lhs := ir.FoldLeft("concat", ords[0], ords[1:numArgs-1])
	//   rhs := ords[numArgs-1]
	//   node = ir.MakeFunctionCall("concat", ir.ListInstructions(lhs,rhs), block, funcLineNo)
	// } else if funcName == "log" && numArgs > 1 {
	//   // expand variadic log into composition of log and concat
	//   cats := ir.FoldLeft("concat", ords[0], ords[1:])
	//   node = ir.MakeFunctionCall("log", ir.ListInstructions(cats), block, funcLineNo)
	// }

	// this will never happen because p.arguments() only returns when it encounters an rparen
	if p.peek().Lexeme != RPAREN {
		p.error("unterminated argument list in call to " + funcName)
	}
	p.pop() // pop the rparen
	var block []*ir.Instruction
	if p.peek().Lexeme == LBRACE {
		block = p.block()
	}

	// Expand keyword args
	if kwdnames != nil && kwdvals != nil {
		kwdToGensym := make(map[string]string, len(kwdnames))
		outer := ir.ListInstructions()
		for i, k := range kwdnames {
			tempname := p.gensym()
			tempvar := ir.MakeFunctionCall("var",
				ir.ListInstructions(ir.MakeText(tempname, funcLineNo),
					kwdvals[i]),
				nil, funcLineNo)
			outer = append(outer, tempvar)
			kwdToGensym[k] = tempname
		}
		inner := ir.ListInstructions()
		for _, k := range kwdnames {
			getter := ir.MakeFunctionCall("var",
				ir.ListInstructions(ir.MakeText(kwdToGensym[k], funcLineNo)),
				nil, funcLineNo)
			setter := ir.MakeFunctionCall("set",
				ir.ListInstructions(ir.MakeText(k, funcLineNo), getter),
				nil, funcLineNo)
			inner = append(inner, setter)
		}
		if block != nil {
			for _, v := range block {
				inner = append(inner, v)
			}
		}
		theCall := ir.MakeFunctionCall(funcName, ords, inner, funcLineNo)
		outer = append(outer, theCall)
		node = ir.MakeBlock(outer, funcLineNo)

	} else if funcName == "concat" && numArgs > 2 {
		// expand variadic concat into nested binary concats
		lhs := ir.FoldLeft("concat", ords[0], ords[1:numArgs-1])
		rhs := ords[numArgs-1]
		node = ir.MakeFunctionCall("concat", ir.ListInstructions(lhs, rhs), block, funcLineNo)
	} else if funcName == "log" && numArgs > 1 {
		// expand variadic log into composition of log and concat
		cats := ir.FoldLeft("concat", ords[0], ords[1:])
		node = ir.MakeFunctionCall("log", ir.ListInstructions(cats), block, funcLineNo)
	} else {
		node = ir.MakeFunctionCall(funcName, ords, block, funcLineNo)
	}
	return node
}

func (p *Parser) arguments(funcName string) (ords []*ir.Instruction, kwdnames []string, kwdvals []*ir.Instruction) {
	ords, kwdnames, kwdvals = make([]*ir.Instruction, 0), make([]string, 0), make([]*ir.Instruction, 0)
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

func (p *Parser) cast() (node *ir.Instruction) {
	typeName := p.pop().Value // grab the function name
	typeLineNo := p.peek().LineNumber
	if p.peek().Lexeme != LPAREN {
		p.error("parenthesized argument needed for typecast to " + typeName)
	}
	p.pop() // pop the lparen
	expr := p.expression()
	if p.peek().Lexeme != RPAREN {
		p.error("single argument to " + typeName + " typecast is missing closing parenthesis")
	}
	p.pop() // pop the rparen
	var block []*ir.Instruction
	if p.peek().Lexeme == LBRACE {
		block = p.block()
	}

	node = ir.MakeFunctionCall(typeName, ir.ListInstructions(expr), block, typeLineNo)
	return node
}

func (p *Parser) variable() (node *ir.Instruction) {
	token := p.pop()
	lexeme, name, lineNo := token.Lexeme, token.Value, token.LineNumber
	sigil := "$"
	if lexeme == LVAR {
		sigil = "%"
	}
	var val *ir.Instruction
	var block []*ir.Instruction
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
		node = ir.MakeLocalVar(name, val, block, lineNo)
	} else {
		args := ir.ListInstructions(ir.MakeText(name, lineNo))
		if val != nil {
			args = append(args, val)
		}
		node = ir.MakeFunctionCall("var", args, block, lineNo)
	}
	return node
}

func (p *Parser) block() (stmts []*ir.Instruction) {
	stmts = ir.ListInstructions()
	p.pop() // pop the lbrace
	for p.peek().Lexeme != RBRACE {
		stmts = append(stmts, p.statement())
	}
	p.pop() // pop the rbrace
	if len(stmts) == 0 {
		stmts = nil
	}
	return stmts
}

func (p *Parser) definition() *ir.Function {
	isSignature := false
	node := new(ir.Function)

	p.pop() // pop the "@func" keyword
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
	node.Args = params
	node.ScopeType = proto.String(contextType)
	node.ReturnType = proto.String(returnType)
	node.OpensType = proto.String(opensType)

	if isSignature {
		if p.peek().Lexeme == LBRACE {
			p.error("body not permitted in signature for " + funcName)
		}
		node.BuiltIn = proto.Bool(true)
		return node
	}
	node.BuiltIn = proto.Bool(false)
	if p.peek().Lexeme != LBRACE {
		p.error("definition for " + funcName + " is missing a body")
	}
	funcBody := &ir.Instruction{
		Type:     ir.NewInstruction_InstructionType(ir.Instruction_BLOCK),
		Children: p.block(),
	}
	node.Instruction = funcBody
	return node
}

func (p *Parser) parameters(funcName string) []*ir.Function_Argument {
	params := make([]*ir.Function_Argument, 0)
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
		param := &ir.Function_Argument{
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
