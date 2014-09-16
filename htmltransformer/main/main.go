package main

import (
	// "gokogiri/html"
	"gokogiri/xml"
  "time"
	// "gokogiri/xpath"
	ht "tritium/htmltransformer"
	gi "tritium/htmltransformer/gokogiri_interface"
)

func foo(node ht.Node, data interface{}, deadline *time.Time) (result []ht.Node, err error) {
	// return doc.CreateElementNode(tag)
	// return doc.CreateCDataNode(tag)
	// return doc.CreateTextNode(tag)
	// return doc.CreateCommentNode(tag)
	// return doc.CreatePINode(name, tag)
	return node.SearchbyDeadline(data, deadline)
}

func main() {

  blah := &gi.GokogiriXmlDocument{xml.CreateEmptyDocument(nil, nil)}

  results, err := foo(&gi.GokogiriXmlNode{xml.NewNode(nil, blah), "boo", time.Now}
  println(results)

	// println(foo(&gi.GokogiriXmlDocument{xml.CreateEmptyDocument(nil, nil)}))
}
