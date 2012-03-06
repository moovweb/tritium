" This is a the way that we have Tritium communicate variables back to its execution environment. That sounds complicated, but in most uses of Tritium, it would be something like export(\"Content-Type\", \"application/js\") to tell the app to change the content-type. Look at the reference for your server for more information on what you can export. "

@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

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
    }, "s"))
}

"If only one string is to be matched, it can be placed after the target."
@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

"If only one string is to be matched, it can be placed after the target."
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


@func Text.clear() {
  set("") {
    yield()
  }
}

@func Text.text() {
  this() {
    yield()
  }
}

@func Text.replace(Regexp %search, Text %with) {
  replace(%search) {
    set(%with)
    yield()
  }
}

@func Text.replace(Text %search, Text %with) {
  replace(%search) {
    set(%with)
  }
}


@func Text.rewrite(Text %type) {
  # Wrote this when the parser was a little funky. This can be much
  # prettier with some nice lvar usage
  replace(regexp(var(concat(concat("rewrite_", %type), "_matcher")))) {
    set(var(concat(concat("rewrite_", %type), "_replacement")))
  }
}

# TEMPORARY UNTIL I STOP CRYING
@func Text.index() { 
  deprecated("You can only use index() in a Node scope")
  "1"
}
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