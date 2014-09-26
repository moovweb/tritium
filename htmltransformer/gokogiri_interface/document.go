package gokogiri_interface

import (
	"gokogiri/xml"
	// ht "tritium/htmltransformer"
)

type GokogiriXmlDocument struct {
	xml.XmlDocument
}

// func (doc *GokogiriXmlDocument) CreateElementNode(tag string) ht.Node {
// 	// return doc.XmlDoc.CreateElementNode(tag)
// 	return &GokogiriXmlNode{doc.CreateElementNode(tag)}
// }

// func (doc *GokogiriXmlDocument) CreateCDataNode(data string) ht.Node {
// 	return &GokogiriXmlNode{doc.CreateCDataNode(data)}
// }

// func (doc *GokogiriXmlDocument) CreateTextNode(data string) ht.Node {
// 	return &GokogiriXmlNode{doc.CreateTextNode(data)}
// }

// func (doc *GokogiriXmlDocument) CreateCommentNode(data string) ht.Node {
// 	return &GokogiriXmlNode{doc.CreateCommentNode(data)}
// }

// func (doc *GokogiriXmlDocument) CreatePINode(name, data string) ht.Node {
// 	return &GokogiriXmlNode{doc.CreatePINode(name, data)}
// }

// func (doc *GokogiriXmlDocument) String() string {
// 	return doc.String()
// }

// func (doc *GokogiriXmlDocument) Root() ht.Node {
// 	return &GokogiriXmlNode{doc.Root()}
// }
