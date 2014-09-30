package htmltransformer

type Expression interface {
	String() string
	Free()
	UnderlyingExpression() interface{}
}
