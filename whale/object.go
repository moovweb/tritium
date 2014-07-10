package whale

import "tritium/dependencies/rubex"
import "tritium/dependencies/gokogiri/xpath"
import "tritium/dependencies/go-cache"

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
	return 1
}

func (o *XpathExpObject) Size() int {
	return 1
}

func CleanRegexpObject(object cache.CacheObject) error {
	if o, ok := object.(*RegexpObject); ok {
		if o.Regexp != nil {
			o.Regexp.Free()
			o.Regexp = nil
		}
	}
	return nil
}

func CleanXpathExpObject(object cache.CacheObject) error {
	if o, ok := object.(*XpathExpObject); ok {
		if o.Expression != nil {
			o.Expression.Free()
			o.Expression = nil
		}
	}
	return nil
}

