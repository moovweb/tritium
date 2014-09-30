package htmltransformer

type HtmlTransformer interface {
	//document functions
	CreateElementNode(string) Node //*ElementNode
	CreateCDataNode(string) Node   // *CDataNode
	String() string
	Root() Node // *ElementNode

	// parsing functions
	ParseHTML([]byte, []byte, []byte, []byte) error     // (*HtmlDocument, error)
	ParseFragment([]byte, []byte, []byte, []byte) error // (*xml.DocumentFragment, error)
	ParseXML([]byte, []byte, []byte, []byte) error      // (*XmlDocument, error)
	CreateEmptyDocument([]byte, []byte)                 // *XmlDocument

	CheckXPath(string) error
	CompileXPath(string) Expression
}
