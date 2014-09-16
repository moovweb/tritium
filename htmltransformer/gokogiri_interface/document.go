package gokogiri_interface

import (
	"gokogiri/xml"
	ht "tritium/htmltransformer"
)

type GokogiriXmlDocument struct {
	XmlDoc *xml.XmlDocument
}

func (doc *GokogiriXmlDocument) CreateElementNode(tag string) ht.Node {
	// return doc.XmlDoc.CreateElementNode(tag)
	return &GokogiriNode{doc.XmlDoc.CreateElementNode(tag)}
}

func (doc *GokogiriXmlDocument) CreateCDataNode(data string) ht.Node {
	return doc.XmlDoc.CreateCDataNode(data)
}

func (doc *GokogiriXmlDocument) CreateTextNode(data string) ht.Node {
	return doc.XmlDoc.CreateTextNode(data)
}

func (doc *GokogiriXmlDocument) CreateCommentNode(data string) ht.Node {
	return doc.XmlDoc.CreateCommentNode(data)
}

func (doc *GokogiriXmlDocument) CreatePINode(name, data string) ht.Node {
	return doc.XmlDoc.CreatePINode(name, data)
}

func (doc *GokogiriXmlDocument) String() string {
	return doc.XmlDoc.String()
}

func (doc *GokogiriXmlDocument) Root() ht.Node {
	return doc.XmlDoc.Root()
}
