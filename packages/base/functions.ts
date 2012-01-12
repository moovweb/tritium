
@func regexp(Text %exp) {
  regexp(%exp, "")
}

@func export(Text %key, Text %value) {
  export(%key) {
    set(%value)
    yield()
  }
}

@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

@func bm(Text %name) {
  log(concat(%name, ": ", 
    time() {
      yield()
    }, "s"))
}


@func else() {
  with(/.?/) {
    yield()
  }
}

@func match(Text %target, Text %comparitor) {
  match(%target) {
    with(%comparitor) {
      yield()
    }
  }
}

@func match(Text %target, Regexp %comparitor) {
  match(%target) {
    with(%comparitor) {
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
  }
}

@func Text.replace(Text %search, Text %with) {
  replace(%search) {
    set(%with)
  }
}