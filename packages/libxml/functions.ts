"Selects an element with CSS-style selectors. @example `$$(\".one\")` will select all elements with the class of \"one\"."

@func XMLNode.$$(Text %css_selector) {
  $(css(%css_selector)) {
    yield()
  }
}

"Adds a class (specified by **%class**) to the currently-selected node. Also adds a space to prevent overwriting of any over classes. @example `$(\"./div\") { add_class(\"one\") }` will add a class of \" one\" to the div."

@func XMLNode.add_class(Text %class) {


  attribute("class") {
    value() {
      append(" ")
      append(%class)
    }
    yield()
  }
}

"Wraps the *contents* of the currently-selected node in the tag defined by **%tag**. (Compare to `wrap()`, which wraps the currently-selected node, not its contents.) @example Given `<span>dog</span>`, `$(\"span\") { inner_wrap(\"div\") }` will return `<span><div>dog</div></span>`."

@func XMLNode.inner_wrap(Text %tag_name) {

  insert_top(%tag_name) {
    %wrapper = this()
    $("..") {
      move_children_to(%wrapper, position("bottom"))
    }
    yield()
  }
}

"Removes any children text nodes. @example Given `<div> one <span>two</span> </div>`, `remove_text_nodes()` performed on the div will only remove \"one\"." 
@func XMLNode.remove_text_nodes() {
  remove("./text()")
}

"Allows you to set the value (**%value**) for the attribute you are selecting with **%name** - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `attribute(\"class\", \"one\")` sets the class as 'one'."

@func XMLNode.attribute(Text %name, Text %value) {
  attribute(%name) {
    value() {
      set(%value)
    }
    yield()
  }
}

"Changes the value of the currently-selected attribute to that specified by **%value**. @example `attribute(\"href\") { value(\"link\")}` sets the href to be \"link\"."
@func Attribute.value(Text %value) {
  value() {
    set(%value)
    yield()
  }
}

"Changes the name of the currently-selected attribute to that specified by **%name**. @example `attribute(\"href\") { name(\"src\") }`.

Functionally equivalent to `name() { set(%name) }`."

@func Attribute.name(Text %name) {
  name() { 
    set(%name) 
    yield()
  }
}

"Similar to `asset()`, but references a Sass stylesheet specifically. @example `sass(\"main.scss\")` references the main stylesheet."

@func sass(Text %filename) {
  asset(concat("stylesheets/.css/", concat(%filename, ".css"))) {
    yield()
  }
}

"Sets the attribute defined by **%name** to the value defined by **%value** - [click for example](http://beta.moovweb.com/learn/training/function_guides/set). @example `set(\"class\", \"one\")` will assign a class of 'one' to the node."

@func XMLNode.set(Text %name, Text %value) {
  attribute(%name) {
    value(%value)
  }
}

# Used to be a helper function, just pass through and should work the same
"Allows mass-attribute setting - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `$(\"./div\") { attributes (class: \"one\", id: \"two\") }` will assign the div a class of 'one' and an id of 'two'."

@func XMLNode.attributes() {
  yield()
}

" Opens the current node for text modificaiton. @example `$(\"./div\") { text() { set(\"dog\") } }` will overwrite the inside of the div to 'dog'."

@func XMLNode.text() {
  inner_text() {
    yield()
  }
}

"Opens the current node for text modification, replacing everything inside with the **%value**. (Essentially, the same as `text() { set(Text %value) }`.) @example `$(\"./div\") { text(\"dog\") }` will overwrite the inside of the div to 'dog'."

@func XMLNode.text(Text %value) {
  text() {
    set(%value)
    yield()
  }
}

"Searches for nodes matching `%xpath` and ensures a domain is in the path of the `%attribute`. @example `absolutize(\"//img\", \"src\")` will convert all `img` tag sources from relative ('images/dog.png') to absolute ('http://www.example.com/images/dog.png')."

@func XMLNode.absolutize(Text %xpath, Text %attribute) {

  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }

  $(%xpath) {
    var("url", fetch(concat("./@", %attribute)))      

    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($url, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute(%attribute) {
        value() {
          match($url) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend($source_host)
              prepend("//")
            }
            else() {
              # TODO: I need a test case for this clause. I'm not sure what kind of path its trying to accomodate
              # path-relative URL: add the host and the path
              prepend($slash_path)
              prepend($source_host)
              prepend("//")
            }
          }
        }
      }
    }
    yield()
  }
}


"Searches for nodes matching `%xpath` and ensures a domain is in their `src` path. @example `absolutize(\"//img\")` changes all `img` tag sources from relative ('images/dog.png') to absolute ('http://example.com/images/dog.png')."

@func XMLNode.absolutize(Text %xpath) {
  absolutize(%xpath, "src") {
    yield()
  }
}

"Searches for `<img>` and `<script>` tags and ensures a domain is in their `src` path. @example `absolutize()` will go through the entire document and change every `img` and `script` tag source from relative ('asset/image.png' or 'asset/script.js') to absolute ('http://example.com/asset/image.png' or 'http://example.com/asset/script.js')."

