package generator

import packager "tritium/packager"
import whale "tritium/whale"
import ap "athena"
import "tritium"
import "manhattan/project"
import "golog"
import "text/template"
import "bytes"
import "io/ioutil"
import "os"
import "fmt"
import "testing"
import "path/filepath"
import pb "code.google.com/p/goprotobuf/proto"

type GeneratorTestError struct {
	msg string
	err error
}

func (e *GeneratorTestError) Error() string {
	if e.err != nil {
		return e.msg + "\n" + e.err.Error()
	}
	return e.msg
}

func NewGeneratorTestError(msg string, err error) *GeneratorTestError {
	return &GeneratorTestError{msg: msg, err: err}
}

var TRITIUM_PATH string

const TEST_DIR = "test"
const TEMPLATE_DIR = "templates"

func init() {
	TRITIUM_PATH = os.Getenv("TRITIUM_PATH")
	if TRITIUM_PATH == "" {
		TRITIUM_PATH = os.ExpandEnv("$HOME/.manhattan/")
	}
}

func compareExports(expected_list [][]string, result_list [][]string) *GeneratorTestError {
	if len(expected_list) != len(result_list) {
		match_err := NewGeneratorTestError(fmt.Sprintln("Expected", len(expected_list), "exports but got", len(result_list), "instead"), nil)
		return NewGeneratorTestError("Export count mismatch", match_err)
	}

	for _, result := range result_list {
		for _, expected := range expected_list {
			if expected[0] == result[0] {
				if expected[1] != result[1] {
					match_err := NewGeneratorTestError("Expected ["+expected[0]+"="+expected[1]+"] got ["+result[0]+"="+result[1]+"]\n", nil)
					return NewGeneratorTestError("Export mismatch", match_err)
				}
			}
		}
	}
	return nil
}

func generateRewriter(test_type string, test_name string) (string, *GeneratorTestError) {
	segmentTemplate := template.New(test_name + ".ts")
	tdata, _ := ioutil.ReadFile(filepath.Join(TEMPLATE_DIR, test_type+".ts"))
	template, err := segmentTemplate.Parse(string(tdata))
	if err != nil {
		return "", NewGeneratorTestError("Failed to parse "+test_type+" template", err)
	}

	proj, err := project.New(filepath.Join(TEST_DIR, test_type, test_name))
	if err != nil {
		return "", NewGeneratorTestError("Failed to load project", err)
	}

	var buf bytes.Buffer
	err = template.Execute(&buf, proj.Config)
	if err != nil {
		return "", NewGeneratorTestError("Failed to run template for project", err)
	}
	return string(buf.Bytes()), nil
}

func runTest(test_type string, test_name string, pkg *packager.Package) (err *GeneratorTestError) {
	fmt.Print(" * ", test_name+"...")

	test_script, err := generateRewriter(test_type, test_name)
	if err != nil {
		return err
	}

	test, oserr := ap.NewTritiumTestFromFolder(filepath.Join(TEST_DIR, test_type, test_name))
	if oserr != nil {
		return NewGeneratorTestError("Failed to create TritiumTest object", oserr)
	}

	test.Script = pb.String(test_script)

	oserr = tritium.CompileTest(test, "/", pkg.Package)
	if oserr != nil {
		return NewGeneratorTestError("Failed to compile TritiumTest object", oserr)
	}

	compiled_path := filepath.Join(TEST_DIR, test_type, test_name, test_name+".test")
	os.MkdirAll(compiled_path, 0755)
	oserr = test.WriteFile(filepath.Join(compiled_path, test_name+".test"))
	if oserr != nil {
		return NewGeneratorTestError("Failed to write TritiumTest object", oserr)
	}

	logger := golog.NewLogger("templates_test: ")
	consoleProc := golog.NewConsoleProcessor(golog.LOG_DEBUG, true)
	logger.AddProcessor("console", consoleProc)

	e := whale.NewEngine(logger)
	result, result_exports, _ := e.Run(test.Transformer, string(pb.GetString(test.Input)), test.Env())

	if result != string(pb.GetString(test.Output)) {
		err := NewGeneratorTestError("Expected:\n["+string(pb.GetString(test.Output))+"]\nGOT:\n["+result+"]", nil)
		return NewGeneratorTestError("Output doesn't match", err)
	}

	export_err := compareExports(test.Exports(), result_exports)
	if export_err != nil {
		return export_err
	}

	return nil
}

func TestGenerator(t *testing.T) {
	wd, _ := os.Getwd()
	fmt.Println("Running in", wd, "workspace is", os.Getenv("WORKSPACE"))
	str := filepath.Join(TRITIUM_PATH, "packages")
	pkg := packager.LoadDefaultPackage(&str)

	test_types, err := ioutil.ReadDir(TEST_DIR)
	if err != nil {
		t.Error(err)
		t.Fatal("Failed to open test directory")
	}

	for _, test_type := range test_types {
		type_name := test_type.Name()

		fmt.Println("Running", type_name, "tests")

		tests, err := ioutil.ReadDir(filepath.Join(TEST_DIR, type_name))
		if err != nil {
			continue
		}

		for _, test := range tests {
			err := runTest(type_name, test.Name(), pkg)
			if err != nil {
				fmt.Println(" FAIL")
				fmt.Println(err)
				t.Fail()
			} else {
				fmt.Println(" PASS")
			}
		}
	}
}
