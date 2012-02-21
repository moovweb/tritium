@func css(Text %selector) Text Text

// Parses the document as XML and passes you back an XMLNode scope
@func Text.xml() Text XMLNode

// Parses the document as HTML and passes you back an XMLNode scope
@func Text.html_doc(Text %input_encoding, Text %output_encoding) Text XMLNode

// Parses the document as HTML and passes you back an XMLNode scope
@func Text.html_fragment(Text %input_encoding) Text XMLNode

// Replace's the node's contents with a CDATA block
@func XMLNode.cdata(Text %contents) Text

// Opens up the entire innerHTML to text modification. Any html you insert WILL get interpreted as actual tags.
@func XMLNode.inner() Text Text

// Main alias for XMLNode.text()
@func XMLNode.inner_text() Text Text

// Creates or opens the attribute named. Returns the value()
@func XMLNode.attribute(Text %name) Text Attribute

@func XMLNode.dump() Text

// Wraps each text child inside the specified tag. Only the text children though!
@func XMLNode.wrap_text_children(Text %tag_name) Text

// Delete the current attribute
@func Attribute.remove() Text

// Allow us to edit the value (key="value") part of the attribute
@func Attribute.value() Text Text

// Allow us to edit the key (key="value") part of the attribute
@func Attribute.name() Text Text