" Searches the tree and selects all nodes matching **%xpath**. @example `$(\"//div\")` will find every div element in the document."
# @abstract The `$` function is a selector that takes XPath as an input. XPath is a syntax for selection notation based on the structure of an HTML DOM.
# @name $
# @category Environment,Create,Modify,Move,Misc,Text
# @scope XMLNode
# @args Text %xpath
# @description
# The `$` selector is used to tell Tritium which node(s) you'd like to select to transform. The general process of transformation involves two basic steps: 1) selecting a node, and 2) performing some function on that node. We refer to the process of selecting a node for transformation as "opening a scope" throughout our documentation.
# **Things to note**: If Tritium finds no matching node for the `%xpath` selector provided, it simply skips over that block of code. If Tritium finds more than one matching node for the `%xpath` selector provided, it will iterate over each element sequentially running the block of code inside the selector on each element.
# ### Common Uses
# * Just about anything you want to do with Tritium.
# 
# In this example, we select every `div` element in the document and open a scope for manipulation.
# @example
# $("//div") {
#   # Run transformations on these divs one at a time.
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/xpath_selector
# @guidetext XPath Reference Guide
# @guidelink http://console.moovweb.com/learn/reference/tools/xpath
@func Node.$(Text %xpath) {
  select(%xpath) {
    yield()
  }
}

" Specifies the position of a node. By default is 'bottom'. @example `move_to(\"..\", position())` will move a node to the bottom of its parent."
# @abstract The `position` function is used to return a position type.
# @name position
# @category Create,Move
# @scope XMLNode
# @args 
# @description
# The `position` function is used to return a position type. Positions include: `before`, `after`, `above`, `below`, `top` and `bottom`.
# **Things to note**: by default, the position type returned is "bottom". You can also specify which position type you'd like to return by passing it in as a parameter.
# ### Common Uses
# * Some functions require position inputs as parameters. You can call `position()` to fulfill this requirement.
# * When defining custom functions you may want to use a `position` type in your definition.
# 
# In this example, we move the current node to the bottom of its parent.
# @example
# move_to("..", position())
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/position
# @guidetext 
# @guidelink 
@func position() {
  position("bottom")
}

" "
# @hide
@func Node.node() {
  this() {
    yield()
  }
}

" Returns the number of the current node in relation to other nodes Tritium has iterated through - [click for example](http://console.moovweb.com/learn/training/function_guides/index). @example `$(\"./div\") { log(index()) }` will return '1' if there is only one div child, '1 2' if there are two div children, and so on. "
# @abstract The `index` function returns the order of which this node is iterated through when selected by Tritium.
# @name index
# @category Environment,Misc
# @scope XMLNode
# @args 
# @description
# The `index` function is used to return the order of which the node is transformed when selected using Tritium. Every time you use a Tritium selector that selects more than a single element, the Moovweb SDK will iterate over each element and run the inner block of code on each element one at a time. The index() function returns the order of that element in the execution queue.
# ### Common Uses
# * Giving elements a unique attribute that corresponds to their index number.
# * Referencing a certain element based on its order of execution.
# * General order based logic, such as giving all odd numbered elements in the queue a certain class so you can style them differently.
# 
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/index
# @guidetext How indexing items works.
# @guidelink http://console.moovweb.com/learn/training/function_guides/index_func
@func Node.index() {
  index(this()) {
    yield()
  }
}

" Renames the current node to the tag specified by **%value** - [click for example](http://console.moovweb.com/learn/training/function_guides/rename). @example `name(\"span\")` will change the currently-selected node to a span. "
# @abstract Renames the current node to the tag specified by the input.
# @name name
# @category Modify
# @scope XMLNode
# @args Text %value
# @description
# The `name` function replaces the name of the currently selected node with the input provided by the parameter `%value`. This means you are effectively changing the element that will be rendered in the DOM.
# ### Common Uses
# * Changing tables and their inner rows and data cells to `div`s.
# * Changing anchors that have been wrapped inside anchors to `div`s to avoid broken HTML.
# * Changing between `div`s and `span`s depending on how you want the page to flow.
# 
# @example 
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/name
# @guidetext 
# @guidelink 
@func Node.name(Text %value) {
  name() {
    set(%value)
    yield()
  }
}

