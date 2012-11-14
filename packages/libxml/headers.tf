" Selects an element with CSS-style selectors. @example `$(css(\".one\"))` will select all elements with the class of \"one\". "
# @abstract Selects the element specified with a CSS-style selector.
# @name css
# @category Modify 
# @scope Base
# @args Text %css
# @description 
# The css function selects elements on a page using a CSS-style selector.
# The function takes one argument, the item to be selected. The argument is written as a standard CSS selector - for example #one to search for an id.
# Things to note: the css() function converts the CSS selector to an XPath-style selector. It converts it into a local deep search, so could potentially be slower than an XPath selector.
# Related functions: <a href="#$$(Text %css_selector)">css()</a>
# Common use cases include (but are not limited to):
# 1) Selecting many element types based on attributes rather than tag names
# 2) Selecting items without being familiar with XPath
# The example below will remove any element on the page with an id of "one".
# @example
# css("#one") {
#   remove()
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/css
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
# The xml function parses the document as XML. Parsing is essential to enable selection of XML nodes using Tritium.
# The example below will parse the document as XML, allowing the selection of nodes with XPath.
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
# The html doc function parses the document as HTML. This means the document - which is plain text - is converted into a tree-like structure. At this point, we can use XPath and other selectors to navigate the document.
# The encoding must be specified with two arguments, used to specify the "to" and "from" encodings. <code>html_doc("x", "y")</code> would parse the document from encoding "x" into encoding "y".
# Important to note is that as part of the parsing, the function will add <code><html></code> tags and a DOCTYPE to the document. If you only want to parse a fragment of HTML, use the <a href="#html_fragment()">html_fragment</a> function.
# The html function can be found in the scripts/main.ts file of your project, where it parses every page as HTML.
# The example below will parse the HTML from gbk encoding to utf-8 encoding, allowing selectors to point to nodes of the document.
# @example
# html_doc("gbk", "utf-8") {
#   $("/html/body")
# }
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
# The html fragment doc function parses a fragment of the document as HTML. This means the document - which is plain text - is converted into a tree-like structure. At this point, we can use XPath and other selectors to navigate the document.
# Just as for the html_doc function, html_fragment_doc takes two arguments, specifing the "to" and "from" encodings. html_fragment_doc("x", "y") would parse the document from encoding "x" into encoding "y".
# A common use example could be that only a small section of the request being processed is HTML, and that fragment must be parsed without adding a HTML tag and DOCTYPE.
# The example below will parse a fragment of HTML from gbk to utf-8 encoding, allowing selectors to point to nodes of the document. 
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
# The cdata function allows you to insert chunks of CDATA on your page.
# CDATA is information that is not parsed by the XML parser. Therefore, it can include characters that may break XML (for example, <code><</code>). It is often used for inserting javascript.
# The function takes one argument - the content which needs to be passed into the CDATA block.
# The example below will replace the contents of the selected div with a CDATA block containing the javascript "alert('Boo')".
# @example
# $("./div") {
#   cdata("//<![CDATA[\n alert('Boo!') \n//]]>")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/cdata
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
# The remove function deletes the element specified by the selector.
# The function takes one argument - the location of the node to be removed, specified using XPath.
# As you can select attributes using XPath, it is possible to delete attributes using the remove() function. Select an attribute using the @ sign - for example "@class" will select a class.
# Common use cases include (but are not limited to):
# 1) Removing all the <code><br></code> tags in a paragraph
# 2) Removing style attributes from tags
# The example below will remove all span children of the div.
# @example
# $("./div") {
#   remove("./span")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/remove
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
# The inner function opens the scope of the current node for manipulation.
# Related functions: <a href='#inner(Text %html)'>inner(Text %html)</a>
# Common use cases include (but are not limited to):
# 1) Opening the inner scope to replace contents
# The example below will open the scope of the current div and replace everything with "NEW".
# @example
# $("./div") {
#   inner() {
#     set("NEW")
#   }
# } 
# @exampletext Tritium Tester Example
# @examplelink test/examples/inner
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
# The inner_text function converts the entirety of the current node into text.
# The function essentially removes all HTML tags/elements and returns the text of the element.
# Common use cases include (but are not limited to):
# 1) Extracting text from a table
# 2) Grabbing the text of an anchor while removing its tag
# The example below will "flatten" the table, leaving only the text of the table in the tag.
# @example
# $("./table") {
#   inner_text
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/inner_text
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
# The attribute function opens the scope of the attribute specified.
# The function takes one argument - the attribute name.
# Common use examples include (but are not limited to):
# 1) Opening the scope of the attribute to replace certain characters
# The example below will open the scope of the class attribute.
# @example
# $("./div[@class='one']") {
#   attribute("class") {}
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attribute/attribute
# @guidetext 
# @guidelink 
@func XMLNode.attribute(Text %name) Text Attribute

