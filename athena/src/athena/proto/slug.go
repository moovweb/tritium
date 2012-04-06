package proto

import (
	"os"
	"io/ioutil"
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
