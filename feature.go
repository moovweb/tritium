package hermes

import(
	proto "code.google.com/p/goprotobuf/proto"
	yaml "goyaml"
	"io/ioutil"
	ap "athena"
	"fmt"
	)


func BuildFeaturesList(featuresFile string) ([]*ap.Feature) {

	data, err := ioutil.ReadFile(featuresFile)

	if err != nil {
		panic(fmt.Sprintf("Couldn't read file: %v : %v\n",featuresFile,err ))
	}

	featuresByName := make(map[string]interface{})

	yaml.Unmarshal(data, &featuresByName)
	
	features := make([]*ap.Feature, 0)

	for name, value := range(featuresByName) {

		var featureState ap.Feature_State

		switch value.(type) {
		case int:
			featureState = ap.Feature_State{
			Type: proto.String("int"),
			Value: proto.String( string(value.(int)) ),
			}		
		case string:
			featureState = ap.Feature_State{
			Type: proto.String("string"),
			Value: proto.String( value.(string) ),
			}		
		case bool:
			stringValue := "false"
			if value.(bool) {
				stringValue = "true"
			}
			featureState = ap.Feature_State{
			Type: proto.String("bool"),
			Value: proto.String( stringValue ),
			}		
		default:
			panic("Feature " + name + " has an invalid value type")
		}


		feature := &ap.Feature{
		Name: proto.String(name),
		State: &featureState,
		}

		features = append(features, feature)		
	}


	return features
}
