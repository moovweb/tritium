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

@func Text.clear() {
  set("") {
    yield()
  }
}

@func else() {
  with(/.?/) {
    yield()
  }
}