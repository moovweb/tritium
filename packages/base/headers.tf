
" Allows you to set global variables. Equivalent to `$`. @example `var(\"txt1\") { set(\"MYTEXT\") }` sets the variable of 'txt1' to 'MYTEXT'."
# @abstract The var function allows you to set global variables. 
# @name var
# @category Environment
# @scope Text,XMLNode
# @args Text %name
# @description
# The var function is used to set global variables that can be used for various logic throughout your code. 
# Common uses include: 
# 1) True/False logic
# 2) Storing fetched text and attributes
# 3) Using stored values in a match() statement to run different Tritium scripts.
# The following example simply illustrates how to set a variable manually to whatever %name and value you desire. 
# @example
# var("my_var") {
#   set("is set")
# }
# log($my_var)
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/var
# @guidetext Function Guide
# @guidelink
@func var(Text %name) Text Text

" Allows you to set global variables. Equivalent to `$`. @example `var(\"txt1\", \"MYTEXT\")` sets the variable of 'txt1' to 'MYTEXT'."
# @abstract The var function allows you to set global variables. 
# @name var
# @category Environment
# @scope Text,XMLNode
# @args Text %name,Text %value
# @description
# The var function is used to set global variables that can be used for various logic throughout your code. 
# Common uses include: 
# 1) True/False logic
# 2) Storing fetched text and attributes
# 3) Using stored values in a match() statement to run different Tritium scripts.
# The following example simply illustrates how to set a variable manually to whatever %name and %value you desire. 
# @example
# var("my_var", "is set")
# log($my_var)
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/var
# @guidetext Function Guide
# @guidelink
@func var(Text %name, Text %value) Text Text

" Returns the time-to-execute (time units vary by implementation). @example `log(time())` will log the time taken to reach that point in the server logs. "
# @abstract The time function returns the time it has taken to reach that point thus far.
# @name time
# @category Environment
# @scope Text,XMLNode
# @args
# @description 
# @example
# log(time())
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/time
# @guidetext Function Guide
# @guidelink
@func time() Text

" Specifies a target (specified by **%target**) to be searched. To be used in conjunction with `with()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match($path) { with(/product/) }` will match the path of the url to see if the regular expression 'product' matches."
# @abstract The match function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Text
# @args Text %target
# @description
# @example
#   $path = "product"
#   match($path) {
#     with(/product/) {
#       log("Match successful!")
#     }
#     else() {
#       log("Match unsuccessful.")
#     }
#   }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/match
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func match(Text %match_target) Text

" Writes out a string (**%log_message**) to the console and debug log. @example `log(\"Importing home-page\")`. "
# @abstract The log function is used to write out a string to the console. It's often useful for debugging Tritium.
# @name log
# @category Environment
# @scope Text,XMLNode
# @args Text %log_message
# @description
# @example
#   log("I've reached this point in the code!")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/log
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/log
@func log(Text %log_message) Text Text

" Returns the warning **%message** when a function is deprecated. Mostly useful when defining functions. @example `@func XMLNode.old() { deprecated(\"WARNING! This function has been deprecated\") }` will print out a server log message whenever the function is used. "
@func deprecated(Text %message) Text Text

" Used with `match()` as an opposite of `with()`. @example `match($var) { not('hi') }` will check that the '$var' is not set to 'hi'. "
# @abstract The not function is used with match() as an opposite to with().
# @name not
# @category Environment,Text
# @scope Text,XMLNode
# @args Text %text
# @description
# @example
# $var = "Match Me"
# match($var) {
#   not("Match You") {
#     log("Match unsuccessful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/not
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func not(Text %text) Text

" Used with `match()` as an opposite of `with()`. @example `match($var) { not(/hi/) }` will check that the '$var' is not set to 'hi'. "
# @abstract The not function is used with match() as an opposite to with().
# @name not
# @category Environment,Text
# @scope Text,XMLNode
# @args Regexp %regexp
# @description
# @example
# $var = "Match Me"
# match($var) {
#   not(/Match You/) {
#     log("Match unsuccessful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/not
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func not(Regexp %regexp) Text

" Used with `match()`. Allows the match function to specify what is being matched. @example `match($path) { with(\"product\") }` will check the path of the url matches 'product'."
# @abstract The with function is used with match() to match a variable with multiple possibilities.
# @name with
# @category Environment,Text
# @scope Text,XMLNode
# @args Text %text
# @description
# @example
# $var = "Match Me"
# match($var) {
#   with("Match Me") {
#     log("Match successful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/with
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func with(Text %text) Text