" Returns \"true\" or \"false\" depending on whether the nodes are equal. "
# @abstract Returns "true" or "false" depending on whether the nodes are equal.
# @name equal
# @category Misc
# @scope Base
# @args XMLNode %a,XMLNode %b
# @description 
# The equal function takes two nodes and compares them to see if they are equal.
# Important to note is that you cannot use text as input for this function. You should set a variable using this() on your current node, then use that variable as an argument.
# The function takes two arguments - these are the nodes which you need to equate.
# The function is commonly used when writing functions - in order to ensure that a function is not performed on itself, potentially avoiding a loop.
# The example below will compare the div node twice. First to its anchor child - where the log will return "false" because the two nodes are not equal. The second log message will be "true" as we have scoped back into the anchor's parent - the div. 
# @example
# $("./div") {
#   %div = this()
#   $("./a") {
#     log(equal(%div, this()))
#     $("..") {
#       log(equal(%div, this()))
#     }
#   }    
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/equal
# @guidetext 
# @guidelink 
@func equal(XMLNode %a, XMLNode %b) Text

" Returns \"true\" or \"false\" depending on whether the nodes are equal. "
# @hide
# @abstract Returns "true" or "false" depending on whether the nodes are equal.
# @name equal
# @category Misc
# @scope Base
# @args Node %a,Node %b
# @description 
# The equal function takes two nodes and compares them to see if they are equal.
# Important to note is that you cannot use text as input for this function. You should set a variable using this() on your current node, then use that variable as an argument.
# The function takes two arguments - these are the nodes which you need to equate.
# @example 
# @exampletext Tritium Tester Example
# @examplelink 
# @guidetext 
# @guidelink 
@func equal(Node %a, Node %b) Text

" Wraps the *text* children inside the specified tag. @example Given `<div> text <a>link</a> </div>`, `$(\"./div\") { wrap_text_children(\"span\") }` results in `<div> <span>text</span> <a>link</a> </div>`. "
# @abstract Wraps text children inside a new tag.
# @name wrap_text_children
# @category Create
# @scope XMLNode
# @args Text %tag_name
# @description
# The wrap_text_children function takes all the children of the current node and wraps them in the tag specified.
# The function takes one argument - the tag in which you want to wrap the text children.
# Important to note is that the function will wrap all text children - even whitespace. This means you may have some empty tags generated.
# Common use examples include (but are not limited to):
# 1) Wrapping all text children in tags so that they can then be subsequently removed
# 2) From a mixture of text nodes and HTML nodes, wrapping text children in a tag allows for easier manipulation
# The example below will take all the text node children of the span and wrap them in divs.
# @example
# $("./span")
#   wrap_text_children("div")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/wrap_text_children
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
# The move_children_to function is used to move children of the current node into another node.
# The function takes two arguments. The first is the new node that the children will be moved into. The second is the position at which the children will be moved. 
# What's unique about these arguments is that they can't be a string - so entering an XPath direction will not work. To enter the node argument, you must select that node and set a local variable (using <code>%</code>) of the node. For the position, you must use the position function as in the example below.
# Because of the complexity of setting a variable, this function is mainly used in definitions of functions - for example, the inner_wrap function.
# In the example below, the "one" div is selected and a local variable is set. The variable is then used later, once we have selected div "two". All of two's children will be moved into the first div, at the top.
# @example
# $("./div[@class='one']") {
#   %one = this()
#   $("../div[@class='two']") {
#     move_children_to(%one, position("top"))
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/move_children_to
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
# The remove function removes the currently-selected attribute. It is an extremely useful function.
# Common uses include (but are not limited to):
# 1) Removing inline styles once the attribute has been selected
# The example below will remove the class from the selected div.
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     remove()
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attribute/remove
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
# The value function opens the scope of the selected attribute. This allows you to modify the value of an attribute. 
# To modify the value itself, you would need to use the set function (to change it completely), or perhaps the replace function to replace certain aspects.
# Common use cases include (but are not limited to):
# 1) Altering the value of a class
# 2) Modifying the value of an href attribute
# In the example below, the class attribute of the selected div tag will be given a new value of "two".
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     value() { set("two") }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attribute/value
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
# The name function opens the scope of the selected attribute. It allows you to change the name of an attribute.
# To modify the name itself, you would need to use the set function (to change it completely), or perhaps the replace function to replace certain aspects.
# The example below changes the class of the selected div into an id.
# @example
# $("./div[@class='one']")
#   attribute("class") {
#     name() { set("id") }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attribute/name
# @guidetext 
# @guidelink 
@func Attribute.name() Text Text