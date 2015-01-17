package htmltransformer

type HtmlTransformer interface {
	//document functions
	CreateElementNode(string) Node
	CreateCDataNode(string) Node
	String() string
	Root() (Node, Node)
	Free()
	SetMetaEncoding(string) error

	// parsing functions
	ParseHTML([]byte, []byte, []byte, []byte) error
	ParseFragment([]byte, []byte, []byte, []byte) (Node, error)
	ParseXML([]byte, []byte, []byte, []byte) error
	CreateEmptyDocument([]byte, []byte)

	// xpath functions
	CheckXPath(string) error
	CompileXPath(string) Selector

	// css functions
	ConvertCSS(string) string
}
