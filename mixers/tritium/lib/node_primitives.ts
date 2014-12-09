
" Returns the number of the node specified in relation to its siblings. @example `$(\"./div\") { log(index()) }` will return '1' if the div is the first div child, '2' if it is the second div child, and so on. "
# @abstract Returns the current iteration of the function being performed.
# @name index
# @category Misc
# @scope XMLNode
# @args Node %node
# @description
# The `index` function is used to return the order of which the node is transformed when selected using Tritium. Every time you use a Tritium selector that selects more than a single element, the MoovSDK will iterate over each element and run the inner block of code on each element one at a time. The `index()` function returns the order of that element in the execution queue.
# Note that the function does not necessarily give the index of the current node in relation to its siblings. It is the number of iterations the previous selection has gone through.
# ### Common Uses
# * Giving elements a unique attribute that corresponds to their index number.
# * Referencing a certain element based on its order of execution.
# * General order based logic, such as giving all odd numbered elements in the queue a certain class so you can style them differently.
# 
# The example below will assign a class to every `div`. The first `div` that is encountered will have a class of "div_number_1". The second `div` found will be "div_number_2" etc.
# @example
# $("./div") {
#   attribute("class", "div_number_" + index(this()))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/index
# @guidetext How indexing items works.
# @guidelink http://console.moovweb.com/learn/training/function_guides/index_func
@func index(Node %node) Text

" Selects an element to pass it to a function - [click for example](http://console.moovweb.com/learn/training/function_guides/fetch). @example Given `<div>Dog</div>`, `$(\"./div\") { $var = fetch(text()) }` will set 'var' to be 'Dog'. "
# @abstract Retrieves information from the node specified.
# @name fetch
# @category Misc
# @scope XMLNode
# @args Text %selector
# @description
# The `fetch` function retrieves the information from the node specified.
# The function takes one argument - the node/information you want. This should be specified in XPath.
# ### Common Uses
# * Grabbing text from a link in order to use it elsewhere
# * Fetching the value of an attribute
# 
# The example below fetches any text within the anchor tag and sets it as a variable.
# @example
# $("./a") {
#   $linktxt = fetch("text()")
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/fetch
# @guidetext Using fetch.
# @guidelink http://console.moovweb.com/learn/training/function_guides/fetch
@func Node.fetch(Text %selector) Text Text

" Returns the current node. "
# @abstract Returns the currently-selected node.
# @name this
# @category Misc
# @scope XMLNode
# @args 
# @description
# The `this` function is used to point to the current node.
# The function is mostly used in the context of defining other functions. Most of the time, you can write an XPath to point to the correct node - but sometimes you have to specify the node itself. Here is where the `this` function is useful.
# The example below uses the function twice. Once to set a variable as the current node (the anchor tag) and once to specifiy the current node (the `span`) in a function. Node that we are using the move function here, which can only take nodes as arguments (i.e. not a string corresponding to XPath).
# @example
# $("./a") {
#   %link = this()
#   $("../span") {
#     move(%link, this(), position("top"))
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/move
# @guidetext 
# @guidelink 
@func Node.this() Node Node

" Specifies the position of a node. @example `move_to(\"//body\", position(\"top\")` will move the current tag to the top of the body. "
# @abstract Specifies positional information.
# @name position
# @category Misc
# @scope XMLNode
# @args Text %position
# @description
# For some functions, you cannot enter a position as a text string. In these cases, you need to enter a position using the `position` function.
# The function takes one argument, which is the `%position` you wish to specify. Possible positions include "top", "bottom", "before" and "after".
# The example below will move the `div` to the top of the body node.
# @example
# $("./div") {
#   move_to("/html/body", position("top"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/position
# @guidetext 
# @guidelink 
@func position(Text %position) Position

//" Opens a scope for specifying the position (e.g. 'top' or 'bottom') of a node. @example `position() { set(\"top\") }`. "
//@func position() Position

