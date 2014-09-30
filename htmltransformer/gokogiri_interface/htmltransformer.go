package gokogiri_interface

import (
	"gokogiri/html"
	"gokogiri/xml"
	"gokogiri/xpath"
	ht "tritium/htmltransformer"
)

type GokogiriHtmlTransformer struct {
	document xml.XmlDocument
	fragment xml.DocumentFragment
}

func NewXForm() GokogiriHtmlTransformer {
	return GokogiriHtmlTransformer{}
}

func (xform *GokogiriHtmlTransformer) CreateElementNode(tag string) ht.Node {
	return &GokogiriXmlNode{xform.document.CreateElementNode(tag)}
}

func (xform *GokogiriHtmlTransformer) CreateCDataNode(data string) ht.Node {
	return &GokogiriXmlNode{xform.document.CreateCDataNode(data)}
}

func (xform *GokogiriHtmlTransformer) String() string {
	return xform.document.String()
}

func (xform *GokogiriHtmlTransformer) Root() ht.Node {
	return &GokogiriXmlNode{xform.document.Root()}
}

func (xform *GokogiriHtmlTransformer) ParseHTML(content, inEncoding, url, outEncoding []byte) (err error) {
	result, err := html.Parse(content, inEncoding, url, html.DefaultParseOption, outEncoding)
	// doc = &GokogiriXmlDocument{*result.XmlDocument}
	xform.document = *result.XmlDocument
	return err
}

func (xform *GokogiriHtmlTransformer) ParseFragment(content, inEncoding, url, outEncoding []byte) (err error) {
	result, err := html.ParseFragment(content, inEncoding, url, html.DefaultParseOption, outEncoding)
	// frag = &GokogiriXmlDocumentFragment{*result}
	xform.fragment = *result
	return err
}

func (xform *GokogiriHtmlTransformer) ParseXML(content, inEncoding, url, outEncoding []byte) (err error) {
	result, err := xml.Parse(content, inEncoding, url, xml.DefaultParseOption, outEncoding)
	// doc = &GokogiriXmlDocument{*result}
	xform.document = *result
	return err
}

func (xform *GokogiriHtmlTransformer) CreateEmptyDocument(inEncoding, outEncoding []byte) {
	result := xml.CreateEmptyDocument(inEncoding, outEncoding)
	// doc = &GokogiriXmlDocument{*result}
	xform.document = *result
	return
}

func (xform *GokogiriHtmlTransformer) CheckXPath(path string) (err error) {
	return xpath.Check(path)
}
