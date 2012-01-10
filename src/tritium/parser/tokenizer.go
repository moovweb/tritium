package parser

import (
  "bytes"
  "rubex"
  "strconv"
  //"fmt"
)

// Type tags so we know what kind of token we have
type Lexeme int
const (
  LPAREN = iota
  RPAREN
  LBRACE
  RBRACE
  COMMA
  DOT
  EQUAL
  STRING
  REGEXP
  POS
  GVAR
  LVAR
  KWD
  ID
  FUNC
  TYPE
  PATH
  IMPORT
  READ
  EOF
  ERROR
)

var lexemeName [21]string
var matcher [21]*rubex.Regexp
var symbolLexeme map[string]Lexeme
var symbolPattern *rubex.Regexp
var numberPattern *rubex.Regexp

func init() {
  // Is there a more elegant way to do this?
  lexemeName[LPAREN] = "LPAREN"
  lexemeName[RPAREN] = "RPAREN"
  lexemeName[LBRACE] = "LBRACE"
  lexemeName[RBRACE] = "RBRACE"
  lexemeName[COMMA]  = "COMMA"
  lexemeName[DOT]    = "DOT"
  lexemeName[EQUAL]  = "EQUAL"
  lexemeName[STRING] = "STRING"
  lexemeName[REGEXP] = "REGEXP"
  lexemeName[POS]    = "POS"
  lexemeName[GVAR]   = "GVAR"
  lexemeName[LVAR]   = "LVAR"
  lexemeName[KWD]    = "KWD"
  lexemeName[ID]     = "ID"
  lexemeName[FUNC]   = "FUNC"
  lexemeName[TYPE]   = "TYPE"
  lexemeName[PATH]   = "PATH"
  lexemeName[IMPORT] = "IMPORT"
  lexemeName[READ]   = "READ"
  lexemeName[EOF]    = "EOF"
  lexemeName[ERROR]  = "ERROR"
  
  matcher[STRING], _ = rubex.Compile(`^"(\\.|[^"\\])*"|^'(\\.|[^'\\])*'`)
  // the pattern and options of the regexp are in captures 1 and 3
  matcher[REGEXP], _ = rubex.Compile(`^\/((\\.|[^\/\\])*)\/([imxouesn]*)`)
  matcher[POS], _    = rubex.Compile("^(top|bottom|before|after)")
  matcher[GVAR], _   = rubex.Compile(`^\$\w+`)
  matcher[LVAR], _   = rubex.Compile(`^%\w+`)
  matcher[KWD], _    = rubex.Compile(`^[a-zA-Z_:][-\w:.]*:`)
  matcher[ID], _     = rubex.Compile(`^\$|^[_a-z][\w\$]*`)
  matcher[TYPE], _   = rubex.Compile(`^[A-Z]\w*`)
  matcher[PATH], _   = rubex.Compile(`^[-+.*?:\/\w]+`)
  
  // Map parens, braces, etc to their lexemes
  symbolLexeme = make(map[string]Lexeme, 7)
  symbolLexeme["("] = LPAREN
  symbolLexeme[")"] = RPAREN
  symbolLexeme["{"] = LBRACE
  symbolLexeme["}"] = RBRACE
  symbolLexeme[","] = COMMA
  symbolLexeme["."] = DOT
  symbolLexeme["="] = EQUAL
  symbolPattern, _ = rubex.Compile(`^[(){},\.=]`)
  
  numberPattern, _ = rubex.Compile(`^\d+`)
}

// A token has a type (aka lexeme), a value, and a line number
type Token struct {
  Lexeme
  Value string
  ExtraValue string
  LineNum int
}

/*
  Represent a tokenizer with a struct containing the remaining source text and
  the line number. Easier than using a stateless tokenizing function that
  returns them as extra values and requires the parser to keep track of them.
*/
type Tokenizer struct {
  Source []byte
  LineNum int
  Lookahead *Token
}

func (t *Tokenizer) hasPrefix(s string) bool {
  return bytes.HasPrefix(t.Source, []byte(s))
}

// Discard leading spaces (excluding newlines) in the source text.
func (t *Tokenizer) discardSpaces() {
  t.Source = bytes.TrimLeft(t.Source, " \t")
}

// Discard leading text until a newline (or EOF) is found.
func(t *Tokenizer) discardLine() {
  if i := bytes.IndexByte(t.Source, '\n'); i >= 0 {
    t.Source = t.Source[i:]
  } else {
    t.Source = t.Source[len(t.Source):]
  }
}

// Discard the leading comment in the source text.
func (t *Tokenizer) discardComment() {
  if t.hasPrefix("#") || t.hasPrefix("//") {
    t.discardLine()
  } else if t.hasPrefix("/*") {
    t.discardBlockComment()
  }
}

