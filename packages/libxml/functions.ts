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
    yield()
  }
}

@func Attribute.name(Text %name) {
  name() { 
    set(%name) 
    yield()
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
    yield()
  }
}

@func XMLNode.absolutize() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  

  $(".//img|.//script") {
    #var("src", fetch("./@src"))
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend($host)
              prepend("//")
            }
            else() {
              # path-relative URL: add the host and the path
              prepend($slash_path)
              prepend($host)
              prepend("//")
            }
          }
        }
      }
    }
    yield()
  }
}

@func XMLNode.insert_javascript_at(Position %pos, Text %js) {
  insert_at(%pos, "script") {
    attribute("type", "text/javascript")
    cdata(concat("//<![CDATA[\n", %js, "\n//]]>"))
    yield()
  }
}

@func XMLNode.insert_javascript(Text %js) {
  insert_javascript_at(position(), %js) {
    yield()
  }
}

@func XMLNode.inner(Text %html) {
  inner() {
    set(%html) 
    yield() 
  } 
}

@func XMLNode.wrap(Text %tag) {
  %parent_node = this()
  insert_at(position("before"), %tag) {
    move(%parent_node, this(), position("top"))
    yield()
  }
}

@func XMLNode.dump() {
  to_text(this())
}

@func XMLNode.wrap(Text %tag) {
  %node = this()
  insert_at(position("before"), %tag) {
    move(%node, this(), position("top"))
    yield()
  }
}

@func XMLNode.wrap_together(Text %selector, Text %tag) {
  $(%selector + "[1]") {
    insert_at(position("before"), %tag) {
      %node = node()
      $("../" + %selector) {
        match_not(index(), "1") {
          move(this(), %node, position("top"))
        }
      }
      yield()
    }
  }
   
}

# This is used to specify the encoding for a page
@func Text.html(Text %enc) {
  html(%enc, "utf-8")
}

@func Text.html() {
  html("", "utf-8")
}

@func Text.html_fragment() {
  html_fragment("")
}

# POSITIONALS
# siblings of these are in node, but these use Inner so are here.
@func XMLNode.insert_at(Position %pos, Text %tag, Text %content) {
  insert_at(%pos, %tag) {
    inner(%content)
    yield()
  }
}
@func XMLNode.insert(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}
@func XMLNode.insert_bottom(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}
@func XMLNode.insert_top(Text %tag, Text %inner) {
  insert_at(position("top"), %tag) {
    inner(%inner)
    yield()
  }
}
@func XMLNode.insert_after(Text %tag, Text %inner) {
  insert_at(position("after"), %tag) {
    inner(%inner)
    yield()
  }
}
@func XMLNode.insert_before(Text %tag, Text %inner) {
  insert_at(position("before"), %tag) {
    inner(%inner)
    yield()
  }
}


@func XMLNode.insert_javascript_bottom(Text %js) {
  insert_javascript_at(position("bottom"), %js) {
    yield()
  }
}
@func XMLNode.insert_javascript_top(Text %js) {
  insert_javascript_at(position("top"), %js) {
    yield()
  }
}
@func XMLNode.insert_javascript_after(Text %js) {
  insert_javascript_at(position("after"), %js) {
    yield()
  }
}
@func XMLNode.insert_javascript_before(Text %js) {
  insert_javascript_at(position("before"), %js) {
    yield()
  }
}

### DEPRECATED ####

@func asset(Text %name, Text %type) {
  deprecated("Please use asset('path/to/asset.jpg')")
  match(%type) {
    with("js") {
      $_deprecated_assets_tmp = asset(concat("javascript/", %name))
    }
    with("image") {
      $_deprecated_assets_tmp = asset(concat("images/", %name))
    }
    with("stylesheet") {
      $_deprecated_assets_tmp = asset(concat("stylesheets/.css/", %name))
    }
  }
  $_deprecated_assets_tmp
}