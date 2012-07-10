package checker

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

import (
	"golog"
	"goyaml"
	"tritium/proto"
	"tritium/whale"
)

const TEST_FILE = "test/rewrite_test.yml"

type RewriteTestCase struct {
	Host     string
	Test     string
	Expected string
}

type ProjectTests struct {
	Host          []RewriteTestCase
	Link          []RewriteTestCase
	Cookie_Domain []RewriteTestCase
}

func read_test_cases(test_file string) (ProjectTests, error) {
	tests := ProjectTests{}
	fileinfo, err := ioutil.ReadFile(test_file)
	if err != nil {
		return tests, err
	}
	err = goyaml.Unmarshal([]byte(fileinfo), &tests)
	return tests, err
}

type create_http_cmd func(RewriteTestCase) string
type check_cmd_transform func(RewriteTestCase, string) bool

func create_host_http_req(test RewriteTestCase) string {
	request := "GET / HTTP/1.0\r\n"
	request += "Host: " + test.Test
	return request
}

func check_host_results(test RewriteTestCase, result string) bool {
	expected := "GET / HTTP/1.0\r\n"
	expected += "Host: " + test.Expected
	return strings.HasPrefix(result, expected)
}

func create_link_http_res(test RewriteTestCase) string {
	response := "HTTP/1.0 200 OK\r\n"
	response += "Location: " + test.Test
	return response
}

func check_link_results(test RewriteTestCase, result string) bool {
	expected := "HTTP/1.0 200 OK\r\n"
	expected += "Location: " + test.Expected
	return strings.HasPrefix(result, expected)
}

func create_cookie_http_res(test RewriteTestCase) string {
	response := "HTTP/1.0 200 OK\r\n"
	response += "Set-Cookie: Domain=" + test.Test + "; Path=/"
	return response
}

func check_cookie_results(test RewriteTestCase, result string) bool {
	expected := "HTTP/1.0 200 OK\r\n"
	expected += "Set-Cookie: Domain=" + test.Expected + "; Path=/"
	return strings.HasPrefix(result, expected)
}

func run_tests(test_type string, engine *whale.Whale, transformer *proto.Transform, rrules []*proto.RewriteRule, tests []RewriteTestCase, create_cmd create_http_cmd, check_cmd check_cmd_transform, logger *golog.Logger) bool {
	all_passed := true
	logger.Info("Running " + test_type + " Rewriter Tests...")
	for i, t := range tests {
		logger.Debug("Starting " + test_type + " test #" + strconv.Itoa(i))
		env := map[string]string{}
		env["host"] = t.Host
		http_cmd := create_cmd(t)
		logger.Debug("\n===Original Command===\n" + http_cmd + "\n========================\nEnvironment: " + fmt.Sprintln(env))

		// Temporarily just try to create a really large timeout.
		timeout := time.Now().Add(time.Duration(1) * time.Minute)
		result, exports, _ := engine.Run(transformer, rrules, http_cmd, env, timeout)
		logger.Debug("\n==Results after transform==\n" + result + "\n==========================")
		logger.Debug("Exports:  " + fmt.Sprintln(exports))
		passed := check_cmd(t, result)
		if !passed {
			logger.Error(" * " + test_type + " test #" + strconv.Itoa(i) + "...FAILED")
			all_passed = false
		} else {
			logger.Info(" * " + test_type + " test #" + strconv.Itoa(i) + "...PASSED")
		}
	}
	return all_passed
}

func RunProjectRewriterTests(req_tsf *proto.Transform, post_tsf *proto.Transform, rrules []*proto.RewriteRule, projectPath string, logger *golog.Logger) bool {
	test_path := filepath.Join(projectPath, TEST_FILE)
	test_cases, err := read_test_cases(test_path)
	if err != nil {
		return false
	}
	logger.Debug("Test cases loaded from: " + test_path)

	engine := whale.NewEngine(logger)
	passed_host := run_tests("Host", engine, req_tsf, rrules, test_cases.Host, create_host_http_req, check_host_results, logger)
	passed_link := run_tests("Link", engine, post_tsf, rrules, test_cases.Link, create_link_http_res, check_link_results, logger)
	passed_cookie := run_tests("Cookie", engine, post_tsf, rrules, test_cases.Cookie_Domain, create_cookie_http_res, check_cookie_results, logger)

	return passed_host && passed_link && passed_cookie
}
