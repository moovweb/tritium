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
var lexemeName [17]string

// A token has a type (aka lexeme) and an actual value
type token struct {
  Lexeme lexeme
  Value string
}

func init() {
  lexemeName[LPAREN] = "LPAREN"
  lexemeName[RPAREN] = "RPAREN"
  lexemeName[LBRACE] = "LBRACE"
  lexemeName[RBRACE] = "RBRACE"
  lexemeName[COMMA]  = "COMMA"
  lexemeName[EQUAL]  = "EQUAL"
  lexemeName[STRING] = "STRING"
  lexemeName[REGEXP] = "REGEXP"
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