package gokogiri_interface_legacy

import (
	"gokogiri_legacy/xpath"
)

type GokogiriXPathSelector struct {
	xpath.Expression
}

func (xp *GokogiriXPathSelector) String() string {
	return xp.Expression.String()
}

func (xp *GokogiriXPathSelector) Free() {
	xp.Expression.Free()
}

func (xp *GokogiriXPathSelector) UnderlyingExpression() interface{} {
	return xp.Expression
}
