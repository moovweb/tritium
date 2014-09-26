package htmltransformer

type HtmlTransformer interface {
	Parse([]byte, []byte, []byte, XmlParseOption, []byte) (Document, error)                 // (*HtmlDocument, error)
	ParseFragment([]byte, []byte, []byte, XmlParseOption, []byte) (DocumentFragment, error) // (*xml.DocumentFragment, error)
}

type XmlTransformer interface {
	Parse([]byte, []byte, []byte, XmlParseOption, []byte) (Document, error) // (*XmlDocument, error)
	CreateEmptyDocument([]byte, []byte) Document                            // *XmlDocument
}

type XPathTransformer interface {
	Check(string) error
}

type XmlParseOption int

// type HtmlTransformerLegacy struct {
// }

// // type HtmlTransformerCurrent struct {

// // }

// func (ht *HtmlTransformerLegacy) HtmlParse(content, inEncoding, url []byte, options xml.ParseOption, outEncoding []byte) (doc *HtmlDocument, err error) {
// 	// gokogiri/html/document.go
// }

// // func (ht *HtmlTransformerCurrent) HtmlParse(content, inEncoding, url []byte, options xml.ParseOption, outEncoding []byte) (doc *HtmlDocument, err error) {
// //   // gokogiri/html/document.go
// // }

// func (ht *HtmlTransformerLegacy) HtmlParseFragment(content, inEncoding, url []byte, options xml.ParseOption, outEncoding []byte) (fragment *xml.DocumentFragment, err error) {
// 	// gokogiri/html/fragment.go
// }

// // func (ht *HtmlTransformerCurrent) HtmlParseFragment(content, inEncoding, url []byte, options xml.ParseOption, outEncoding []byte) (fragment *xml.DocumentFragment, err error) {
// //   // gokogiri/html/fragment.go
// // }

// func (ht *HtmlTransformerLegacy) XmlParse(content, inEncoding, url []byte, options ParseOption, outEncoding []byte) (doc *XmlDocument, err error) {
// 	// gokogiri/xml/document.go
// }

// // func (ht *HtmlTransformerCurrent) XmlParse(content, inEncoding, url []byte, options ParseOption, outEncoding []byte) (doc *XmlDocument, err error) {
// //   // gokogiri/xml/document.go
// // }

// func (ht *HtmlTransformerLegacy) XmlCreateEmptyDocument(inEncoding, outEncoding []byte) (doc *XmlDocument) {
// 	// gokogiri/xml/document.go
// }

// // func (ht *HtmlTransformerCurrent) XmlCreateEmptyDocument(inEncoding, outEncoding []byte) (doc *XmlDocument) {
// //   // gokogiri/xml/document.go
// // }

// func (ht *HtmlTransformerLegacy) Check(path string) (err error) {
// 	// gokogiri/xpath/expressions.go
// }