" Copies the node specified by **%xpath** to the currently-selected node, at the position **%pos**. @example `copy_here(\"//table\", \"top\")` will copy every table in the document into the top of the current node."
# @hide
@func Node.copy_here(Text %xpath, Position %pos) {
  %calling_node = this()
  $(%xpath) {
    dup() {
      move(this(), %calling_node, %pos)
      # same deal as below ... %pos is treated like Text
      yield()
    }
  }
}

" Copies the node specified by **%xpath** to the currently-selected node, at the position **%pos**. @example `copy_here(\"//table\", \"top\")` will copy every table in the document into the top of the current node."
# @hide
@func Node.copy_here(Text %xpath, Text %pos) {
  copy_here(%xpath, position(%pos)) {
    yield()
  }
}

" Copies the node specified by **%xpath** to the currently-selected node (at the bottom by default). @example `copy_here(\"//table\")` will copy every table in the document into the bottom of the current node. "
# @abstract The `copy_here` function copies the node specified by the input %xpath to the currently selected node.
# @name copy_here
# @category Create,Move
# @scope XMLNode
# @args Text %xpath
# @description
# The `copy_here` function copies the node specified by the input XPath selector to the current scope from which it is called.
# **Things to note**: There is also an optional position variable (`%pos`) that can specify where in relation to the current node it should be placed such as: "before", "after", "top" or "bottom".
# ### Common Uses
# * Sometimes you can break page functionality by moving elements around so in some cases you might want to copy those elements instead.
# * Duplicating useful information
# 
# The example below will create a copy the header and move it into the currently-selected div.
# @example 
# $("./div") {
#   copy_here("/html/body/header")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/copy_here
# @guidetext 
# @guidelink 
@func Node.copy_here(Text %xpath) {
  copy_here(%xpath, position()) {
    yield()
  }
}


" Copies the currently-selected node to the node specified by **%xpath**, at the position **%pos**. @example `copy_to(\"//body\", \"top\")` will copy the current node into the top of the body. "
# @hide
@func Node.copy_to(Text %xpath, Position %pos) {
  dup() {
    %calling_node = this()
    $(%xpath) {
      move(%calling_node, this(), %pos)
    }
    yield()
  }
}

" Copies the currently-selected node to the node specified by **%xpath**, at the position **%pos**. @example `copy_to(\"//body\", \"top\")` will copy the current node into the top of the body. "
# @hide
@func Node.copy_to(Text %xpath, Text %pos) {
  copy_to(%xpath, position(%pos)) {
    yield()
  }
}

" Copies the currently-selected node to the bottom of the node specified by **%xpath**. @example `copy_to(\"//body\")` will copy the current node into the bottom of the body. "
# @abstract The `copy_to` function copies the currently selected node to the node specified by the input `%xpath`.
# @name copy_to
# @category Create,Move
# @scope XMLNode
# @args Text %xpath
# @description
# The `copy_to` function copies the currently selected node to the node specified by the input `%xpath`.
# **Things to note**: There is also an optional position parameter (`%pos`) that can be passed to specify where in relation to the target node it should be copied such as: "before", "after", "top" or "bottom".
# ### Common Uses
# * Sometimes you can break page functionality by moving elements around so in some cases you might want to copy those elements instead.
# * Duplicating useful information
# 
# The example below will copy the currently-selected div into the header of the DOM.
# @example 
# $("./div") {
#   copy_to("/html/body/header")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/copy_to
# @guidetext 
# @guidelink 
@func Node.copy_to(Text %xpath) {
  copy_to(%xpath, position()) {
    yield()
  }
}

