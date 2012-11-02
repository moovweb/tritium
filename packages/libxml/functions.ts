
"Selects an element with CSS-style selectors. @example `$$(\".one\")` will select all elements with the class of \"one\"."
# @abstract The $$ selects elements with a CSS-style selector.
# @name $$
# @category Select,Misc
# @scope XMLNode
# @args Text %css_selector
# @description 
# $$ selects an element of HTML using a CSS-style selector. It is used as an alternative selector to the single-dollar sign (which selects via XPath).
# The function takes one argument, which is the item to be selected.
# People usually find the $$ easier to use - at least in the beginning - as it requires no knowledge of XPath.
# Things to note: the $$ converts the CSS selector to an XPath-style selector. It converts it into a local deep search, so could potentially be slower than an XPath selector.
# For example, the selector $$("#one") will be converted into $(".//*[id='one']"). The double-forward slash deep search could affect performance.
# Common use cases include (but are not limited to):
# 1) Selecting many element types based on attributes rather than tag names
# 2) Selecting items without being familiar with XPath
# The example below selects every item with the id "one".
# @example
# $$("#one")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/css_selector
# @guidetext
# @guidelink 
@func XMLNode.$$(Text %css_selector) {
  $(css(%css_selector)) {
    yield()
  }
}

"Adds a class (specified by **%class**) to the currently-selected node. Also adds a space to prevent overwriting of any over classes. @example `$(\"./div\") { add_class(\"one\") }` will add a class of \" one\" to the div."
# @abstract The add_class function adds a class to the current node.
# @name add_class
# @category Modify
# @scope XMLNode
# @args Text %class
# @description 
# The add_class function is used to add a class to the current node. 
# The function takes one argument - the class to be added.
# What the function does is takes the current node and appends any existing classes with a space, followed by the class specified. 
# The add_class function will therefore not overwrite any existing classes that are present on the node. Contrast this with the attribute function, which would obliterate any existing classes. 
# Common use cases include (but are not limited to):
# 1) Adding a class to the body of the page for page-specific styling
# 2) Keeping existing classes (and associated styles) while adding your own on top
# The example below will take the selected div and add a class of " one" to it.
# @example
# $("./div") {
#   add_class("one")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/add_class
# @guidetext Use of Adding a Class
# @guidelink http://beta.moovweb.com/learn/training/function_guides/attribute#Adding+a+Class
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
# @abstract Wraps the content of the currently-selected node in the tag specified.
# @name inner_wrap
# @category Modify
# @scope XMLNode
# @args Text %tag_name
# @description
# The inner_wrap function takes all the content of the current node and wraps it.
# The function takes one argument and that is the name of the tag in which you want to wrap the content of the current node.
# Common use cases include (but are not limited to):
# 1) Wrapping all interior content into an anchor tag
# 2) 
# The example below will take the contents of the div and wrap them in a span.
# @example
# $("./div") {
#   inner_wrap("span")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/inner_wrap
# @guidetext
# @guidelink 
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
# @abstract Removes children nodes that contain text.
# @name remove_text_nodes
# @category Modify
# @scope XMLNode
# @args
# @description
# The remove_text_nodes function takes all text that is a direct child of the current node and removes it.
# Any non-text nodes (e.g. anchor tags, image tags, etc.) will remain intact.
# Common use cases include (but are not limited to):
# 1) Removing blank text nodes in between elements
# The example below will remove only text nodes from the div.
# @example
# $("./div") {
#   remove_text_nodes()
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/remove_text_nodes
# @guidetext
# @guidelink 
@func XMLNode.remove_text_nodes() {
  remove("./text()")
}

