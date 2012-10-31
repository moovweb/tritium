" This is a the way that we have Tritium communicate variables back to its execution environment. - [click for example](http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables)@example `export(\"Content-Type\", \"application/js\")` changes the content-type to application/js."
# @abstract The export function is used to set response header information such as content-type, cache-time, and more. 
# @name export
# @category Environment
# @scope Text
# @args Text %key, Text %value
# @description 
# @example
# html() {
#   export("Content-Type", "text/html")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/export
# @guidetext Useful Environment Variables
# @guidelink http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables
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
# @example
# with(regexp("true")) {
# # run this code if your text matches the string "true" 
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/regexp
# @guidetext Replacing Text With Regexp
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
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
# @example
# $$("head") {
#  insert("link", src:asset("stylesheets/mystyles.css"))
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/asset
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/asset
@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

"Prints the time a block took to run. @example `html() { bm(\"TIME\") }` will print the time it took to parse the HTML in the server logs in the format 'TIME: x ms'."
# @abstract The bm function prints the time a block took to run.
# @name bm
# @category Environment
# @scope Text
# @args Text %name
# @description 
# @example
# $("./body") {
#  bm()
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/bm
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
# @args Text %target, Text %comparitor
# @description If only one string is to be matched, it can be placed after the target.
# @example
#   $path = "product"
#   match($path, "product") {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/match
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
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
# @args Text %target, Regexp %comparitor
# @description If only one string is to be matched, it can be placed after the target.
# @example
#   $path = "product"
#   match($path, /product/) {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/match2
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
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
# @args Text %target, Text %comparitor
# @description 
# @example
#   $path = "product"
#   match_not($path, "price") {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/match_not
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
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
# @args Text %target, Regexp %comparitor
# @description 
# @example
#   $path = "product"
#   match_not($path, /price/) {
#     log("Match successful!")
#   }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/match_not2
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/match
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
# @example
# $$("#my_div") {
#   text() {
#     clear()
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/clear
# @guidetext Detailed Function Guide
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
# @example
# $$("#my_div") {
#   text() {
#     # run code on the text scope
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext Detailed Function Guide
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
# @args Text Regexp %search, Text %with
# @description 
# @example
# $$("#my_div") {
#   text() {
#     replace(/Replace Me/, "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/replace
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
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
# @args Text Text %search, Text %with
# @description 
# @example
# $$("#my_div") {
#   text() {
#     replace("Replace Me", "Replaced!")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/replace2
# @guidetext Detailed Function Guide
# @guidelink http://beta.moovweb.com/learn/training/function_guides/replace
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
# @args Text 
# @description 
# @example
# $$("#my_div") {
#   text() {
#     log(length())
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/base/test/examples/text/length
# @guidetext Detailed Function Guide
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
