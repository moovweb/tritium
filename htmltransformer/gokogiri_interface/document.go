package gokogiri_interface

import (
	"gokogiri/xml"
	ht "tritium/htmltransformer"
)

type GokogiriXmlDocument struct {
	xml.XmlDocument
}

func (doc *GokogiriXmlDocument) CreateElementNode(tag string) ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.CreateElementNode(tag)}
}

func (doc *GokogiriXmlDocument) CreateCDataNode(data string) ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.CreateCDataNode(data)}
}

func (doc *GokogiriXmlDocument) CreateTextNode(data string) ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.CreateTextNode(data)}
}

func (doc *GokogiriXmlDocument) CreateCommentNode(data string) ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.CreateCommentNode(data)}
}

func (doc *GokogiriXmlDocument) CreatePINode(name, data string) ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.CreatePINode(name, data)}
}

func (doc *GokogiriXmlDocument) String() string {
	return doc.XmlDocument.String()
}

func (doc *GokogiriXmlDocument) Root() ht.Node {
	return &GokogiriXmlNode{doc.XmlDocument.Root()}
}
