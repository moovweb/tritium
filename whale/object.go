package whale

import "rubex"
import "gokogiri/xpath"

type MemoryObject interface {
  Free()
}

type RegexpObject struct {
	*rubex.Regexp
}

type XpathExpObject struct {
	*xpath.Expression
}

func (o *RegexpObject) Size() int {
	return len(o.String())
}

func (o *XpathExpObject) Size() int {
	return len(o.String())
}

