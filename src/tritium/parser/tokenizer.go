package parser

import (
  "bytes"
  "rubex"
  //"strconv"
)

// Type tags so we know what kind of token we have
type lexeme int
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
  IMPORT
  READ
  EOF
  ERROR
)

// A token has a type (aka lexeme), a value, and a line number
type token struct {
  Lexeme lexeme
  Value string
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


var lexemeName [19]string
var matcher [19]*rubex.Regexp

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
  lexemeName[IMPORT] = "IMPORT"
  lexemeName[READ]   = "READ"
  lexemeName[EOF]    = "EOF"
  lexemeName[ERROR]  = "ERROR"
  
  // Inline comments below indicate which captures to use
  matcher[STRING] = rubex.Compile(`^"(\\.|[^"\\])*"|^'(\\.|[^'\\])*'`)  // 0
  matcher[REGEXP] = rubex.Compile(`^\/((\\.|[^\/\\])*)\/([imxouesn]*)`) // 1,3
  matcher[POS]    = rubex.Compile("^(top|bottom|before|after)")         // 0
  matcher[GVAR]   = rubex.Compile(`^\$(\w+)`)                           // 1
  matcher[LVAR]   = rubex.Compile(`^%(\w+)`)                            // 1
  matcher[KWD]    = rubex.Compile(`^([a-zA-Z_:][-\w:.]*):`)             // 1
  matcher[ID]     = rubex.Compile(`^\$|[_a-z](\w|\$)*`)                 // 0
  matcher[TYPE]   = rubex.Compile(`^[A-Z](\w*)`)                        // 0
}
