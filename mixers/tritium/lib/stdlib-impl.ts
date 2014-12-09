"Wraps the selected node (defined by **%selector**) in a tag specified by **%tag**. For example `wrap_together(\"./span\", \"div\")` will wrap all span children of the current node in a div. Using XPath to select a particular child (e.g. `./span[1]`) will wrap that child plus its direct sibling of the same node type."
# @abstract Wraps the selected node(s) in a specific tag.
# @name wrap_together
# @category Modify
# @scope XMLNode
# @args Text %selector,Text %tag
# @description
# The wrap together function takes the nodes specified and wraps them in a tag specified.
# The function takes two arguments. The first is the tag (or tags) that you want to be wrapped. The second is the tag in which you want to wrap them.
# An arbitrary number of extra arguments can be added specifying attributes for the wrapper tag. They should be in the format name: "value". For example, class: "New Class".
# In the example below, all the a tag children of the selected div will be wrapped in a single span.
# @example
# $("./div") {
#   wrap_together("./a", "span")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/wrap_together
# @guidetext
# @guidelink
@func XMLNode.wrap_together(Text %selector, Text %tag) {
  $("(" + %selector + ")[1]") {
    %first = this()
    $("./..") {
      $tmp = $("(" + %selector + ")[position() > 1]") {
        move(this(), %first, position("after"))
      }
    }

    wrap(%tag) {
      $("./following-sibling::*[position() <= " + $tmp + "]") {
        move(this(), %first, position("after"))
      }
      yield()
    }
  }
}

# @hide
@func add_cookie(Text %raw) {
  match_not(%raw, "") {
    $__cookie__ = concat($__cookie__, "\r\n")
    $__cookie__ = concat($__cookie__, "Set-Cookie: ")
    $__cookie__ = concat($__cookie__, %raw)
  }
}

# @hide
@func add_cookie(Text %name, Text %value) {
  match_not(%name, "") {
    $raw = concat(%name, "=")
    $raw = concat($raw, %value)
    add_cookie($raw)
  }
}

# @abstract Sets a cookie on the site.
# @name add_cookie
# @category Environment
# @scope Base
# @args Text %name,Text %value,Text %domain
# @description
# The add cookie function adds a cookie to the site.
# The function can take anywhere from one to seven arguments. The function is most commonly used with three: the name of the cookie, its value, and the domain.
# The domain argument should be entered as if it were from an upstream response (i.e. use "example.com", not "m.example.com"). The cookie domain will be rewritten as per the host_map rules.
# Other optional arguments include (add them in this order):
# - the path of the cookie
# - when the cookie will expire
# - whether the cookie is secure (given as "true" or "false")
# - whether the cookie is HTTP only or not (given as "true" or "false")
# The example below will set a cookie with the name "favouritedog", the value "joe" and the domain "www.example.com".
# @example
# add_cookie("favoritedog", "joe", "www.example.com")
# @exampletext
# @examplelink
# @guidetext Information on how Moovweb sets cookies.
# @guidelink https://console.moovweb.com/learn/docs/local/configuration#Adding+Cookies
@func add_cookie(Text %name, Text %value, Text %domain) {
  match_not(%name, "") {
    $raw = concat(%name, "=")
    $raw = concat($raw, %value)
    $raw = concat($raw, "; domain=")
    $raw = concat($raw, %domain)
    add_cookie($raw)
  }
}

# @hide
@func add_cookie(Text %name, Text %value, Text %domain, Text %path) {
  match_not(%name, "") {
    $raw = concat(%name, "=")
    $raw = concat($raw, %value)
    $raw = concat($raw, "; domain=")
    $raw = concat($raw, %domain)
    $raw = concat($raw, "; path=")
    $raw = concat($raw, %path)
    add_cookie($raw)
  }
}