" Searches the tree and selects all nodes matching **%xpath_selector**. Works the same as `$`. @example `select(\"//div\")` will select every div in the HTML."
# @abstract Selects all nodes matching the XPath specified.
# @name select
# @category Misc
# @scope XMLNode
# @args Text %xpath_selector
# @description
# The `select` function searches the HTML tree to match the XPath specified.
# The function takes one argument, and that is the %path_selector for the node to select.
# *Related functions*: [$(xpath)][1]
# ### Common Uses
# * Selecting any HTML element in Tritium using XPath
# 
# The example below selects the `html` and `body`
# [1]: #Node.$(Text%20%25xpath)
# @example
# select("/html/body") {
#   remove()
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/select
# @guidetext 
# @guidelink 
@func Node.select(Text %xpath_selector) Text Node

" Opens up the contents to text modification. Use only for text-only nodes - any XML children will be removed. @example With `<div> Dog <span>Cat</span> </div>`, the Tritium `$(\"./div\") { text() { prepend(\"Super\") } }` will result in `<div>Super Dog Cat</div>`."
# @abstract Opens the contents of the current node to text modification or retrieves the text of the current node.
# @name text
# @category Modify,Text
# @scope XMLNode
# @args 
# @description
# The `text` function opens up the text scope or retrieves the text contained within the current scope.
# Without any further functions, the `text` function - when performed on an XMLNode - will return any text within that node, removing all the `HTML` tags.
# A further function can be used (such as `set`) to replace anything inside the current node with text.
# Important to note is that anything within the argument will be inserted as text. So using `text("<a></a>")` will insert the *text* rather than the `HTML` tag.
# ### Common Uses
# * Grabbing text from unnecessarily-nested nodes
# * Opening a text scope to then replace a word in a paragraph
# * Fetching text from a tag to put into a variable
# 
# The example below will set the interior of the current `div` to be "New".
# @example
# $("./div") {
#   text() {
#     set("New")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/text
# @guidetext The two main uses of text.
# @guidelink http://console.moovweb.com/learn/training/function_guides/text
@func Node.text() Text Text

" Moves the first node (**%what**) to the second node (**%where**), at a specified position (**%pos**). "
# @abstract Moves one node to another node at the position specified.
# @name move
# @category Modify,Move
# @scope XMLNode
# @args Node %what,Node %where,Position %pos
# @description
# The `move` function moves a certain node to a particular place in another node.
# The function takes three arguments: `%what` needs to be moved, `%where` it needs to be moved, and the `%position` at which it needs to be moved.
# Important to note is the format in which the arguments must be given. They cannot be specified by a text string, so you cannot use a string of XPath to specify the nodes (e.g. "./div") or a text input for the position (e.g. "top").
# Instead of using a string to define the position, you must use the position function to wrap it. For the nodes, you must set a local variable pointing to a particular node using `this()`.
# Due to the lack of text input, the function is mostly used when defining other functions. For example, most of the `move_to` functions are defined around this function.
# The example below selects the `div` "one" and assigns it a local variable. Then, it selects the `div` "two" and moves that `div` (`this()`) to the top of `div` one.
# @example
# $("./div[@class='one']") {
#   %one = this()
#   $("../div[@class='two']") {
#     move(this(), %one, position("top"))
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/move
# @guidetext 
# @guidelink 
@func Node.move(Node %what, Node %where, Position %pos) Text Node

" Copies the node and yields to it. "
# @abstract Copies the current node.
# @name dup
# @category Create
# @scope XMLNode
# @args 
# @description
# The dup function copies the current node. The copy is placed immediately after the current node.
# The function is mostly used within other functions - for example the copy_to function.
# The example below will copy the currently-selected div.
# @example
# $("./div") {
#   dup()
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/dup
# @guidetext 
# @guidelink 
@func Node.dup() Node Node

