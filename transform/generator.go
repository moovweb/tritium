//Generator is used to create Tritium templates from an Osaka project.
package transform

import (
	"errors"
	"text/template"
)
import "bytes"

import "fmt"
import "encoding/json"
import "path/filepath"

import "manhattan/project/options"
import "manhattan/project"
import "rubex"
import tp "tritium/proto"
import proto "code.google.com/p/goprotobuf/proto"

func runTemplate(name string, rawTemplate []byte, options options.Options, project *project.Project) ([]byte, error) {
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

func Generate(options options.Options, project *project.Project, mixer *tp.Mixer) (map[string][]byte, error) {
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

	for _, segment := range segments {
		rawTemplate, err := getRawTemplate(segment, mixer)

		if err != nil {
			panic(err)
		}

		renderedSegment, err := runTemplate(segment, rawTemplate, options, project)

		if err != nil {
			// Should really return an array of errors
			finalError = err
		} else {
			renderedSegments[segment] = renderedSegment
		}
	}

	return renderedSegments, finalError
}

func getRawTemplate(segmentName string, mixer *tp.Mixer) (rawTemplate []uint8, err error) {

	for _, segment := range mixer.Rewriters {
		_, thisName := filepath.Split(proto.GetString(segment.Path))
		if thisName == segmentName {
			return segment.Data[0], nil
		}
	}

	return nil, errors.New(fmt.Sprintf("Could not find rewriter: %v", segmentName))
}