# @hide
@func add_cookie(Text %name, Text %value, Text %domain, Text %path, Text %expire, Text %secure, Text %httponly) {
  match_not(%name, "") {
    $raw = concat(%name, "=")
    $raw = concat($raw, %value)
    $raw = concat($raw, "; domain=")
    $raw = concat($raw, %domain)
    $raw = concat($raw, "; path=")
    $raw = concat($raw, %path)
    $raw = concat($raw, "; expires=")
    $raw = concat($raw, %expire)
    match(%secure, "true") {
      $raw = concat($raw, "; secure")
    }
    match(%httponly, "true") {
      $raw = concat($raw, "; httponly")
    }
    add_cookie($raw)
  }
}

# @abstract Pulls content from a node.
# @name yank
# @category Misc
# @scope XMLNode
# @args Text %xpath
# @description
# The yank function pulls content from the node specified.
# The function takes one argument - the XPath you want to "yank".
# It is very similar to the `fetch()` function except that it only returns the inner HTML of the node selected not including the node itself. Whereas fetch will return both the node itself and its inner HTML.
# It's most often used when using the jsonlib feature to pull an XML node into an array or a key.
# The example below will set a JSON key, with its value being the h1 content.
# @example
# jsonlib.key("title", yank(".//h1"))
# @exampletext Tritium Tester Example
# @examplelink test/examples/yank
# @guidetext
# @guidelink
@func XMLNode.yank(Text %xpath) {
  $innards = ""
  $(%xpath) {
    $innards = inner()
  }
  $innards
}

# @abstract Unwraps the current node.
# @name unwrap
# @category Modify
# @scope XMLNode
# @args
# @description
# The unwrap function "unwraps" the current node.
# The function grabs the content of the current node. Then, it moves the content to before the current node. Finally, the node is deleted.
# The example below will unwrap a list, removing the ul and moving all the inner contents to above where the ul used to be.
# @example
# $("./ul") {
#   unwrap()
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/unwrap
# @guidetext
# @guidelink
@func XMLNode.unwrap() {
  move_children_to(this(), position("before"))
  remove()
}

# @abstract Opens the selected attribute for modification.
# @name attr
# @category Modify
# @scope XMLNode
# @args Text %name
# @description
# The `attr` function  is a shortened form of the `attribute` function. It opens the scope of the `%name`d attribute.
# ### Common use examples include:
# * Opening the scope of the attribute to replace certain characters
#
# The example below will open the scope of the class attribute.
# @example
# $("./div[@class='one']") {
#   attr("class") {}
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attr
# @guidetext
# @guidelink
@func XMLNode.attr(Text %name) {
  attribute(%name) {
    yield()
  }
}

# @abstract The `attr` function sets a value for any attribute (it is like the attribute() function).
# @name attr
# @category Modify
# @scope XMLNode
# @args Text %name
# @description
# The `attr` function is a shortened form of the `attribute` function, which is used a lot in Tritium. It allows you to modify any attribute on the current node.
# The function takes two arguments - the first being the attribute `%name` and the second its `%value`.
# If the attribute already exists on the tag, it will be overwritten by the new `%value` specified.
# ### Common Uses
# * Overwriting existing classes with your own class
# * Adding attributes to enable Uranium
#
# The following example will add an `href` of `http://example.com` to the selected `a` tag.
# @example
# $("./a") {
#   attr("href", "http://example.com")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/attr
# @guidetext
# @guidelink
@func XMLNode.attr(Text %name, Text %value) {
  attribute(%name, %value) {
    yield()
  }
}

# @abstract Removes extra spaces from text.
# @name normalize
# @category Modify
# @scope Base
# @args Text %input
# @description
# The `attr` function is a shortened form of the `attribute` function, which is used a lot in Tritium. It allows you to modify any attribute on the current node.
# The function takes a single argument, which should be the content you want to normalize. It usually helps to store the output as a variable so it can be used later.
# ### Common Uses
# * Getting rid of unnecessary whitespace.
#
# The following example will remove all bar one of the spaces in between the words in the sentence, giving an output of "I have been normalized."
# @example
# normalize("I       have     been   normalized.")
# @exampletext Tritium Tester Example
# @examplelink test/examples/normalize
# @guidetext
# @guidelink
@func normalize(Text %input) {
  %input {
    replace(/\s\s+/, " ")
    replace(/^\s+|\s+$/, "")
  }
  %input
}

