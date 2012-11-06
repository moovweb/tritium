" This is a the way that we have Tritium communicate variables back to its execution environment. - [click for example](http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables)@example `export(\"Content-Type\", \"application/js\")` changes the content-type to application/js."
# @abstract The export function is used to set response header information such as content-type, cache-time, and more. 
# @name export
# @category Environment
# @scope Text
# @args Text %key,Text %value
# @description
# The export function is used when you want to change the outgoing response header.
# Things to note: You cannot currently export the status of the response header (i.e. 200, 302, etc.).
# Common uses include:
# 1) Malformed HTML or Javascript with the wrong content-type set.
# 2) Setting the Cache-Time of the page.
# 3) Setting the Location for a redirect.
# In this example, we are setting the Content-Type to "text/html".  
# @example
# html() {
#   export("Content-Type", "text/html")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/export
# @guidetext Useful Environment Variables
# @guidelink  http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables
@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

"Parses regular expressions. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) @example `with(regexp(\"a\"))` is equivalent to `with(/a/)`. "
# @abstract The regexp function is used to parse regular expressions.
# @name regexp
# @category Environment,Modify,Text
# @scope Text
# @args Text %exp
# @description
# The regexp function is used to parse expressions and turn them into regular expressions. Regular Expressions are incredibly powerful for selecting and modifying groups of text.
# Related functions: <a href='#match Text target Regexp comparitor'>match(Text %target, Regexp %comparitor)</a>, <a href='#with'>with()</a>, <a href='#not'>not()</a>
# Common uses include:
# 1) Removing extra text when transitioning from desktop to mobile sites.
# 2) Modifying text to be more clear and concise to fit a smaller viewport.
# 3) Changing instructions such as "click" to "tap" for mobile devices.
# 4) Fixing malformed HTML before the document is parsed so your selectors work properly.
# In this example, we are using the string "true" and turning it into a regular expression to use in a match/with statement. If the string true is anywhere in the text we are matching, the code in the with() statement will run. 
# @example
# with(regexp("true")) {
# # run this code if your text matches the string "true" 
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/regexp
# @guidetext Regex Guide
# @guidelink  http://beta.moovweb.com/learn/reference/tools/regex
@func regexp(Text %exp) {
  regexp(%exp, "")
}

"References to the assets folder without hard-coding a path - [click for example](http://beta.moovweb.com/learn/training/function_guides/asset). @example `asset(\"images/icon.png\")` points to *assets/images/icon*, including the domain if necessary."
# @abstract The asset function is used to rewrite the source attribute of your assets.
# @name asset
# @category Environment
# @scope Text
# @args Text %name
# @description
# The asset function is most commonly used to rewrite the sources of images to the new Moovweb domain so that you can serve local content fast. Often when redesigning sites, you'll want to resize images, minify javascript, bundle assets together, and take a variety of performance measures to optimize your mobile site. Performance is increasingly important for mobile because of the significantly worse bandwidth that your users are using to connect (Edge, 3G, and WiFi). This means you'll want to optimize and re-serve any bloated content from the desktop site. The asset function helps to rewrite all those sources. 
# Common uses include:
# 1) Serving optimized local images
# 2) Rewriting src and href tags for scripts, links, and images. 
# 3) Serving local stylesheets 
# In this example, we are inserting a new link tag with a src that uses the asset() function to define its domain and then we pass in the path name as the parameter to the asset function. 
# @example
# $$("head") {
#  insert("link", src:asset("stylesheets/mystyles.css"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/asset
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/asset
@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

