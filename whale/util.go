package whale

import (
	"github.com/moovweb/gokogiri/xml"
	"strings"
)

func MoveFunc(what, where xml.Node, position Position) {
	switch position {
	case BOTTOM:
		where.AddChild(what)
	case TOP:
		firstChild := where.FirstChild()
		if firstChild == nil {
			where.AddChild(what)
		} else {
			firstChild.InsertBefore(what)
		}
	case BEFORE:
		where.InsertBefore(what)
	case AFTER:
		where.InsertAfter(what)
	}
}

const separator = "charset="

func GetCharsetFromContentType(ct string) string {
	t := strings.TrimSpace(ct)
	t = strings.ToLower(t)
	items := strings.SplitN(t, separator, 2)
	if len(items) == 2 {
		return items[1]
	}
	return ""
}
