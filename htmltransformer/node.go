package htmltransformer

import (
	"time"
)

type Node interface {
	// attributes
	GetAttribute(string) Node
	SetAttribute(string, string) Node
	RemoveAttribute(string) Node

	// insertion
	InsertBefore(interface{}) error
	InsertAfter(interface{}) error
	InsertTop(interface{}) error
	InsertBottom(interface{}) error

	// axis
	FirstChild() Node
	LastChild() Node
	PreviousSibling() Node
	NextSibling() Node
	Parent() Node

	//selection
	SelectXPath(interface{}) ([]Node, error)
	SelectXPathByDeadline(interface{}, *time.Time) ([]Node, error)
	SelectCSS(string) ([]Node, error)
	SelectCSSByDeadline(string, *time.Time) ([]Node, error)

	//content
	String() string
	GetContent() string
	SetContent(interface{}) error
	GetInnerHtml() string
	SetInnerHtml(interface{}) error
	GetName() string
	SetName(string)

	// introspetion
	UnderlyingNode() interface{}
	IsValid() bool
	IsDocument() bool
	IsElement() bool
	IsText() bool
	Is(Node) bool
	Path() string

	// maintenance
	Remove()
	Duplicate() Node
}
