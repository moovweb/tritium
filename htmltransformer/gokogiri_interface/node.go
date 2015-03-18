package gokogiri_interface

import (
	"fmt"
	"reflect"

	"gokogiri/css"
	"gokogiri/xml"
	"gokogiri/xpath"
	"os"
	"time"
	ht "tritium/htmltransformer"
)

type GokogiriXmlNode struct {
	innernode xml.Node
}

func (node *GokogiriXmlNode) GetAttribute(name string) ht.Node {
	attr := node.innernode.Attribute(name)
	if attr == nil {
		return nil
	}
	return &GokogiriXmlNode{attr}
}

func (node *GokogiriXmlNode) SetAttribute(name, value string) ht.Node {
	node.innernode.SetAttr(name, value)
	attr := node.innernode.Attribute(name)
	return &GokogiriXmlNode{attr}
}

func (node *GokogiriXmlNode) RemoveAttribute(name string) ht.Node {
	attr := node.innernode.Attribute(name)
	if attr != nil {
		attr.Remove()
	}
	return &GokogiriXmlNode{node.innernode}
}

func (node *GokogiriXmlNode) InsertBefore(data interface{}) (err error) {
	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.innernode.InsertBefore(typecasted)
		}
	case GokogiriXmlNode:
		err = node.innernode.InsertBefore(nodified.innernode)
	}
	return
}

func (node *GokogiriXmlNode) InsertAfter(data interface{}) (err error) {
	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.innernode.InsertAfter(typecasted)
		}
	case GokogiriXmlNode:
		err = node.innernode.InsertAfter(nodified.innernode)
	}
	return
}

func (node *GokogiriXmlNode) InsertTop(data interface{}) (err error) {
	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			first := node.innernode.FirstChild()
			if first != nil {
				err = first.AddPreviousSibling(typecasted)
			} else {
				err = node.innernode.AddChild(typecasted)
			}
		}
	case GokogiriXmlNode:
		first := node.innernode.FirstChild()
		if first != nil {
			err = first.AddPreviousSibling(nodified.innernode)
		} else {
			err = node.innernode.AddChild(nodified.innernode)
		}
	}
	return
}

func (node *GokogiriXmlNode) InsertBottom(data interface{}) (err error) {
	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			err = node.innernode.AddChild(typecasted)
		}
	case GokogiriXmlNode:
		err = node.innernode.AddChild(nodified.innernode)
	}
	return
}