# @abstract Removes the class specified.
# @name remove_class
# @category Modify
# @scope XMLNode
# @args Text %delete_me
# @description
# The `remove_class` function removes the class specified.
# The function takes one argument - the class to be deleted.
# It's preferable to use this function when you have multiple classes, of which you only want to remove one. The function even normalizes any whitespace!
# The following example will remove the class "one" from any div.
# @example
# $(".//div") {
#   remove_class("one")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/remove_class
# @guidetext
# @guidelink
@func XMLNode.remove_class(Text %delete_me) {
  attribute("class") {
    value() {
      replace(regexp("\\b" + %delete_me + "\\b"), "")
      set(normalize(this()))
    }
  }
}


# @abstract The `add_class` function adds a class to the current node.
# @name add_class
# @category Modify
# @scope XMLNode
# @args Text %class
# @description
# The `add_class` function is used to add a class to the current node.
# The function takes one argument - the `%class` to be added.
# What the function does is takes the current node and appends any existing classes with a space, followed by the class specified.
# The `add_class` function will therefore not overwrite any existing classes that are present on the node. Contrast this with the `attribute` function, which would obliterate any existing classes.
# Note that the stdlib version of the `add_class` function also normalizes the class.
# ### Common Uses
# * Adding a class to the body of the page for page-specific styling
# * Keeping existing classes (and associated styles) while adding your own on top
#
# The example below will take the selected `div` and add a class of "one" to it.
# @example
# $("./div") {
#   add_class("one")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/add_class
# @guidetext Use of Adding a Class
# @guidelink http://console.moovweb.com/learn/training/function_guides/attribute#Adding+a+Class
@func XMLNode.add_class(Text %add_me) {
  attribute("class") {
    value() {
      append(" ")
      append(%add_me)
      // Exactly like the native function,
      // except that we normalize.
      set(normalize(this()))
    }
    yield()
  }
}


# @abstract Inserts a new node at the position specified.
# @name insert_at
# @category Create
# @scope XMLNode
# @args Position %pos,Text %tag
# @description
# The `insert_at` function inserts a tag in the current node at the location specified.
# The function takes two arguments - the first is the position at which the new tag will be inserted. The second is the type of tag that should be inserted.
# There is also a third, optional argument which allows you to specify the text which will be inserted in the element. Plus, you can add an arbitrary number of arguments specifying attributes.
# The example below will insert an `a` tag at the bottom of the `div`. The a tag will have the text of "Click!" and have an `href` attribute with a value of `http://example.com`.
# @example
# $("./div") {
#   insert_at("bottom", "a", "Click!", href: "http://example.com")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/insert_at
# @guidetext
# @guidelink
@func XMLNode.insert_at(Text %pos, Text %tag) {
  insert_at(position(%pos), %tag) {
    inner("")
    yield()
  }
}

# @hide
@func redirect_temporary(Text %url) {
  $__redirect_permanent__ = "false"
  export("Location", %url)
}

# @hide
@func redirect_permanent(Text %url) {
  $__redirect_permanent__ = "true"
  export("Location", %url)
}

