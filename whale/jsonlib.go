package whale

import (
	"fmt"
	"strconv"
)

import (
	hx "github.com/moovweb/tritium/htmltransformer"
)

// Converting JSON to XML nodes

func json_to_node(jsonVal interface{}, jsonDoc hx.HtmlTransformer) (jsonNode hx.Node) {
	switch jsonVal.(type) {
	case nil:
		// generates <null />
		jsonNode = jsonDoc.CreateElementNode("null")
	case bool:
		// generates <true /> or <false />
		if jsonVal == false {
			jsonNode = jsonDoc.CreateElementNode("false")
		} else {
			jsonNode = jsonDoc.CreateElementNode("true")
		}
	case float64:
		// generates <number>[digits]</number>
		jsonNode = jsonDoc.CreateElementNode("number")
		jsonNode.SetContent(fmt.Sprintf("%v", jsonVal.(float64)))
	case string:
		// generates <string>[chars]</string>
		jsonNode = jsonDoc.CreateElementNode("string")
		jsonNode.SetContent(jsonVal.(string))
	case []interface{}:
		// generates <array>[json nodes]...</array>
		jsonNode = jsonDoc.CreateElementNode("array")
		for _, elem := range jsonVal.([]interface{}) {
			elemNode := json_to_node(elem, jsonDoc)
			jsonNode.InsertTop(elemNode)
		}
	case map[string]interface{}:
		// generates <object><member name="key1">[json node]</member>...</object>
		jsonNode = jsonDoc.CreateElementNode("object")
		for name, value := range jsonVal.(map[string]interface{}) {
			memberNode := jsonDoc.CreateElementNode("member")
			memberNode.SetAttribute("name", name)
			valueNode := json_to_node(value, jsonDoc)
			memberNode.InsertTop(valueNode)
			jsonNode.InsertTop(memberNode)
		}
	}
	return
}

// Converting XML nodes back to JSON (goes with the preceding json_to_node function)

func node_to_json(node hx.Node) interface{} {
	if node == nil {
		return nil
	}
	switch node.GetName() {
	case "null":
		return nil
	case "false":
		return false
	case "true":
		return true
	case "number":
		f, err := strconv.ParseFloat(node.GetContent(), 64)
		if err != nil {
			return nil
		}
		return f
	case "string":
		return node.GetContent()
	case "array":
		length := 0
		for first := node.FirstChild(); first != nil; first = first.NextSibling() {
			length = length + 1
		}

		array := make([]interface{}, length)
		for elem, i := node.FirstChild(), 0; elem != nil; elem, i = elem.NextSibling(), i+1 {
			array[i] = node_to_json(elem)
		}
		return array
	case "object":
		object := make(map[string]interface{})
		for member := node.FirstChild(); member != nil; member = member.NextSibling() {
			if member.GetName() != "member" || member.GetAttribute("name") == nil {
				continue // just skip nodes that aren't name-value pairs
			}
			object[member.GetAttribute("name").GetContent()] = node_to_json(member.FirstChild())
		}
		return object
	}
	return nil
}

// Converting XML to JSON (version 1; will deprecate)

func NodeToJson(node hx.Node) (retVal interface{}) {
	defer func() {
		if err := recover(); err != nil {
			retVal = WrapJsonError(err)
		}
	}()

	if node.GetName() == "array" {
		retVal = NodeToJsonArray(node, make([]interface{}, 0))
	} else if node.GetName() == "hash" {
		retVal = NodeToJsonHash(node, make(map[string]interface{}))
	}
	return
}

func NodeToJsonHash(node hx.Node, json map[string]interface{}) map[string]interface{} {
	if node.GetName() != "hash" {
		panic("Incorrect JSON format, trying to serialize a " + node.GetName() + " into a json hash.")
	}
	for n := node.FirstChild(); n != nil; n = n.NextSibling() {
		if n.GetName() == "elem" && len(n.GetAttribute("key").GetContent()) > 0 {
			child := n.FirstChild()
			if child != nil && child.GetName() == "array" {
				json[n.GetAttribute("key").GetContent()] = NodeToJsonArray(child, make([]interface{}, 0))
			} else if child != nil && child.GetName() == "hash" {
				json[n.GetAttribute("key").GetContent()] = NodeToJsonHash(child, make(map[string]interface{}))
			} else {
				json[n.GetAttribute("key").GetContent()] = n.GetInnerHtml()
			}
		}
	}
	return json
}

func NodeToJsonArray(node hx.Node, json []interface{}) []interface{} {
	if node.GetName() != "array" {
		panic("Incorrect JSON format, trying to serialize a " + node.GetName() + " into a json array.")
	}
	for n := node.FirstChild(); n != nil; n = n.NextSibling() {
		if n.GetName() == "elem" {
			child := n.FirstChild()
			if child != nil && child.GetName() == "array" {
				json = append(json, NodeToJsonArray(child, make([]interface{}, 0)))
			} else if child != nil && child.GetName() == "hash" {
				json = append(json, NodeToJsonHash(child, make(map[string]interface{})))
			} else {
				json = append(json, n.GetInnerHtml())
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
