@func XMLNode.add_class(Text %class) {
  attribute("class") {
    value() {
      append(" ")
      # append(%class) -- the serializer doesn't like this
    }
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

@func XMLNode.inner_wrap(Text %tag_name) {
  inner() {
    # Serializer doesn't like this either
    # prepend(concat("<", concat(%tag_name, ">")))
    # append(concat("</", concat(%tag_name, ">")))
  }
  select("./*[1]") {
    yield()
  }
}


@func XMLNode.absolutize() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    # replace(/[^\/]+$/, "") - serializer  says no
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  
# -- Serializer doesn't like this either  
#  $(".//img|.//script") {
#    #var("src", fetch("./@src"))
#    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
#    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
#      attribute("src") {
#        value() {
#          match($src) {
#            with(/^\//) {
#              # host-relative URL: just add the host
#              # prepend($host)
#              prepend("//")
#            }
#            else() {
#              # path-relative URL: add the host and the path
#              #prepend($slash_path)
#              #prepend($host)
#              prepend("//")
#            }
#          }
#        }
#      }
#    }
#    yield()
#  }

}