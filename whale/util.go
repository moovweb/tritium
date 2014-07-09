package whale

import (
	"strings"

	"tritium/dependencies/gokogiri/xml"
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

func GenerateHostMapKey(key, secure string) (newKey string, append_proto, append_slashes bool) {
	newKey = key
	proto := "http:"
	if secure == "true" {
		proto = "https:"
	}
	append_proto = false
	append_slashes = false
	if !strings.HasPrefix(key, "http:") && !strings.HasPrefix(key, "https:") {
		if strings.HasPrefix(key, "//") {
			newKey = proto + key
			append_proto = true
		} else {
			newKey = proto + "//" + key
			append_proto = true
			append_slashes = true
		}
	}
	return
}

func ReformatHostMapValue(value string, append_proto, append_slashes bool) (newValue string) {
	newValue = value
	if append_proto { //strip proto
		if strings.HasPrefix(newValue, "http:") {
			newValue = newValue[5:]
		} else if strings.HasPrefix(newValue, "https:") {
			newValue = newValue[6:]
		}
	}
	if append_slashes && strings.HasPrefix(newValue, "//") {
		newValue = newValue[2:]
	}
	return
}

//true if domain1 is less restrictive than domain2
func IsDomainCovered(domain1, domain2 string) bool {
	if strings.HasSuffix(domain2, domain1) {
		return true
	}
	//handle the edge case: ".example.com" is equivalent to "example.com"
	if strings.Trim(domain1, ".") == strings.Trim(domain2, ".") {
		return true
	}
	return false
}

func UpdateEnv(env map[string]string, export [][]string) {
	for _, strArray := range export {
		if len(strArray) != 2 {
		} else if strArray[0] == "set-cookie" {
			env[strArray[0]] = env[strArray[0]] + strArray[1]
		} else {
			env[strArray[0]] = strArray[1]
		}
	}
}

func LogEngineError(ctx *EngineContext, errmsg string) {
	ctx.Debugger.LogTritiumErrorMessage(ctx.Customer, ctx.Project, ctx.Env, ctx.MessagePath, errmsg)
}
