package transform

import (
	"errors"
	"io/ioutil"
	"net/http"
	"path/filepath"
)
import (
	pb "code.google.com/p/goprotobuf/proto"
	"manhattan/project"
	tp "tritium/proto"
)

func NewSlugFromFile(filename string) (slug *tp.Slug, err error) {
	var data []byte

	data, err = ioutil.ReadFile(filename)
	if err != nil {
		return
	}

	slug = &tp.Slug{}
	err = pb.Unmarshal(data, slug)
	if err != nil {
		return
	}

	return
}

func NewSlugFromURL(url string) (slug *tp.Slug, err error) {
	var data []byte
	var resp *http.Response

	resp, err = http.Get(url)
	if err != nil {
		return
	}

	if resp.StatusCode != 200 {
		err = errors.New("Couldn't load slug from " + url)
		return
	}

	data, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	if len(data) == 0 {
		err = errors.New("Received blank slug")
		return
	}

	slug = &tp.Slug{}
	err = pb.Unmarshal(data, slug)
	if err != nil {
		return
	}

	return
}

var defaultRewriters = [...]string{
	"requests.ts",
	"response_pre.ts",
	"body.ts",
	"response_post.ts"}

func NewSlugFromProject(proj *project.Project, mixerPath string) (*tp.Slug, error) {
	mxr := tp.OpenMixer(mixerPath)
	rewriters, err := Generate(proj, mxr)
	if err != nil {
		return nil, err
	}

	slug, err := tp.NewSlug(proj.Name, proj.Version, len(defaultRewriters))
	if err != nil {
		return nil, err
	}

	userPackagePath := filepath.Join(proj.Path, "functions", "main.ts")
	LoadFunctions(userPackagePath, mxr.Package)

	for i, name := range defaultRewriters {
		filename := filepath.Join(proj.ScriptPath, name)
		if rewriters[name] == nil {
			return nil, errors.New("Couldn't load rewriter: " + name)
		}
		slug.Transformers[i], err = CompileString(string(rewriters[name]), filename, mxr.Package)
		if err != nil {
			return nil, errors.New("Failed to create " + name + " transformer: " + err.Error())
		}
	}
	return slug, nil
}
