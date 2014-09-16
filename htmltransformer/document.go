package htmltransformer

// import (
// "gokogiri/xml"
// "unsafe"
// )

type Document interface {
	/* Nokogiri APIs */
	CreateElementNode(string) Node    //*ElementNode
	CreateCDataNode(string) Node      // *CDataNode
	CreateTextNode(string) Node       // *TextNode
	CreateCommentNode(string) Node    // *CommentNode
	CreatePINode(string, string) Node // *ProcessingInstructionNode
	// ParseFragment([]byte, []byte, ParseOption) (*DocumentFragment, error)

	// DocPtr() unsafe.Pointer
	// DocType() NodeType
	// DocRef() Document
	// InputEncoding() []byte
	// OutputEncoding() []byte
	// // DocXPathCtx() *xpath.XPath
	// AddUnlinkedNode(unsafe.Pointer)
	// RemoveUnlinkedNode(unsafe.Pointer) bool
	// Free()
	String() string
	Root() Node // *ElementNode
	// NodeById(string) Node // *ElementNode
	// // BookkeepFragment(*DocumentFragment)

	// RecursivelyRemoveNamespaces() error
	// UnparsedEntityURI(string) string
	// Uri() string
}

// // ParseOption values allow you to tune the behaviour of the parsing engine.
// type XmlParseOption int

// const (
// 	XML_PARSE_RECOVER    ParseOption = 1 << iota // recover on errors
// 	XML_PARSE_NOENT                              // substitute entities
// 	XML_PARSE_DTDLOAD                            // load the external subset
// 	XML_PARSE_DTDATTR                            // default DTD attributes
// 	XML_PARSE_DTDVALID                           // validate with the DTD
// 	XML_PARSE_NOERROR                            // suppress error reports
// 	XML_PARSE_NOWARNING                          // suppress warning reports
// 	XML_PARSE_PEDANTIC                           // pedantic error reporting
// 	XML_PARSE_NOBLANKS                           // remove blank nodes
// 	XML_PARSE_SAX1                               // use the SAX1 interface internally
// 	XML_PARSE_XINCLUDE                           // Implement XInclude substitition
// 	XML_PARSE_NONET                              // Forbid network access
// 	XML_PARSE_NODICT                             // Do not reuse the context dictionnary
// 	XML_PARSE_NSCLEAN                            // remove redundant namespaces declarations
// 	XML_PARSE_NOCDATA                            // merge CDATA as text nodes
// 	XML_PARSE_NOXINCNODE                         // do not generate XINCLUDE START/END nodes
// 	XML_PARSE_COMPACT                            // compact small text nodes; makes tree read-only
// 	XML_PARSE_OLD10                              // parse using XML-1.0 before update 5
// 	XML_PARSE_NOBASEFIX                          // do not fixup XINCLUDE xml//base uris
// 	XML_PARSE_HUGE                               // relax any hardcoded limit from the parser
// 	XML_PARSE_OLDSAX                             // parse using SAX2 interface before 2.7.0
// 	XML_PARSE_IGNORE_ENC                         // ignore internal document encoding hint
// 	XML_PARSE_BIG_LINES                          // Store big lines numbers in text PSVI field
// )

// //DefaultParseOption provides liberal parsing highly tolerant of invalid documents. Errors and warnings
// // are suppressed and the DTD is not processed.
// const DefaultParseOption ParseOption = XML_PARSE_RECOVER |
// 	XML_PARSE_NONET |
// 	XML_PARSE_NOERROR |
// 	XML_PARSE_NOWARNING

// //StrictParseOption provides standard-compliant parsing. The DTD is processed, entity
// // substitions are made, and errors and warnings are reported back.
// const StrictParseOption ParseOption = XML_PARSE_NOENT |
// 	XML_PARSE_DTDLOAD |
// 	XML_PARSE_DTDATTR |
// 	XML_PARSE_NOCDATA

// //DefaultEncoding is UTF-8, which is also the default for both libxml2 and Go strings.
// const DefaultEncoding = "utf-8"

// var ERR_FAILED_TO_PARSE_XML = errors.New("failed to parse xml input")

// type XmlDocumentLegacy struct {
// 	xml.XmlDocument

// 	// Ptr *C.xmlDoc
// 	// Me Document
// 	// Node
// 	// InEncoding    []byte
// 	// OutEncoding   []byte
// 	// UnlinkedNodes map[*C.xmlNode]bool
// 	// XPathCtx      *xpath.XPath
// 	// Type          NodeType
// 	// InputLen      int

// 	// fragments []*DocumentFragment //save the pointers to free them when the doc is freed
// }

// type ElementNode struct {
// 	*XmlNode
// }

// func (document *XmlDocumentLegacy) CreateElementNode(tag string) (element *ElementNode) {
// 	//gokogiri/xml/document.go
// }

// func (document *XmlDocumentLegacy) Root() (element *ElementNode) {
// 	//gokogiri/xml/document.go
// }

// func (document *XmlDocumentLegacy) CreateCDataNode(data string) (cdata *CDataNode) {
// 	//gokogiri/xml/document.go
// }

// //xml parse option
// const (
// 	HTML_PARSE_RECOVER   xml.ParseOption = 1 << 0  /* Relaxed parsing */
// 	HTML_PARSE_NODEFDTD  xml.ParseOption = 1 << 2  /* do not default a doctype if not found */
// 	HTML_PARSE_NOERROR   xml.ParseOption = 1 << 5  /* suppress error reports */
// 	HTML_PARSE_NOWARNING xml.ParseOption = 1 << 6  /* suppress warning reports */
// 	HTML_PARSE_PEDANTIC  xml.ParseOption = 1 << 7  /* pedantic error reporting */
// 	HTML_PARSE_NOBLANKS  xml.ParseOption = 1 << 8  /* remove blank nodes */
// 	HTML_PARSE_NONET     xml.ParseOption = 1 << 11 /* Forbid network access */
// 	HTML_PARSE_NOIMPLIED xml.ParseOption = 1 << 13 /* Do not add implied html/body... elements */
// 	HTML_PARSE_COMPACT   xml.ParseOption = 1 << 16 /* compact small text nodes */
// )

// const EmptyHtmlDoc = ""

// //default parsing option: relax parsing
// var DefaultParseOption xml.ParseOption = HTML_PARSE_RECOVER |
// 	HTML_PARSE_NONET |
// 	HTML_PARSE_NOERROR |
// 	HTML_PARSE_NOWARNING

// type HtmlDocument struct {
// 	*xml.XmlDocument
// }

// func (hd *HtmlDocument) SetMetaEncoding(encoding string) (err error) {
// 	// gokogiri/html/document.go
// }

// type DocumentFragment struct {
// 	Node
// 	InEncoding  []byte
// 	OutEncoding []byte
// }
