package gokogiri_interface_legacy

import (
	"errors"
	"gokogiri_legacy/css"
	"gokogiri_legacy/html"
	"gokogiri_legacy/xml"
	"gokogiri_legacy/xpath"
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
	if xform.document != nil {
		return &GokogiriXmlNode{xform.document.CreateElementNode(tag)}
	} else {
		return &GokogiriXmlNode{xform.fragment.Node.MyDocument().CreateElementNode(tag)}
	}
}

// func (xform *GokogiriHtmlTransformer) Document() ht.Node {
// 	if xform.document == nil {
// 		return nil
// 	} else {
// 		return &GokogiriXmlNode{xform.document}
// 	}
// }

// func (xform *GokogiriHtmlTransformer) Fragment() ht.Node {
// 	if xform.fragment == nil {
// 		return nil
// 	} else {
// 		return &GokogiriXmlNode{xform.fragment}
// 	}
// }

func (xform *GokogiriHtmlTransformer) CreateCDataNode(data string) ht.Node {
	if xform.document != nil {
		return &GokogiriXmlNode{xform.document.CreateCDataNode(data)}
	} else {
		return &GokogiriXmlNode{xform.fragment.Node.MyDocument().CreateCDataNode(data)}
	}
}

func (xform *GokogiriHtmlTransformer) String() string {
	if xform.document != nil {
		return xform.document.String()
	} else {
		return xform.fragment.String()
	}
}

func (xform *GokogiriHtmlTransformer) Root() (doc ht.Node, docroot ht.Node) {
	if xform.document != nil {
		return &GokogiriXmlNode{xform.document}, &GokogiriXmlNode{xform.document.Root()}
	} else {
		return &GokogiriXmlNode{xform.fragment}, nil
	}
}

func (xform *GokogiriHtmlTransformer) Free() {
	if xform.document != nil {
		xform.document.Free()
	}
	if xform.fragment != nil {
		xform.fragment.Remove()
	}
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
		newdoc := html.HtmlDocument{xform.document}
		fragment, err = newdoc.ParseFragment(content, url, xml.DefaultParseOption)
		// xform.document = newdoc.XmlDocument
	} else {
		// xform.document = xml.CreateEmptyDocument(inEncoding, outEncoding)
		fragment, err = html.ParseFragment(content, inEncoding, url, html.DefaultParseOption, outEncoding)
		// fragment, err = xform.document.ParseFragment(content, url, xml.DefaultParseOption)
	}
	xform.fragment = fragment
	if err != nil {
		return &GokogiriXmlNode{fragment}, err
	}
	if fragment == nil {
		return &GokogiriXmlNode{fragment}, errors.New("nil fragment")
	}
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
	exp := xpath.Compile(path)
	if exp != nil {
		return &GokogiriXPathExpression{*exp}
	} else {
		return nil
	}
}

func (xform *GokogiriHtmlTransformer) ConvertCSS(input string) (xpath string) {
	return css.Convert(input, css.LOCAL)
}
