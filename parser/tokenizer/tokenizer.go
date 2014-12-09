package tokenizer

import (
	"bytes"
	"fmt"
	"tritium/dependencies/rubex"
	"strings"
	"strconv"
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
	PLUS
	STRING
	REGEXP
	POS
	GVAR
	LVAR
	KWD
	ID
	NAMESPACE
	OPEN
	FUNC
	TYPE
	PATH
	IMPORT
	OPTIONAL
	READ
	EOF
	ERROR
	NUM_LEXEMES
)

var LexemeName [NUM_LEXEMES]string
var matcher [NUM_LEXEMES]*rubex.Regexp
var symbolLexeme map[string]Lexeme
var symbolPattern *rubex.Regexp
var numberPattern *rubex.Regexp
var regexpSlashPattern *rubex.Regexp
var regexpBackQuotePattern *rubex.Regexp

func init() {
	// Is there a more elegant way to do this?
	LexemeName[LPAREN] = "`(`"
	LexemeName[RPAREN] = "`)`"
	LexemeName[LBRACE] = "`{`"
	LexemeName[RBRACE] = "`}`"
	LexemeName[COMMA] = "`,`"
	LexemeName[DOT] = "`.`"
	LexemeName[EQUAL] = "`=`"
	LexemeName[PLUS] = "`+`"
	LexemeName[STRING] = "string literal"
	LexemeName[REGEXP] = "regular expression"
	LexemeName[POS] = "position keyword"
	LexemeName[GVAR] = "global variable"
	LexemeName[LVAR] = "local variable"
	LexemeName[KWD] = "keyword argument"
	LexemeName[ID] = "identifier"
	LexemeName[NAMESPACE] = "`@namespace` directive"
	LexemeName[OPEN] = "`@include` directive"
	LexemeName[FUNC] = "`@func` directive"
	LexemeName[TYPE] = "type name"
	LexemeName[PATH] = "path"
	LexemeName[IMPORT] = "`@import` directive"
	LexemeName[OPTIONAL] = "`@optional` directive"
	LexemeName[READ] = "`read` macro"
	LexemeName[EOF] = "end of file"
	LexemeName[ERROR] = "lexical error"

	matcher[STRING] = rubex.MustCompile(`\A"(\\.|[^"\\])*"|\A'(\\.|[^'\\])*'`)

	// the pattern and options of the regexp matches are in captures 1 and 3
	//regexpSlashPattern, _ = rubex.Compile(`\A\/((\\.|[^\/\\])*)\/([imxouesn]*)`)
	regexpSlashPattern = rubex.MustCompile(`\A/((\\.|[^/\\])*)/([imxouesn]*)`)
	regexpBackQuotePattern = rubex.MustCompile("\\A`((\\\\.|[^\\`\\\\])*)`([imxouesn]*)")
	matcher[POS] = rubex.MustCompile(`\A(top|bottom|before|after)`)
	matcher[GVAR] = rubex.MustCompile(`\A\$\w+`)
	matcher[LVAR] = rubex.MustCompile(`\A%\w+`)
	matcher[KWD] = rubex.MustCompile(`\A[a-zA-Z_:][-\w:.]*:`)
	matcher[ID] = rubex.MustCompile(`\A\$+|\A[_a-z][\w\$]*`)
	matcher[TYPE] = rubex.MustCompile(`\A[A-Z]\w*`)
	matcher[PATH] = rubex.MustCompile(`\A[-+.*?:\/\w]+`)

	// Map parens, braces, etc to their lexemes
	symbolLexeme = make(map[string]Lexeme, 8)
	symbolLexeme["("] = LPAREN
	symbolLexeme[")"] = RPAREN
	symbolLexeme["{"] = LBRACE
	symbolLexeme["}"] = RBRACE
	symbolLexeme[","] = COMMA
	symbolLexeme["."] = DOT
	symbolLexeme["="] = EQUAL
	symbolLexeme["+"] = PLUS
	symbolPattern = rubex.MustCompile(`\A[\(\)\{\}\,\.=\+]`)
	numberPattern = rubex.MustCompile(`\A\d+`)
}

// A token has a type (aka lexeme), a value, and a line number
type Token struct {
	Lexeme
	Value      string
	ExtraValue string
	LineNumber int32
}

func (t *Token) Inspect() string {
	return fmt.Sprintf("[%s: %s, %s, %d]", LexemeName[t.Lexeme], t.Value, t.ExtraValue, t.LineNumber)
}