" Opens a scope to rename the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }` renames the current node to 'div'. "
# @abstract Opens a scope to rename the current node.
# @name name
# @category Modify
# @scope XMLNode
# @args 
# @description
# The `name` function opens a scope via which the name of the current tag can be changed.
# ### Common Uses
# * Rename table elements to more manipulable tags
# 
# The example below will rename the selected `div` to an `a` tag.
# @example
# $("./div") {
#   name() {
#     set("a")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/name
# @guidetext Uses for the name function.
# @guidelink http://console.moovweb.com/learn/training/function_guides/rename
@func Node.name() Text Text

" Removes the current node from the tree - [click for example](http://console.moovweb.com/learn/training/function_guides/removing). @example `$(\"//table\") { remove() }` will remove all the tables from the HTML. "
# @abstract Removes the current node from the tree.
# @name remove
# @category Modify
# @scope XMLNode
# @args 
# @description
# The remove function removes the node that is currently selected.
# Common uses include (but are not limited to):
# * Removing empty items on a page
# * Removing a table once all useful information has been moved out
# 
# The example below will select every table in the document and remove it and its contents.
# @example
# $("//table") {
#   remove()
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/remove
# @guidetext Discussion of the remove function.
# @guidelink http://console.moovweb.com/learn/training/function_guides/removing
@func Node.remove() Text Node

" Returns the XPath of the current node. @example From any node, using `log(path())` will return the path to the node in the logs. "
# @abstract Returns the XPath of the current node.
# @name path
# @category Misc
# @scope XMLNode
# @args 
# @description
# The `path` function returns the nodal path to the currently-selected node.
# ### Common Uses
# * Debugging by figuring out where in the HTML tree you are
# * Setting a variable using the current path, in order to use it later for moving items
# 
# The example below will log the path to the selected `div`.
# @example
# $("./div") {
#   log(path())
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/node/path
# @guidetext 
# @guidelink 
@func Node.path() Text Text

//" Injects HTML (specified by **%html**) into the current node - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject(\"<div>New Div</div>\")` will insert your new HTML into the current node."
//@func Node.inject(Text %html) Text

" Creates a new node (specified by **%tag_name**) and inserts it at the location specified by **%pos**. @example `insert_at(\"top\", \"div\")` inserts a div at the top of the current node. "
# @hide
@func Node.insert_at(Position %pos, Text %tag_name) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos** - [click for example](http://console.moovweb.com/learn/training/function_guides/inject). @example `inject_at(\"top\", read(\"file.html\"))` injects the file specified at the top of the current node."
# @abstract Injects HTML into the current node at the position specified.
# @name inject_at
# @category Create
# @scope XMLNode
# @args Text %pos,Text %html
# @description
# ### Common Uses
# * Injecting a scaffold for a header and/or footer
# 
# The example below will inject the `section.html` file into the top of the selected `div`. Notice how the `read` function is used to input the file.
# @example
# $("./div") {
#   inject_at(position("top"), read("section.html"))
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/inject_at
# @guidetext 
# @guidelink 
@func Node.inject_at(Position %pos, Text %html) Text

@func Node.inject_at_v1(Position %pos, Text %html) Text

" Replaces the current value with the one specified by %value - [click for example](http://console.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }`. "
# @abstract Replaces the current interior of the node.
# @name set
# @category Modify
# @scope XMLNode
# @args Text %value
# @description
# The `set` function allows you to replace the current value with one specified.
# It is commonly used within other functions, such as `name()` (see example below).
# The function takes one argument - the `%value` which will replace the current one.
# The example below will take the `div` and set the name to "span" (i.e. change the `div` to a `span`).
# @example 
# $("./div") {
#   name() {
#     set("span")
#   }
# }
# @exampletext Tritium Tester Example
# @examplelink test/examples/set
# @guidetext An example also using the name function.
# @guidelink http://console.moovweb.com/learn/training/function_guides/rename
@func Node.set(Text %value) Text
