
" Allows you to set global variables. Equivalent to `$`. @example `var(\"txt1\") { set(\"MYTEXT\") }` sets the variable of 'txt1' to 'MYTEXT'."
# @abstract The `var` function allows you to set global variables.
# @name var
# @category Environment
# @scope Global
# @args Text %name
# @description
# The `var` function is used to set global variables that can be used for various logic throughout your code.
# ### Common Uses
# * True/False logic
# * Storing fetched text and attributes
# * Using stored values in a `match()` statement to run different Tritium scripts.
# 
# The following example simply illustrates how to set a variable manually to whatever `%name` and value you desire.
# @example
# var("my_var") {
#   set("is set")
# }
# log($my_var)
# @exampletext Tritium Tester Example
# @examplelink test/examples/var
# @guidetext 
# @guidelink 
@func var(Text %name) Text Text

" Allows you to set global variables. Equivalent to `$`. @example `var(\"txt1\", \"MYTEXT\")` sets the variable of 'txt1' to 'MYTEXT'."
# @abstract The `var` function allows you to set global variables.
# @name var
# @category Environment
# @scope Global
# @args Text %name,Text %value
# @description
# The `var` function is used to set global variables that can be used for various logic throughout your code.
# ### Common Uses
# * True/False logic
# * Storing fetched text and attributes
# * Using stored values in a `match()` statement to run different Tritium scripts.
# 
# The following example simply illustrates how to set a variable manually to whatever `%name` and `%value` you desire.
# @example
# var("my_var", "is set")
# log($my_var)
# @exampletext Tritium Tester Example
# @examplelink test/examples/var
# @guidetext 
# @guidelink 
@func var(Text %name, Text %value) Text Text

" Returns the time-to-execute (time units vary by implementation). @example `log(time())` will log the time taken to reach that point in the server logs. "
# @abstract The `time` function returns the time it has taken to reach that point thus far.
# @name time
# @category Environment
# @scope Global
# @args 
# @description 
# The `time` function returns the time-to-execute the Tritium code up until it hits the function call.
# **Things to note**: The time taken varies for each implementation, so to have an accurate sense of time, several trials should be run.
# ### Common Uses
# * Optimizing Tritium script performance.
# 
# In the following example, we display how to log the `time()` output to the terminal using the `log()` function.
# @example
# log(time())
# @exampletext Tritium Tester Example
# @examplelink test/examples/time
# @guidetext 
# @guidelink 
@func time() Text

" Specifies a target (specified by **%target**) to be searched. To be used in conjunction with `with()` - [click for example](http://console.moovweb.com/learn/training/function_guides/match). @example `match($path) { with(/product/) }` will match the path of the url to see if the regular expression 'product' matches."
# @abstract The `match` function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Global
# @args Text %target
# @description
# The `match` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. `match` is used to test the content of variables with strings, regular expressions, and other variables, then run code according to whether or not the match is successful.
# **Things to note**: If you have more than one variable or regular expression to test againt, you can simply provide the match function with the variable in question and then use embeded with() statements for each case. You can also provide a final else() statement to serve as a catchall for all unsuccessful matches.
# ### Common Uses
# * Matching the `$path` of the incoming request and `@import` a corresponding Tritium script.
# * Matching attributes with certain content to determine if they need to be changed in some way.
# * Simulating `if-then-else` statements and boolean (`true-false`) logic to run differing Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming headers.
# 
# In the following example, we match the `$path` variable to see if it matches the regular expression `/product/`. Since it does, the log "Match successful!" will output to the terminal.
# @example
# $path = "product"
# match($path) {
#   with(/product/) {
#     log("Match successful!")
#   }
#   else() {
#     log("Match unsuccessful.")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func match(Text %match_target) Text

" Writes out a string (**%log_message**) to the console and debug log. @example `log(\"Importing home-page\")`. "
# @abstract The `log` function is used to write out a string to the console. It's often useful for debugging Tritium.
# @name log
# @category Environment
# @scope Global
# @args Text %log_message
# @description
# The `log` function is used to output information to the terminal.
# ### Common Uses
# * Checking the value of environment variables
# * Displaying status messages as the result of certain matches or logic
# * Debugging Tritium that isn't working in development
# 
# The following example shows the typical use case for debugging Tritium that isn't working. This is often done by setting logs throughout your code to see if you selectors and logic is executing the proper statements.
# @example
# log("I've reached this point in the code!")
# @exampletext Tritium Tester Example
# @examplelink test/examples/log
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/log
@func log(Text %log_message) Text Text