// Helper for discarding block comments.
// TO DO: ERROR HANDLING FOR UNTERMINATED COMMENTS
func (t *Tokenizer) discardBlockComment() {
  depth, i, length := 1, 2, len(t.Source)
  for depth > 0 {
    if i >= length {
      // ERROR
    }
    switch t.Source[i] {
    case '\n':
      t.LineNum++
    case '/':
      i++
      if i >= length {
        // ERROR
      }
      if t.Source[i] == '*' {
        depth++
      }
    case '*':
      i++
      if i >= length {
        // ERROR
      }
      if t.Source[i] == '/' {
        depth--
      }
    }
    i++
  }
  t.Source = t.Source[i:]
}

// Discard all leading whitespace and comments from the source text. Need to
// tally up the newlines to keep LineNum up to date.
func (t *Tokenizer) discardWhitespaceAndComments() {
  for len(t.Source) > 0 {
    switch {
    case t.hasPrefix("\n"):
      t.LineNum++
      t.Source = t.Source[1:]
    case t.hasPrefix(" ") || t.hasPrefix("\t"):
      t.discardSpaces()
    case t.hasPrefix("#") || t.hasPrefix("//") || t.hasPrefix("/*"):
      t.discardComment()
    default:
      return
    }
  }
}

func (t *Tokenizer) popToken(lexeme Lexeme, value string, length int) *Token {
  val := &Token { Lexeme: lexeme, Value: value, ExtraValue: "", LineNum: t.LineNum }
  t.Source = t.Source[length:]
  return val
}

func (t *Tokenizer) popError(message string) *Token {
  val := &Token { Lexeme: ERROR, Value: message, ExtraValue: "", LineNum: t.LineNum }
  t.discardLine()
  return val
}

// The heart of the tokenizer. This function tries to munch off a token from
// the head of the source text.
func (t *Tokenizer) munch() *Token {
  src := t.Source
  if len(src) == 0 {
    return t.popToken(EOF, "", 0)
  } else if t.hasPrefix("*/") {
    return t.popError("unmatched comment terminator")
  } else if c := string(symbolPattern.Find(src)); len(c) > 0 {
    return t.popToken(symbolLexeme[c], "", 1)
  } else if c := string(numberPattern.Find(src)); len(c) > 0 {
    return t.popToken(STRING, c, len(c))
  } else if t.hasPrefix("'") || t.hasPrefix("\"") {
    if c := string(matcher[STRING].Find(src)); len(c) > 0 {
      unquoted, _ := strconv.Unquote(c)
      return t.popToken(STRING, unquoted, len(c))
    } else {
      return t.popError("unterminated string literal")
    }
  } else if t.hasPrefix("/") {
    if cs := matcher[REGEXP].FindSubmatch(src); len(cs) > 0 {
      pattern := cs[1]
      options := cs[3]
      val := t.popToken(REGEXP, string(pattern), len(cs[0]))
      val.ExtraValue = string(options)
      return val
    } else {
      return t.popError("unterminated regular expression literal")
    }
  } else if c := matcher[KWD].Find(src); len(c) > 0 {
    return t.popToken(KWD, string(c[:len(c)-1]), len(c))
  } else if c := matcher[GVAR].Find(src); len(c) > 0 {
    return t.popToken(GVAR, string(c[1:]), len(c))
  } else if c := matcher[LVAR].Find(src); len(c) > 0 {
    return t.popToken(LVAR, string(c[1:]), len(c))
  } else if c := string(matcher[ID].Find(src)); len(c) > 0 {
    if matcher[POS].MatchString(c) {
      return t.popToken(POS, c, len(c))
    } else if c == "read" {
      return t.popToken(READ, "", len(c))
    } else {
      return t.popToken(ID, c, len(c))
    }
  } else if c := string(matcher[TYPE].Find(src)); len(c) > 0 {
    return t.popToken(TYPE, c, len(c))
  } else if t.hasPrefix("@import") {
    tok := t.popToken(IMPORT, "", 7)
    t.discardWhitespaceAndComments()
    if c := string(matcher[PATH].Find(t.Source)); len(c) > 0 {
      tok.Value = c
      t.Source = t.Source[len(c):]
    } else if c := string(matcher[STRING].Find(t.Source)); len(c) > 0 {
      tok.Value, _ = strconv.Unquote(c)
      t.Source = t.Source[len(c):]
    } else {
      tok = t.popError("malformed import")
    }
    return tok
  } else if t.hasPrefix("@func") {
    return t.popToken(FUNC, "", 5)
  } else {
    return t.popError("unrecognized token")
  }
  return t.popError("unrecognized token")
}




