" Injects HTML (specified by **%html**) into the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject(\"<div>New Div</div>\")` will insert your new HTML into the current node. "
# @abstract The `inject` function injects HTML into the current node.
# @name inject
# @category Create,Modify
# @scope XMLNode
# @args Text %html
# @description
# The `inject` function injects HTML into the current node.
# **Things to note**: There are a number of comparable functions that perform similar functions but specify a position in their name so you don't have to pass it in as a parameter:
# * `inject_top(Text %html)`
# * `inject_bottom(Text %html)`
# * `inject_before(Text %html)`
# * `inject_after(Text %html)`
# 
# ### Common Uses
# * Injecting entire templates of code at once from another file using the `inject()` function in combination with the `read()` function.
# * Fixing broken HTML
# 
# The example below will inject an `a` tag pointing to site.com into the bottom of the selected div.
# @example 
# $("./div") {
#   inject("<a href="http://site.com">My new link!</a>")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/packagestest/examples/node/inject
# @guidetext 
# @guidelink 
@func Node.inject(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}

" Moves the currently-selected node to the node specified by **%xpath**, at the position **%pos** - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_to(\"//body\", \"top\")` will move the current node to the top of the body. "
# @hide
@func Node.move_to(Text %xpath, Position %pos) {
  %parent_node = this()
  $(%xpath) {
    move(%parent_node, this(), %pos)
    yield()
  }
}

" Moves the currently-selected node to the node specified by **%xpath**, at the position **%pos** - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_to(\"//body\", \"top\")` will move the current node to the top of the body."
# @hide
@func Node.move_to(Text %xpath, Text %pos) {
  move_to(%xpath, position(%pos)) {
    yield()
  }
}

" Moves the currently-selected node to the bottom of the node specified by **%xpath** - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_to(\"//body\")` will move the current node to the bottom of the body."
# @abstract The `move_to` function moves the currently selected node to the node specified by the `%xpath` input.
# @name move_to
# @category Modify,Move
# @scope XMLNode
# @args Text %xpath
# @description
# The move_to command moves the currently selected node to the node specified by the %xpath input. 
# The function takes one argument, the XPath destination of the current node.
# **Things to note**: There is also an optional position parameter (%pos) that can be passed to specify where in relation to the target node it should be placed such as: "before", "after", "top" or "bottom".
# ### Common Uses
# * Creating the proper structure for a page by moving the elements you want to keep into the proper place.
# * Fixing the existing structure of a page by moving elements around.
# * Creating the structure necessary for Uranium.js so you can use widgets like togglers, tabs, image carousels and more.
# 
# The example below will take the currently-selected div and move it to the span child of its parent (i.e. a span sibling of the div).
# @example 
# $("./div") {
#   move_to("../span")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/move_to
# @guidetext 
# @guidelink 
@func Node.move_to(Text %xpath) {
  move_to(%xpath, position()) {
    yield()
  }
}

" Moves the node specified by **%where** to the currently-selected node, at the position **%pos** - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_here(\"//table\", \"top\")` will move every table in the document into the top of the current node."
# @hide
@func Node.move_here(Text %where, Position %pos) {
  %parent = this()
  select(%where) {
    move(this(), %parent, %pos)
    yield()
  }
}

" Moves the node specified by **%where** to the currently-selected node, at the position **%pos** - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_here(\"//table\", \"top\")` will move every table in the document into the top of the current node."
# @hide
@func Node.move_here(Text %where, Text %pos) {
  move_here(%where, position(%pos)) {
    yield()
  }
}

" Moves the node specified by **%where** to the bottom of the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/moving). @example `move_here(\"//table\")` will move every table in the document into the bottom of the current node."
# @abstract The `move_here` function moves the node specified by the input xpath to the currently selected node.
# @name move_here
# @category Modify,Move
# @scope XMLNode
# @args Text %where
# @description
# The move_here function moves the node specified by the input xpath to the currently selected node. 
# The function takes one argument - the XPath of the element that is to be moved into the current node.
# **Things to note**: There is also an optional position parameter (%pos) that can be passed to specify where in relation to the target node it should be placed such as: "before", "after", "top" or "bottom".
# * Creating the proper structure for a page by moving the elements you want to keep into the proper place.
# * Fixing the existing structure of a page by moving elements around.
# * Creating the structure necessary for Uranium.js so you can use widgets like togglers, tabs, image carousels and more.
# 
# The example below will take the span sibling of the div and move it into the div.
# @example 
# $("./div") {
#   move_here("../span")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/test/examples/node/move_here
# @guidetext 
# @guidelink 
@func Node.move_here(Text %where) {
  move_here(%where, position("bottom")) {
    yield()
  }
}

