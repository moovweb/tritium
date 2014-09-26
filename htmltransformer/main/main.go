package main

import (
	"gokogiri/html"
	// "gokogiri/xml"
	// "time"
	// "gokogiri/xpath"
	ht "tritium/htmltransformer"
	gi "tritium/htmltransformer/gokogiri_interface"
)

func foo(node ht.Node, name, value string) (result ht.Node) {
	// return doc.CreateElementNode(tag)
	// return doc.CreateCDataNode(tag)
	// return doc.CreateTextNode(tag)
	// return doc.CreateCommentNode(tag)
	// return doc.CreatePINode(name, tag)
	// return node.SearchbyDeadline(data, deadline)
	return node.SetAttribute(name, value)
}

func main() {

	input := `<html  xmlns="http://www.w3.org/1999/xhtml">

<!-- comment -->
<head>
<script src="cool.js"></script>
</head>

<body>
  <a href="boop.html" class="bah"> hi </a>
<div>
  <p></p>
</div>

</body>

</html>`

	// doc := xml.CreateEmptyDocument(nil, nil)
	doc, _ := html.Parse([]byte(input), nil, nil, html.DefaultParseOption, nil)

	div := &gi.GokogiriXmlNode{doc.CreateElementNode("div")}
	foo(div, "foo", "bar")

	doc.Root().InsertBefore(div)
	// println(results.GetContent())
	// div.RemoveAttribute("foo")

	span := &gi.GokogiriXmlNode{doc.CreateElementNode("span")}
	div.InsertTop(span)

	// new.InsertAfter(&gi.GokogiriXmlNode{blah.CreateElementNode("div")})
	// p := &gi.GokogiriXmlNode{blah.CreateElementNode("p")}
	// p.SetAttribute("p", "p")
	// println(p.String())
	// new.InsertTop(p)
	// a := &gi.GokogiriXmlNode{blah.CreateElementNode("a")}
	// a.SetAttribute("a", "a")
	// println(a.String())
	// err := new.InsertBottom(a)
	// if err != nil {
	// 	println(err.Error())
	// }

	// new.SetContent("testing")
	// println(new.GetContent())

	println(doc.String())

	p := &gi.GokogiriXmlNode{doc.CreateElementNode("p")}
	div.InsertBottom(p)

	println(doc.String())

	// res, _ := new.SelectXPath("//@p")

	// for _, r := range res {
	// 	println("selectxpath")
	// 	println(r.GetContent())
	// }

	// dur, _ := time.ParseDuration("2s")
	// later := time.Now().Add(dur)

	// res, _ = new.SelectXPathByDeadline("//@a", &later)

	// for _, r := range res {
	// 	println("selectxpathbydeadline")
	// 	println(r.GetContent())
	// }

	// println(foo(&gi.GokogiriXmlDocument{xml.CreateEmptyDocument(nil, nil)}))
}