func (node *GokogiriXmlNode) FirstChild() ht.Node {
	if node.innernode.FirstChild() != nil {
		return &GokogiriXmlNode{node.innernode.FirstChild()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) LastChild() ht.Node {
	if node.innernode.LastChild() != nil {
		return &GokogiriXmlNode{node.innernode.LastChild()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) PreviousSibling() ht.Node {
	if node.innernode.PreviousSibling() != nil {
		return &GokogiriXmlNode{node.innernode.PreviousSibling()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) NextSibling() ht.Node {
	if node.innernode.NextSibling() != nil {
		return &GokogiriXmlNode{node.innernode.NextSibling()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) Parent() ht.Node {
	if node.innernode.Parent() != nil {
		return &GokogiriXmlNode{node.innernode.Parent()}
	} else {
		return nil
	}
}

func (node *GokogiriXmlNode) GetContent() string {
	return node.innernode.Content()
}

func (node *GokogiriXmlNode) SetContent(content interface{}) (err error) {
	return node.innernode.SetContent(content)
}

func (node *GokogiriXmlNode) SelectXPath(data interface{}) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	var res []xml.Node
	switch xptype := data.(type) {
	case ht.Selector:
		underlying := xptype.UnderlyingExpression()
		switch typecasted := underlying.(type) {
		case xpath.Expression:
			res, err = node.innernode.Search(&typecasted)
		default:
		}
	case GokogiriXPathSelector:
		res, err = node.innernode.Search(&xptype.Expression)
	default:
		res, err = node.innernode.Search(data)
	}

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return
}

func (node *GokogiriXmlNode) SelectXPathByDeadline(data interface{}, deadline *time.Time) (results []ht.Node, err error) {
	debug := "\tNew Gokogiri: SelectXPathByDeadline\n"
	//copy for now, may need to rethink
	var res []xml.Node
	switch xptype := data.(type) {
	case ht.Selector:
		debug += "\tXpath expression: " + xptype.String() + "\n"
		underlying := xptype.UnderlyingExpression()
		switch typecasted := underlying.(type) {
		case xpath.Expression:
			res, err = node.innernode.SearchByDeadline(&typecasted, deadline)
		default:
			st := fmt.Sprintf("%v", reflect.TypeOf(data))
			ut := fmt.Sprintf("%v", reflect.TypeOf(underlying))
			debug += "\t\tFirst default path being taken. data type is " + st + ", underlying type is " + ut + "\n"
		}
	case GokogiriXPathSelector:
		res, err = node.innernode.SearchByDeadline(&xptype.Expression, deadline)
	case string:
		res, err = node.innernode.SearchByDeadline(data, deadline)
	default:
		st := fmt.Sprintf("%v", reflect.TypeOf(data))
		debug += "\t\tSecond default path being taken. data type is " + st + "\n"
	}
	funcfileExists, _ := fileutil.Exists("/tmp/debug.log")
	if !funcfileExists {
		_, _ = os.Create("/tmp/debug.log")
	}
	ff, err := os.OpenFile("/tmp/debug.log", os.O_APPEND|os.O_WRONLY, 0666)
	if err != nil {
		println(err.Error())
	}
	defer ff.Close()
	if _, err := ff.WriteString(debug); err != nil {
		println(err.Error())
	}

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return
}

func (node *GokogiriXmlNode) SelectCSS(data string) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	xpathdata := css.Convert(data, css.LOCAL)

	res, err := node.innernode.Search(xpathdata)

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return
}

func (node *GokogiriXmlNode) SelectCSSByDeadline(data string, deadline *time.Time) (results []ht.Node, err error) {
	//copy for now, may need to rethink
	xpathdata := css.Convert(data, css.LOCAL)

	res, err := node.innernode.SearchByDeadline(xpathdata, deadline)

	results = make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) String() string {
	return node.innernode.String()
}

func (node *GokogiriXmlNode) UnderlyingNode() interface{} {
	return node.innernode
}

func (node *GokogiriXmlNode) IsValid() bool {
	return node.innernode.IsValid()
}

func (node *GokogiriXmlNode) Remove() {
	node.innernode.Remove()
}

func (node *GokogiriXmlNode) IsDocument() (result bool) {
	t := node.innernode.NodeType()
	return t == xml.XML_DOCUMENT_NODE || t == xml.XML_HTML_DOCUMENT_NODE
}

func (node *GokogiriXmlNode) IsElement() (result bool) {
	t := node.innernode.NodeType()
	return t == xml.XML_ELEMENT_NODE
}

func (node *GokogiriXmlNode) IsText() (result bool) {
	t := node.innernode.NodeType()
	return t == xml.XML_TEXT_NODE
}

func (node *GokogiriXmlNode) GetInnerHtml() (result string) {
	underlying := node.UnderlyingNode()
	switch typecasted := underlying.(type) {
	case xml.Node:
		result = typecasted.InnerHtml()
	}
	return
}

func (node *GokogiriXmlNode) SetInnerHtml(data interface{}) error {
	return node.innernode.SetInnerHtml(data)
}

func (node *GokogiriXmlNode) Is(cmp ht.Node) (result bool) {
	underlying := cmp.UnderlyingNode()
	switch typecasted := underlying.(type) {
	case xml.Node:
		if node.innernode.NodePtr() == typecasted.NodePtr() {
			result = true
		}
	default:
		result = false
	}
	return
}

func (node *GokogiriXmlNode) GetName() string {
	return node.innernode.Name()
}

func (node *GokogiriXmlNode) SetName(name string) {
	node.innernode.SetName(name)
}

func (node *GokogiriXmlNode) Duplicate() ht.Node {
	return &GokogiriXmlNode{node.innernode.Duplicate(1)}
}

func (node *GokogiriXmlNode) Path() string {
	return node.innernode.Path()
}
