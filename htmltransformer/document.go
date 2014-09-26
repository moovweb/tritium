package htmltransformer

type Document interface {
	CreateElementNode(string) Node    //*ElementNode
	CreateCDataNode(string) Node      // *CDataNode
	CreateTextNode(string) Node       // *TextNode
	CreateCommentNode(string) Node    // *CommentNode
	CreatePINode(string, string) Node // *ProcessingInstructionNode
	String() string
	Root() Node // *ElementNode
}
