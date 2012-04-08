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

func NewTritiumTestFromFolder(filename string) (test *TritiumTest, err os.Error) {
	err = ioutil.ReadFile("input.ts")
	if err != nil {
		return
	}
	
	input_script := filepath.Join(path, "input.ts")
	input_script_raw, err := ioutil.ReadFile(input_script)
	if err != nil {
		return
	}
	
	input_file := filepath.Join(path, "input.txt")
	input_file_raw, err = ioutil.WriteFile(input_file, []byte(pb.GetString(test.Input)), 0644)
	if err != nil {
		return
	}

	output_file := filepath.Join(path, "output.txt")
	output_file_raw, err = ioutil.WriteFile(output_file, []byte(pb.GetString(test.Output)), 0644)
	if err != nil {
		return
	}

	test = &TritiumTest{
		Script:		   pb.String(script),
		Input:         pb.String(name),
		Output:        pb.String(version),
		Transformers:  make([]*Transform, 1),
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