" Returns the warning **%message** when a function is deprecated. Mostly useful when defining functions. @example `@func XMLNode.old() { deprecated(\"WARNING! This function has been deprecated\") }` will print out a server log message whenever the function is used. "
@func deprecated(Text %message) Text Text

" Used with `match()` as an opposite of `with()`. @example `match($var) { not('hi') }` will check that the '$var' is not set to 'hi'. "
# @abstract The `not` function is used with `match()` as an opposite to `with()`.
# @name not
# @category Environment,Text
# @scope Global
# @args Text %text
# @description
# The `not` function is used inside a `match()` statement as an opposite to the `with()` statement. In other words, if the match is not successful, the code inside the `not()` block will run, whereas if the match is successful, the code will be skipped over.
# ### Common Uses
# * When the page is structured such that you only know which scripts you want to run when certain content does not exist.
# * When you are mapping URL paths to page types and you know what content must not exist in the path to fulfill a mapping requirement.
# 
# In the following example, we match the variable `$var` with the `not()` statement of "Match You". Since that statement does not exist in the variable, the `log` inside the `not` statement will be executed.
# @example
# $var = "Match Me"
# match($var) {
#   not("Match You") {
#     log("The $var variable does not contain the string Match You!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/not
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func not(Text %text) Text

" Used with `match()` as an opposite of `with()`. @example `match($var) { not(/hi/) }` will check that the '$var' is not set to 'hi'. "
# @abstract The `not` function is used with `match()` as an opposite to `with()`.
# @name not
# @category Environment,Text
# @scope Global
# @args Regexp %regexp
# @description
# The `not` function is used inside a `match()` statement as an opposite to the `with()` statement. In other words, if the match is not successful, the code inside the `not()` block will run, whereas if the match is successful, the code will be skipped over.
# Common Uses
# * When the page is structured such that you only know what scripts you want to run when certain content does not exist.
# * When you are mapping URL paths to page types and you know what content must not exist in the path to fulfill a mapping requirement.
# 
# In the following example, we match the variable `$var` with the `not()` regular expression "Match You". Since that statement does not exist in the variable, the `log` inside the `not` statement will be executed.
# @example
# $var = "Match Me"
# match($var) {
#   not(/Match You/) {
#     log("The $var variable does not successfully match the regex Match You!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/not
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func not(Regexp %regexp) Text

" Used with `match()`. Allows the match function to specify what is being matched. @example `match($path) { with(\"product\") }` will check the path of the url matches 'product'."
# @abstract The `with` function is used with `match()` to match a variable with multiple possibilities.
# @name with
# @category Environment,Text
# @scope Global
# @args Text %text
# @description
# The `match` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. The `with()` statement is used inside a `match()` statement to match the variable with certain strings or regular expressions. If the input `%text` is contained in the matched variable, then the code block inside the `with()` statement is executed.
# **Things to note**: You can have multiple `with()` statements inside a single `match` statement. They are executed sequentially, and as soon as one `with()` statement is matched successfully, the rest will be skipped over.
# ### Common Uses
# * Matching the `$path` of the incoming request and `@import` a corresponding Tritium script.
# * Matching attributes with certain content to determine if they need to be changed in some way.
# * Simulating `if-then-else` statements and boolean (`true-false`) logic to run differing Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming headers.
# 
# In this example, we match the `$var` variable with the string "Match Me". Since the match is successful, the `log` is then executed.
# @example
# $var = "Match Me"
# match($var) {
#   with("Match Me") {
#     log("Match successful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/with
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func with(Text %text) Text

