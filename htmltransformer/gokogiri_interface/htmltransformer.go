package gokogiri_interface

import (
	"errors"
	"gokogiri/html"
	"gokogiri/xml"
	"gokogiri/xpath"
	ht "tritium/htmltransformer"
)

type GokogiriHtmlTransformer struct {
	document *xml.XmlDocument
	fragment *xml.DocumentFragment
}

func NewXForm() *GokogiriHtmlTransformer {
	return &GokogiriHtmlTransformer{}
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
	if xform.fragment != nil {
		return &GokogiriXmlNode{xform.fragment}
	} else {
		return &GokogiriXmlNode{xform.document}
	}
}

func (xform *GokogiriHtmlTransformer) Free() {
	xform.document.Free()
}

func (xform *GokogiriHtmlTransformer) ParseHTML(content, inEncoding, url, outEncoding []byte) (err error) {
	result, err := html.Parse(content, inEncoding, url, html.DefaultParseOption, outEncoding)
	if err != nil {
		return err
	}
	if result == nil {
		return errors.New("nil doc")
	}
	xform.document = result.XmlDocument
	return nil
}

func (xform *GokogiriHtmlTransformer) ParseFragment(content, inEncoding, url, outEncoding []byte) (frag ht.Node, err error) {
	var fragment *xml.DocumentFragment
	if xform.document != nil {
		fragment, err = xform.document.ParseFragment(content, url, xml.DefaultParseOption)
	} else {
		fragment, err = html.ParseFragment(content, inEncoding, url, html.DefaultParseOption, outEncoding)
	}
	if err != nil {
		return &GokogiriXmlNode{fragment}, err
	}
	if fragment == nil {
		return &GokogiriXmlNode{fragment}, errors.New("nil fragment")
	}
	// xform.fragment = frag
	return &GokogiriXmlNode{fragment}, nil
}

func (xform *GokogiriHtmlTransformer) ParseXML(content, inEncoding, url, outEncoding []byte) (err error) {
	result, err := xml.Parse(content, inEncoding, url, xml.DefaultParseOption, outEncoding)
	if err != nil {
		return err
	}
	if result == nil {
		return errors.New("nil doc")
	}
	xform.document = result
	return err
}

func (xform *GokogiriHtmlTransformer) CreateEmptyDocument(inEncoding, outEncoding []byte) {
	result := xml.CreateEmptyDocument(inEncoding, outEncoding)
	xform.document = result
	return
}

func (xform *GokogiriHtmlTransformer) CheckXPath(path string) (err error) {
	return xpath.Check(path)
}

func (xform *GokogiriHtmlTransformer) CompileXPath(path string) (expr ht.Expression) {
	return &GokogiriXPathExpression{*xpath.Compile(path)}
}
