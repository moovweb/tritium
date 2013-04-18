package whale

import (
	"fmt"

	"gokogiri/xml"
)

func NodeToJson(node xml.Node) (retVal interface{}) {
	defer func() {
		if err := recover(); err != nil {
			retVal = WrapJsonError(err)
		}
	}()

	if node.Name() == "array" {
		retVal = NodeToJsonArray(node, make([]interface{}, 0))
	} else if node.Name() == "hash" {
		retVal = NodeToJsonHash(node, make(map[string]interface{}))
	}
	return
}

func NodeToJsonHash(node xml.Node, json map[string]interface{}) map[string]interface{} {
	if node.Name() != "hash" {
		panic("Incorrect JSON format, trying to serialize a " + node.Name() + " into a json hash.")
	}
	for n := node.FirstChild(); n != nil; n = n.NextSibling() {
		if n.Name() == "elem" && len(n.Attr("key")) > 0 {
			child := n.FirstChild()
			if child != nil && child.Name() == "array" {
				json[n.Attr("key")] = NodeToJsonArray(child, make([]interface{}, 0))
			} else if child != nil && child.Name() == "hash" {
				json[n.Attr("key")] = NodeToJsonHash(child, make(map[string]interface{}))
			} else {
				json[n.Attr("key")] = n.InnerHtml()
			}
		}
	}
	return json
}

func NodeToJsonArray(node xml.Node, json []interface{}) []interface{} {
	if node.Name() != "array" {
		panic("Incorrect JSON format, trying to serialize a " + node.Name() + " into a json array.")
	}
	for n := node.FirstChild(); n != nil; n = n.NextSibling() {
		if n.Name() == "elem" {
			child := n.FirstChild()
			if child != nil && child.Name() == "array" {
				json = append(json, NodeToJsonArray(child, make([]interface{}, 0)))
			} else if child != nil && child.Name() == "hash" {
				json = append(json, NodeToJsonHash(child, make(map[string]interface{})))
			} else {
				json = append(json, n.InnerHtml())
			}
		}
	}
	return json
}

func WrapJsonError(err interface{}) map[string]string {
	jsonErr := make(map[string]string)
	switch v := err.(type) {
	case error:
		jsonErr["tritium_error"] = v.Error()
	case string:
		jsonErr["tritium_error"] = v
	default:
		jsonErr["tritium_error"] = fmt.Sprintf("unknown type: %s", v)
	}
	return jsonErr
}