/*
  Represent a tokenizer with a struct containing the remaining source text and
  the line number. Easier than using a stateless tokenizing function that
  returns them as extra values and requires the parser to keep track of them.
*/
type Tokenizer struct {
	Source              []byte
	LineNumber          int32
	Lookahead           *Token
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
func (t *Tokenizer) discardLine() {
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
func (t *Tokenizer) discardBlockComment() {
	terminator := bytes.Index(t.Source, []byte("*/"))
	if terminator == -1 {
		t.Lookahead = &Token{Lexeme: ERROR, Value: "unterminated comment", ExtraValue: "", LineNumber: t.LineNumber}
		t.unterminatedComment = true
	}
	t.Source = t.Source[terminator+2:]
}

// Discard all leading whitespace and comments from the source text. Need to
// tally up the newlines to keep LineNumber up to date.
func (t *Tokenizer) discardWhitespaceAndComments() {
	for len(t.Source) > 0 {
		switch {
		case t.hasPrefix("\n"):
			t.LineNumber++
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
	val := &Token{Lexeme: lexeme, Value: value, ExtraValue: "", LineNumber: t.LineNumber}
	t.Source = t.Source[length:]
	return val
}

// Returns an error token and discards the rest of the line.
func (t *Tokenizer) popError(message string) *Token {
	val := &Token{Lexeme: ERROR, Value: message, ExtraValue: "", LineNumber: t.LineNumber}
	t.discardLine()
	return val
}

// Helper for unquoting strings. The main difficulty is that Go strings are
// exclusively double-quoted, so single-quoted strings need to be converted
// before being passed to strconv.Unquote(...).
func unEscape(chars string) rune {
  var converted byte
  if chars[0] == '\\' {
    switch chars[1] {
    case 'n':
      converted = '\n'
    case 't':
      converted = '\t'
    case 'b':
      converted = '\b'
    case 'r':
      converted = '\r'
    case 'f':
      converted = '\f'
    case 'v':
      converted = '\v'
    case 'a':
      converted = '\a'
    case '\\':
      converted = '\\'
    default:
      converted = chars[1]
    }
  } else {
    converted = chars[0]
  }
  return rune(converted)
}

// A better string unquoter that handles unicode sequences. Can't use Go's
// standard unquoter because we need to handle single-quoted strings too.
func unquote(chars []byte) (string, bool) {
  if !(chars[0] == '"' || chars[0] == '\'') { // it's not quoted
  	return string(chars), false
  }
  if len(chars) == 2 { // it's just the quotes
    return "", false
  }

  remainder := string(chars[1:len(chars)-1])
  quotemark := chars[0]
  result    := make([]rune, 0)

  var unquotedRune rune
  var err error
  if remainder[0] == '\\' && remainder[1] != 'u' {
    result = append(result, unEscape(remainder[0:2]))
    remainder = remainder[2:len(remainder)]
  } else {
	  unquotedRune, _, remainder, err = strconv.UnquoteChar(remainder, quotemark)
	  if err != nil {
	    return "", true
	  }
  	result = append(result, unquotedRune)
  }
  for len(remainder) > 0 {
    if remainder[0] == '\\' && remainder[1] != 'u' {
      result = append(result, unEscape(remainder[0:2]))
      remainder = remainder[2:len(remainder)]
    } else {
	    unquotedRune, _, remainder, err = strconv.UnquoteChar(remainder, quotemark)
	    if err != nil {
	      return "", true
	    }
	    result = append(result, unquotedRune)
	  }
  }
  return string(result), false
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
		if c := matcher[STRING].Find(src); len(c) > 0 {
			unquoted, err := unquote(c)

			if err {
				return t.popError("unable to interpret string literal")
			}

			// Increment line count by the number of lines the string literal spans
			lines := len(strings.Split(string(c), "\n")) - 1
			t.LineNumber += int32(lines)

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
		if c == "top" || c == "bottom" || c == "before" || c == "after" {
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
			var err bool
			tok.Value, err = unquote(c)
			if err {
				tok = t.popError("illegal characters in import path")
			}
			t.Source = t.Source[len(c):]
		} else {
			tok = t.popError("malformed import")
		}
		return tok
	} else if t.hasPrefix("@optional") {
		tok := t.popToken(OPTIONAL, "", 9)
		t.discardWhitespaceAndComments()
		if c := string(matcher[PATH].Find(t.Source)); len(c) > 0 {
			tok.Value = c
			t.Source = t.Source[len(c):]
		} else if c := matcher[STRING].Find(t.Source); len(c) > 0 {
			var err bool
			tok.Value, err = unquote(c)
			if err {
				tok = t.popError("illegal characters in import path")
			}
			t.Source = t.Source[len(c):]
		} else {
			tok = t.popError("malformed optional import")
		}
		return tok
	} else if t.hasPrefix("@func") {
		return t.popToken(FUNC, "", 5)
	} else if t.hasPrefix("@namespace") {
		return t.popToken(NAMESPACE, "", 10)
	} else if t.hasPrefix("@open") {
		return t.popToken(OPEN, "", 5)
	} else {
		return t.popError("unrecognized token")
	}
	return t.popError("unrecognized token")
}

/*
  The following three functions constitute the API for the tokenizer.
*/

func MakeTokenizer(src []byte) *Tokenizer {
	t := Tokenizer{Source: src, Lookahead: nil, LineNumber: 1, unterminatedComment: false}
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
