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
	FirstChild() Node
	LastChild() Node
	PreviousSibling() Node
	NextSibling() Node
	Parent() Node
	GetContent() string
	SetContent(interface{}) error
	SelectXPath(interface{}) ([]Node, error)
	SelectXPathByDeadline(interface{}, *time.Time) ([]Node, error)
	SelectCSS(string) ([]Node, error)
	SelectCSSByDeadline(string, *time.Time) ([]Node, error)
	String() string
	UnderlyingNode() interface{}
	IsValid() bool
	Remove()
	IsDocument() bool
	IsElement() bool
	IsText() bool
	GetInnerHtml() string
	SetInnerHtml(interface{}) error
	Is(Node) bool
	GetName() string
	SetName(string)
	Duplicate() Node
	Path() string
}
