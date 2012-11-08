" This is a the way that we have Tritium communicate variables back to its execution environment. - [click for example](http://beta.moovweb.com/learn/reference/configuration/index#Environment+Variables)@example `export(\"Content-Type\", \"application/js\")` changes the content-type to application/js."

@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

"Parses regular expressions. (Use hard-coded regex if you can. This is much slower than hard-coding regex.) @example `with(regexp(\"a\"))` is equivalent to `with(/a/)`. "

@func regexp(Text %exp) {
  regexp(%exp, "")
}

"Prints the time a block took to run. @example `html() { bm(\"TIME\") }` will print the time it took to parse the HTML in the server logs in the format 'TIME: x ms'."
@func bm(Text %name) {
  log(concat(%name, ": ", 
    time() {
      yield()
    }))
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match($path, \"product\")` will see if 'product' appears in the path of the current url."
@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"If only one string is to be matched, it can be placed after the target - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match($path, /product/)` will see if 'product' appears in the path of the current url."
@func match(Text %target, Regexp %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match_not($path, \"product\")` will check that 'product' is *not* in the url."
@func match_not(Text %target, Text %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()` - [click for example](http://beta.moovweb.com/learn/training/function_guides/match). @example `match_not($path, /product/)` will check that 'product' is *not* in the url."
@func match_not(Text %target, Regexp %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"References to the assets folder without hard-coding a path - [click for example](http://beta.moovweb.com/learn/training/function_guides/asset). @example `asset(\"images/icon.png\")` points to *assets/images/icon*, including the domain if necessary."
@func asset(Text %name) {
  match($__abs_asset_host__) {
    with("") {
      #check if not checked yet
      match($asset_host) {
        with(/^(http:|https:|)\/\//) {
          #nothing
        }
        else() {
          $asset_host = concat("//", $host, $asset_host)
        }
        $__abs_asset_host__ = "true"
      }
      $asset_url = concat($asset_host, %name)
    }
    else() {
      $asset_url = concat($asset_host, %name)
    }
  }
  #no yield
  #what scope does it open anyway
  $asset_url
}

"Similar to `remove()`, but works in the text scope. @example Given `<div>Dog</div>`, `$(\"./div\") { text() { clear() } }` will return `<div></div>`."
@func Text.clear() {
  set("") {
    yield()
  }
}

"Opens the current node for text modification. Should be used when the manipulation is on text *only* - [click for example](http://beta.moovweb.com/learn/training/function_guides/text) For other cases, use `inner()`. @example `text() { set(\"<a>\") }` will set the inside as the string '&lt;a&gt;' - whereas using `inner()` will set the *tag*."
@func Text.text() {
  this() {
    yield()
  }
}

"Replaces the regular expression specified by **%search** with the text **%with** - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(/bad/, \"good\")`. "

@func Text.replace(Regexp %search, Text %with) {
  replace(%search) {
    set(%with)
    yield()
  }
}

"Replaces the text specified by **%search** with the text **%with** - [click for example](http://beta.moovweb.com/learn/training/function_guides/replace). @example `replace(\"bad\", \"good\")`. "

@func Text.replace(Text %search, Text %with) {
  replace(%search) {
    set(%with)
  }
}

"Returns the length of the item in characters. Note that it includes whitespace and return characters. @example Given `<div>dog and cat</div>`, the Tritium `$(\"./div\") { text() { log(length()) } }` will log **11** in the server logs."

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
