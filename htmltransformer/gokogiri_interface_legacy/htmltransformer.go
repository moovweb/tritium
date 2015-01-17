package gokogiri_interface_legacy

import (
	"errors"
	"gokogiri_legacy/css"
	"gokogiri_legacy/html"
	"gokogiri_legacy/mem"
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
	} else if xform.fragment != nil {
		return &GokogiriXmlNode{xform.fragment.Node.MyDocument().CreateElementNode(tag)}
	} else {
		return &GokogiriXmlNode{}
	}
}

func (xform *GokogiriHtmlTransformer) CreateCDataNode(data string) ht.Node {
	if xform.document != nil {
		return &GokogiriXmlNode{xform.document.CreateCDataNode(data)}
	} else if xform.fragment != nil {
		return &GokogiriXmlNode{xform.fragment.Node.MyDocument().CreateCDataNode(data)}
	} else {
		return &GokogiriXmlNode{}
	}
}

func (xform *GokogiriHtmlTransformer) String() (str string) {
	if xform.document != nil {
		return xform.document.String()
	} else if xform.fragment != nil {
		return xform.fragment.String()
	} else {
		return ""
	}
}

func (xform *GokogiriHtmlTransformer) Root() (ht.Node, ht.Node) {
	if xform.document != nil {
		return &GokogiriXmlNode{xform.document}, &GokogiriXmlNode{xform.document.Root()}
	} else {
		// we don't care if it's nil here
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

func (xform *GokogiriHtmlTransformer) SetMetaEncoding(encoding string) (err error) {
	if xform.document != nil {
		newdoc := html.HtmlDocument{xform.document}
		err = newdoc.SetMetaEncoding(encoding)
	}
	return
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
	return
}

func (xform *GokogiriHtmlTransformer) ParseFragment(content, inEncoding, url, outEncoding []byte) (frag ht.Node, err error) {
	var fragment *xml.DocumentFragment
	if xform.document != nil {
		newdoc := html.HtmlDocument{xform.document}
		fragment, err = newdoc.ParseFragment(content, url, xml.DefaultParseOption)
	} else {
		fragment, err = html.ParseFragment(content, inEncoding, url, html.DefaultParseOption, outEncoding)
	}
	xform.fragment = fragment
	if err != nil {
		return &GokogiriXmlNode{}, err
	}
	if fragment == nil {
		return &GokogiriXmlNode{}, errors.New("nil fragment")
	}
	return &GokogiriXmlNode{fragment}, nil
}

func (xform *GokogiriHtmlTransformer) ParseXML(content, inEncoding, url, outEncoding []byte) error {
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

func (xform *GokogiriHtmlTransformer) CheckXPath(path string) error {
	return xpath.Check(path)
}

func (xform *GokogiriHtmlTransformer) CompileXPath(path string) ht.Selector {
	exp := xpath.Compile(path)
	if exp != nil {
		return &GokogiriXPathSelector{*exp}
	}
	return nil
}

func (xform *GokogiriHtmlTransformer) ConvertCSS(input string) string {
	return css.Convert(input, css.LOCAL)
}

func GetLibXMLMemInfo() {
	mem.FunctionThatDoesSomething()
}