" Used with `match()`. Allows the match function to specify what is being matched. @example `match($path) { with(/product/) }` will check the path of the url matches the regular expression 'product'."
# @abstract The with function is used with match() to match a variable with multiple possibilities.
# @name with
# @category Environment,Text
# @scope Text,XMLNode
# @args Regexp %regexp
# @description
# @example
# $var = "Match Me"
# match($var) {
#   with(/Match Me/) {
#     log("Match successful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/with
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func with(Regexp %regexp) Text

" Convert from one encoding to another. (If you want a list of encodings, you can run `iconv -l` on your command line.) @example `text() { convert_encoding(\"gbk\", \"utf-8\") }` will convert the text from gbk to utf-8."
# @abstract The convert_encoding function is used to convert from one encoding to another.
# @name convert_encoding
# @category Text
# @scope Text
# @args Text %from,Text %to
# @description
# @example
# text() {
#   convert_encoding("gbk", "utf-8")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/convert_encoding
# @guidetext Function Guide
# @guidelink
@func Text.convert_encoding(Text %from, Text %to) Text

" Guess the encoding from the input, the response header and html meta tag. "
# @abstract The guess_encoding function is used to guess the encoding from the input, the response header and the html meta tag.
# @name guess_encoding
# @category Text
# @scope Text
# @args
# @description
# @example
# text() {
#   $encoding = guess_encoding()
#   log(concat("I'm guessing your encoding is ", $encoding))
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/guess_encoding
# @guidetext Function Guide
# @guidelink
@func Text.guess_encoding() Text

" Returns the length of the **%input**. @example `log(length(\"text\"))` will return '4' in the server logs."
# @abstract Returns the length of the input.
# @name length
# @category Text
# @scope Text
# @args Text %input
# @description 
# @example
# $$("#my_div") {
#   text() {
#     log(length("text"))
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/length
# @guidetext Function Guide
# @guidelink 
@func length(Text %input) Text

" Completes the pseudo-logic of `with()`, allowing the specification of an alternative. @example `match($path) { with(/product/) else() { log(\"Not selecting product\")} }` will only log the message if 'product' is not in the path."
# @abstract The else function completes the pseudo-logic of with() in your match() statements, allowing the specification of a catchall alternative.
# @name else
# @category Environment,Text
# @scope Text,XMLNode
# @args
# @description 
# @example
# $var = "Match me."
# match($var) {
#   with("No match.") {
#     log("This log won't be run...")
#   }
#   else() {
#     log("Because the else statement was matched this time!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/else
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
@func else() Text

" Only used within functions - enables functions within the scope of the current function to be performed. @example To learn more, check out [our helpdesk post on how yield works](http://help.moovweb.com/entries/21633781-what-does-the-yield-function-do)."
@func yield() Text

" Only used within functions - enables functions within the scope of the current function to be performed.  @example To learn more, check out [our helpdesk post on how yield works](http://help.moovweb.com/entries/21633781-what-does-the-yield-function-do). "
@func Text.yield() Text

" Returns the current text value. @example `text() { log(this()) }` will log all the text in the DOM into the server logs. "
@func Text.this() Text

" Parses regular expressions. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) The **%options** text allows [Ruby modifiers](http://www.regular-expressions.info/ruby.html) to be included. @example `regexp(\"dog\", \"i\")` uses the `/i` modifier to make the expression case-insensitive, so the regex will match both 'DOG' and 'dog' (plus 'Dog', 'dOg', etc.). "
# @abstract The regexp function is used to parse regular expressions.
# @name regexp
# @category Environment,Modify,Text
# @scope Text
# @args Text %expression,Text %options
# @description 
# @example
# with(regexp("true", "i")) {
# # run this code if your text matches the string "true"
# # the "i" indicates that the match is case insensitive
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/regexp
# @guidetext Replacing Text With Regexp
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
@func regexp(Text %expression, Text %options) Regexp Text

" Concatenates two (or more) strings. - [click for example](http://beta.moovweb.com/learn/training/function_guides/concat)@example `concat(\"dog\", \"cat\")` is equivalent to `\"dog\" + \"cat\"`. "
# @abstract The concat function is used to concatenate two or more strings.
# @name concat
# @category Text
# @scope Text
# @args Text %a,Text %b
# @description 
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("Did I reach ", $name, "?"))
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/concat
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/concat
@func concat(Text %a, Text %b) Text Text

" This is a the way that we have Tritium communicate variables back to its execution environment. @example `export(\"Content-Type\", \"application/js\")` changes the content-type. "
# @abstract The export function is used to set response header information such as content-type, cache-time, and more. 
# @name export
# @category Environment
# @scope Text
# @args Text %key,Text %value
# @description 
# @example
# html() {
#   export("Content-Type", "text/html")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/export
# @guidetext Useful Environment Variables
# @guidelink http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables
@func export(Text %key_name) Text Text

