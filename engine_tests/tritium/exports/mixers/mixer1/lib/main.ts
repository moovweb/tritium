// get the minimum functions required: inner, set, concat, b and select
@func XMLNode.inner() Text Text

@func Text.set(Text %value) Text

@func log(Text %log_message) Text Text

@func concat(Text %a, Text %b) Text Text

@func Node.select(Text %xpath_selector) Text Node

@func Text.html_fragment_doc(Text %input_encoding, Text %output_encoding) Text XMLNode