" This is a the way that we have Tritium communicate variables back to its execution environment. For example,  `export(\"Content-Type\", \"application/js\")` to change the content-type. "

@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

"Parses regular expressions - so `/a/` is equivalent to `regexp(\"a\")`. (Use hard-coded regex if you can. This is much slower than hard-coding regex.)  "

@func regexp(Text %exp) {
  regexp(%exp, "")
}

"Allows reference to the assets folder without hard-coding a path. For example, `asset(\"images/icon.png\")`."

@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

"Prints the time a block took to run."

@func bm(Text %name) {
  log(concat(%name, ": ", 
    time() {
      yield()
    }))
}

"If only one string is to be matched, it can be placed after the target. For example `match($path, \"product\")`."

@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"If only one string is to be matched, it can be placed after the target. For example, `match($path, /product/)`."

@func match(Text %target, Regexp %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()`."

@func match_not(Text %target, Text %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"The opposite of `match()`."

@func match_not(Text %target, Regexp %comparitor) {
  match(%target) {
    not(%comparitor) {
      yield()
    }
  }
}

"Similar to `remove()`, but works in the text scope."

@func Text.clear() {
  set("") {
    yield()
  }
}

"Opens the current node for text modification. Should be used when the current node contains text *only*. For other cases, use `inner()`."

@func Text.text() {
  this() {
    yield()
  }
}

"Replaces the regular expression specified by **%search** with the text **%with**. For example, `replace(/bad/, \"good\")`. "

@func Text.replace(Regexp %search, Text %with) {
  replace(%search) {
    set(%with)
    yield()
  }
}

"Replaces the text specified by **%search** with the text **%with**. For example, `replace(\"bad\", \"good\")`. "

@func Text.replace(Text %search, Text %with) {
  replace(%search) {
    set(%with)
  }
}

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
"Deprecated"

@func match(Regexp %regexp, Text %against) {
  deprecated("Please use match(Text, Regexp). Reverse them!")
  match(%against, %regexp) {
    yield()
  }
}

"Deprecated"

@func Text.dump() {
  this()
}

"Deprecated"

@func Text.foo() {
  log("FOO")
}
