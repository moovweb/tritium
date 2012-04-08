package proto

import (
	"os"
	"io/ioutil"
	"path/filepath"
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

func NewTritiumTestFromFolder(path string) (test *TritiumTest, err os.Error) {
	script_file := filepath.Join(path, "input.ts")
	script, err := ioutil.ReadFile(script_file)
	if err != nil {
		return
	}
	
	input_file := filepath.Join(path, "input.txt")
	input, err := ioutil.ReadFile(input_file)
	if err != nil {
		return
	}

	output_file := filepath.Join(path, "output.txt")
	output, err := ioutil.ReadFile(output_file)
	if err != nil {
		return
	}

	test = &TritiumTest{
		Script:		   pb.String(string(script)),
		Input:         pb.String(string(input)),
		Output:        pb.String(string(output)),
		Env:		   []*TritiumTest_Hash{},
		Exports:       []*TritiumTest_Hash{},
		Logs:		   []string{},
	}

	return
}

func (test *TritiumTest) WriteFolder(path string) (err os.Error) {
	err = os.MkdirAll(path, 0755)
	if err != nil {
		return
	}

	input_script := filepath.Join(path, "input.ts")
	err = ioutil.WriteFile(input_script, []byte(pb.GetString(test.Script)), 0644)
	if err != nil {
		return
	}
	
	input_file := filepath.Join(path, "input.txt")
	err = ioutil.WriteFile(input_file, []byte(pb.GetString(test.Input)), 0644)
	if err != nil {
		return
	}

	output_file := filepath.Join(path, "output.txt")
	err = ioutil.WriteFile(output_file, []byte(pb.GetString(test.Output)), 0644)
	if err != nil {
		return
	}

	return
}