" Used with `match()`. Allows the match function to specify what is being matched. @example `match($path) { with(/product/) }` will check the path of the url matches the regular expression 'product'."
# @abstract The `with` function is used with `match()` to match a variable with multiple possibilities.
# @name with
# @category Environment,Text
# @scope Global
# @args Regexp %regexp
# @description
# The `match` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. The `with()` statement is used inside a `match()` statement to match the variable with certain strings or regular expressions. If the input `%text` is contained in the matched variable, then the code block inside the `with()` statement is executed.
# **Things to note**: You can have multiple `with()` statements inside a single match statement. They are executed sequentially, and as soon as one `with()` statement is matched successfully, the rest will be skipped over.
# ### Common Uses
# * Matching the `$path` of the incoming request and `@import` a corresponding Tritium script.
# * Matching attributes with certain content to determine if they need to be changed in some way.
# * Simulating `if-then-else` statements and boolean (`true-false`) logic to run differing Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming headers.
# 
# In this example, we match the `$var` variable with the regular expression "Match Me". Since the match is successful, the `log` is then executed.
# @example
# $var = "Match Me"
# match($var) {
#   with(/Match Me/) {
#     log("Match successful!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/with
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func with(Regexp %regexp) Text

" Convert from one encoding to another. (If you want a list of encodings, you can run `iconv -l` on your command line.) @example `text() { convert_encoding(\"gbk\", \"utf-8\") }` will convert the text from gbk to utf-8."
# @abstract The `convert_encoding` function is used to convert from one encoding to another.
# @name convert_encoding
# @category Text
# @scope Text
# @args Text %from,Text %to
# @description
# The `convert_encoding` function is used to convert text from one encoding to another.
# ### Common Uses
# * Converting incorrectly encoded text
# 
# In this example, we convert from `gbk` to `utf-8` encoding.
# @example
# text() {
#   convert_encoding("gbk", "utf-8")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/convert_encoding
# @guidetext 
# @guidelink 
@func Text.convert_encoding(Text %from, Text %to) Text

" Guess the encoding from the input, the response header and html meta tag. "
# @abstract The `guess_encoding` function is used to guess the encoding from the input, the response header, and the HTML `meta` tag.
# @name guess_encoding
# @category Text
# @scope Text
# @args 
# @description
# The `guess_encoding` function is used to guess the text encoding of the current scope. The function uses information from the input, the response header, and the HTML `meta` tags.
# ### Common Uses
# * When you need to figure out the current encoding.
# 
# In this example, we guess the encoding of the current text node.
# @example
# text() {
#   $encoding = guess_encoding()
#   log(concat("I'm guessing your encoding is ", $encoding))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/guess_encoding
# @guidetext 
# @guidelink 
@func Text.guess_encoding() Text

" Returns the length of the **%input**. @example `log(length(\"text\"))` will return '4' in the server logs."
# @abstract Returns the length of the `%input`.
# @name length
# @category Text
# @scope Text
# @args Text %input
# @description 
# The `length` function is used to return the length of the current text node or the provided `%input` string.
# ### Common Uses
# * Validating an `%input` string to make sure it is either a minimum or maximum number of characters.
# * Finding the length of a string.
# 
# In this example, we `log` the length of the `%input` string "text".
# @example
# $$("#my_div") {
#   text() {
#     log(length("text"))
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/length
# @guidetext 
# @guidelink 
@func length(Text %input) Text

" Completes the pseudo-logic of `with()`, allowing the specification of an alternative. @example `match($path) { with(/product/) else() { log(\"Not selecting product\")} }` will only log the message if 'product' is not in the path."
# @abstract The `else` function completes the pseudo-logic of `with()` in your `match()` statements, allowing the specification of a catchall alternative.
# @name else
# @category Environment,Text
# @scope Global
# @args 
# @description 
# The `else()` function is used inside your `match()` statements to serve as a catchall for when none of your `with()` statements find a successful match. The `else()` function will then serve as your default behavior for unanticipated match cases.
# ### Common Uses
# * Serving as a catchall for common errors, such as unrecognized URL mappings.
# * Completing `if-else` pseudo logic when `match`ing variables, attributes, and other traits of the current DOM.
# * Generally providing a default behavior for your Tritium scripts.
# 
# In the following example, the `$var` value does not match the existing `with()` statement, which means the `else()` statement will run its inner code block.
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
# @examplelink test/examples/else
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func else() Text