"Prints the time a block took to run. @example `html() { bm(\"TIME\") }` will print the time it took to parse the HTML in the server logs in the format 'TIME: x ms'."
# @abstract The bm function prints in the terminal output the time a block took to run.
# @name bm
# @category Environment
# @scope Text
# @args Text %name
# @description 
# The bm function is used to test the performance of your code by the proxy. Generally, the majority of your performance boost will come from optimizing the images, scripts, and stylesheets of the existing desktop site. However, there are ways to improve performance of the execution of the proxy such as using XPath selectors instead of CSS selectors and avoiding deep searches for content in the DOM. 
# Things to note: The bm() measurements vary between trials so you may have to run several samples to get an accurate representation of execution speed.
# Related functions: <a href="#time">time()</a>
# Common uses include:
# 1) Measuring the time it takes for a block of code to run. 
# @example
# $("./body") {
#  bm("TIME")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/bm
# @guidetext
# @guidelink 
@func bm(Text %name) {
  log(concat(%name, ": ", 
    time() {
      yield()
    }))
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match($path, \"product\")` will see if 'product' appears in the path of the current url."
# @abstract The match function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Text
# @args Text %target,Text %comparitor
# @description
# The match function is used for pseudo-logic in Tritium. With match(), you have the equivalent of if-else and case statements in many other programming languages. Match is used to test the content of variables with strings, regular expressions, and other variables and then run code according to whether or not the match is successful. 
# Things to note: If you have more than one variable or regular expression to test againt, you can simply provide the match function with the variable in question and then use embeded with() statements for each case. You can also provide a final else() statement to serve as a catchall for all unsuccessful matches.
# Related functions: <a href="#with">with()</a>, <a href="#else">else()</a>, <a href="#not">not()</a>, <a href="#match_not Text target">match_not(Text %target)</a>
# Common uses include:
# 1) Matching the URL Path of the page and @importing different Tritium scripts depending on what page you are on.
# 2) Matching attributes with certain content to determine if they need to be changed in some way. 
# 3) Simulating if/then/else statements and boolean true/false logic to run differing Tritium. 
# 4) Matching the status, content-type, or other information from the incoming header.
# In this example, we match the $path variable to see if it matches the string "product". Since it does, the log "Match successful!" will output to your terminal.
# @example
#   $path = "product"
#   match($path, "product") {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/match
@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match($path, /product/)` will see if 'product' appears in the path of the current url."
# @abstract The match function is used for logic to check against the content of strings and variables.
# @name match
# @category Environment,Text
# @scope Text
# @args Text %target,Regexp %comparitor
# @description
# The match function is used for pseudo-logic in Tritium. With match(), you have the equivalent of if-else and case statements in many other programming languages. Match is used to test the content of variables with strings, regular expressions, and other variables and then run code according to whether or not the match is successful. 
# Things to note: If you have more than one variable or regular expression to test againt, you can simply provide the match function with the variable in question and then use embeded with() statements for each case. You can also provide a final else() statement to serve as a catchall for all unsuccessful matches.
# Common uses include:
# 1) Matching the URL Path of the page and @importing different Tritium scripts depending on what page you are on.
# 2) Matching attributes with certain content to determine if they need to be changed in some way. 
# 3) Simulating if/then/else statements and boolean true/false logic to run differing Tritium. 
# 4) Matching the status, content-type, or other information from the incoming header.
# In this example, we match the $path variable to see if it matches the string "product". Since it does, the log "Match successful!" will output to your terminal.
# Related functions: <a href="#with">with()</a>, <a href="#else">else()</a>, <a href="#not">not()</a>, <a href="#match_not Text target">match_not(Text %target)</a>
# @example
#   $path = "product"
#   match($path, /product/) {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match2
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/match
@func match(Text %target, Regexp %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match_not($path, \"product\")` will check that 'product' is *not* in the url."
# @abstract The match_not function is used opposite the match function to check that strings and variables do not contain certain content.
# @name match_not
# @category Environment,Text
# @scope Text
# @args Text %target,Text %comparitor
# @description 
# The match_not function is used for pseudo-logic in Tritium. With match(), you have the equivalent of if-else and case statements in many other programming languages. Match is used to test the content of variables with strings, regular expressions, and other variables and then run code according to whether or not the match is successful. Match_not() essentially inverts what you would expect from the match function. This means that if a match is not successful, then the block of code inside that match_not() or with() statement will run. 
# Things to note: If you have more than one variable or regular expression to test againt, you can simply provide the match_not function with the variable in question and then use embeded with() statements for each case. You can also provide a final else() statement to serve as a catchall for all unsuccessful matches.
# Related functions: <a href="#with">with()</a>, <a href="#else">else()</a>, <a href="#not">not()</a>, <a href="#match Text target">match(Text %target)</a>
# Common uses include:
# 1) Matching the URL Path of the page and @importing different Tritium scripts depending on what page you are on.
# 2) Matching attributes with certain content to determine if they need to be changed in some way. 
# 3) Simulating if/then/else statements and boolean true/false logic to run differing Tritium. 
# 4) Matching the status, content-type, or other information from the incoming header.
# In this example, we match the $path variable to see if it matches the string "price". Since it does not, the log "Match successful!" will output to your terminal.
# @example
#   $path = "product"
#   match_not($path, "price") {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match_not
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/match
@func match_not(Text %target, Text %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match_not($path, /product/)` will check that 'product' is *not* in the url."
# @abstract The match_not function is used opposite the match function to check that strings and variables do not contain certain content.
# @name match_not
# @category Environment,Text
# @scope Text
# @args Text %target,Regexp %comparitor
# @description
# The match_not function is used for pseudo-logic in Tritium. With match(), you have the equivalent of if-else and case statements in many other programming languages. Match is used to test the content of variables with strings, regular expressions, and other variables and then run code according to whether or not the match is successful. Match_not() essentially inverts what you would expect from the match function. This means that if a match is not successful, then the block of code inside that match_not() or with() statement will run. 
# Things to note: If you have more than one variable or regular expression to test againt, you can simply provide the match_not function with the variable in question and then use embeded with() statements for each case. You can also provide a final else() statement to serve as a catchall for all unsuccessful matches.
# Related functions: <a href="#with">with()</a>, <a href="#else">else()</a>, <a href="#not">not()</a>, <a href="#match Text target">match(Text %target)</a>
# Common uses include:
# 1) Matching the URL Path of the page and @importing different Tritium scripts depending on what page you are on.
# 2) Matching attributes with certain content to determine if they need to be changed in some way. 
# 3) Simulating if/then/else statements and boolean true/false logic to run differing Tritium. 
# 4) Matching the status, content-type, or other information from the incoming header.
# In this example, we match the $path variable to see if it matches the string "price". Since it does not, the log "Match successful!" will output to your terminal.
# @example
#   $path = "product"
#   match_not($path, /price/) {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink test/examples/match_not2
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/match
@func match_not(Text %target, Regexp %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"Similar to `remove()`, but works in the text scope. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { clear() } }` will return `<div></div>`."
# @abstract Similar to remove() but works in a text scope.
# @name clear
# @category Modify,Text
# @scope Text
# @args
# @description 
# The clear function is used to remove text from inside a text scope.
# Related functions: <a href="#remove">remove()</a>
# Common uses include:
# 1) Clearing extra white space inside nodes
# 2) Clearing text links to turn them into icons 
# In this example, we are simply clearing any existing text inside the node with an ID of "my_div". 
# @example
# $$("#my_div") {
#   text() {
#     clear()
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/clear
# @guidetext Function Guide
# @guidelink  
@func Text.clear() {
  set("") {
    yield()
  }
}


"Opens the current node for text modification. Should be used when the manipulation is on text *only* - [click for example](http://beta.moovweb.com/learn/training/function_guides/text) For other cases, use `inner()`. @example `text() { set(\"<a>\") }` will set the inside as the string `&lt;a&gt;` - whereas using `inner()` will set the *tag*."
# @abstract Opens the current node for text modification. Should be used when the manipulation is on text only.
# @name text
# @category Modify,Text
# @scope XMLNode
# @args
# @description 
# The text() function is used to either set the text of the current node, or to open the text scope of the current node for modification. 
# Things to note: The text() function is different from the inner() function in that it will only return an array of the text nodes inside the element from which it is called. Inner(), on the other hand, will return the entire inner HTML of the node from which it is called.
# Related functions: <a href="#inner">inner()</a>
# Common uses include: 
# 1) Opening the scope for the use of text scope functions such as replace, set, length, append, prepend, clear and more. 
# 2) Setting the text of the current node. 
# In this example, we are opening the text scope of the div with an ID of "my_div".
# @example
# $$("#my_div") {
#   text() {
#     # run code on the text scope
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/text
# @guidetext Function Guide
# @guidelink 
@func Text.text() {
  this() {
    yield()
  }
}

"Replaces the regular expression specified by **%search** with the text **%with** - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(/bad/, \"good\")`. "
# @abstract Replaces the regular expression specified with the text provided.
# @name replace
# @category Modify,Text
# @scope Text
# @args Text Regexp %search,Text %with
# @description 
# The replace function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings. 
# Things to note: Unless otherwise specified by the Regular Expression, all matches found by the %search parameter will be replaced.
# Related functions: <a href="#text">text()</a>, <a href="#inner">inner()</a>
# Common uses include:
# 1) Replacing desktop instructions like "click" to mobile instructions like "tap"
# 2) Removing extra or unnecessary text
# 3) Rewriting attributes based on some standard set via a regular expression.
# In this example we are replacing the text "Replace Me" inside #my_div with the text "Replaced!".
# @example
# $$("#my_div") {
#   text() {
#     replace(/Replace Me/, "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/replace
@func Text.replace(Regexp %search, Text %with) {
  replace(%search) {
    set(%with)
    yield()
  }
}

"Replaces the text specified by **%search** with the text **%with** - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(\"bad\", \"good\")`. "
# @abstract Replaces the regular expression specified with the text provided.
# @name replace
# @category Modify,Text
# @scope Text
# @args Text Text %search,Text %with
# @description 
# The replace function is used to alter existing text nodes by replacing them based on either regular expressions or specific strings. 
# Things to note: Unless otherwise specified by the Regular Expression, all matches found by the %search parameter will be replaced. 
# Common uses include:
# 1) Replacing desktop instructions like "click" to mobile instructions like "tap"
# 2) Removing extra or unnecessary text
# 3) Rewriting attributes based on some standard set via a regular expression.
# In this example we are replacing the text "Replace Me" inside #my_div with the text "Replaced!".
# @example
# $$("#my_div") {
#   text() {
#     replace("Replace Me", "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/replace2
# @guidetext Function Guide
# @guidelink  http://beta.moovweb.com/learn/training/function_guides/replace
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
# The length function is used to return the length of the current text node or the provided input string. 
# Common uses include:
# 1) Validating an input string to make sure it is either a minimum or maximum number of characters.
# 2) Finding the length of a string. 
# In this example, we log the length of the current text inside the div with an ID of "my_div".
# @example
# $$("#my_div") {
#   text() {
#     log(length())
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text/length
# @guidetext Function Guide
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
