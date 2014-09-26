package gokogiri_interface

import (
	"gokogiri/xml"
	"time"
	ht "tritium/htmltransformer"
)

type GokogiriXmlNode struct {
	xml.Node
}

func (node *GokogiriXmlNode) GetAttribute(name string) (attribute ht.Node) {
	attr := node.Attribute(name)
	if attr == nil {
		node.SetAttr(name, "")
		attr = node.Attribute(name)
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
	return &GokogiriXmlNode{node}
}

func (node *GokogiriXmlNode) InsertBefore(data interface{}) (err error) {
	// err = node.Node.InsertBefore(data)

	switch nodified := data.(type) {
	case ht.Node:
		underlying := nodified.UnderlyingNode()
		switch typecasted := underlying.(type) {
		case xml.Node:
			println("it's an xml.node")
			err = node.Node.InsertBefore(typecasted)
		default:
			println(nodified)
			println("nested default")
			return
		}
	case GokogiriXmlNode:
		println("gokogirixmlnode")
		err = node.Node.InsertBefore(nodified.Node)
	default:
		println(nodified)
		println("default")
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
			println("it's an xml.node")
			err = node.Node.InsertAfter(typecasted)
		default:
			println(nodified)
			println("nested default")
			return
		}
	case GokogiriXmlNode:
		println("gokogirixmlnode")
		err = node.Node.InsertAfter(nodified.Node)
	default:
		println(nodified)
		println("default")
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
			first := node.FirstChild()
			if first != nil {
				err = first.AddPreviousSibling(typecasted)
			} else {
				err = node.AddChild(typecasted)
			}
		default:
			return
		}
	case GokogiriXmlNode:
		first := node.FirstChild()
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

func (node *GokogiriXmlNode) UnderlyingNode() (result interface{}) {
	return node.Node
}

func (node *GokogiriXmlNode) GetContent() (content string) {
	return node.Content()
}

func (node *GokogiriXmlNode) SetContent(content interface{}) (err error) {
	err = node.Node.SetContent(content)
	return
}

func (node *GokogiriXmlNode) SelectXPath(data interface{}) (result []ht.Node, err error) {
	//copy for now, may need to rethink
	res, err := node.Search(data)

	results := make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) SelectXPathByDeadline(data interface{}, deadline *time.Time) (result []ht.Node, err error) {
	//copy for now, may need to rethink
	res, err := node.SearchByDeadline(data, deadline)

	results := make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriXmlNode{res[i]}
	}
	return results, err
}

func (node *GokogiriXmlNode) String() (result string) {
	return node.Node.String()
}
