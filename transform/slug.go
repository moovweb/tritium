package transform

import (
	"errors"
	"io/ioutil"
	"net/http"
)
import (
	pb "code.google.com/p/goprotobuf/proto"
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
