
" Returns the number of the current node in relation to its siblings. @example `$(\"./div\") { log(index()) }` will return '1' if the div is the first div child, '2' if it is the second div child, and so on. "
@func index(Node %node) Text

" Selects an element to pass it to a function - [more information](http://beta.moovweb.com/learn/training/function_guides/fetch). @example Given `<div>Dog</div>`, `$(\"./div\") { $var = fetch(text()) }` will set 'var' to be 'Dog'. "
@func Node.fetch(Text %selector) Text Text

" Returns the current node. "
@func Node.this() Node Node

" Specifies the position of a node. @example `move_to(\"//body\", position(\"top\")` will move the current tag to the top of the body. "
@func position(Text %position) Position

//" Opens a scope for specifying the position (e.g. 'top' or 'bottom') of a node. @example `position() { set(\"top\") }`. "
//@func position() Position

" Searches the tree and selects all nodes matching **%xpath_selector**. Works the same as `$`. @example `select(\"//div\")` will select every div in the HTML."
@func Node.select(Text %xpath_selector) Text Node

" Opens up the contents to text modification. Use only for text-only nodes - any XML children will be removed. @example With `<div> Dog <span>Cat</span> </div>`, the Tritium `$(\"./div\") { text() { prepend(\"Super\") } }` will result in `<div>Super Dog Cat</div>`."
@func Node.text() Text Text

" Moves the first node (**%what**) to the second node (**%where**), at a specified position (**%pos**). "
@func Node.move(Node %what, Node %where, Position %pos) Text Node

" Copies the node and yields to it. "
@func Node.dup() Node Node

" Opens a scope to rename the current node - [more information](http://beta.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }` renames the current node to 'div'. "
@func Node.name() Text Text

" Removes the current node from the tree - [more information](http://beta.moovweb.com/learn/training/function_guides/removing). @example `$(\"//table\") { remove() }` will remove all the tables from the HTML. "
@func Node.remove() Text Node

" Returns the XPath of the current node. @example From any node, using `log(path())` will return the path to the node in the logs. "
@func Node.path() Text Text

//" Injects HTML (specified by **%html**) into the current node.  @example `inject(\"<div>New Div</div>\")` will insert your new HTML into the current node."
//@func Node.inject(Text %html) Text

" Creates a new node (specified by **%tag_name**) and inserts it at the location specified by **%pos**. @example `insert_at(\"top\", \"div\")` inserts a div at the top of the current node. "
@func Node.insert_at(Position %pos, Text %tag_name) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos**. @example `inject_at(\"top\", read(\"file.html\"))` injects the file specified at the top of the current node."
@func Node.inject_at(Position %pos, Text %html) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos**. @example `inject_at(\"top\", \"file.html\")` injects the file specified at the top of the current node."
@func Node.inject_at(Text %pos, Text %html) Text

" Replaces the current value with the one specified by %value - [more information](http://beta.moovweb.com/learn/training/function_guides/rename). @example `name() { set(\"div\") }`. "
@func Node.set(Text %value) Text