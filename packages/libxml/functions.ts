@func Node.$(Text %xpath) {
  select(%xpath) {
    yield()
  }
}

@func XMLNode.add_class(Text %class) {
  attribute("class") {
    value() {
      append(" ")
      append(%class)
    }
    yield()
  }
}

@func XMLNode.inner_wrap(Text %tag_name) {
  inner() {
    prepend(concat("<", concat(%tag_name, ">")))
    append(concat("</", concat(%tag_name, ">")))
  }
  select("./*[1]") {
    yield()
  }
}


@func XMLNode.attribute(Text %name, Text %value) {
  attribute(%name) {
    value() {
      set(%value)
    }
    yield()
  }
}

@func Attribute.value(Text %value) {
  value() {
    set(%value)
  }
}

@func sass(Text %filename) {
  asset(concat("stylesheets/.css/", concat(%filename, ".css"))) {
    yield()
  }
}

@func XMLNode.set(Text %name, Text %value) {
  attribute(%name) {
    value(%value)
  }
}

# Used to be a helper function, just pass through and should work the same
@func XMLNode.attributes() {
  yield()
}

@func XMLNode.text() {
  inner_text() {
    yield()
  }
}

@func XMLNode.text(Text %value) {
  text() {
    set(%value)
  }
}

@func XMLNode.name(Text %value) {
  name() {
    set(%value)
  }
}

# 
# @func XMLNode.absolutize() {
#   # Absolutize IMG and SCRIPT SRCs
#   var("slash_path") {
#     # the 'slash_path' is the path of this page without anything following it's last slash
#     set($path)
#     replace(/[^\/]+$/, "")
#     # turn empty string into a single slash because this is the only thing separating the host from the path relative path
#     replace(/^$/, "/")
#   }
#   
# 
#   $(".//img|.//script") {
#     #var("src", fetch("./@src"))
#     # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
#     match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
#       attribute("src") {
#         value() {
#           match($src) {
#             with(/^\//) {
#               # host-relative URL: just add the host
#               prepend($host)
#               prepend("//")
#             }
#             else() {
#               # path-relative URL: add the host and the path
#               prepend($slash_path)
#               prepend($host)
#               prepend("//")
#             }
#           }
#         }
#       }
#     }
#     yield()
#   }
# }
