package proto

import (
	"os"
	"io/ioutil"
	"http"
	pb "goprotobuf.googlecode.com/hg/proto"
)

func NewSlug(name string, version string, stages int) (slug *Slug, err os.Error) {
	slug = &Slug{
		Name:         pb.String(name),
		Version:      pb.String(version),
		Transformers: make([]*Transform, stages),
	}

	return
}

func NewSlugFromFile(filename string) (slug *Slug, err os.Error) {
	var data []byte

	data, err = ioutil.ReadFile(filename)
	if err != nil {
		return
	}

	slug = &Slug{}
	err = pb.Unmarshal(data, slug)
	if err != nil {
		return
	}

	return
}

func NewSlugFromURL(url string) (slug *Slug, err os.Error) {
	var data []byte
	var resp *http.Response

	resp, err = http.Get(url)
	if resp.StatusCode != 200 {
		err = os.NewError("Couldn't load slug from " + url)
		return
	}
	if err != nil {
		return
	}
	
	data, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	if len(data) == 0 {
		err = os.NewError("Received blank slug")
		return
	}
	
	slug = &Slug{}
	err = pb.Unmarshal(data, slug)
	if err != nil {
		return
	}

	return
}

func (slug *Slug) WriteFile(filename string) (err os.Error) {
	var data []byte

	data, err = pb.Marshal(slug)
	if err != nil {
		return
	}

	err = ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return
	}

	return
}
