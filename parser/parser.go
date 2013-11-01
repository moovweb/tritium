package parser

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"

	tp "tritium/proto"
)

func ParseFile(projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) *tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return ParseScript(src, projectPath, scriptPath, fileName, compilingMixer, layers)
}

func ParseScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, false, compilingMixer, layers).Parse()
}

func ParseRootScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, true, compilingMixer, layers).Parse()
}

func ParseFileSet(projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) []*tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return Parse(src, projectPath, scriptPath, fileName, compilingMixer, layers)
}

func ParseLayerFile(projectPath, scriptPath, fileName string, compilingMixer bool, layers, appliedLayers []string) *tp.ScriptObject {
	// println("READING LAYER FROM", projectPath, scriptPath, fileName)
	// fmt.Printf("layers: %v; applied: %v\n", layers, appliedLayers)
	var fullScriptPath string
	for _, layerName := range appliedLayers {
		fullScriptPath = filepath.Join(fullScriptPath, "layers", layerName)
	}
	fullScriptPath = filepath.Join(fullScriptPath, scriptPath)
	println("FULL LAYER PATH:", filepath.Join(projectPath, fullScriptPath, fileName))
	src, _ := readFile(projectPath, fullScriptPath, fileName)
	appliedLayers = reverse(appliedLayers) // re-reverse them
	pathWithLayers := strings.Join(appliedLayers, ":")
	pathWithLayers = pathWithLayers + ":" + scriptPath
	fmt.Printf("CALLING PARSESCRIPT WITH %s; %s; %v\n", pathWithLayers, fileName, layers[len(appliedLayers):len(layers)])
	return ParseScript(src, projectPath, pathWithLayers, fileName, compilingMixer, layers[len(appliedLayers):len(layers)])
}

func Parse(src, projectPath, scriptPath, fileName string, compilingMixer bool, layers []string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseRootScript(src, projectPath, scriptPath, fileName, compilingMixer, layers))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range obj.Imports() {
			// importFile already is already prepended with the script path relative to the project folder
			// fullPath := filepath.Join(filepath.Base(projectPath), importFile)
			if files[importFile] == 0 {
				if strings.Index(importFile, ":") != -1 {
					println("HANDLING LAYER IMPORT", importFile)
					components := strings.Split(importFile, ":")
					actualPath := components[len(components)-1]
					fileName := filepath.Base(actualPath)
					actualPath = filepath.Dir(actualPath)
					appliedLayers := components[0:len(components)-1]
					appliedLayers = reverse(appliedLayers) // un-reverse them
					objs = append(objs, ParseLayerFile(projectPath, actualPath, fileName, compilingMixer, layers, appliedLayers))
					// objs = append(objs, ParseLayerFile(projectPath, actualPath, fileName, compilingMixer, layers, appliedLayers))
				} else {
					objs = append(objs, ParseFile(projectPath, filepath.Dir(importFile), filepath.Base(importFile), compilingMixer, layers))
					// register the user-accessible scripts to avoid duplicate imports
					files[importFile] = 1
				}
			}
		}

		// for _, layerFile := range obj.Layers() {
		// 	if files[layerFile] == 0 {
		// 		objs = append(objs, ParseFile(projectPath, filepath.Dir(layerFile), filepath.Base(layerFile), compilingMixer, layers))
		// 		files[layerFile] = 1
		// 	}
		// }
	}
	return objs
}

func readFile(projectPath, scriptPath, fileName string) (src, fullpath string) {
	scriptLocationInProject := filepath.Join(scriptPath, fileName)
	fullpath = filepath.Join(projectPath, scriptPath, fileName)
	fullpath, err := filepath.Abs(fullpath)
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