"Allows you to set the value (**%value**) for the attribute you are selecting with **%name** - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `attribute(\"class\", \"one\")` sets the class as 'one'."
# @abstract The attribute function sets a value for any attribute.
# @name attribute
# @category Modify
# @scope XMLNode
# @args Text %name,Text %value
# @description
# The attribute function is used a lot in Tritium. It allows you to modify any attribute on the current node.
# The function takes two arguments - the first being the attribute name and the second its value.
# If the attribute already exists on the tag, it will be overwritten by the new value specified.
# Common use cases include (but are not limited to):
# 1) Overwriting existing classes with your own class
# 2) 
# 3) Adding attributes to enable Uranium
# The example below will add a href of http://example.com to the selected a tag.
# @example
# $("./a") {
#   attribute("href", "http://example.com")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/attribute
# @guidetext The attribute function and its alternatives.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/attribute
@func XMLNode.attribute(Text %name, Text %value) {
  attribute(%name) {
    value() {
      set(%value)
    }
    yield()
  }
}

"Changes the value of the currently-selected attribute to that specified by **%value**. @example `attribute(\"href\") { value(\"link\")}` sets the href to be \"link\"."
# @abstract The value function in the attribute scope changes the value of the attribute.
# @name value
# @category Attribute,Modify
# @scope Attribute
# @args Text %value
# @description 
# The value function allows you to modify the value of an attribute. 
# The function takes one argument - the value for the attribute.
# An example of the value function being used on an attribute can be found in the functions/main.ts file in the rewrite_links function.
# The value function is used to modify the hrefs of anchor tags.
# In the example below, the href attribute of the selected a tag will be given a new value of http://example.com.
# @example
# $("./a") {
#   attribute("href") {
#     value("http://example.com")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/value
# @guidetext
# @guidelink 
@func Attribute.value(Text %value) {
  value() {
    set(%value)
    yield()
  }
}

"Changes the name of the currently-selected attribute to that specified by **%name**. @example `attribute(\"href\") { name(\"src\") }`.

Functionally equivalent to `name() { set(%name) }`."
# @abstract The name function allows you to change the name of an attribute.
# @name name
# @category Attribute,Modify
# @scope Attribute
# @args Text %name
# @description 
# The name function allows you to change the name of an attribute.
# It takes one argument, which is the new name for the attribute.
# A use case for this function is found in the lateload function in the functions/main.ts file of a Moovweb project.
# The name function is used to change the src attribute of images to data-ur-ll-src - which signals to some javascript to load the images when the page has finished.
# The example below changes the id of the selected div to a class.
# @example
# $("./div") {
#   attribute("id") {
#     name("class")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/name
# @guidetext
# @guidelink <a href="#name Text name"
@func Attribute.name(Text %name) {
  name() { 
    set(%name) 
    yield()
  }
}

"Similar to `asset()`, but references a Sass stylesheet specifically. @example `sass(\"main.scss\")` references the main stylesheet."
# @abstract References a Sass stylesheet in the stylesheets folder.
# @name sass
# @category Misc
# @scope Base
# @args Text %filename
# @description 
# The sass function points to the stylesheets directory of your project, allowing for easy reference to your stylesheets.
# The function takes one argument, which is the name of the stylesheet. The file should be referenced in relation to the assets/stylesheets folder.
# As the function is mainly used to reference stylesheets in the project, this function is usually only found once. Most projects only inject one stylesheet.
# In the functions/main.ts file, you can see the sass function being used in the add_assets function, which inserts a link to the main stylesheet.
# Related functions: <a href="#asset Text name">asset()</a>
# The example below will insert a link tag with an href pointing to the assets/stylesheets/.css/main.css file of the project.
# @example
# insert("link", rel: "stylesheet", type: "text/css", href: sass("main")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/sass
# @guidetext
# @guidelink 
@func sass(Text %filename) {
  asset(concat("stylesheets/.css/", concat(%filename, ".css"))) {
    yield()
  }
}

"Sets the attribute defined by **%name** to the value defined by **%value** - [click for example](http://beta.moovweb.com/learn/training/function_guides/set). @example `set(\"class\", \"one\")` will assign a class of 'one' to the node."
# @abstract The set function, when given two arguments, assigns an attribute to the selected element.
# @name set
# @category Modify
# @scope XMLNode
# @args Text %name,Text %value
# @description 
# The set function allows you to set an attribute on an element.
# The function takes two arguments. The first is the name of the attribute and the second is the value for that attribute.
# Related functions: <a href="#attribute Text name Text value">attribute()</a>
# The example below will take the a tag and set an href attribute with the value http://example.com.
# @example
# $("./a") {
#   set("href", "http://example.com")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/set
# @guidetext Overview of the two ways to use set().
# @guidelink http://beta.moovweb.com/learn/training/function_guides/set
@func XMLNode.set(Text %name, Text %value) {
  attribute(%name) {
    value(%value)
  }
}

