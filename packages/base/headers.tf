
" Looks up or sets a global variable. Equivalent to `$`."
@func var(Text %name) Text Text
" Looks up or sets a global variable. Equivalent to `$`."
@func var(Text %name, Text %value) Text Text

" If given a block, it returns the time-to-execute as a string (time units vary by implementation) "
@func time() Text

" Opens up a matcher case. Specifies a target (specified by %target, e.g. `$path`) to be searched. To be used in conjunction with `with()`."
@func match(Text %match_target) Text

" Writes out a string to the console and debug log "
@func log(Text %log_message) Text Text

" Used to denote when a function is deprecated "
@func deprecated(Text %message) Text Text

" Used with match($var) {not('hi')} "
@func not(Text %text) Text

" Used with match($var) {not(/hi/)} "
@func not(Regexp %regexp) Text

" Used with match($var, 'hi'). Allows the match function to specify what is being matched. For example: `match($path) { with(\"something\") }`."
@func with(Text %text) Text

" Used with match($var, 'hi'). Allows the match function to specify what is being matched. For example: `match($path) { with(\"something\") }`."
@func with(Regexp %regexp) Text

" Convert from one encoding to another. (If you want a list of encodings, you can run `iconv -l` on your command line.) "
@func Text.convert_encoding(Text %from, Text %to) Text

" Completes the sudo-logic of `with()`, allowing the specification of an alternative."
@func else() Text

" Only used in Functions "
@func yield() Text

" Only used in Functions "
@func Text.yield() Text

" Returns the current text value "
@func Text.this() Text

" Any value passed into this function will return a regex --- ready for fancy replace() or match() usage. NOTE! Use hard-coded regex if you can. This is much slower than hard-coding regex! "
@func regexp(Text %expression, Text %options) Regexp Text

" A function for concatenating strings. Can accept 2 or more args. Equivalent to `\"a\" + \"b\"`. "
@func concat(Text %a, Text %b) Text Text

" This is a the way that we have Tritium communicate variables back to its execution environment. That sounds complicated, but in most uses of Tritium, it would be something like export(\"Content-Type\", \"application/js\") to tell the app to change the content-type. Look at the reference for your server for more information on what you can export. "
@func export(Text %key_name) Text Text

" Returns the input argument in ALL CAPS "
@func upcase(Text %input_string) Text

" Returns the input argument in lower case "
@func downcase(Text %input_string) Text

" Returns the current text scope as a string. Useful to pass the current Text as an argument "
@func Text.text() Text Text

" Replace the entire current text with what you pass in "
@func Text.set(Text %value) Text

" Replace all instances of the first argument with the second argument. This yields to a Text scope that allows you to set the Replacement string. Very powerful stuff. Look at the examples. "
@func Text.replace(Regexp %search) Text Text
@func Text.replace(Text %search) Text Text

" Prepend the string to the front of the text area "
@func Text.prepend(Text %text_to_prepend) Text

" Append the string to the front of the text area "
@func Text.append(Text %text_to_append) Text
