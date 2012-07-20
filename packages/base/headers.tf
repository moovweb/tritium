
" Allows you to set global variables. Equivalent to `$`."
@func var(Text %name) Text Text
" Allows you to set global variables. Equivalent to `$`."
@func var(Text %name, Text %value) Text Text

" Returns the time-to-execute (time units vary by implementation). "
@func time() Text

" Specifies a target (specified by **%target**) to be searched. To be used in conjunction with `with()`. For example, `match($path) { with(/product/) }`."
@func match(Text %match_target) Text

" Writes out a string (**%log_message**) to the console and debug log. For example `log(\"Importing home-page\")`. "
@func log(Text %log_message) Text Text

" Returns the warning **%message** when a function is deprecated. Mostly useful when defining functions. "
@func deprecated(Text %message) Text Text

" Used with `match()` as an opposite of `with()`. For example, `match($var) {not('hi')}`. "
@func not(Text %text) Text

" Used with `match()` as an opposite of `with()`. For example, `match($var) {not('hi')}`. "
@func not(Regexp %regexp) Text

" Used with `match()`. Allows the match function to specify what is being matched. For example: `match($path) { with(\"something\") }`."
@func with(Text %text) Text

" Used with `match()`. Allows the match function to specify what is being matched. For example: `match($path) { with(/something/) }`."
@func with(Regexp %regexp) Text

" Convert from one encoding to another. (If you want a list of encodings, you can run `iconv -l` on your command line.) "
@func Text.convert_encoding(Text %from, Text %to) Text

" Guess the encoding from the input, the response header and html meta tag"
@func Text.guess_encoding() Text

" length of the input "
@func length(Text %input) Text

" Completes the pseudo-logic of `with()`, allowing the specification of an alternative."
@func else() Text

" Only used within functions  - enables functions within the scope of the current function to be performed. "
@func yield() Text

" Only used within functions - enables functions within the scope of the current function to be performed. "
@func Text.yield() Text

" Returns the current text value "
@func Text.this() Text

" Parses regular expressions - so `/a/` is equivalent to `regexp(\"a\")`. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) The **%options** text allows [Ruby modifiers](http://www.regular-expressions.info/ruby.html) to be included. "
@func regexp(Text %expression, Text %options) Regexp Text

" Concatenates two (or more) strings. For example, `` is equivalent to `\"a\" + \"b\"`. "
@func concat(Text %a, Text %b) Text Text

" This is a the way that we have Tritium communicate variables back to its execution environment. For example,  `export(\"Content-Type\", \"application/js\")` to change the content-type. "
@func export(Text %key_name) Text Text

" Returns **%input_string** in ALL CAPS "
@func upcase(Text %input_string) Text

" Returns **%input_string** in lower case "
@func downcase(Text %input_string) Text

" Returns the current text scope as a string. Useful to pass the current Text as an argument. "
@func Text.text() Text Text

" Replaces the entire current text with what you pass in. For example, `set(\"one\")`. "
@func Text.set(Text %value) Text

" Replaces all instances of the regular expression **%search**. This yields to a Text scope that allows you to set the replacement string using `with()`. For example `replace(/bad/) { with(\"good\") }`."
@func Text.replace(Regexp %search) Text Text

" Replaces all instances of the text **%search**. This yields to a Text scope that allows you to set the replacement string using `with()`. For example `replace(\"bad\") { with(\"good\") }`."
@func Text.replace(Text %search) Text Text

" Adds **%text_to_prepend** to the beginning of the text. "
@func Text.prepend(Text %text_to_prepend) Text

" Adds **%text_to_append** to the end of the text. "
@func Text.append(Text %text_to_append) Text

" Captures all instances of the regular expression **%search**. "
@func Text.capture(Regexp %search) Text Text

" Rewrite a host/link/cookie from proxy to upstream "
@func Text.rewrite_to_upstream(Text %from_proxy) Text

" Rewrite a host/link/cookie from upstream to proxy "
@func Text.rewrite_to_proxy(Text %from_upstream) Text
