package htmltransformer

import (
	"time"
)

type Node interface {
	GetAttribute(string) Node
	SetAttribute(string, string) Node
	RemoveAttribute(string) Node
	InsertBefore(interface{}) error
	InsertAfter(interface{}) error
	InsertTop(interface{}) error
	InsertBottom(interface{}) error
	GetContent() string
	SetContent(interface{}) error
	SelectXPath(interface{}) ([]Node, error)
	SelectXPathByDeadline(interface{}, *time.Time) ([]Node, error)
	String() string
	UnderlyingNode() interface{}
	// SelectCSS(string) []Node
}
