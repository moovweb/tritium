# ADDING IN THE READ FUNCTION BECAUSE IT DOESN'T EXIST
# @abstract Allows you to pass in external files as a string.
# @name read
# @category Create
# @scope Global
# @args Text %file
# @description
# The read function allows you to insert a file or external HTML document into existing markup.
# The function takes one argument - the file to be read. It should be referenced relative to the current file.
# ### Common Uses
# * Injecting a header scaffold on a page
# * Add radically different markup for a page
# 
# In the example below, we inject the contents of the header.html file at the top of the body.
# @example
# $("./body") {
#   inject_top(read("header.html"))
# }
@func read$$$$$$$$$$$$$$$$$$$$(Text %file) {
  // [native function]
}

" This is a the way that we have Tritium communicate variables back to its execution environment. - [click for example](http://console.moovweb.com/learn/reference/configuration/index#Environment+Variables)@example `export(\"Content-Type\", \"application/js\")` changes the content-type to application/js."
# @abstract The `export` function is used to set response header information such as content-type, cache-time, and more.
# @name export
# @category Environment
# @scope Global
# @args Text %key,Text %value
# @description
# The `export` function is used when you want to change the outgoing response header.
# **Things to note**: You cannot currently export the status of the response header (e.g. 200, 302, etc.).
# ### Common Uses
# * Malformed HTML or Javascript with the wrong `content-type` set.
# * Setting the Cache-Time of the page.
# * Setting the Location for a redirect.
# 
# In the following example, we set `Content-Type` to `text/html`.
# @example
# html() {
#   export("Content-Type", "text/html")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/export
# @guidetext Useful Environment Variables
# @guidelink http://console.moovweb.com/learn/reference/configuration/index#Environment+Variables
@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

"Parses regular expressions. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) @example `with(regexp(\"a\"))` is equivalent to `with(/a/)`. "
# @abstract The `regexp` function is used to parse regular expressions.
# @name regexp
# @category Environment,Modify,Text
# @scope Global
# @args Text %exp
# @description
# The `regexp` function is used to parse expressions and turn them into regular expressions. Regular Expressions are incredibly powerful for selecting and modifying groups of text.
# *Related functions*: [match(target, comparitor)][1], [with(text)][2], [not(text)][3]
# ### Common Uses
# * Removing extra text when transitioning from desktop to mobile sites.
# * Modifying text to be more clear and concise to fit a smaller viewport.
# * Changing instructions such as "click" to "tap" for mobile devices.
# * Fixing malformed HTML before the document is parsed so your selectors work properly.
# 
# In the following example, we set a variable then try to match four digits in a row. When run, the first log message should be printed. Note that we escape the forward slash.
# [1]: #match(Text%20%25target,%20Regexp%20%25comparitor)
# [2]: #with(Text%20%25text)%20Text
# [3]: #not(Text%20%25text)%20Text
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
# @guidetext Regex Guide
# @guidelink http://console.moovweb.com/learn/reference/tools/regex
@func regexp(Text %exp) {
  regexp(%exp, "")
}

"References to the assets folder without hard-coding a path - [click for example](http://beta.moovweb.com/learn/training/function_guides/asset). @example `asset(\"images/icon.png\")` points to *assets/images/icon*, including the domain if necessary."
@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

