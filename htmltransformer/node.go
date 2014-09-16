package htmltransformer

import (
	// 	"gokogiri/xml"
	// 	"unsafe"
	"time"
)

// NodeType is an enumeration that indicates the type of XmlNode.
// type NodeType int

// const (
// 	XML_ELEMENT_NODE NodeType = iota + 1
// 	XML_ATTRIBUTE_NODE
// 	XML_TEXT_NODE
// 	XML_CDATA_SECTION_NODE
// 	XML_ENTITY_REF_NODE
// 	XML_ENTITY_NODE
// 	XML_PI_NODE
// 	XML_COMMENT_NODE
// 	XML_DOCUMENT_NODE
// 	XML_DOCUMENT_TYPE_NODE
// 	XML_DOCUMENT_FRAG_NODE
// 	XML_NOTATION_NODE
// 	XML_HTML_DOCUMENT_NODE
// 	XML_DTD_NODE
// 	XML_ELEMENT_DECL
// 	XML_ATTRIBUTE_DECL
// 	XML_ENTITY_DECL
// 	XML_NAMESPACE_DECL
// 	XML_XINCLUDE_START
// 	XML_XINCLUDE_END
// 	XML_DOCB_DOCUMENT_NODE
// )

// // SerializationOption is a set of flags used to control how a node is written out.
// type SerializationOption int

// const (
// 	XML_SAVE_FORMAT   SerializationOption = 1 << iota // format save output
// 	XML_SAVE_NO_DECL                                  //drop the xml declaration
// 	XML_SAVE_NO_EMPTY                                 //no empty tags
// 	XML_SAVE_NO_XHTML                                 //disable XHTML1 specific rules
// 	XML_SAVE_XHTML                                    //force XHTML1 specific rules
// 	XML_SAVE_AS_XML                                   //force XML serialization on HTML doc
// 	XML_SAVE_AS_HTML                                  //force HTML serialization on XML doc
// 	XML_SAVE_WSNONSIG                                 //format with non-significant whitespace
// )

// // NamespaceDeclaration represents a namespace declaration, providing both the prefix and the URI of the namespace.
// // It is returned by the DeclaredNamespaces function.
// type NamespaceDeclaration struct {
// 	Prefix string
// 	Uri    string
// }

type Node interface {
	// NodePtr() unsafe.Pointer
	// ResetNodePtr()
	// MyDocument() Document

	// IsValid() bool

	// // ParseFragment([]byte, []byte, ParseOption) (*DocumentFragment, error)
	// LineNumber() int

	// //
	// NodeType() NodeType
	// NextSibling() Node
	// PreviousSibling() Node

	// Parent() Node
	// FirstChild() Node
	// LastChild() Node
	// CountChildren() int
	// Attributes() map[string]Node //*AttributeNode

	// Coerce(interface{}) ([]Node, error)

	// AddChild(interface{}) error
	// AddPreviousSibling(interface{}) error
	// AddNextSibling(interface{}) error
	// InsertBefore(interface{}) error
	// InsertAfter(interface{}) error
	// InsertBegin(interface{}) error
	// InsertEnd(interface{}) error
	// SetInnerHtml(interface{}) error
	// SetChildren(interface{}) error
	// Replace(interface{}) error
	// Wrap(string) error

	// SetContent(interface{}) error

	// Name() string
	// SetName(string)

	// Attr(string) string
	// SetAttr(string, string) string
	// SetNsAttr(string, string, string) string
	// Attribute(string) Node //*AttributeNode

	// Path() string

	// Duplicate(int) Node
	// DuplicateTo(Document, int) Node

	// Search(interface{}) ([]Node, error)
	// // SearchWithVariables(interface{}, xpath.VariableScope) ([]Node, error)
	SearchByDeadline(interface{}, *time.Time) ([]Node, error)
	// // EvalXPath(interface{}, xpath.VariableScope) (interface{}, error)
	// // EvalXPathAsBoolean(interface{}, xpath.VariableScope) bool

	// Unlink()
	// Remove()
	// ResetChildren()

	// SerializeWithFormat(SerializationOption, []byte, []byte) ([]byte, int)
	// ToXml([]byte, []byte) ([]byte, int)
	// ToUnformattedXml() string
	// ToHtml([]byte, []byte) ([]byte, int)
	// ToBuffer([]byte) []byte
	// String() string
	// Content() string
	// InnerHtml() string

	// RecursivelyRemoveNamespaces() error
	// Namespace() string
	// SetNamespace(string, string)
	// DeclareNamespace(string, string)
	// RemoveDefaultNamespace()
	// DeclaredNamespaces() []NamespaceDeclaration
}

// type XmlNode struct {
// 	xml.XmlNode
// }

// func (xmlNode *XmlNode) SearchByDeadline(data interface{}, deadline *time.Time) (result []Node, err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Attribute(name string) (attribute *AttributeNode) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) SetAttr(name, value string) (val string) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) IsValid() bool {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) NodeType() (nodeType NodeType) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) MyDocument() (document Document) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Remove() {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Content() string {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) InnerHtml() string {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) SetInnerHtml(data interface{}) (err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) NodePtr() (p unsafe.Pointer) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) FirstChild() Node {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) NextSibling() Node {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Name() (name string) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) SetName(name string) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) SetContent(content interface{}) (err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Duplicate(level int) Node {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) String() string {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) ResetChildren() {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) AddChild(data interface{}) (err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Coerce(data interface{}) (nodes []Node, err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Path() (path string) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Wrap(data string) (err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Parent() Node {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) CountChildren() int {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) Attr(name string) (val string) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) InsertBefore(data interface{}) (err error) {
// 	// gokogiri/xml/node.go
// }

// func (xmlNode *XmlNode) InsertAfter(data interface{}) (err error) {
// 	// gokogiri/xml/node.go
// }

// type AttributeNode struct {
// 	*XmlNode
// }

// func (attrNode *AttributeNode) Value() string {
// 	// gokogiri/xml/attribute.go
// }

// func (attrNode *AttributeNode) SetValue(val interface{}) {
// 	// gokogiri/xml/attribute.go
// }
