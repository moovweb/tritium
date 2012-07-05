package proto

import (
	pb "code.google.com/p/goprotobuf/proto"
	"errors"
	"io/ioutil"
	"net/http"
)

func NewSlug(name string, version string, stages int) (slug *Slug, err error) {
	slug = &Slug{
		Name:         pb.String(name),
		Version:      pb.String(version),
		Transformers: make([]*Transform, stages),
	}

	return
}

func (slug *Slug) WriteFile(filename string) (err error) {
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

func NewSlugFromFile(filename string) (slug *Slug, err error) {
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

func NewSlugFromURL(url string) (slug *Slug, err error) {
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

	slug = &Slug{}
	err = pb.Unmarshal(data, slug)
	if err != nil {
		return
	}

	return
}
