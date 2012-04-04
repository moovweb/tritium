" Converts a CSS-selector (**%selector**) to XPath. "
@func css(Text %selector) Text Text

" Parses the document as XML and passes you back an XMLNode scope. "
@func Text.xml() Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
@func Text.html_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Parses the document as HTML and passes you back an XMLNode scope. "
@func Text.html_fragment_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

" Replaces the node's contents with a CDATA block. "
@func XMLNode.cdata(Text %contents) Text
@func XMLNode.remove(Text %xpath_selector) Text

" Opens up the insides of the node to text modification. "
@func XMLNode.inner() Text Text

" Similar to `dump()`, but only converts the indside of the currently-selected node to text. "
@func XMLNode.inner_text() Text Text

" Opens the attribute you select with **name** (e.g. `attribute(\"class\")` opens the class for modification). "
@func XMLNode.attribute(Text %name) Text Attribute

" Outputs the current node as text. "
@func XMLNode.dump() Text

" Returns \"true\" or \"false\" "
@func equal(XMLNode %a, XMLNode %b) Text
@func equal(Node %a, Node %b) Text

" Wraps each *text* child inside the specified tag. "
@func XMLNode.wrap_text_children(Text %tag_name) Text XMLNode
@func XMLNode.move_children_to(Node %tag_name, Position %pos) Text

" Removes the currently-selected attribute. "
@func Attribute.remove() Text

" Opens the value scope, enabling it to be changed using `set()`. "
@func Attribute.value() Text Text

" Opens the name scope, so it can be changed using `set()`. "
@func Attribute.name() Text Text