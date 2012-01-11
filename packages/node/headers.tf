
// Returns the index of the last node scoped
@func index(Node %node) //Text

// This is how you select an element to pass it to a function.
@func fetch(Text %selector) //Text,Text

// This is how you access the current node
@func this() //Node

// Casts a string to a Position node
@func position(Text %position) //Position

// Search the tree and select all matching nodes
@func Node.select(Text %xpath_selector) //Node

// Opens up the contents to text modification. All XML will get escaped.
@func Node.text() //Text,Text

// Move the first node, to the second node.
@func Node.move(Node %what, Node %where, Position %pos) //Text

// Copies the node and yields to it
@func Node.dup() //Node

// Open's the node's name the currently select Node's name. Aka, change a "div" to a "span"
@func Node.name() //Text,Text

// Delete the current node
@func Node.remove() //Text

// Inject some HTML into the node at the prescribed location
@func Node.inject(Text %html) //Text

// Create a new node and insert it at the location specified
@func Node.insert_at(Position %pos, Text %tag_name) //Text