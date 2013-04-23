package whale

import (
	"fmt"
	"strconv"
)

import (
	"gokogiri/xml"
)


// Converting JSON to XML nodes

func json_to_node(jsonVal interface{}, jsonDoc *xml.XmlDocument) xml.Node  {
	div := jsonDoc.CreateElementNode("div")
  switch jsonVal.(type) {
  case nil:
  	// generates <div data-json-null></div>
    div.SetAttr("data-json-null", "")
  case bool:
  	// generates <div data-json-true></div> or <div data-json-false></div>
    if jsonVal == true {
    	div.SetAttr("data-json-true", "")
    } else {
    	div.SetAttr("data-json-false", "")
    }
  case float64:
  	// generates <div data-json-number>[num]</div>
    div.SetAttr("data-json-number", "")
    div.SetContent(fmt.Sprintf("%v", jsonVal.(float64)))
  case string:
  	// generates <div data-json-string>[str]</div>
    div.SetAttr("data-json-string", "")
    div.SetContent(jsonVal.(string))
  case []interface{}:
  	// generates <div data-json-array>[json nodes]...</div>
    div.SetAttr("data-json-array", "")
    for _, elem := range jsonVal.([]interface{}) {
      elemNode := json_to_node(elem, jsonDoc)
      div.AddChild(elemNode) // maybe use MoveFunc?
    }
  case map[string]interface{}:
  	// generates <div data-json-object><div data-json-name="key1">[json node]</div>...</div>
    div.SetAttr("data-json-object", "")
    for name, value := range jsonVal.(map[string]interface{}) {
      pairNode := jsonDoc.CreateElementNode("div")
      pairNode.SetAttr("data-json-name", name)
      valueNode := json_to_node(value, jsonDoc)
      pairNode.AddChild(valueNode)
      div.AddChild(pairNode)
    }
  }
  return div
}

// Converting XML nodes back to JSON (goes with the preceding json_to_node function)

func node_to_json(node xml.Node) interface{} {
	if node == nil {
		return nil
	}
	if node.Attribute("data-json-null") != nil {
		return nil
	}
	if node.Attribute("data-json-false") != nil {
		return false
	}
	if node.Attribute("data-json-true") != nil {
		return true
	}
	if node.Attribute("data-json-number") != nil {
		f, err := strconv.ParseFloat(node.Content(), 64)
		if err != nil {
			return nil
		}
		return f
	}
	if node.Attribute("data-json-string") != nil {
		return node.Content()
	}
	if node.Attribute("data-json-array") != nil {
		length := node.CountChildren()
		array, i := make([]interface{}, length), 0
		for elem := node.FirstChild(); elem != nil; elem = elem.NextSibling() {
			array[i] = node_to_json(elem)
			i++
		}
		return array
	}
	if node.Attribute("data-json-object") != nil {
		hash := make(map[string]interface{})
		for pair := node.FirstChild(); pair != nil; pair = pair.NextSibling() {
			if pair.Attribute("data-json-name") == nil {
				continue // just skip nodes that aren't key-value pairs
			}
			hash[pair.Attr("data-json-name")] = node_to_json(pair.FirstChild())
		}
		return hash
	}
	// TODO: log a debugging message
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
