
" Returns the index of the last node scoped.  "
@func index(Node %node) Text

" Selects an element to pass it to a function. "
@func Node.fetch(Text %selector) Text Text

" Returns the current node "
@func Node.this() Node Node

" Specifies the position of a node (e.g. `position(\"top\")` or `\"bottom\"`). "
@func position(Text %position) Position

//" Opens a scope for specifying the position of a node (e.g. `\"top\"` or `\"bottom\"`). For example, `position() { set(\"top\") }`. "
//@func position() Position

" Searches the tree and selects all nodes matching **%xpath_selector**. "
@func Node.select(Text %xpath_selector) Text Node

" Opens up the contents to text modification. Use only for text-only nodes - any XML children will be removed. "
@func Node.text() Text Text

" Moves the first node (**%what**) to the second node (**%where**), at a specified position (**%pos**). "
@func Node.move(Node %what, Node %where, Position %pos) Text Node

" Copies the node and yields to it "
@func Node.dup() Node Node

" Opens a scope to rename the current node. For example, `name() { set(\"div\") }`. "
@func Node.name() Text Text

" Removes the current node from the tree. "
@func Node.remove() Text Node

" Returns the XPath of the current node. "
@func Node.path() Text Text

//" Injects HTML (specified by **%html**) into the current node. For example, `inject(\"file.html\")`."
//@func Node.inject(Text %html) Text

" Creates a new node (specified by **%tag_name**) and inserts it at the location specified by **%pos**. For example, `insert_at(\"top\", \"div\")`. "
@func Node.insert_at(Position %pos, Text %tag_name) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos**. For example, `inject_at(\"top\", \"file.html\")`."
@func Node.inject_at(Position %pos, Text %html) Text

" Injects HTML (specified by **%html**) into the current node at the location specified by **%pos**. For example, `inject_at(\"top\", \"file.html\")`."
@func Node.inject_at(Text %pos, Text %html) Text

" Replaces the current value with the one specified by %value. For example, `name() { set(\"div\") }`. "
@func Node.set(Text %value) Text