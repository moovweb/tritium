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
