//Generator is used to create Tritium templates from an Osaka project.
package transform

import (
	"bytes"
	"errors"
	"fmt"
	"path/filepath"
	"text/template"
)

import (
	"butler/null"
	"manhattan/project"
	tp "tritium/proto"
)

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
	segments := [4]string{"request.ts", "response_pre.ts", "body.ts", "response_post.ts"}
	var finalError error

	renderedSegments := make(map[string][]byte, 4)

	for _, segment := range segments {
		rawTemplate, err := getRawTemplate(segment, mixer)

		if err != nil {
			panic(err)
		}

		renderedSegment, err := runTemplate(segment, rawTemplate, project)

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
		_, thisName := filepath.Split(null.GetString(segment.Path))
		if thisName == segmentName {
			return segment.Data, nil
		}
	}

	return nil, errors.New(fmt.Sprintf("Could not find rewriter: %v", segmentName))
}
