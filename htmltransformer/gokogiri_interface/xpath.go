package gokogiri_interface

import (
	"gokogiri/xpath"
)

type GokogiriXPathExpression struct {
	xpath.Expression
}

func (xp *GokogiriXPathExpression) String() (result string) {
	return xp.Expression.String()
}

func (xp *GokogiriXPathExpression) Free() {
	xp.Expression.Free()
}

func (xp *GokogiriXPathExpression) UnderlyingExpression() (result interface{}) {
	return xp.Expression
}