" Returns **%input_string** in all caps. @example `upcase(\"dog\")` will return 'DOG'. "
# @abstract The upcase function is used to return the input string in all uppercase letters.
# @name upcase
# @category Text,Modify
# @scope Text
# @args Text %input_string
# @description 
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("I've reached ", upcase($name), "!"))
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/upcase
# @guidetext Useful Environment Variables
# @guidelink
@func upcase(Text %input_string) Text

" Returns **%input_string** in lower case. @example `downcase(\"DOG\")` will return 'dog'. "
# @abstract The downcase function is used to return the input string in all lowercase letters.
# @name downcase
# @category Text,Modify
# @scope Text
# @args Text %input_string
# @description 
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("I've reached ", downcase($name), "!"))
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/downcase
# @guidetext Useful Environment Variables
# @guidelink
@func downcase(Text %input_string) Text

//" Returns the current text scope as a string. Useful to pass the current Text as an argument. "
//@func Text.text() Text Text

" Replaces the entire current text with what you pass in. @example `set(\"one\")` will set the whole of the text to 'one'. "
# @abstract The set function is used to replace the entire current text with the provided value.
# @name set
# @category Text,Modify
# @scope Text
# @args Text %value
# @description 
# @example
# $$("#my_div") {
#   text() {
#     set("I've been set!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/set
# @guidetext Useful Environment Variables
# @guidelink
@func Text.set(Text %value) Text

" Replaces all instances of the regular expression **%search**. This yields to a Text scope that allows you to set the replacement string using `set()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(/bad/) { set(\"good\") }`."
# @abstract Opens a scope to all instances of the regular expression provided that you can then replace using the set() function.
# @name replace
# @category Modify,Text
# @scope Text
# @args Regexp %search
# @description 
# @example
# $$("#my_div") {
#   text() {
#     replace(/Replace Me/) {
#       set("Replaced!")
#     }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/replace
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Regexp %search) Text Text

" Replaces all instances of the text **%search**. This yields to a Text scope that allows you to set the replacement string using `set()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(\"bad\") { set(\"good\") }`."
# @abstract Opens a scope to all instances of the regular expression provided that you can then replace using the set() function.
# @name replace
# @category Modify,Text
# @scope Text
# @args Text %search
# @description 
# @example
# $$("#my_div") {
#   text() {
#     replace("Replace Me") {
#       set("Replaced!")
#     }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/replace
# @guidetext Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Text %search) Text Text

" Adds **%text_to_prepend** to the beginning of the text. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { prepend(\"Super-\") } }` will change the text to 'Super-Dog'."
# @abstract The prepend function adds the input text to the beginning of the text scope from which it is called.
# @name prepend
# @category Modify,Text
# @scope Text
# @args Text %text_to_prepend
# @description 
# @example
  $$("#my_div") {
    text() {
      prepend("This is how you prepend text in front of the existing text in #my_div.")
    }
  }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/prepend
# @guidetext Function Guide
# @guidelink 
@func Text.prepend(Text %text_to_prepend) Text

" Adds **%text_to_append** to the end of the text. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { append(\"Fish\") } }` will change the text to 'DogFish'."
# @abstract The append function adds the input text to the end of the text scope from which it is called.
# @name append
# @category Modify,Text
# @scope Text
# @args Text %text_to_append
# @description 
# @example
  $$("#my_div") {
    text() {
      append("This is how you append text to the end of the existing text in #my_div.")
    }
  }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/append
# @guidetext Function Guide
# @guidelink 
@func Text.append(Text %text_to_append) Text

" Captures all instances of the regular expression **%search**. "
@func Text.capture(Regexp %search) Text Text

" Rewrite a host/referer/origin from proxy to upstream "
@func Text.rewrite_to_upstream(Text %from_proxy, Text %secure, Text %catchall) Text

" Rewrite a link from upstream to proxy "
@func Text.rewrite_to_proxy(Text %secure, Text %catchall) Text

" Rewrite a cookie domain from upstream to proxy "
@func Text.rewrite_cookie_domain(Text %host, Text %secure, Text %catchall) Text

" Rewrite a link from upstream to proxy, where **%secure** is either 'true' or 'false' and **%catchall** is a catchall suffix. @example `rewrite_link(\"true\", \".moovapp.com\")` will rewrite secure links to include the catchall '.moovapp.com' at the end."
@func Text.rewrite_link(Text %secure, Text %catchall) Text