# Used to be a helper function, just pass through and should work the same
"Allows mass-attribute setting - [click for example](http://beta.moovweb.com/learn/training/function_guides/attribute). @example `$(\"./div\") { attributes (class: \"one\", id: \"two\") }` will assign the div a class of 'one' and an id of 'two'."
# @abstract The attributes function allows you to set multiple attributes on an element.
# @name attributes
# @category Attribute,Modify
# @scope attribute
# @args 
# @description 
# The attributes function allows you to set multiple attributes for an element.
# It is commonly used instead of the attribute function, as it leaves open the possibility to add more attributes later on.
# The function can take an arbitrary number of arguments in the format `name: "value"`.
# Common use cases include (but are not limited to):
# 1) Assigning multiple attributes for Uranium - such as a data-ur-id and a data-ur-component type.
# 2) Adding a class while also setting the value of an input 
# The example below gives the selected div two attributes - a class of "one" and an id of "two".
# @example
# $("./div") {
#   attributes(class: "one", id: "two")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/attribute/attributes
# @guidetext
# @guidelink http://beta.moovweb.com/learn/training/function_guides/attribute
@func XMLNode.attributes() {
  yield()
}

" Opens the current node for text modificaiton. @example `$(\"./div\") { text() { set(\"dog\") } }` will overwrite the inside of the div to 'dog'."
# @abstract Opens the current node for text modification.
# @name text
# @category Modify
# @scope XMLNode
# @args
# @description
# The text function opens up the text scope.
# Without any further functions, the text function - when performed on an XMLNode - will return any text within that node, removing all the HTML tags.
# Common use cases include (but are not limited to):
# 1) Grabbing text from unnecessarily-nested nodes
# 2) Opening a text scope to then replace a word in a paragraph
# The example below will set the inside of the div to be "NewText".
# @example
# $("./div") {
#   text() {
#     set("NewText")  
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/text
# @guidetext Using the text function.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/text
@func XMLNode.text() {
  inner_text() {
    yield()
  }
}

"Opens the current node for text modification, replacing everything inside with the **%value**. (Essentially, the same as `text() { set(Text %value) }`.) @example `$(\"./div\") { text(\"dog\") }` will overwrite the inside of the div to 'dog'."
# @abstract The text function with an an argument replaces the current node's interior with the text.
# @name text
# @category Modify
# @scope XMLNode
# @args Text %value
# @description 
# The text function behaves slightly differently when an argument is passed into it.
# The function takes one argument, which is the text that will appear in the element.
# Important to note is that anything within the argument will be inserted as text. So using `text("<a></a>")` will insert the *text* rather than the HTML tag.
# Compare this to the inner function, which will insert the *tag* itself.
# The example below will replace the interior of the div with the text "NewText".
# @example
# $("./div") {
#   text("NewText")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/text
# @guidetextUsing the text function.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/text
@func XMLNode.text(Text %value) {
  text() {
    set(%value)
    yield()
  }
}

"Searches for nodes matching `%xpath` and ensures a domain is in the path of the `%attribute`. @example `absolutize(\"//img\", \"src\")` will convert all `img` tag sources from relative ('images/dog.png') to absolute ('http://www.example.com/images/dog.png')."
# @hide
# @abstract Given two arguments, the absolutize function takes the nodes specified and ensures the host domain is part of the attribute specified.
# @name absolutize
# @category Modify,Environment
# @scope XMLNode
# @args Text %xpath,Text %attribute
# @description 
# @example
# absolutize(".//img", "src")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
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
# @hide
# @abstract Given one argument, the absolutize function takes the nodes specified and makes sure a domain is in the src attribute.
# @name absolutize
# @category Modify,Environment
# @scope XMLNode
# @args Text %xpath
# @description 
# @example
# absolutize("//img")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func XMLNode.absolutize(Text %xpath) {
  absolutize(%xpath, "src") {
    yield()
  }
}

