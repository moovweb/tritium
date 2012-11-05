
" Returns the number of the node specified in relation to its siblings. @example `$(\"./div\") { log(index()) }` will return '1' if the div is the first div child, '2' if it is the second div child, and so on. "
# @abstract 
# @name node
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Base
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func index(Node %node) Text

" Selects an element to pass it to a function - [click for example](http://beta.moovweb.com/learn/training/function_guides/fetch). @example Given `<div>Dog</div>`, `$(\"./div\") { $var = fetch(text()) }` will set 'var' to be 'Dog'. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext Using fetch.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/fetch
@func Node.fetch(Text %selector) Text Text

" Returns the current node. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.this() Node Node

" Specifies the position of a node. @example `move_to(\"//body\", position(\"top\")` will move the current tag to the top of the body. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Position
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func position(Text %position) Position

//" Opens a scope for specifying the position (e.g. 'top' or 'bottom') of a node. @example `position() { set(\"top\") }`. "
//@func position() Position

" Searches the tree and selects all nodes matching **%xpath_selector**. Works the same as `$`. @example `select(\"//div\")` will select every div in the HTML."
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.select(Text %xpath_selector) Text Node

" Opens up the contents to text modification. Use only for text-only nodes - any XML children will be removed. @example With `<div> Dog <span>Cat</span> </div>`, the Tritium `$(\"./div\") { text() { prepend(\"Super\") } }` will result in `<div>Super Dog Cat</div>`."
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.text() Text Text

" Moves the first node (**%what**) to the second node (**%where**), at a specified position (**%pos**). "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# Due to the lack of text input, the function is mostly used when defining other functions. For example, check out the sources of most of the move_to functions are defined around this function.
# @example
# @exampletext Tritium Tester Example
# @examplelink packages/libxml/test/examples/node/move
# @guidetext 
# @guidelink 
@func Node.move(Node %what, Node %where, Position %pos) Text Node

" Copies the node and yields to it. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.dup() Node Node

" Opens a scope to rename the current node - [click for example](http://beta.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }` renames the current node to 'div'. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.name() Text Text

" Removes the current node from the tree - [click for example](http://beta.moovweb.com/learn/training/function_guides/removing). @example `$(\"//table\") { remove() }` will remove all the tables from the HTML. "
# @abstract 
# @name
# @category Environment,Create,Modify,Move,Misc,Text
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.remove() Text Node

" Returns the XPath of the current node. @example From any node, using `log(path())` will return the path to the node in the logs. "
# @abstract 
# @name
# @category Misc
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.path() Text Text

//" Injects HTML (specified by **%html**) into the current node - [click for example](http://beta.moovweb.com/learn/training/function_guides/inject). @example `inject(\"<div>New Div</div>\")` will insert your new HTML into the current node."
//@func Node.inject(Text %html) Text

" Creates a new node (specified by **%tag_name**) and inserts it at the location specified by **%pos**. @example `insert_at(\"top\", \"div\")` inserts a div at the top of the current node. "
# @abstract 
# @name
# @category Create
# @scope Node
# @args
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink
# @guidetext 
# @guidelink 
@func Node.insert_at(Position %pos, Text %tag_name) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos** - [click for example](http://beta.moovweb.com/learn/training/function_guides/inject). @example `inject_at(\"top\", read(\"file.html\"))` injects the file specified at the top of the current node."
# @abstract Injects HTML into the current node at the position specified.
# @name
# @category Create
# @scope Node
# @args
# @description
# @example
# $("./div") {
#   inject_at(position("top"), read("section.html"))
# }
# @exampletext Tritium Tester Example
# @examplelink packages/libxml/test/examples/node/inject_at
# @guidetext 
# @guidelink 
@func Node.inject_at(Position %pos, Text %html) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos** - [click for example](http://beta.moovweb.com/learn/training/function_guides/inject). @example `inject_at(\"top\", \"file.html\")` injects the file specified at the top of the current node."
# @abstract Injects HTML into the current node at the location specified.
# @name inject_at
# @category Create
# @scope Node
# @args Text %pos,Text %html
# @description
# The inject_at function takes HTML and injects it into the current node at the location specified.
# The function takes two arguments. The first is the position at which the HTML should be inserted. The second argument is the HTML to be inserted. The HTML can be written out, in full, between two quotes. If there is a lot of HTML to be injected, it can also be in a file. Use the read function to input the file.
# Common uses include (but are not limited to):
# 1) Injecting a scaffold for a header and/or footer
# The example below will inject the section.html file into the top of the selected div. Notice how the read function is used to input the file.
# @example
# $("./div") {
#   inject_at("top", read("section.html"))
# }
# @exampletext Tritium Tester Example
# @examplelink packages/libxml/test/examples/node/inject_at
# @guidetext 
# @guidelink 
@func Node.inject_at(Text %pos, Text %html) Text

" Replaces the current value with the one specified by %value - [click for example](http://beta.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }`. "
# @abstract Replaces the current interior of the node.
# @name set
# @category Modify
# @scope Node
# @args Text %value
# @description
# @example
# @exampletext Tritium Tester Example
# @examplelink packages/libxml/test/examples/set
# @guidetext An example also using the name function.
# @guidelink http://beta.moovweb.com/learn/training/function_guides/rename
@func Node.set(Text %value) Text