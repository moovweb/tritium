package gokogiri_interface

import (
	"gokogiri/css"
	"gokogiri/xml"
	"gokogiri/xpath"
	"time"
	ht "tritium/htmltransformer"
)

type GokogiriXmlNode struct {
	xml.Node
}

func (node *GokogiriXmlNode) GetAttribute(name string) (attribute ht.Node) {
	attr := node.Attribute(name)
	if attr == nil {
		return nil
		// node.SetAttr(name, "")
		// attr = node.Attribute(name)
	}
	return &GokogiriXmlNode{attr}
}

func (node *GokogiriXmlNode) SetAttribute(name, value string) (attribute ht.Node) {
	node.SetAttr(name, value)
	attr := node.Attribute(name)
	return &GokogiriXmlNode{attr}
}

func (node *GokogiriXmlNode) RemoveAttribute(name string) (result ht.Node) {
	attr := node.Attribute(name)
	if attr != nil {
		attr.Remove()
	}
	return &GokogiriXmlNode{node.Node}
}

func (node *GokogiriXmlNode) InsertBefore(data interface{}) (err error) {
	// err = node.Node.InsertBefore(data)

	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.Node.InsertBefore(typecasted)
		default:
			println(nodified)
			return
		}
	case GokogiriXmlNode:
		err = node.Node.InsertBefore(nodified.Node)
	default:
		return
	}

	return
}

func (node *GokogiriXmlNode) InsertAfter(data interface{}) (err error) {
	// err = node.Node.InsertAfter(data)

	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.Node.InsertAfter(typecasted)
		default:
			println(nodified)
			return
		}
	case GokogiriXmlNode:
		err = node.Node.InsertAfter(nodified.Node)
	default:
		return
	}

	return
}

func (node *GokogiriXmlNode) InsertTop(data interface{}) (err error) {

	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			first := node.Node.FirstChild()
			if first != nil {
				err = first.AddPreviousSibling(typecasted)
			} else {
				err = node.AddChild(typecasted)
			}
		default:
			return
		}
	case GokogiriXmlNode:
		first := node.Node.FirstChild()
		if first != nil {
			err = first.AddPreviousSibling(nodified.Node)
		} else {
			err = node.AddChild(nodified.Node)
		}
	default:
		return
	}
	return
}

func (node *GokogiriXmlNode) InsertBottom(data interface{}) (err error) {
	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.AddChild(typecasted)
		default:
			return
		}
	case GokogiriXmlNode:
		err = node.AddChild(nodified.Node)
	default:
		return
	}
	return
}

func (node *GokogiriXmlNode) FirstChild() (result ht.Node) {
	if node.Node.FirstChild() != nil {
		return &GokogiriXmlNode{node.Node.FirstChild()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) LastChild() (result ht.Node) {
	if node.Node.LastChild() != nil {
		return &GokogiriXmlNode{node.Node.LastChild()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) PreviousSibling() (result ht.Node) {
	if node.Node.PreviousSibling() != nil {
		return &GokogiriXmlNode{node.Node.PreviousSibling()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) NextSibling() (result ht.Node) {
	if node.Node.NextSibling() != nil {
		return &GokogiriXmlNode{node.Node.NextSibling()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) Parent() (result ht.Node) {
	if node.Node.Parent() != nil {
		return &GokogiriXmlNode{node.Node.Parent()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) GetContent() (content string) {
	return node.Content()
}

func (node *GokogiriXmlNode) SetContent(content interface{}) (err error) {
	err = node.Node.SetContent(content)
	return
}

func (node *GokogiriXmlNode) SelectXPath(data interface{}) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	var res []xml.Node
	switch xptype := data.(type) {
	case ht.Expression:
		underlying := xptype.UnderlyingExpression()
		switch typecasted := underlying.(type) {
		case xpath.Expression:
			res, err = node.Search(&typecasted)
		default:
		}
	case GokogiriXPathExpression:
		res, err = node.Search(&xptype.Expression)
	default:
		res, err = node.Search(data)
	}

	if err != nil {
		println(err.Error())
	}

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) SelectXPathByDeadline(data interface{}, deadline *time.Time) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	var res []xml.Node
	switch xptype := data.(type) {
	case ht.Expression:
		underlying := xptype.UnderlyingExpression()
		switch typecasted := underlying.(type) {
		case xpath.Expression:
			res, err = node.SearchByDeadline(&typecasted, deadline)
		default:
		}
	case GokogiriXPathExpression:
		res, err = node.SearchByDeadline(&xptype.Expression, deadline)
	default:
	}

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) SelectCSS(data string) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	xpathdata := css.Convert(data, css.LOCAL)

	res, err := node.Search(xpathdata)

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) SelectCSSByDeadline(data string, deadline *time.Time) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	xpathdata := css.Convert(data, css.LOCAL)

	res, err := node.SearchByDeadline(xpathdata, deadline)

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) String() (result string) {
	return node.Node.String()
}

func (node *GokogiriXmlNode) UnderlyingNode() (result interface{}) {
	return node.Node
}

func (node *GokogiriXmlNode) IsValid() (result bool) {
	return node.Node.IsValid()
}

func (node *GokogiriXmlNode) Remove() {
	node.Node.Remove()
}

func (node *GokogiriXmlNode) IsDocument() (result bool) {
	t := node.NodeType()
	if t == xml.XML_DOCUMENT_NODE || t == xml.XML_HTML_DOCUMENT_NODE {
		result = true
	} else {
		result = false
	}
	return
}

func (node *GokogiriXmlNode) IsElement() (result bool) {
	t := node.NodeType()
	if t == xml.XML_ELEMENT_NODE {
		result = true
	} else {
		result = false
	}
	return
}

func (node *GokogiriXmlNode) IsText() (result bool) {
	t := node.NodeType()
	if t == xml.XML_TEXT_NODE {
		result = true
	} else {
		result = false
	}
	return
}

func (node *GokogiriXmlNode) GetInnerHtml() (result string) {
	// return node.Node.InnerHtml()
	underlying := node.UnderlyingNode()
	switch typecasted := underlying.(type) {
	case xml.Node:
		return typecasted.InnerHtml()
	default:
		return
	}
}

func (node *GokogiriXmlNode) SetInnerHtml(data interface{}) (err error) {
	err = node.Node.SetInnerHtml(data)
	return
}

func (node *GokogiriXmlNode) Is(cmp ht.Node) (result bool) {
	underlying := cmp.UnderlyingNode()
	switch typecasted := underlying.(type) {
	case xml.Node:
		if node.NodePtr() == typecasted.NodePtr() {
			result = true
		}
	default:
		result = false
	}
	return
}

func (node *GokogiriXmlNode) GetName() (name string) {
	return node.Name()
}

func (node *GokogiriXmlNode) SetName(name string) {
	node.Node.SetName(name)
}

func (node *GokogiriXmlNode) Duplicate() (dup ht.Node) {
	return &GokogiriXmlNode{node.Node.Duplicate(1)}
}

func (node *GokogiriXmlNode) Path() (path string) {
	return node.Node.Path()
}
