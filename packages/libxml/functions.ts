"Adds a class (specified by **%class**) to the currently-selected node. Also adds a space to prevent overwriting of any over classes."

@func XMLNode.add_class(Text %class) {


  attribute("class") {
    value() {
      append(" ")
      append(%class)
    }
    yield()
  }
}

"Wraps the *contents* of the currently-selected node in the tag defined by **%tag**. (Compare this to `wrap()`, which wraps the currently-selected node, not its contents.)"

@func XMLNode.inner_wrap(Text %tag_name) {

  insert_top(%tag_name) {
    %wrapper = this()
    $("..") {
      move_children_to(%wrapper, position("bottom"))
    }
    yield()
  }
}

"Removes any children text nodes."
@func XMLNode.remove_text_nodes() {
  remove("./text()")
}

"Allows you to set the value (**%value**) for the attribute you are selecting with **%name** - e.g.  `attribute(\"class\", \"one\")` sets the class as 'one'."

@func XMLNode.attribute(Text %name, Text %value) {
  attribute(%name) {
    value() {
      set(%value)
    }
    yield()
  }
}

"Changes the value of the currently-selected attribute to that specified by **%value**."
@func Attribute.value(Text %value) {
  value() {
    set(%value)
    yield()
  }
}

"Changes the name of the currently-selected attribute to that specified by **%name**.

In these cases, the following Tritium is identical:

    attribute(\"class\") {
      name(\"whee\")
    }

    attribute(\"class\") {
      name() {
        set(\"whee\")
      }
    }
"

@func Attribute.name(Text %name) {
  name() { 
    set(%name) 
    yield()
  }
}

"Similar to `asset()`, but references a Sass stylesheet specifically."

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
"Allows mass-attribute setting."

@func XMLNode.attributes() {
  yield()
}

" Opens the current node for text modificaiton. "

@func XMLNode.text() {
  inner_text() {
    yield()
  }
}

"Opens the current node for text modification, replacing everything inside with the **%value**. (Essentially, the same as `text() { set(Text %value) }`.)"

@func XMLNode.text(Text %value) {
  text() {
    set(%value)
    yield()
  }
}

"Searches for `<img>` and `<script>` tags and ensures a domain is in their path."

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

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node at the position specified by **%pos**."

@func XMLNode.insert_javascript_at(Position %pos, Text %js) {
  insert_at(%pos, "script") {
    attribute("type", "text/javascript")
    cdata(concat("//<![CDATA[\n", %js, "\n//]]>"))
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node."

@func XMLNode.insert_javascript(Text %js) {
  insert_javascript_at(position(), %js) {
    yield()
  }
}

"Opens the insides of the node to text modification - anything within the node will be overwritten by what is put in **%html**."

@func XMLNode.inner(Text %html) {
  inner() {
    set(%html) 
    yield() 
  } 
}

"Wraps the selected node in the tag defined by **%tag**, then yields to the new tag."

@func XMLNode.wrap(Text %tag) {
  %parent_node = this()
  insert_at(position("before"), %tag) {
    move(%parent_node, this(), position("top"))
    yield()
  }
}

# @HC - This seems like a duplicate:

@func XMLNode.wrap(Text %tag) {
  %node = this()
  insert_at(position("before"), %tag) {
    move(%node, this(), position("top"))
    yield()
  }
}

"Wraps the selected nodes (defined by **%selector**) in a tag specified by **%tag**."

@func XMLNode.wrap_together(Text %selector, Text %tag) {
  $(%selector + "[1]") {
    wrap(%tag) {
      %wrapper = this()
      $("..") {
        $(%selector) {
          match(equal(this(), %wrapper), "false") {
            move(this(), %wrapper, position("bottom"))
          }
        }
      }
      yield()
    }
  }
}

# This is used to specify the encoding for a page
"Parses the document into HTML."

@func Text.html(Text %from_enc, Text %to_enc) {
  export("Content-Type-Charset", %to_enc)
  html_doc(%from_enc, %to_enc) {
    yield()
  }
}

"Parses the document into HTML."

@func Text.html(Text %enc) {
  $encoding = %enc
 	match($encoding, "") {
  	$encoding = $guessed_encoding
  }
  html($encoding, "utf-8") {
    yield()
  }
}

"Parses the document into HTML."

@func Text.html() {
  html($guessed_encoding, "utf-8") {
    yield()
  } 
}

"Parses a frament of the document (i.e. the output doesn't start with `<html>`)."

@func Text.html_fragment() {
  html_fragment("") {
    yield()
  }
}

# POSITIONALS
# siblings of these are in node, but these use Inner so are here.


@func XMLNode.insert_at(Text %pos, Text %tag, Text %content) {
  insert_at(position(%pos), %tag) {
    inner(%content)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at a position specified by **%pos** (relative to the currently-selected node)."

@func XMLNode.insert_at(Position %pos, Text %tag, Text %inner) {
  insert_at(%pos, %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts the tag (specified by **%tag**) with content (**%inner**) into the currently-selected node."

@func XMLNode.insert(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the bottom of the currently-selected node."

@func XMLNode.insert_bottom(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the top of the currently-selected node."

@func XMLNode.insert_top(Text %tag, Text %inner) {
  insert_at(position("top"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) after the currently-selected node."

@func XMLNode.insert_after(Text %tag, Text %inner) {
  insert_at(position("after"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) before the currently-selected node."

@func XMLNode.insert_before(Text %tag, Text %inner) {
  insert_at(position("before"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the bottom of the currently-selected node."

@func XMLNode.insert_javascript_bottom(Text %js) {
  insert_javascript_at(position("bottom"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the top of the currently-selected node."

@func XMLNode.insert_javascript_top(Text %js) {
  insert_javascript_at(position("top"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag after the currently-selected node."

@func XMLNode.insert_javascript_after(Text %js) {
  insert_javascript_at(position("after"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag after the currently-selected node."

@func XMLNode.insert_javascript_before(Text %js) {
  insert_javascript_at(position("before"), %js) {
    yield()
  }
}

### DEPRECATED ####

"Deprecated"

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
