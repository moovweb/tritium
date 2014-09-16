package gokogiri_interface

import (
	"gokogiri/xml"
	"time"
	ht "tritium/htmltransformer"
)

type GokogiriNode struct {
	XmlNode xml.Node
}

func (node *GokogiriNode) SearchByDeadline(data interface{}, deadline *time.Time) (result []ht.Node, err error) {
	//copy for now, may need to rethink
	res, err := node.XmlNode.SearchByDeadline(data, deadline)

	results := make([]ht.Node, len(res))
	for i := 0; i < len(res); i++ {
		results[i] = &GokogiriNode{res[i]}
	}

	return results, err
}

// func (node *GokogiriXmlNode) Attribute(name string) (attribute ht.Node) {
// 	return node.XmlNode.Attribute(name)
// }
