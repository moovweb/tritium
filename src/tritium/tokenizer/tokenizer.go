package tokenizer

import (
  "bytes"
  "rubex"
  "strconv"
  "fmt"
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

var LexemeName [21]string
var matcher [21]*rubex.Regexp
var symbolLexeme map[string]Lexeme
var symbolPattern *rubex.Regexp
var numberPattern *rubex.Regexp
var regexpSlashPattern *rubex.Regexp
var regexpBackQuotePattern *rubex.Regexp

func init() {
  // Is there a more elegant way to do this?
  LexemeName[LPAREN] = "LPAREN"
  LexemeName[RPAREN] = "RPAREN"
  LexemeName[LBRACE] = "LBRACE"
  LexemeName[RBRACE] = "RBRACE"
  LexemeName[COMMA]  = "COMMA"
  LexemeName[DOT]    = "DOT"
  LexemeName[EQUAL]  = "EQUAL"
  LexemeName[STRING] = "STRING"
  LexemeName[REGEXP] = "REGEXP"
  LexemeName[POS]    = "POS"
  LexemeName[GVAR]   = "GVAR"
  LexemeName[LVAR]   = "LVAR"
  LexemeName[KWD]    = "KWD"
  LexemeName[ID]     = "ID"
  LexemeName[FUNC]   = "FUNC"
  LexemeName[TYPE]   = "TYPE"
  LexemeName[PATH]   = "PATH"
  LexemeName[IMPORT] = "IMPORT"
  LexemeName[READ]   = "READ"
  LexemeName[EOF]    = "EOF"
  LexemeName[ERROR]  = "ERROR"
  
  matcher[STRING], _ = rubex.Compile(`\A"(\\.|[^"\\])*"|\A'(\\.|[^'\\])*'`)
      
  // the pattern and options of the regexp matches are in captures 1 and 3
  //regexpSlashPattern, _ = rubex.Compile(`\A\/((\\.|[^\/\\])*)\/([imxouesn]*)`)
  regexpSlashPattern, _ = rubex.Compile(`\A/((\\.|[^/\\])*)/([imxouesn]*)`)
  regexpBackQuotePattern, _ = rubex.Compile("\\A`((\\\\.|[^\\`\\\\])*)`([imxouesn]*)")
  matcher[POS], _    = rubex.Compile(`\A(top|bottom|before|after)`)
  matcher[GVAR], _   = rubex.Compile(`\A\$\w+`)
  matcher[LVAR], _   = rubex.Compile(`\A%\w+`)
  matcher[KWD], _    = rubex.Compile(`\A[a-zA-Z_:][-\w:.]*:`)
  matcher[ID], _     = rubex.Compile(`\A\$|\A[_a-z][\w\$]*`)
  matcher[TYPE], _   = rubex.Compile(`\A[A-Z]\w*`)
  matcher[PATH], _   = rubex.Compile(`\A[-+.*?:\/\w]+`)
  
  // Map parens, braces, etc to their lexemes
  symbolLexeme = make(map[string]Lexeme, 7)
  symbolLexeme["("] = LPAREN
  symbolLexeme[")"] = RPAREN
  symbolLexeme["{"] = LBRACE
  symbolLexeme["}"] = RBRACE
  symbolLexeme[","] = COMMA
  symbolLexeme["."] = DOT
  symbolLexeme["="] = EQUAL
  symbolPattern, _ = rubex.Compile(`\A[\(\)\{\}\,\.=]`)
  
  numberPattern, _ = rubex.Compile(`\A\d+`)
}

// A token has a type (aka lexeme), a value, and a line number
type Token struct {
  Lexeme
  Value string
  ExtraValue string
  LineNum int32
}

func (t *Token) Inspect() string {
  return fmt.Sprintf("[%s: %s, %s, %d]", LexemeName[t.Lexeme], t.Value, t.ExtraValue, t.LineNum)
}

/*
  Represent a tokenizer with a struct containing the remaining source text and
  the line number. Easier than using a stateless tokenizing function that
  returns them as extra values and requires the parser to keep track of them.
*/
type Tokenizer struct {
  Source []byte
  LineNum int32
  Lookahead *Token
  unterminatedComment bool
}

func (t *Tokenizer) hasPrefix(s string) bool {
  return bytes.HasPrefix(t.Source, []byte(s))
}

// Discard leading spaces (excluding newlines) in the source text.
func (t *Tokenizer) discardSpaces() {
  t.Source = bytes.TrimLeft(t.Source, " \t\r;")
}

// Discard leading text until a newline (or EOF) is found.
func(t *Tokenizer) discardLine() {
  var i int
  for i = 0; i < len(t.Source); i++ {
    if t.Source[i] == '\n' {
      break
    }
  }
  t.Source = t.Source[i:]
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
  error := false
  for depth > 0 {
    if i >= length {
      error = true
      break
    }
    switch t.Source[i] {
    case '\n':
      t.LineNum++
    case '/':
      i++
      if i >= length {
        error = true
        break
      }
      if t.Source[i] == '*' {
        depth++
      }
    case '*':
      i++
      if i >= length {
        error = true
        break
      }
      if t.Source[i] == '/' {
        depth--
      }
    }
    i++
  }
  t.Source = t.Source[i:]
  if error {
    t.Lookahead = &Token{ Lexeme: ERROR, Value: "unterminated comment", ExtraValue: "", LineNum: t.LineNum }
    t.unterminatedComment = true
  }
}

// Discard all leading whitespace and comments from the source text. Need to
// tally up the newlines to keep LineNum up to date.
func (t *Tokenizer) discardWhitespaceAndComments() {
  for len(t.Source) > 0 {
    switch {
    case t.hasPrefix("\n"):
      t.LineNum++
      t.Source = t.Source[1:]
    case t.hasPrefix(" ") || t.hasPrefix("\t") || t.hasPrefix("\r") || t.hasPrefix(";"):
      t.discardSpaces()
    case t.hasPrefix("#") || t.hasPrefix("//") || t.hasPrefix("/*"):
      t.discardComment()
    default:
      return
    }
  }
}

// Returns the next token and simultaneously discards the specified number of
// characters from the source text.
func (t *Tokenizer) popToken(lexeme Lexeme, value string, length int) *Token {
  val := &Token { Lexeme: lexeme, Value: value, ExtraValue: "", LineNum: t.LineNum }
  t.Source = t.Source[length:]
  return val
}

// Returns an error token and discards the rest of the line.
func (t *Tokenizer) popError(message string) *Token {
  val := &Token { Lexeme: ERROR, Value: message, ExtraValue: "", LineNum: t.LineNum }
  t.discardLine()
  return val
}


// Helper for unquoting strings. The main difficulty is that Go strings are
// exclusively double-quoted, so single-quoted strings need to be converted
// before being passed to strconv.Unquote(...).
func unquote(chars []byte) string {
  var converted []byte
  if chars[0] == '\'' {
    converted = bytes.Replace(chars, []byte(`\'`), []byte(`'`), -1)
    converted = bytes.Replace(chars, []byte(`"`), []byte(`\"`), -1)
    converted[0] = '"'
    converted[len(converted)-1] = '"'
  } else {
    converted = chars
  }
  val, _ := strconv.Unquote(string(converted))
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
    return t.popToken(symbolLexeme[c], c, 1)
  } else if c := string(numberPattern.Find(src)); len(c) > 0 {
    return t.popToken(STRING, c, len(c))
  } else if t.hasPrefix("'") || t.hasPrefix("\"") {
    if c := matcher[STRING].Find(src); len(c) > 0 {
      unquoted := unquote(c)
      return t.popToken(STRING, unquoted, len(c))
    } else {
      return t.popError("unterminated string literal")
    }
  } else if t.hasPrefix("/") {
    if cs := regexpSlashPattern.FindSubmatch(src); len(cs) > 0 {
      pattern := cs[1]
      options := cs[3]
      val := t.popToken(REGEXP, string(pattern), len(cs[0]))
      val.ExtraValue = string(options)
      return val
    } else {
      return t.popError("unterminated regular expression literal")
    }
  } else if t.hasPrefix("`") {
    if cs := regexpBackQuotePattern.FindSubmatch(src); len(cs) > 0 {
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
    } else if c := matcher[STRING].Find(t.Source); len(c) > 0 {
      tok.Value = unquote(c)
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

/*
  The following three functions constitute the API for the tokenizer.
*/

func MakeTokenizer(src []byte) *Tokenizer {
  t := Tokenizer { Source: src, Lookahead: nil, LineNum: 1, unterminatedComment: false }
  t.Pop()
  return &t
}

func (t *Tokenizer) Peek() *Token {
  return t.Lookahead
}

func (t *Tokenizer) Pop() *Token {
  val := t.Lookahead
  t.discardWhitespaceAndComments()
  if !t.unterminatedComment {
    t.Lookahead = t.munch()
  } else {
    t.unterminatedComment = false
  }
  return val
}