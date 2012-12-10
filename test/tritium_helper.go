package test

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

import (
	yaml "goyaml"
	tp "tritium/proto"
)

type TritiumTest_Hash struct {
	Key   string
	Value string
}

type TritiumTest struct {
	Script       string
	Input        string
	Output       string
	EnvProto     []*TritiumTest_Hash
	ExportsProto []*TritiumTest_Hash
	Logs         []string
	Transformer  *tp.Transform
	Rrules       []*tp.RewriteRule
}

func (test *TritiumTest) Env() (env map[string]string) {
	env = map[string]string{}
	for _, hash := range test.EnvProto {
		env[hash.Key] = hash.Value
	}
	return
}

func (test *TritiumTest) Exports() (exports [][]string) {
	exports = make([][]string, len(test.ExportsProto))
	for n, hash := range test.ExportsProto {
		exports[n] = []string{hash.Key, hash.Value}
	}
	return
}

func (test *TritiumTest) SetEnv(env map[string]string) {
	th := make([]*TritiumTest_Hash, len(env))
	i := 0
	for key, value := range env {
		th[i] = &TritiumTest_Hash{Key: key, Value: value}
		i++
	}
	test.EnvProto = th
}

func (test *TritiumTest) SetExports(exports [][]string) {
	th := make([]*TritiumTest_Hash, len(exports))
	for n, export := range exports {
		th[n] = &TritiumTest_Hash{Key: export[0], Value: export[1]}
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
		Script: string(script),
		Input:  string(input),
		Output: string(output),
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
	err = ioutil.WriteFile(input_script, []byte(test.Script), 0644)
	if err != nil {
		return
	}

	input_file := filepath.Join(path, "input.txt")
	err = ioutil.WriteFile(input_file, []byte(test.Input), 0644)
	if err != nil {
		return
	}

	output_file := filepath.Join(path, "output.txt")
	err = ioutil.WriteFile(output_file, []byte(test.Output), 0644)
	if err != nil {
		return
	}

	return
}
