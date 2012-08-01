package proto

import (
	pb "code.google.com/p/goprotobuf/proto"
	"io/ioutil"
	"strings"
)

func NewSlug(name string, version string, stages int) (slug *Slug, err error) {
	slug = &Slug{
		Name:         pb.String(strings.TrimSpace(name)),
		Version:      pb.String(strings.TrimSpace(version)),
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
