@func asset(Text %name) {
  concat($asset_host, %name) {
    yield()
  }
}

@func bm(Text %name) {

# The argument serialization is wonky. 
# Even in ruby land, I can't deserialize this properly

#  log(concat(%name, ": ", 
#    time() {
      #yield() # More serializer unhappiness
#    }, "s"))
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