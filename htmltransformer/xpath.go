package htmltransformer

type Selector interface {
	String() string
	Free()
	UnderlyingExpression() interface{}
}
