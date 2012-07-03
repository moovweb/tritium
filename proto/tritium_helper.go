package proto

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

import (
	"butler/null"
	pb "code.google.com/p/goprotobuf/proto"
	yaml "goyaml"
)

func NewTritiumTestFromFile(filename string) (test *TritiumTest, err error) {
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

func (test *TritiumTest) WriteFile(filename string) (err error) {
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

func (test *TritiumTest) Env() (env map[string]string) {
	env = map[string]string{}
	for _, hash := range test.EnvProto {
		env[null.GetString(hash.Key)] = null.GetString(hash.Value)
	}
	return
}

func (test *TritiumTest) Exports() (exports [][]string) {
	exports = make([][]string, len(test.ExportsProto))
	for n, hash := range test.ExportsProto {
		exports[n] = []string{null.GetString(hash.Key), null.GetString(hash.Value)}
	}
	return
}

func (test *TritiumTest) SetEnv(env map[string]string) {
	th := make([]*TritiumTest_Hash, len(env))
	i := 0
	for key, value := range env {
		th[i] = &TritiumTest_Hash{Key: pb.String(key), Value: pb.String(value)}
		i++
	}
	test.EnvProto = th
}

func (test *TritiumTest) SetExports(exports [][]string) {
	th := make([]*TritiumTest_Hash, len(exports))
	for n, export := range exports {
		th[n] = &TritiumTest_Hash{Key: pb.String(export[0]), Value: pb.String(export[1])}
	}
	test.ExportsProto = th
}

func NewTritiumTestFromFolder(path string) (test *TritiumTest, err error) {
	script, err := ioutil.ReadFile(filepath.Join(path, "input.ts"))
	if err != nil {
		script = []byte("")
	}

	input, err := ioutil.ReadFile(filepath.Join(path, "input.http"))
	if err != nil {
		input = []byte("")
	}

	output, err := ioutil.ReadFile(filepath.Join(path, "output.http"))
	if err != nil {
		output = []byte("")
	}

	env := make(map[string]string, 0)
	data, err := ioutil.ReadFile(filepath.Join(path, "vars.yml"))
	if err == nil {
		err = yaml.Unmarshal(data, &env)
		if err != nil {
			return
		}
	}

	exports := make([][]string, 0)
	data, err = ioutil.ReadFile(filepath.Join(path, "exports.yml"))
	if err == nil {
		err = yaml.Unmarshal(data, &exports)
		if err != nil {
			return
		}
	}

	test = &TritiumTest{
		Script: pb.String(string(script)),
		Input:  pb.String(string(input)),
		Output: pb.String(string(output)),
		Logs:   []string{},
	}

	test.SetEnv(env)
	test.SetExports(exports)

	return test, nil
}

func (test *TritiumTest) WriteFolder(path string) (err error) {
	err = os.MkdirAll(path, 0755)
	if err != nil {
		return
	}

	input_script := filepath.Join(path, "input.ts")
	err = ioutil.WriteFile(input_script, []byte(null.GetString(test.Script)), 0644)
	if err != nil {
		return
	}

	input_file := filepath.Join(path, "input.txt")
	err = ioutil.WriteFile(input_file, []byte(null.GetString(test.Input)), 0644)
	if err != nil {
		return
	}

	output_file := filepath.Join(path, "output.txt")
	err = ioutil.WriteFile(output_file, []byte(null.GetString(test.Output)), 0644)
	if err != nil {
		return
	}

	return
}