@func XMLNode.absolutize() {
  absolutize(".//img|.//script") {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node at the position specified by **%pos**. @example `$(\"div\") { insert_javascript_at(position(\"top\"), \"alert('Boo')\") }` will insert the javascript specified at the top of the div."

@func XMLNode.insert_javascript_at(Position %pos, Text %js) {
  insert_at(%pos, "script") {
    attribute("type", "text/javascript")
    cdata(concat("//<![CDATA[\n", %js, "\n//]]>"))
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node. @example `$(\"div\") { insert_javascript(\"alert('Boo')\") }` will insert the javascript at the bottom of the div."

@func XMLNode.insert_javascript(Text %js) {
  insert_javascript_at(position(), %js) {
    yield()
  }
}

"Opens the insides of the node to text modification - anything within the node will be overwritten by what is put in **%html**. @example Given `<div> <span>Item</span> </div>`, using `$(\"div\") { inner(\"<a>\") }` will replace the span with an empty 'a' tag, returning `<div><a></a></div>."

@func XMLNode.inner(Text %html) {
  inner() {
    set(%html) 
    yield() 
  } 
}

"Wraps the selected node in the tag defined by **%tag**, then yields to the new tag - [click for example](http://beta.moovweb.com/learn/training/function_guides/wrap). @example `$(\"div\") { wrap(\"span\") }` will wrap the div inside a span tag."

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

# This is used to specify the encoding for a page
"Parses the document into HTML. Allows specification of the current coding of HTML and how the result should be coded. @example `html(\"gbk\", \"utf-8\")` parses gbk HTML into utf-8 HTML."

@func Text.html(Text %from_enc, Text %to_enc) {
  html_doc(%from_enc, %to_enc) {
    yield()
  }
  export("Content-Type-Charset", %to_enc)
}

"Parses the document into HTML, specifying the encoding (**%enc**). @example `html(\"utf-8\")` parses the document into utf-8 html."

@func Text.html(Text %enc) {
  $charset_determined = %enc
  html(%enc, %enc) {
    yield()
  }
}

"Parses the document into HTML. @example In *html.ts*, there is `html()` at the top, which guesses the encoding and parses the html accordingly."

@func Text.html() {
  match($charset_determined) {
    with("") {
      $encoding = guess_encoding()
    }
    else() {
      $encoding = $charset_determined
    }
  }
  html($encoding, $encoding) {
    yield()
  } 
}

"Parses a fragment of the document. The `html()` function adds `<html>` tags to the output. This function does not."

@func Text.html_fragment(Text %from_enc, Text %to_enc) {
  html_fragment_doc(%from_enc, %to_enc) {
    yield()
  }
  export("Content-Type-Charset", %to_enc)   # Right now we always output in utf-8, so set the response header appropriately
}

"Parses a fragment of the document. The `html()` function adds `<html>` tags to the output. This function does not."

@func Text.html_fragment(Text %enc) {
  $charset_determined = %enc
  html_fragment(%enc, %enc) {
    yield()
  }
}

"Parses a fragment of the document. The `html()` function adds `<html>` tags to the output. This function does not."

@func Text.html_fragment() {
  $encoding = guess_encoding()
  html_fragment($encoding, $encoding) {
    yield()
  }
}

# POSITIONALS
# siblings of these are in node, but these use Inner so are here.

"Inserts a tag (specified by **%tag**) with content (**%content**) at a position specified by **%pos** (relative to the currently-selected node) - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_at(\"top\", \"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."

@func XMLNode.insert_at(Text %pos, Text %tag, Text %content) {
  insert_at(position(%pos), %tag) {
    inner(%content)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at a position specified by **%pos** (relative to the currently-selected node) - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_at(\"top\", \"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."

@func XMLNode.insert_at(Position %pos, Text %tag, Text %inner) {
  insert_at(%pos, %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts the tag (specified by **%tag**) with content (**%inner**) into the currently-selected node  - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert(\"div\", \"Some text\")` will insert `<div>Some text</div>` into the current node - by default at the bottom."

@func XMLNode.insert(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the bottom of the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_bottom(\"div\", \"Some text\")` will insert `<div>Some text</div>` at the bottom of the current node."

@func XMLNode.insert_bottom(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the top of the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_top(\"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."

@func XMLNode.insert_top(Text %tag, Text %inner) {
  insert_at(position("top"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) after the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_after(\"div\", \"Some text\")` will insert `<div>Some text</div>` after the current node."

@func XMLNode.insert_after(Text %tag, Text %inner) {
  insert_at(position("after"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) before the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_before(\"div\", \"Some text\")` will insert `<div>Some text</div>` before the current node."

@func XMLNode.insert_before(Text %tag, Text %inner) {
  insert_at(position("before"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the bottom of the currently-selected node. @example `insert_javascript_bottom(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` at the bottom of the current node."

@func XMLNode.insert_javascript_bottom(Text %js) {
  insert_javascript_at(position("bottom"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the top of the currently-selected node. @example `insert_javascript_top(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` at the top of the current node."

@func XMLNode.insert_javascript_top(Text %js) {
  insert_javascript_at(position("top"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag after the currently-selected node. @example `insert_javascript_after(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` after the current node."

@func XMLNode.insert_javascript_after(Text %js) {
  insert_javascript_at(position("after"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag before the currently-selected node. @example `insert_javascript_before(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` before the current node."

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
