//Generator is used to create Tritium templates from an Osaka project.
package transform

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"path/filepath"
	"text/template"
	"io/ioutil"
)

import (
	"tritium/dependencies/butler/null"
	"manhattan/project"
	"rubex"
	tp "tritium/proto"
)

var WriteRewritersToProjectDir = false

func runTemplate(name string, rawTemplate []byte, project *project.Project) ([]byte, error) {
	segmentTemplate := template.New(name)
	request, err := segmentTemplate.Parse(string(rawTemplate))

	if err != nil {
		return nil, errors.New(fmt.Sprintf("Error loading template: %v", err))
	}

	var buf bytes.Buffer
	err = request.Execute(&buf, project)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("Error running template: %v", err))
	}
	return buf.Bytes(), nil
}

func Generate(project *project.Project, mixer *tp.Mixer) (map[string][]byte, error) {
	// HACKY
	type TempRewriter struct {
		ToBeReplacedWithmatcher     string
		ToBeReplacedWithreplacement string
	}
	tmpRewriter := make([]TempRewriter, len(project.Rewriter.Host))
	for i, v := range project.Rewriter.Host {
		tmpRewriter[i].ToBeReplacedWithmatcher = v.Matcher
		tmpRewriter[i].ToBeReplacedWithreplacement = v.Replacement
	}
	// Make JSON
	data, err := json.Marshal(tmpRewriter)
	if err != nil {
		project.HostJson = "{}"
	} else {
		project.HostJson = string(data)
	}
	// Lowercase hack
	r := rubex.MustCompile("ToBeReplacedWithmatcher")
	project.HostJson = r.Gsub(project.HostJson, "matcher")
	r = rubex.MustCompile("ToBeReplacedWithreplacement")
	project.HostJson = r.Gsub(project.HostJson, "replacement")
	// Escape quotes
	r = rubex.MustCompile("\"")
	project.HostJson = r.Gsub(project.HostJson, "\\\"")

	// END HACKY

	segments := [4]string{"request.ts", "response_pre.ts", "body.ts", "response_post.ts"}
	var finalError error

	renderedSegments := make(map[string][]byte, 4)

	rewritersContainer := mixer
	// if mixer.GetPackagerVersion() > 0 {
	// 	rewritersContainer = project.HttpTransformers
	// 	if rewritersContainer == nil {
	// 		return nil, errors.New("Project does not contain any HTTP transformers.")
	// 	}
	// }

	for _, segment := range segments {
		rawTemplate, err := getRawTemplate(segment, rewritersContainer)

		if err != nil {
			panic(err)
		}

		renderedSegment, err := runTemplate(segment, rawTemplate, project)

		if err != nil {
			// Should really return an array of errors
			finalError = err
		} else {
			renderedSegments[segment] = renderedSegment
			if WriteRewritersToProjectDir {
				ioutil.WriteFile(filepath.Join(project.Path, project.ScriptPath, segment), renderedSegment, 0644)
			}
		}
	}

	return renderedSegments, finalError
}

func getRawTemplate(segmentName string, mixer *tp.Mixer) (rawTemplate []uint8, err error) {

	for _, segment := range mixer.Rewriters {
		_, thisName := filepath.Split(null.GetString(segment.Path))
		if thisName == segmentName {
			return segment.Data, nil
		}
	}

	return nil, errors.New(fmt.Sprintf("Could not find rewriter: %v", segmentName))
}