// DIRECTIONALS... UGH.

" Inserts a tag (specified by **%tag**) in the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/insert). @example `insert(\"div\")` will insert a div at the bottom of the current node."
# @hide
# @abstract Inserts a new node at the position specified.
# @name insert_at
# @category Create
# @scope XMLNode
# @args Position %pos,Text %tag_name
# @description
# The `insert_at` function inserts a tag in the current node at the location specified.
# The function takes two arguments - the first is the position at which the new tag will be inserted. The second is the type of tag that should be inserted.
# There is also a third, optional argument which allows you to specify the text which will be inserted in the element. Plus, you can add an arbitrary number of arguments specifying attributes.
# The example below will insert a `span` at the top of the selected `div`. Then, the snippet will insert an `a` tag at the bottom of the `div`. The a tag will have the text of "Click!" and have an `href` attribute with a value of `http://example.com`.
# @example
# $("./div") {
#   insert_at(position("top"), "span")
#   insert_at("bottom", "a", "Click!", href: "http://example.com")
# }
# @exampletext Tritium Tester Example
# @examplelink ../../libxml/packages/libxml/test/examples/insert
# @guidetext 
# @guidelink 
@func Node.insert(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}

" Inserts a tag (specified by **%tag**) at the bottom of the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/insert). @example `insert_bottom(\"div\")` will insert a div at the bottom of the current node."
# @hide
@func Node.insert_bottom(Text %tag) {
  insert_at(position(), %tag) {
    yield()
  }
}

" Inserts a tag (specified by **%tag**) at the top of the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/insert). @example `insert_top(\"div\")` will insert a div at the top of the current node."
# @hide
@func Node.insert_top(Text %tag) {
  insert_at(position("top"), %tag) {
    yield()
  }
}

"Inserts a tag (specified by **%tag**) after the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/insert). @example `insert_after(\"div\")` will insert a div after the current node."
# @hide
@func Node.insert_after(Text %tag) {
  insert_at(position("after"), %tag) {
    yield()
  }
}

" Inserts a tag (specified by **%tag**) before the currently-selected node - [click for example](http://console.moovweb.com/learn/training/function_guides/insert). @example `insert_before(\"div\")` will insert a div before the current node."
# @hide
@func Node.insert_before(Text %tag) {
  insert_at(position("before"), %tag) {
    yield()
  }
}

" Injects HTML (specified by **%html**) into the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject(read(\"file.html\"))` will inject the HTML in the specified file into the bottom of the current node."
# @hide
@func Node.inject(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}

" Injects HTML (specified by **%html**) at the bottom of the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject_bottom(read(\"file.html\"))` will inject the HTML in the specified file into the bottom of the current node."
# @hide
@func Node.inject_bottom(Text %html) {
  inject_at(position("bottom"), %html) {
    yield()
  }
}

" Injects HTML (specified by **%html**) at the top of the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject_top(read(\"file.html\"))` will inject the HTML in the specified file into the top of the current node."
# @hide
@func Node.inject_top(Text %html) {
  inject_at(position("top"), %html) {
    yield()
  }
}

" Injects HTML (specified by **%html**) after the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject_after(read(\"file.html\"))` will inject the HTML in the specified file after the current node."
# @hide
@func Node.inject_after(Text %html) {
  inject_at(position("after"), %html) {
    yield()
  }
}

" Injects HTML (specified by **%html**) before the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject_before(read(\"file.html\"))` will inject the HTML in the specified file before the current node."
# @hide
@func Node.inject_before(Text %html) {
  inject_at(position("before"), %html) {
    yield()
  }
}

