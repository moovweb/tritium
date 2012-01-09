package parser

// Type tags so we know what kind of token we have
type lexeme int
const (
  LPAREN = iota
  RPAREN
  LBRACE
  RBRACE
  COMMA
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
)
// Map the numeric tags back to names for debugging purposes.
var lexemeName [18]string

// A token has a type (aka lexeme), a value, and a line number
type token struct {
  Lexeme lexeme
  Value string
  LineNum int
}

/*
  Represent a tokenizer with an stuct containing the remaining source text
  and the line number. Easier than using a stateless tokenizing function that
  returns them as extra values and requires the parser to keep track of them.
*/
type tokenizer struct {
  Source []byte
  LineNum int
}

// Discard leading spaces (excluding newlines) in the source text.
func (t *tokenizer) discardSpaces() {
  var i int
  var c byte
  for i, c = 0, t.Source[0]; c == ' ' || c == '\t'; i, c = i+1, t.Source[i+1] { }
  t.Source = t.Source[i:]
}

// Discard leading text until a newline is found.
func(t *tokenizer) discardLine() {
  var i int
  var c byte
  for i, c = 0, t.Source[0]; c != '\n'; i, c = i+1, t.Source[i+1] { }
  t.Source = t.Source[i:]
}

// Discard leading comments in the source text.
func (t *tokenizer) discardComments() {
  switch t.Source[0] {
  case '#':
    t.discardLine()
  case '/':
    switch t.Source[1] {
    case '/':
      t.discardLine()
    case '*':
      t.discardBlockComment()
    }
  }
}

// Helper for discarding block comments.
// TO DO: ERROR HANDLING FOR UNTERMINATED COMMENTS
func (t *tokenizer) discardBlockComment() {
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
      
      

func init() {
  // Is there a more elegant way to do this?
  lexemeName[LPAREN] = "LPAREN"
  lexemeName[RPAREN] = "RPAREN"
  lexemeName[LBRACE] = "LBRACE"
  lexemeName[RBRACE] = "RBRACE"
  lexemeName[COMMA]  = "COMMA"
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
}