# @abstract The `move` function moves the specified `%what` node to the specified `%where` node.
# @name move
# @category Modify,Move
# @scope XMLNode
# @args Text %what, Text %where, Text %pos
# @description
# The function takes two required arguments, the xpath of the node to be moved and the xpath of the destination node.
# **Things to note**: There is also an optional position parameter (%pos) that can be passed to specify where in relation to the target node it should be placed such as: "before", "after", "top" or "bottom".
# ### Common Uses
# * Creating the proper structure for a page by moving the elements you want to keep into the proper place.
# * Fixing the existing structure of a page by moving elements around.
# * Creating the structure necessary for Uranium.js so you can use widgets like togglers, tabs, image carousels and more.
#
# The example below will take the span elements inside the current div and move them into its sibling section element.
# @example
# $("./div") {
#   move("./span", "../section")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/move
# @guidetext
# @guidelink
@func XMLNode.move(Text %what, Text %where, Text %pos) {
  %current_node = this()
  $(%where) {
    %where_node = this()
    %current_node {
      $(%what) {
        move(this(), %where_node, position(%pos)) {
          yield()
        }
      }
    }
  }
}

# @hide
@func XMLNode.move(Text %what, Text %where) {
  move(%what, %where, "bottom") {
    yield()
  }
}

# @abstract Removes all leading and trailing whitespace, including non-breaking whitespaces.
# @name trim
# @category Modify
# @scope Text
# @args
# @description
# Removes all leading and trailing whitespace, including non-breaking whitespaces.
# The example below will become "I am an example".  Note there are non-breaking spaces surrounding.
# @example
# text("   I'm an example             ")
# text() {
#   trim()
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func Text.trim() {
  replace(/^\s+|\s+$/, "")
}

# @abstract Removes all the attributes from the scoped XMLNode.
# @name remove_attributes
# @category Attribute,Modify
# @scope XMLNode
# @args
# @description
# Removes all the attributes from the scoped XMLNode.
# The example below will remove all the attributes from all the anchor nodes.
# @example
# $("//a")
#   remove_attributes()
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func XMLNode.remove_attributes() {
  remove('./@*')
}

# @abstract Takes all text from under the current node and places it in this node.
# @name flatten
# @category Modify
# @scope XMLNode
# @args
# @description
# Flattens the current node by taking all text under the current node and placing it in this one.
# The example below will flatten a list. This will destroy the list structure, but preserve all the text within the list.
# @example
# $("//ul") {
#   flatten()
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func XMLNode.flatten() {
  inner(text())
}

# @abstract Removes every node that is not on the path to matches for the supplied xpath.
# @name filter
# @category Modify
# @scope XMLNode
# @args Text %xpath_selector
# @description
# Using the passed xpath selector, it removes everything under the currently scoped node that does not match and is not on the path to a match. Note it will also remove every node under the match(es), but preserves text directly in the matched nodes.
# The example below will remove everything under the first ul tag that is not on the path to the first 3 li elements. It will also remove every node under the first 3 li elements.
# @example
# $("(//ul)[1]") {
#   filter(".//li[position() < 3]")
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func XMLNode.filter(Text %xpath_selector) {
  $(%xpath_selector) {
    attribute('data-blessed', 'save')
  }
  remove('.//*[not(descendant-or-self::*[@data-blessed])]')
  $(%xpath_selector) {
    attribute('data-blessed','')
  }
}

# @abstract Reverses the text in which this function is called.
# @name reverse
# @category Modify
# @scope Text
# @args
# @description
# This function reverses the string text in which it is called.
# The example below will replace the text contained in the div with id `reverse_me`.
# @example
# $("//div[@id='reverse_me']") {
#   text() {
#     reverse()
#   }
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func Text.reverse() {
  %rev = ""
  capture(/(.)/){
    %rev {
      prepend($1)
    }
  }
  set(%rev)
  yield()
  %rev
}

# @abstract Returns the reverse of the text provided to the function as an argument.
# @name reverse
# @category Modify
# @scope Text
# @args
# @description
# This function returns the reverse of the text provided to it as an argument.
# The example below will set the `reverse-href` attribute on the anchor tag to the reverse of the value of the `href` attribute.
# @example
# $("//a[@id='reverse_me']") {
#   attr("reverse-href", reverse(fetch("./@href")))
# }
# @exampletext
# @examplelink
# @guidetext
# @guidelink
@func reverse(Text %str) {
  %str {
    reverse()
    yield()
  }
}
