package proto

import (
	"os"
	"io/ioutil"
	pb "goprotobuf.googlecode.com/hg/proto"
)

func NewTritiumTestFromFile(filename string) (test *TritiumTest, err os.Error) {
	var data []byte

	data, err = ioutil.ReadFile(filename)
	if err != nil {
		return
	}

	test = &TritiumTest{}
	err = pb.Unmarshal(data, test)
	if err != nil {
		return
	}

	return
}

func (test *TritiumTest) WriteFile(filename string) (err os.Error) {
	var data []byte

	data, err = pb.Marshal(test)
	if err != nil {
		return
	}

	err = ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return
	}

	return
}

func (test *TritiumTest) WriteFolder(path string) (err os.Error) {
	err = os.MkdirAll(path, 0755)
	if err != nil {
		return
	}

	err = ioutil.WriteFile("input.ts", []byte(pb.GetString(test.Script)), 0644)
	if err != nil {
		return
	}
	
	err = ioutil.WriteFile("input.txt", []byte(pb.GetString(test.Input)), 0644)
	if err != nil {
		return
	}

	err = ioutil.WriteFile("output.txt", []byte(pb.GetString(test.Output)), 0644)
	if err != nil {
		return
	}

	return
}
