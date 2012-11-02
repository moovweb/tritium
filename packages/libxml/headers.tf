" Selects an element with CSS-style selectors. @example `$(css(\".one\"))` will select all elements with the class of \"one\". "
# @abstract Selects the element specified with a CSS-style selector.
# @name css
# @category Modify 
# @scope Base
# @args Text %css
# @description 
# @example
# css("#id") {
#   remove()
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/css
# @guidetext
# @guidelink 
@func css(Text %selector) Text Text

" Parses the document as XML and passes you back an XMLNode scope. "
# @abstract Parses the document as XML.
# @name xml
# @category Environment 
# @scope Text
# @args
# @description 
# @example
# xml() {
#   $("/xml")
# }
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.xml() Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
# @abstract Parses the document as HTML.
# @name html_doc
# @category Environment
# @scope Text
# @args Text %input_encoding,Text %output_encoding
# @description 
# @example
# html_doc("gbk", "utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
# @abstract Parses a fragment as HTML.
# @name html_fragment_doc
# @category Environment
# @scope Text
# @args Text %input_encoding,Text %output_encoding
# @description 
# @example
# html_fragment_doc("gbk", "utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html_fragment_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Replaces the node's contents with a CDATA block. "
# @abstract Replaces the current node contents with a CDATA block. 
# @name cdata
# @category Environment
# @scope XMLNode
# @args Text %contents
# @description 
# @example
# 
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func XMLNode.cdata(Text %contents) Text

" Removes the node specified by `%xpath_selector` - [click for example](http://beta.moovweb.com/learn/training/function_guides/removing). @example `remove(\"//table\")` will remove all table elements from the document. "
# @abstract Removes the node specified.
# @name remove
# @category Modify
# @scope XMLNode
# @args Text %xpath_selector
# @description 
# @example
# remove("./span")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/remove
# @guidetext Removing nodes.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/removing
@func XMLNode.remove(Text %xpath_selector) Text

" Opens up the insides of the node to modification. Used for nodes containing text and other XML elements. For text-only modification, use `text()`. @example Given `<div><span></span></div>`, `$(\"./div\") { inner() { set(\"<a>\") } }` will return `<div><a></a></div>`. Compare with `$(\"./div\") { text() { set(\"<a>\") } }`, which returns `<div>&lt;a&gt;</div>`. "
# @abstract Opens the current node for modification, overwriting anything that is already present.
# @name inner
# @category Modify
# @scope XMLNode
# @args 
# @description 
# @example
# $("./div") {
#   inner() {
#     set("NEW")
#   }
# } 
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/inner
# @guidetext More information on the inner function with a comparison to the text function.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/inner
@func XMLNode.inner() Text Text

" Converts the inside of the currently-selected node to text. @example Using `$(\"./body\") { inner_text() }` returns all the text in the HTML tree (with none of the HTML nodes)."
# @abstract Converts the inside of the current node into plain text (i.e. stripping it of all HTML).
# @name inner_text
# @category Modify
# @scope XMLNode
# @args
# @description 
# @example
# $("./table") {
#   inner_text
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/inner_text
# @guidetext
# @guidelink 
@func XMLNode.inner_text() Text Text

" Opens the attribute you select with **%name** - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `attribute(\"class\")` opens the class for modification. "
# @abstract Opens the selected attribute for modification.
# @name attribute
# @category Modify
# @scope XMLNode
# @args Text %name
# @description 
# @example
# $("./div[@class='one']") {
#   attribute("class") {}
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/attribute
# @guidetext
# @guidelink 
@func XMLNode.attribute(Text %name) Text Attribute

" Deprecated: Outputs the current node as text. @example "
@func XMLNode.dump() Text

" Returns \"true\" or \"false\" depending on whether the nodes are equal. "
# @abstract Returns "true" or "false" depending on whether the nodes are equal.
# @name equal
# @category Misc
# @scope Base
# @args XMLNode %a,XMLNode %b
# @description 
# @example
# 
# 
# 
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func equal(XMLNode %a, XMLNode %b) Text

" Returns \"true\" or \"false\" depending on whether the nodes are equal. "
# @abstract Returns "true" or "false" depending on whether the nodes are equal.
# @name equal
# @category Misc
# @scope Base
# @args Node %a,Node %b
# @description 
# @example
# 
# 
# 
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink
@func equal(Node %a, Node %b) Text

" Wraps the *text* children inside the specified tag. @example Given `<div> text <a>link</a> </div>`, `$(\"./div\") { wrap_text_children(\"span\") }` results in `<div> <span>text</span> <a>link</a> </div>`. "
# @abstract 
# @name wrap_text_children
# @category Create
# @scope XMLNode
# @args Text %tag_name
# @description 
# @example
# $("./span")
#   wrap_text_children("div")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/wrap_text_children
# @guidetext
# @guidelink 
@func XMLNode.wrap_text_children(Text %tag_name) Text XMLNode

" Moves current element's children to the node specified by **%tag_name** at the position **%pos**."
# @abstract Moves the current element's children to the node specified.
# @name move_children_to
# @category Modify
# @scope XMLNode
# @args Node %tag_name,Position %pos
# @description 
# @example
# 
# 
# 
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func XMLNode.move_children_to(Node %tag_name, Position %pos) Text

" Removes the currently-selected attribute. @example `$(\"./a\") { attribute(\"href\") { remove() } }` will remove the href from the a tag. "
# @abstract Removes the currently-selected attribute.
# @name remove
# @category Modify
# @scope Attribute
# @args
# @description 
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     remove()
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/remove
# @guidetext
# @guidelink 
@func Attribute.remove() Text

" Opens the value scope, enabling it to be changed using `set()`. @example `$(\"./a\") { attribute(\"href\") { value() { set (\"LINK\")} } }` will set the href of the a tag to 'LINK'. "
# @abstract Opens the value scope of an attribute, so the value can be modified.
# @name value
# @category Modify
# @scope Attribute
# @args 
# @description 
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     value() { set("two") }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/value
# @guidetext
# @guidelink 
@func Attribute.value() Text Text

" Opens the name scope, so it can be changed using `set()`. @example `$(\"./a\") { attribute(\"href\") { name() { set (\"alt\")} } }` will change the name of the attribute from 'href' to 'alt'."
# @abstract Opens the name scope of the attribute, allowing the name to be changed.
# @name name
# @category Modify
# @scope Attribute
# @args 
# @description 
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     name() { set("id") }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/name
# @guidetext
# @guidelink 
@func Attribute.name() Text Text