"Prints the time a block took to run. @example `html() { bm(\"TIME\") }` will print the time it took to parse the HTML in the server logs in the format 'TIME: x ms'."
# @abstract The `bm` function prints in the terminal output the time a block took to run.
# @name bm
# @category Environment
# @scope Global
# @args Text %name
# @description 
# The `bm` function is used to test the performance of your code by the proxy. From our experience, the majority of your performance boost will come from optimizing the images, scripts, and stylesheets of the proxied website. However, there are ways to improve performance of the execution of the proxy, such as using XPath selectors instead of CSS selectors and avoiding deep searches for content in the DOM.
# **Things to note**: The `bm()` measurements vary between trials, so you may have to run several samples to get an accurate representation of execution speed.
# *Related functions*: [time()][1]
# ### Common Uses
# * Measuring the time it takes for a block of code to run.
# 
# [1]: #time()%20Text
# @example
# $("./body") {
#   bm("TIME")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/bm
# @guidetext 
# @guidelink 
@func bm(Text %name) {
  log(concat(%name, ": ",
    time() {
      yield()
    }
  ))
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://console.moovweb.com/learn/training/function_guides/match). @example `match($path, \"product\")` will see if 'product' appears in the path of the current url."
# @abstract The `match` function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Global
# @args Text %target,Text %comparitor
# @description
# The `match` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. `Match` is used to test the content of variables with strings, regular expressions, and other variables, and then run code according to whether or not the match is successful.
# **Things to note**: If you have more than one variable or regular expression to test againt, you can simply provide the `match` function with the variable in question, and then use embedded `with()` statements for each case. You can also provide a final `else()` statement to serve as a catchall for all unsuccessful matches.
# *Related functions*: [with(text)][1], [else()][2], [not(text)][3], [match_not(target, comparitor)][4]
# ### Common Uses
# * Matching on the `$path` of the response to `@import` page-specific Tritium scripts.
# * Matching attributes with specific content to change them in some way.
# * Simulating `if-then-else` statements and boolean (`true/false`) logic to evaluate different Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming response headers.
# 
# In the following example, we match the `$path` variable to see if it matches the string `product`. Since it does, the log "Match successful!" will output to the terminal.
# [1]: #with(Text%20%25text)%20Text
# [2]: #else()%20Text
# [3]: #not(Text%20%25text)%20Text
# [4]: #match_not(Text%20%25target,%20Text%20%25comparitor)
# @example
# $path = "product"
# match($path, "product") {
#   log("Match successful!")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://console.moovweb.com/learn/training/function_guides/match). @example `match($path, /product/)` will see if 'product' appears in the path of the current url."
# @abstract The `match` function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Global
# @args Text %target,Regexp %comparitor
# @description
# The `match` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. `Match` is used to test the content of variables with strings, regular expressions, and other variables, then run code according to whether or not the match is successful.
# **Things to note**: If you have more than one variable or regular expression to test against, you can simply provide the match function with the variable in question and then use embedded `with()` statements for each case. You can also provide a final `else()` statement to serve as a catchall for all unsuccessful matches.
# *Related functions*: [with(text)][1], [else()][2], [not(text)][3], [match_not(target, comparitor)][4]
# ### Common Uses
# * Matching on the `$path` of the response to `@import` page-specific Tritium scripts.
# * Matching attributes with specific content to change them in some way.
# * Simulating `if-then-else` statements and boolean (`true/false`) logic to evaluate different Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming response headers.
# 
# In the following example, we match the `$path` variable to see if it matches the string `product`. Since it does, the log "Match successful!" will output to the terminal.
# [1]: #with(Text%20%25text)%20Text
# [2]: #else()%20Text
# [3]: #not(Text%20%25text)%20Text
# [4]: #match_not(Text%20%25target,%20Text%20%25comparitor)
# @example
# $path = "product"
# match($path, /product/) {
#   log("Match successful!")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match2
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func match(Text %target, Regexp %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://console.moovweb.com/learn/training/function_guides/match). @example `match_not($path, \"product\")` will check that 'product' is *not* in the url."
# @abstract The `match_not` function is used opposite the `match` function to check that strings and variables do **not** contain certain content.
# @name match_not
# @category Environment,Text
# @scope Global
# @args Text %target,Text %comparitor
# @description 
# The `match_not` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. `Match` is used to test the content of variables with strings, regular expressions, and other variables, then run code according to whether or not the match is successful. `Match_not()` essentially inverts what you would expect from the `match` function. This means that if a match is not successful, then the block of code inside a `match_not()` or `with()` statement will run.
# **Things to note**: If you have more than one variable or regular expression to test againt, you can simply provide the `match_not` function with the variable in question, then use embedded `with()` statements for each case. You can also provide a final `else()` statement to serve as a catchall for all unsuccessful matches.
# *Related functions*: [with(text)][1], [else()][2], [not(text)][3], [match(target)][4]
# ### Common Uses
# * Matching on the `$path` of the response to `@import` page-specific Tritium scripts.
# * Matching attributes with specific content to change them in some way.
# * Simulating `if-then-else` statements and boolean (`true/false`) logic to evaluate different Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming response headers.
# 
# In the following example, we match the `$path` variable to see if it matches the string "price". Since it does not, the log "Match successful!" will output to your terminal.
# [1]: #with(Text%20%25text)%20Text
# [2]: #else()%20Text
# [3]: #not(Text%20%25text)%20Text
# [4]: #match(Text%20%25target)%20Text
# @example
# $path = "product"
# match_not($path, "price") {
#   log("Match successful!")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match_not
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func match_not(Text %target, Text %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://console.moovweb.com/learn/training/function_guides/match). @example `match_not($path, /product/)` will check that 'product' is *not* in the url."
# @abstract The `match_not` function is used opposite the `match` function to check that strings and variables do **not** contain certain content.
# @name match_not
# @category Environment,Text
# @scope Global
# @args Text %target,Regexp %comparitor
# @description
# The `match_not` function is used for pseudo-logic in Tritium. With `match()`, you have the equivalent of `if-else` and `case` statements in many other programming languages. `Match` is used to test the content of variables with strings, regular expressions, and other variables, then run code according to whether or not the match is successful. `Match_not()` essentially inverts what you would expect from the `match` function. This means that if a match is not successful, then the block of code inside that `match_not()` or `with()` statement will run.
# **Things to note**: If you have more than one variable or regular expression to test againt, you can simply provide the `match_not` function with the variable in question and then use embeded `with()` statements for each case. You can also provide a final `else()` statement to serve as a catchall for all unsuccessful matches.
# *Related functions*: [with(text)][1], [else()][2], [not(text)][3], [match(target)][4]
# ### Common Uses
# * Matching on the `$path` of the response to `@import` page-specific Tritium scripts.
# * Matching attributes with specific content to change them in some way.
# * Simulating `if-then-else` statements and boolean (`true/false`) logic to evaluate different Tritium.
# * Matching the `$status`, `$content-type`, or other information from the incoming response headers.
# 
# In the following example, we match the `$path` variable to see if it matches the string "price". Since it does not, the log "Match successful!" will output to your terminal.
# [1]: #with(Text%20%25text)%20Text
# [2]: #else()%20Text
# [3]: #not(Text%20%25text)%20Text
# [4]: #match(Text%20%25target)%20Text
# @example
# $path = "product"
# match_not($path, /price/) {
#   log("Match successful!")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match_not2
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/match
@func match_not(Text %target, Regexp %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"Similar to `remove()`, but works in the text scope. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { clear() } }` will return `<div></div>`."
# @abstract Similar to `remove()` but works in a text scope.
# @name clear
# @category Modify,Text
# @scope Text
# @args 
# @description 
# The `clear` function is used to remove text from inside a text scope.
# *Related functions*: [remove()][1]
# ### Common Uses
# * Clearing text links to turn them into icons
# 
# In the following example, we simply clear any existing text inside the node with an ID of `my_div`.
# [1]: #Attribute.remove()%20Text
# @example
# $$("#my_div") {
#   text() {
#     clear()
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/clear
# @guidetext 
# @guidelink 
@func Text.clear() {
  set("") {
    yield()
  }
}


"Opens the current node for text modification. Should be used when the manipulation is on text *only* - [click for example](http://console.moovweb.com/learn/training/function_guides/text) For other cases, use `inner()`. @example `text() { set(\"<a>\") }` will set the inside as the string `&lt;a&gt;` - whereas using `inner()` will set the *tag*."
# @abstract Opens the current node for text modification. Should be used when the manipulation is on text only.
# @name text
# @category Modify,Text
# @scope Global
# @args
# @description
# The `text()` function is used to either set the text of the current node or to open the text scope of the current node for modification.
# **Things to note**: The `text()` function is different from the `inner()` function in that it will only return an array of the text nodes inside the element from which it is called. `inner()`, on the other hand, will return the entire inner HTML of the node from which it is called.
# *Related functions*: [inner()][1]
# ### Common Uses
# * Opening the scope for the use of text scope functions such as `replace`, `set`, `length`, `append`, `prepend`, `clear` and more.
# * Setting the text of the current node.
# 
# In the example, we open the text scope of the div with an ID of "my_div".
# [1]: #XMLNode.inner()%20Text%20Text
# @example
# $$("#my_div") {
#   text() {
#     # run code on the text scope
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/text
# @guidetext 
# @guidelink 
@func Text.text() {
  this() {
    yield()
  }
}

"Replaces the regular expression specified by **%search** with the text **%with** - [click for example](http://console.moovweb.com/learn/training/function_guides/replace). @example `replace(/bad/, \"good\")`. "
# @abstract Replaces the regular expression specified with the text provided.
# @name replace
# @category Modify,Text
# @scope Text
# @args Regexp %search,Text %with
# @description 
# The `replace` function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings.
# **Things to note**: Unless otherwise specified by the Regular Expression, all matches found by the `%search` parameter will be replaced.
# *Related functions*: [text()][1], [inner()][2]
# ### Common Uses
# * Replacing desktop instructions like "click" to mobile instructions like "tap"
# * Removing extra or unnecessary text
# * Rewriting attributes based on some standard set via a regular expression.
# 
# In the following example, we replace the text "Replace Me" inside `#my_div` with the text "Replaced!".
# [1]: #XMLNode.text()
# [2]: #XMLNode.inner()%20Text%20Text
# @example
# $$("#my_div") {
#   text() {
#     replace(/Replace Me/, "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Regexp %search, Text %with) {
  replace(%search) {
    set(%with)
    yield()
  }
}

"Replaces the text specified by **%search** with the text **%with** - [click for example](http://console.moovweb.com/learn/training/function_guides/replace). @example `replace(\"bad\", \"good\")`. "
# @abstract Replaces the regular expression specified with the text provided.
# @name replace
# @category Modify,Text
# @scope Text
# @args Text %search,Text %with
# @description 
# The `replace` function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings.
# **Things to note**: Unless otherwise specified by the Regular Expression, all matches found by the `%search` parameter will be replaced.
# ### Common Uses
# * Replacing desktop instructions like "click" to mobile instructions like "tap"
# * Removing extra or unnecessary text
# * Rewriting attributes based on some standard set via a regular expression.
# 
# In the following example, we replace the text "Replace Me" inside `#my_div` with the text "Replaced!".
# @example
# $$("#my_div") {
#   text() {
#     replace("Replace Me", "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace2
# @guidetext Function Guide
# @guidelink http://console.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Text %search, Text %with) {
  replace(%search) {
    set(%with)
  }
}

"Returns the length of the item in characters. Note that it includes whitespace and return characters. @example Given `<div>dog and cat</div>`, the Tritium `$(\"./div\") { text() { log(length()) } }` will log **11** in the server logs."
# @abstract Returns the length of the item in characters. This includes whitespace and return characters.
# @name length
# @category Text
# @scope Text
# @args 
# @description 
# The `length` function is used to return the length of the current text node or the provided input string.
# ### Common Uses
# * Validating an input string to make sure it is either a minimum or maximum number of characters.
# * Finding the length of a string.
# 
# In the following example, we log the length of the current text inside the div with an ID of `my_div`.
# @example
# $$("#my_div") {
#   text() {
#     log(length())
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/length
# @guidetext 
# @guidelink 
@func Text.length() {
  $input = this()
  length($input)
}

# TEMPORARY UNTIL I STOP CRYING
/*
@func Text.index() {
  deprecated("You can only use index() in a Node scope")
  "1"
}
*/
@func Text.fetch(Text %text) {
  deprecated("You can only use fetch() in a Node scope")
  ""
}

# DEPRECATED
@func match(Regexp %regexp, Text %against) {
  deprecated("Please use match(Text, Regexp). Reverse them!")
  match(%against, %regexp) {
    yield()
  }
}
@func Text.dump() {
  this()
}

# @abstract The `encode64` function encodes the specified string using a base64 encoder.
# @name encode64
# @category Text
# @scope Global
# @args Text %str
# @description
# The `encode64` function encodes the specified string using a base64 encoder.
# 
# In the following example, we encode `%password`.
# @example
# $encoded_password = encode64(%password)
# @exampletext 
# @examplelink 
# @guidetext 
# @guidelink 
@func encode64(Text %str) {
  base64_v1("encode", %str) {
    yield()
  }
}

# @abstract The `decode64` function decodes the specified string using a base64 decoder.
# @name decode64
# @category Text
# @scope Global
# @args Text %str
# @description
# The `decode64` function decodes the specified string using a base64 decoder.
# 
# In the following example, we decode `%encoded_password`.
# @example
# $decoded_password = decode64(%encoded_password)
# @exampletext 
# @examplelink 
# @guidetext 
# @guidelink 
@func decode64(Text %str) {
  base64_v1("decode", %str) {
    yield()
  }
}

@func Text.parse_headers() {
  parse_headers_v1() {
    yield()
  }
}

@func Header.name() {
  header_comp_v1("name") {
    yield()
  }
}
@func Header.value() {
  header_comp_v1("value") {
    yield()
  }
}
@func Header.this() {
  header_comp_v1("this") {
    yield()
  }
}
@func Header.name(Text %val) {
  name() {
    set(%val)
    yield()
  }
}
@func Header.value(Text %val) {
  value() {
    set(%val)
    yield()
  }
}
@func Header.this(Text %val) {
  this() {
    set(%val)
    yield()
  }
}

@func Text.parse_headers(Regexp %regex) {
  parse_headers() {
    match(this(), %regex) {
      yield()
    }
  }
}
@func Header.remove() {
  this("")
}

@func Text.add_header(Text %name, Text %value) {
  append("\r\n" + %name + ": " + %value)
}

@func Text.remove_header(Regexp %regex) {
  parse_headers(%regex) {
    remove()
  }
}
@func Text.remove_header(Text %name) {
  parse_headers() {
    match(name(), regexp(%name, "i")) {
      remove()
    }
  }
}
