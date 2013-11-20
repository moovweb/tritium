package parser

import (
	// "fmt"
	"io/ioutil"
	"path/filepath"
	"strings"
  "code.google.com/p/goprotobuf/proto"

	tp "tritium/proto"
)

func ParseFile(projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) *tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return ParseScript(src, projectPath, scriptPath, fileName, compilingMixer, layers, "")
}

func ParseScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string, appliedLayers string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, false, compilingMixer, layers, appliedLayers).Parse()
}

func ParseRootScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, true, compilingMixer, layers, "").Parse()
}

func ParseFileSet(projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) []*tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return Parse(src, projectPath, scriptPath, fileName, compilingMixer, layers)
}

func ParseLayerFile(projectPath, scriptPath, fileName string, compilingMixer bool, layers []string, appliedLayers string) *tp.ScriptObject {
	appliedLayersSlice := strings.Split(appliedLayers, "/")
	remainingLayers := layers[len(appliedLayersSlice):len(layers)]
	src, _ := readFile(projectPath, scriptPath, fileName)
	layerScript := ParseScript(src, projectPath, scriptPath, fileName, compilingMixer, remainingLayers, appliedLayers)
	if len(appliedLayersSlice) != 0 {
		layerScript.Module = proto.String(appliedLayersSlice[0])
	}
	return layerScript
}

func Parse(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseRootScript(src, projectPath, scriptPath, fileName, compilingMixer, layers))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importNode := range obj.ImportInstructions() {
			importFile := importNode.GetValue()
			appliedLayers := importNode.GetNamespace()
			if files[importFile] == 0 {
				if len(appliedLayers) == 0 {
					objs = append(objs, ParseFile(projectPath, filepath.Dir(importFile), filepath.Base(importFile), compilingMixer, layers))
				} else {
					objs = append(objs, ParseLayerFile(projectPath, filepath.Dir(importFile), filepath.Base(importFile), compilingMixer, layers, appliedLayers))
				}
				// register the user-accessible scripts to avoid duplicate imports
				files[importFile] = 1
			}
		}
	}
	return objs
}

func readFile(projectPath, scriptPath, fileName string) (src, fullpath string) {
	scriptLocationInProject := filepath.Join(scriptPath, fileName)
	fullpath = filepath.Join(projectPath, scriptPath, fileName)
	fullpath, err := filepath.Abs(fullpath)

	// The parser checks whether the file exists now, and provides a better error message.
	// But might as well leave these here as failsafes.
	if err != nil {
		panic("No tritium file found at: " + scriptLocationInProject)
	}
	srcBytes, err := ioutil.ReadFile(fullpath)

	if err != nil {
		panic("No tritium file found at: " + scriptLocationInProject)
	}
	src = string(srcBytes)
	return
}


func reverse(seq []string) []string {
	res := make([]string, len(seq))
	for i, elt := range seq {
		res[len(seq)-1-i] = elt
	}
	return res
}