"Searches for `<img>` and `<script>` tags and ensures a domain is in their `src` path. @example `absolutize()` will go through the entire document and change every `img` and `script` tag source from relative ('asset/image.png' or 'asset/script.js') to absolute ('http://example.com/asset/image.png' or 'http://example.com/asset/script.js')."
# @abstract The absolutize function ensures all script and img tags have sources with domains.
# @name absolutize
# @category Modify,Environment
# @scope XMLNode
# @args
# @description 
# The absolutize function takes paths of sources for images and scripts and ensures that they contain a domain.
# Instead of the source being "/images/icon.png", it would be "http://example.com/images/icon.png". This ensures that no unnecessary files are directed through the proxy, increasing performance.
# The function can be used in three ways. Without any arguments, the function will take all img and src tags and absolutize their src attribute.
# You can pass in a particular tag using XPath (e.g. absolutize(".//img")) if you only want to absolutize one particular tag.
# Or, you can specify two arguments. The first is the tag, defined in XPath, which you want to absolutize. The second argument is the attribute that you want to absolutize (e.g. src or href).
# Absolutizing URLs is often done in projects at the top of the scripts/html.ts file.
# The example below will take all the image tags and 
# @example
# absolutize()
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func XMLNode.absolutize() {
  absolutize(".//img|.//script") {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node at the position specified by **%pos**. @example `$(\"div\") { insert_javascript_at(position(\"top\"), \"alert('Boo')\") }` will insert the javascript specified at the top of the div."
# @abstract Inserts javascript in the current node at the position specified.
# @name insert_javascript_at
# @category Create,Javascript
# @scope XNLNode
# @args Position %pos,Text %js
# @description 
# The insert_javascript_at function takes the javascript specified, wraps it in a script tag, and inserts it in the currently-selected node at a position specified by you.
# The function takes two arguments. The first is the position at which the script tag should be added, and the second is the javascript itself.
# Important to note is that the first argument has to be in the *position* scope, meaning that plain text will not work. You must place the text within the position function, as in the example.
# Acceptable positions are: top, bottom, before and after.
# The example below will insert a script tag containing "alert('Boo')" at the top of the selected element.
# @example
# insert_javascript_at(position("top"), "alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
@func XMLNode.insert_javascript_at(Position %pos, Text %js) {
  insert_at(%pos, "script") {
    attribute("type", "text/javascript")
    cdata(concat("//<![CDATA[\n", %js, "\n//]]>"))
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag within the currently-selected node. @example `$(\"div\") { insert_javascript(\"alert('Boo')\") }` will insert the javascript at the bottom of the div."
# @abstract Inserts javascript in a script tag in the current node.
# @name insert_javascript
# @category Create,Javascript
# @scope XNLNode
# @args Text %js
# @description 
# The insert_javascript function inserts javascript into the currently-selected node. It takes the javascript specified, wraps it in a script tag, and inserts it into the current node.
# The function takes one argument - the javascript to be inserted.
# By default, the script is inserted in the bottom of the node.
# There are a number of comparable functions that perform similar functions but specify a position in their name:
# - insert_javascript_top(Text %js)
# - insert_javascript_bottom(Text %js)
# - insert_javascript_before(Text %js)
# - insert_javascript_after(Text %js)
# Common use examples include (but are not limmited to):
# 1) Javascript needs to be added to a specific node rather than globally
# In the example below, the javascript "alert('Boo')" will be inserted at the bottom of the current node.
# @example
# insert_javascript("alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
@func XMLNode.insert_javascript(Text %js) {
  insert_javascript_at(position(), %js) {
    yield()
  }
}

"Opens the insides of the node to modification - anything within the node will be overwritten by what is put in **%html**. @example Given `<div> <span>Item</span> </div>`, using `$(\"div\") { inner(\"<a>\") }` will replace the span with an empty 'a' tag, returning `<div><a></a></div>`."
# @abstract Opens the inside of the current node for modification.
# @name inner
# @category Modify
# @scope XMLNode
# @args Text %html
# @description 
# The inner function replaces the inside of the current node with the information given.
# The function takes one argument - the content which will be used to set the interior of the current node.
# Important to note is that all the interior of the current node will be obliterated and replaced with the input.
# If the input contains tags, these will be rendered as HTML elements.
# Compare to the text() function, which replaces the content with text only.
# Common uses cases include (but are not limited to):
# 1) Setting the inside of a node with both text and a new node
# The example below will replace all the content of the current div with "New Content".
# @example
# $("./div") {
#   inner("New Content")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/inner
# @guidetext Information on the inner function and comparing it to the text function.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/inner
@func XMLNode.inner(Text %html) {
  inner() {
    set(%html) 
    yield() 
  } 
}

"Wraps the selected node in the tag defined by **%tag**, then yields to the new tag - [click for example](http://beta.moovweb.com/learn/training/function_guides/wrap). @example `$(\"div\") { wrap(\"span\") }` will wrap the div inside a span tag."
# @abstract Wraps the current node in a new tag.
# @name wrap
# @category Modify
# @scope XMLNode
# @args Text %tag
# @description 
# The wrap function takes the current node and wraps it in a new tag.
# The function takes one obligatory argument - the new tag. It also takes an arbitrary number of additional arguments specifying attributes.
# For example, you can specify a class using `class: "my_class"` as a second argument.
# Common uses cases include (but are not limited to):
# 1) Wrapping elements in a li tag to form a list
# 2) Wrapping an element in an anchor tag to make a link
# The example below will wrap the selected a tag in a div with the class "one".
# @example
# $("./a") {
#   wrap("div", class: "one")
# }
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/wrap
# @guidetext
# @guidelink 
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
# @hide
# @abstract Parses the document into HTML, from and to the encodings specified.
# @name html
# @category Environment
# @scope Text
# @args Text %from_enc,Text %to_enc
# @description 
# @example
# html("gbk", "utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html(Text %from_enc, Text %to_enc) {
  html_doc(%from_enc, %to_enc) {
    yield()
  }
  export("Content-Type-Charset", %to_enc)
}

"Parses the document into HTML, specifying the encoding (**%enc**). @example `html(\"utf-8\")` parses the document into utf-8 html."
# @hide
# @abstract Parses the document into HTML with the specified encoding.
# @name html
# @category Environment
# @scope Text
# @args Text %enc
# @description 
# @example
# html("utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html(Text %enc) {
  $charset_determined = %enc
  html(%enc, %enc) {
    yield()
  }
}

"Parses the document into HTML. @example In *html.ts*, there is `html()` at the top, which guesses the encoding and parses the html accordingly."
# @abstract Parses the document as HTML.
# @name html
# @category Environment
# @scope Text
# @args
# @description
# The html function parses the document as HTML. This means the document - which is plain text - is converted into a tree-like structure. At this point, we can use XPath and other selectors to navigate the document.
# Used in its basic sense, the function guesses the HTML encoding. The encoding can also be specified with up to two arguments.
# A single argument can be used to specify the "to" and "from" encodings, or they can be specified separately using two arguments - html("x", "y") would parse the document from encoding "x" into encoding "y".
# Important to note is that as part of the parsing, the function will add `<html>` tags and a DOCTYPE to the document. If you only want to parse a fragment of HTML, use the <a href="#html_fragment">html_fragment</a> function.
# The html function can be found in the scripts/main.ts file of your project, where it parses every page as HTML.
# The example below will parse the HTML, allowing selectors to point to nodes of the document.
# @example
# html() {
#   $("/html/body")
# }
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
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
# @hide
# @abstract Parses a fragment of the document as HTML, using the encodings specified.
# @name html_fragment
# @category Environment
# @scope Text
# @args Text %from_enc,Text %to_enc
# @description [Compare to the html() function]
# @example
# html_fragment("gbk", "utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html_fragment(Text %from_enc, Text %to_enc) {
  html_fragment_doc(%from_enc, %to_enc) {
    yield()
  }
  export("Content-Type-Charset", %to_enc)   # Right now we always output in utf-8, so set the response header appropriately
}

"Parses a fragment of the document. The `html()` function adds `<html>` tags to the output. This function does not."
# @hide
# @abstract Parses a fragment of the document as HTML with the encoding specified.
# @name html_fragment
# @category Environment
# @scope Text
# @args Text %enc
# @description 
# @example
# html_fragment("utf-8")
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html_fragment(Text %enc) {
  $charset_determined = %enc
  html_fragment(%enc, %enc) {
    yield()
  }
}

"Parses a fragment of the document. The `html()` function adds `<html>` tags to the output. This function does not."
# @abstract Parses a fragment of the document as HTML
# @name html_fragment
# @category Environment
# @scope Text
# @args
# @description 
# The html_fragment function parses a fragment of the document as HTML. This means the document - which is plain text - is converted into a tree-like structure. At this point, we can use XPath and other selectors to navigate the document.
# Just as for the html function, html_fragment can take up to two arguments. By default, function guesses the HTML encoding. 
# A single argument can be used to specify the "to" and "from" encodings, or they can be specified separately using two arguments - html_fragment("x", "y") would parse the document from encoding "x" into encoding "y".
# A common use example could be that only a small section of the request being processed is HTML, and that fragment must be parsed without adding a HTML tag and DOCTYPE.
# The example below will parse a fragment of HTML, allowing selectors to point to nodes of the document. 
# @example
# html_fragment() {
#   $("/div")
# }
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext
# @guidelink 
@func Text.html_fragment() {
  $encoding = guess_encoding()
  html_fragment($encoding, $encoding) {
    yield()
  }
}

# POSITIONALS
# siblings of these are in node, but these use Inner so are here.

"Inserts a tag (specified by **%tag**) with content (**%content**) at a position specified by **%pos** (relative to the currently-selected node) - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_at(\"top\", \"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."
# @abstract Inserts a tag with the (optional) content at the location given.
# @name insert_at
# @category Create
# @scope XMLNode
# @args Text %pos,Text %tag,Text %content
# @description 
# The insert_at function inserts a new element into the document at a position specified.
# The function takes three arguments. The first is the position, relative to the current node, at which you want to insert the new element. The second is the tag name. The third (optional) argument is the content of the node.
# There can also be an arbitrary number of extra arguments, specifying attributes for the new element: for example, insert_at("top", "div", "Content", class: "one") will add a class of "one" to the new element.
# Common use examples include (but are not limited to):
# 1) Creating a button/content element for Uranium
# The example below will insert a div tag at the top of the current node. The tag will have the content "Content".
# @example
# insert_at("top", "div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_at(Text %pos, Text %tag, Text %content) {
  insert_at(position(%pos), %tag) {
    inner(%content)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at a position specified by **%pos** (relative to the currently-selected node) - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_at(\"top\", \"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."
# @hide 
# @abstract Inserts a tag with the (optional) content at the position specified.
# @name insert_at
# @category Create
# @scope XMLNode
# @args Position %pos,Text %tag,Text %content
# @description 
# @example
# insert_at(position(top), "div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_at(Position %pos, Text %tag, Text %inner) {
  insert_at(%pos, %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts the tag (specified by **%tag**) with content (**%inner**) into the currently-selected node  - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert(\"div\", \"Some text\")` will insert `<div>Some text</div>` into the current node - by default at the bottom."
# @abstract Inserts a tag with the (optional) content into the current node (at the bottom).
# @name insert
# @category Create
# @scope XMLNode
# @args Text %tag,Text %inner
# @description 
# The insert function adds the specified tag into the currently-selected node. By default, it will insert the tag at the bottom.
# The function has one obligatory argument - the tag name - and one optional argument - the content. 
# There can also be an arbitrary number of extra arguments, specifying attributes for the new element: for example, insert("div", "Content", class: "one") will add a class of "one" to the new element.
# There are a number of comparable functions that perform similar functions but specify a position in their name:
# - insert_top(Text %tag, Text %inner)
# - insert_bottom(Text %tag, Text %inner)
# - insert_before(Text %tag, Text %inner)
# - insert_after(Text %tag, Text %inner)
# Common use examples include:
# 1) Adding an anchor tag to link to the desktop site
# 2) Inserting a header or footer on a page
# The example below will insert a div with the content "Content" into the bottom of the current node.
# @example
# insert("div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the bottom of the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_bottom(\"div\", \"Some text\")` will insert `<div>Some text</div>` at the bottom of the current node."
# @hide
# @abstract Inserts a tag with the (optional) content into bottom of the current node.
# @name insert_bottom
# @category Create
# @scope XMLNode
# @args Text %tag,Text %inner
# @description 
# @example
# insert_bottom("div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_bottom(Text %tag, Text %inner) {
  insert_at(position("bottom"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) at the top of the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_top(\"div\", \"Some text\")` will insert `<div>Some text</div>` at the top of the current node."
# @hide
# @abstract Inserts a tag with the (optional) content into top of the current node.
# @name insert_top
# @category Create
# @scope XMLNode
# @args Text %tag,Text %inner
# @description 
# @example
# insert_top("div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_top(Text %tag, Text %inner) {
  insert_at(position("top"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) after the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_after(\"div\", \"Some text\")` will insert `<div>Some text</div>` after the current node."
# @hide
# @abstract Inserts a tag with the (optional) content after the current node.
# @name insert_after
# @category Create
# @scope XMLNode
# @args Text %tag,Text %inner
# @description 
# @example
# insert_after("div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_after(Text %tag, Text %inner) {
  insert_at(position("after"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts a tag (specified by **%tag**) with content (**%inner**) before the currently-selected node - [click for example](http://beta.moovweb.com/learn/training/function_guides/insert). @example `insert_before(\"div\", \"Some text\")` will insert `<div>Some text</div>` before the current node."
# @hide
# @abstract Inserts a tag with the (optional) content before the current node. 
# @name insert_before
# @category Create
# @scope XMLNode
# @args Text %tag,Text %inner
# @description 
# @example
# insert_before("div", "Content")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert
# @guidetext Uses of the various insert functions.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/insert
@func XMLNode.insert_before(Text %tag, Text %inner) {
  insert_at(position("before"), %tag) {
    inner(%inner)
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the bottom of the currently-selected node. @example `insert_javascript_bottom(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` at the bottom of the current node."
# @hide
# @abstract Inserts javascript at the bottom of the current node.
# @name insert_javascript_bottom
# @category Create
# @scope XMLNode
# @args Text %js
# @description 
# @example
# insert_javascript_bottom("alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
@func XMLNode.insert_javascript_bottom(Text %js) {
  insert_javascript_at(position("bottom"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag at the top of the currently-selected node. @example `insert_javascript_top(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` at the top of the current node."
# @hide
# @abstract Inserts javascript at the top of the current node.
# @name insert_javascript_top
# @category Create
# @scope XMLNode
# @args Text %js
# @description 
# @example
# insert_javascript_top("alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
@func XMLNode.insert_javascript_top(Text %js) {
  insert_javascript_at(position("top"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag after the currently-selected node. @example `insert_javascript_after(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` after the current node."
# @hide
# @abstract Inserts javascript after the current node.
# @name insert_javascript_after
# @category Create
# @scope XMLNode
# @args Text %js
# @description 
# @example
# insert_javascript_after("alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
@func XMLNode.insert_javascript_after(Text %js) {
  insert_javascript_at(position("after"), %js) {
    yield()
  }
}

"Inserts javascript (specified by **%js**) in a script tag before the currently-selected node. @example `insert_javascript_before(\"alert('Boo')\")` will insert `<script>alert('Boo')</script>` before the current node."
# @hide
# @abstract Inserts javascript before the current node.
# @name insert_javascript_before
# @category Create
# @scope XMLNode
# @args Text %js
# @description 
# @example
# insert_javascript_before"alert('Boo')")
# @exampletext Tritium Tester Example
# @examplelink http://tritium.moovweb.com/libxml/test/examples/insert_javascript
# @guidetext
# @guidelink 
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
