package whale

import (
	"fmt"
	"strconv"
)

import (
	"tritium/dependencies/gokogiri/xml"
)

// Converting JSON to XML nodes

func json_to_node(jsonVal interface{}, jsonDoc *xml.XmlDocument) (jsonNode xml.Node) {
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
			jsonNode.AddChild(elemNode)
		}
	case map[string]interface{}:
		// generates <object><member name="key1">[json node]</member>...</object>
		jsonNode = jsonDoc.CreateElementNode("object")
		for name, value := range jsonVal.(map[string]interface{}) {
			memberNode := jsonDoc.CreateElementNode("member")
			memberNode.SetAttr("name", name)
			valueNode := json_to_node(value, jsonDoc)
			memberNode.AddChild(valueNode)
			jsonNode.AddChild(memberNode)
		}
	}
	return
}

// Converting XML nodes back to JSON (goes with the preceding json_to_node function)

func node_to_json(node xml.Node) interface{} {
	if node == nil {
		return nil
	}
	switch node.Name() {
	case "null":
		return nil
	case "false":
		return false
	case "true":
		return true
	case "number":
		f, err := strconv.ParseFloat(node.Content(), 64)
		if err != nil {
			return nil
		}
		return f
	case "string":
		return node.Content()
	case "array":
		length := node.CountChildren()
		array := make([]interface{}, length)
		for elem, i := node.FirstChild(), 0; elem != nil; elem, i = elem.NextSibling(), i+1 {
			array[i] = node_to_json(elem)
		}
		return array
	case "object":
		object := make(map[string]interface{})
		for member := node.FirstChild(); member != nil; member = member.NextSibling() {
			if member.Name() != "member" || member.Attribute("name") == nil {
				// TODO: log a debugging message here
				continue // just skip nodes that aren't name-value pairs
			}
			object[member.Attr("name")] = node_to_json(member.FirstChild())
		}
		return object
	}
	// TODO: log a debugging message if we get to this point
	return nil
}

// Converting XML to JSON (version 1; will deprecate)

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
