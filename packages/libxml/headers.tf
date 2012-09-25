" Selects an element with CSS-style selectors. @example `$(css(\".one\"))` will select all elements with the class of \"one\". "
@func css(Text %selector) Text Text

" Parses the document as XML and passes you back an XMLNode scope. "
@func Text.xml() Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
@func Text.html_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
@func Text.html_fragment_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Replaces the node's contents with a CDATA block. "
@func XMLNode.cdata(Text %contents) Text

" Removes the node specified by `%xpath_selector` - [click for example](http://beta.moovweb.com/learn/training/function_guides/removing). @example `remove(\"//table\")` will remove all table elements from the document. "
@func XMLNode.remove(Text %xpath_selector) Text

" Opens up the insides of the node to modification. Used for nodes containing text and other XML elements. For text-only modification, use `text()`. @example Given `<div><span></span></div>`, `$(\"./div\") { inner() { set(\"<a>\") } }` will return `<div><a></a></div>`. Compare with `$(\"./div\") { text() { set(\"<a>\") } }`, which returns `<div>&lt;a&gt;</div>`. "
@func XMLNode.inner() Text Text

" Converts the inside of the currently-selected node to text. @example Using `$(\"./body\") { inner_text() }` returns all the text in the HTML tree (with none of the HTML nodes)."
@func XMLNode.inner_text() Text Text

" Opens the attribute you select with **%name** - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `attribute(\"class\")` opens the class for modification. "
@func XMLNode.attribute(Text %name) Text Attribute

" Deprecated: Outputs the current node as text. @example "
@func XMLNode.dump() Text

" Returns \"true\" or \"false\" "
@func equal(XMLNode %a, XMLNode %b) Text
@func equal(Node %a, Node %b) Text

" Wraps the *text* children inside the specified tag. @example Given `<div> text <a>link</a> </div>`, `$(\"./div\") { wrap_text_children(\"span\") }` results in `<div> <span>text</span> <a>link</a> </div>`. "
@func XMLNode.wrap_text_children(Text %tag_name) Text XMLNode

" Moves current element's children to the node specified by **%tag_name** at the position **%pos**."

@func XMLNode.move_children_to(Node %tag_name, Position %pos) Text

" Removes the currently-selected attribute. @example `$(\"./a\") { attribute(\"href\") { remove() } }` will remove the href from the a tag. "
@func Attribute.remove() Text

" Opens the value scope, enabling it to be changed using `set()`. @example `$(\"./a\") { attribute(\"href\") { value() { set (\"LINK\")} } }` will set the href of the a tag to 'LINK'. "
@func Attribute.value() Text Text

" Opens the name scope, so it can be changed using `set()`. @example `$(\"./a\") { attribute(\"href\") { name() { set (\"alt\")} } }` will change the name of the attribute from 'href' to 'alt'."
@func Attribute.name() Text Text