" Only used within functions - enables functions within the scope of the current function to be performed. @example To learn more, check out [our helpdesk post on how yield works](http://help.moovweb.com/entries/21633781-what-does-the-yield-function-do)."
# @abstract The yield function is used when defining custom functions to signal where the function yields to a new scope.
# @name yield
# @category Environment
# @scope Global
# @args
# @description 
# The yield() function is used to tell Moovweb where you want a new scope to be opened when using this function.
# This allows you to execute Tritium in the function even after the user has opened a scope and executed several other functions.
# To learn more, check out [our helpdesk post on how yield works](http://help.moovweb.com/entries/21633781-what-does-the-yield-function-do).
# Common uses include:
# * Any time you need to execute code after someone uses your function. 
# * Error checking your function's use cases. 
# 
# In this example, we first define a function that yields to a scope before our log() statement. This means if the user changes the $a variable, then the log statement will change as well.
# However, in our second example, we log our variable $a before yielding, which means that even though the user's changes will take place. The variable will be logged before it is changed. So in our second example we will see "dog" rather than "dogcat".
# @example
# # first example 
#   @func XMLNode.foo {
#     $a = "dog"
#     yield()
#     log($a)
#   }
# # second example 
#   foo() {
#    $a = $a + "cat"
#   }
#   @func XMLNode.foo {
#     $a = "dog"
#     log($a)
#     yield()
#   }
#   foo() {
#     $a = $a + "cat"
#   }
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext Function Guide
# @guidelink
@func yield() Text

" Only used within functions - enables functions within the scope of the current function to be performed.  @example To learn more, check out [our helpdesk post on how yield works](http://help.moovweb.com/entries/21633781-what-does-the-yield-function-do). "
@func Text.yield() Text

" Returns the current text value. @example `text() { log(this()) }` will log all the text in the DOM into the server logs. "
@func Text.this() Text

" Parses regular expressions. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) The **%options** text allows [Ruby modifiers](http://www.regular-expressions.info/ruby.html) to be included. @example `regexp(\"dog\", \"i\")` uses the `/i` modifier to make the expression case-insensitive, so the regex will match both 'DOG' and 'dog' (plus 'Dog', 'dOg', etc.). "
# @abstract The `regexp` function is used to parse regular expressions.
# @name regexp
# @category Environment,Modify,Text
# @scope Global
# @args Text %expression,Text %options
# @description 
# The `regexp` function is used to parse `%expressions` and turn them into regular expressions. Regular Expressions are incredibly powerful for selecting and modifying groups of text.
# **Things to note**: The `%options` input provides flags for the regular expression such as `i`, which indicates it should be case insensitive.
# ### Common Uses
# * Removing extra text when transitioning from desktop to mobile sites.
# * Modifying text to be more clear and concise to fit a smaller viewport.
# * Changing instructions such as "click" to "tap" for mobile devices.
# * Fixing malformed HTML before the document is parsed so your selectors work properly.
# 
# In the following example, we use the string "true" and turn it into a regular expression to use in a `match-with` statement. We are also accepting any combination of upper and lower case because of the `i` flag. If the string "true" is anywhere in the text we are matching, the code in the `with()` statement will run.
# @example
# $var = "123456"
# match($var, regexp("\\d{4}")) {
#   log("My regular expression matched four digits in a row")
# }
# match($var, regexp("\\d{9}")) {
#   log("My regular expression matched nine digits in a row")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/regexp
# @guidetext Replacing Text With Regexp
# @guidelink  http://console.moovweb.com/learn/training/function_guides/replace
@func regexp(Text %expression, Text %options) Regexp Text

" Concatenates two (or more) strings. - [click for example](http://console.moovweb.com/learn/training/function_guides/concat)@example `concat(\"dog\", \"cat\")` is equivalent to `\"dog\" + \"cat\"`. "
# @abstract The `concat` function is used to concatenate two or more strings.
# @name concat
# @category Text
# @scope Global
# @args Text %a,Text %b
# @description 
# The concat function is used to combine two or more strings into a single string.
# **Things to note**: The concat function takes at least two strings and up to ten strings as input parameters. These parameters will be combined in the order in which they are provided.
# ### Common Uses
# * In `log` statements when outputting some combination of variables and description of those variables.
# * When selecting elements based on variables or attributes, they may need to be formatted properly using the concat function.
# * When manipulating text scopes and combining the content of several scopes.
# 
# In this example, we fetch the `ID` of the div with the `ID` "my_div", then we `log` a `concat` statement to the terminal output.
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("Did I reach ", $name, "?"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/concat
# @guidetext Function Guide
# @guidelink  http://console.moovweb.com/learn/training/function_guides/concat
@func concat(Text %a, Text %b) Text Text

" This is a the way that we have Tritium communicate variables back to its execution environment. @example `export(\"Content-Type\", \"application/js\")` changes the content-type. "
# @abstract The `export` function is used to set response header information such as `content-type`, `cache-time`, and more.
# @name export
# @category Environment
# @scope Global
# @args Text %key,Text %value
# @description 
# The `export` function is used when you want to change the outgoing response header.
# **Things to note**: You cannot currently export the status of the response header (i.e. 200, 302, etc.).
# ### Common Uses
# * Malformed HTML or Javascript with the wrong `content-type` set.
# * Setting the `Cache-Time` of the page.
# * Setting the `Location` for a redirect.
# 
# In this example, we are setting the `Content-Type` to "text/html".
# @example
# html() {
#   export("Content-Type", "text/html")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/export
# @guidetext Useful Environment Variables
# @guidelink http://console.moovweb.com/learn/reference/configuration/index#Environment+Variables
@func export(Text %key_name) Text Text

" Returns **%input_string** in all caps. @example `upcase(\"dog\")` will return 'DOG'. "
# @abstract The `upcase` function is used to return the `%input_string` in all uppercase letters.
# @name upcase
# @category Text,Modify
# @scope Text
# @args Text %input_string
# @description 
# The `upcase` function is used to return the provided `%input_string` in all uppercase letters.
# ### Common Uses
# * Making buttons more prominent such as SIGN IN or SIGN UP NOW.
# 
# In this example, we fetch the `ID` of the div with the `ID` "my_div", then we `log` a `concat` statement using uppercase letters for the name of the div.
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("I've reached ", upcase($name), "!"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/upcase
# @guidetext 
# @guidelink 
@func upcase(Text %input_string) Text

" Returns **%input_string** in lower case. @example `downcase(\"DOG\")` will return 'dog'. "
# @abstract The `downcase` function is used to return the `%input_string` in all lowercase letters.
# @name downcase
# @category Text,Modify
# @scope Text
# @args Text %input_string
# @description 
# The `downcase` function is used to return the provided `%input_string` in all lowercase letters.
# ### Common Uses
# * Making text less prominent.
# 
# In this example, we fetch the `ID` of the div with the `ID` "my_div", then we `log` a `concat` statement using lowercase letters for the name of the div.
# @example
# $$("#my_div") {
#   $name = fetch("./@id")
#   log(concat("I've reached ", downcase($name), "!"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/downcase
# @guidetext 
# @guidelink 
@func downcase(Text %input_string) Text

//" Returns the current text scope as a string. Useful to pass the current Text as an argument. "
//@func Text.text() Text Text

" Replaces the entire current text with what you pass in. @example `set(\"one\")` will set the whole of the text to 'one'. "
# @abstract The `set` function is used to replace the entire current scope with the provided `%value`.
# @name set
# @category Text,Modify
# @scope Text
# @args Text %value
# @description 
# The `set` function is used to override any existing content in the current scope and set it to the `%value` provided.
# **Things to note**: when used in an XMLNode scope, the entire inner HTML will be set -- overriding any child nodes and content.
# ### Common Uses
# * Setting the content of text scopes
# * Setting the value of attribute scopes
# 
# In this example, we set the text node inside "my_div" to "I've been set!".
# @example
# $$("#my_div") {
#   text() {
#     set("I've been set!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/set
# @guidetext 
# @guidelink 
@func Text.set(Text %value) Text

" Replaces all instances of the regular expression **%search**. This yields to a Text scope that allows you to set the replacement string using `set()` - [click for example](http://console.moovweb.com/learn/training/function_guides/replace). @example `replace(/bad/) { set(\"good\") }`."
# @abstract Opens a scope to all instances of the regular expression provided that you can then replace using the `set()` function.
# @name replace
# @category Modify,Text
# @scope Text
# @args Regexp %search
# @description 
# The `replace` function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings.
# **Things to note**: Unless otherwise specified by the Regular Expression, all matches found by the `%search` parameter will be replaced.
# ### Common Uses
# * Replacing desktop instructions like "click" to mobile instructions like "tap"
# * Removing extra or unnecessary text
# * Rewriting attributes based on some standard `set` via a regular expression.
# 
# In this example we are replacing the text "Replace Me" inside `#my_div` with the text "Replaced!".
# @example
# $$("#my_div") {
#   text() {
#     replace(/Replace Me/) {
#       set("Replaced!")
#     }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Regexp %search) Text Text

" Replaces all instances of the text **%search**. This yields to a Text scope that allows you to set the replacement string using `set()` - [click for example](http://console.moovweb.com/learn/training/function_guides/replace). @example `replace(\"bad\") { set(\"good\") }`."
# @abstract Opens a scope to all instances of the regular expression provided that you can then `replace` using the `set()` function.
# @name replace
# @category Modify,Text
# @scope Text
# @args Text %search
# @description
# The `replace` function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings.
# **Things to note**: Unless otherwise specified by the Regular Expression, all matches found by the `%search` parameter will be replaced.
# ### Common Uses
# * Replacing desktop instructions like "click" to mobile instructions like "tap"
# * Removing extra or unnecessary text
# * Rewriting attributes based on some standard `set` via a regular expression.
# 
# In this example we are replacing the text "Replace Me" inside `#my_div` with the text "Replaced!".
# @example
# $$("#my_div") {
#   text() {
#     replace("Replace Me") {
#       set("Replaced!")
#     }
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Text %search) Text Text

" Adds **%text_to_prepend** to the beginning of the text. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { prepend(\"Super-\") } }` will change the text to 'Super-Dog'."
# @abstract The prepend function adds the input text to the beginning of the text scope from which it is called.
# @name prepend
# @category Modify,Text
# @scope Text
# @args Text %text_to_prepend
# @description 
# The prepend function is used to insert text at the beginning of a text scope.
# ### Common Uses
# * Categorizing content by attaching labels or other forms of organized tags.
# * Numbering content using the prepend() function in combination with the index() function.
# 
# In this example, we prepend a sentence onto the beginning of the text node inside "my_div".
# @example
  $$("#my_div") {
    text() {
      prepend("This is how you prepend text in front of the existing text in #my_div.")
    }
  }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/prepend
# @guidetext 
# @guidelink 
@func Text.prepend(Text %text_to_prepend) Text

" Adds **%text_to_append** to the end of the text. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { append(\"Fish\") } }` will change the text to 'DogFish'."
# @abstract The `append` function adds the input `%text_to_append` to the end of the text scope from which it is called.
# @name append
# @category Modify,Text
# @scope Text
# @args Text %text_to_append
# @description 
# The `append` function is used to insert text at the end of a text scope.
# ### Common Uses
# * Adding instructions following content.
# * Elaborating on content without resetting it.
# 
# In this example, we append a sentence onto the end of the text node inside `my_div`.
# @example
  $$("#my_div") {
    text() {
      append("This is how you append text to the end of the existing text in #my_div.")
    }
  }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/append
# @guidetext 
# @guidelink 
@func Text.append(Text %text_to_append) Text

" Captures all instances of the regular expression **%search**. "
# @abstract The `capture` function grabs all instances of the regular expression specified.
# @name capture
# @category Modify,Text
# @scope Text
# @args Regexp %search
# @description 
# The `capture` function is used to grab a specific block of text, which is matched via a regular expression.
# ### Common Uses
# * Grabbing specific items from a string of text
# * Separating out capture groups in a regular expression
# 
# In this example, the capture function will grab any string of 8 characters and log it the terminal.
# @example
  $$("#my_div") {
    text() {
      capture(/(\w{8})/) {
        log("Words with more than 8 letters: " + %1)
      }
    }
  }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/capture
# @guidetext 
# @guidelink 
@func Text.capture(Regexp %search) Text Text

" Rewrite a host/referer/origin from proxy to upstream "
@func Text.rewrite_to_upstream(Text %from_proxy, Text %secure, Text %catchall) Text

" Rewrite a link from upstream to proxy "
@func Text.rewrite_to_proxy(Text %secure, Text %catchall) Text

" Rewrite a cookie domain from upstream to proxy "
@func Text.rewrite_cookie_domain(Text %host, Text %secure, Text %catchall) Text

" Rewrite a link from upstream to proxy, where **%secure** is either 'true' or 'false' and **%catchall** is a catchall suffix. @example `rewrite_link(\"true\", \".moovapp.com\")` will rewrite secure links to include the catchall '.moovapp.com' at the end."
@func Text.rewrite_link(Text %secure, Text %catchall) Text

@func base64_v1(Text %method, Text %str) Text Text

@func Text.parse_headers_v1() Text Header

@func Header.header_comp_v1(Text %attr) Text Text
