package checker

import (
	"io/ioutil"
	"path/filepath"
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
type read_cmd_transform func(string) string

func create_host_http_req(test RewriteTestCase) string {
	request := "GET / HTTP/1.0\r\n"
	request += "Host: " + test.Test
	return request
}

func read_host_results(result string) string {
	lines := strings.Split(result, "\n")
	check := lines[1][6:]
	return strings.TrimSpace(check)
}

func create_link_http_res(test RewriteTestCase) string {
	response := "HTTP/1.0 200 OK\r\n"
	response += "Location: " + test.Test
	return response
}

func read_link_results(result string) string {
	lines := strings.Split(result, "\n")
	check := lines[1][10:]
	return strings.TrimSpace(check)
}

func create_cookie_http_res(test RewriteTestCase) string {
	response := "HTTP/1.0 200 OK\r\n"
	response += "Set-Cookie: Domain=" + test.Test
	return response
}

func read_cookie_results(result string) string {
	lines := strings.Split(result, "\n")
	check := lines[1][19:]
	return strings.TrimSpace(check)
}

func (result *CheckResult) run_tests(test_type string, engine *whale.Whale, transformer *proto.Transform, rrules []*proto.RewriteRule, tests []RewriteTestCase, create_cmd create_http_cmd, read_result_cmd read_cmd_transform, logger *golog.Logger) bool {
	all_passed := true

	for i, current_test := range tests {
		env := map[string]string{}
		env["host"] = current_test.Host
		http_cmd := create_cmd(current_test)

		// Temporarily just try to create a really large timeout.
		timeout := time.Now().Add(time.Duration(1) * time.Minute)
		test_result, _, _ := engine.Run(transformer, rrules, http_cmd, env, timeout)
		test_output := read_result_cmd(test_result)

		if test_output == current_test.Expected {
			print(".")
		} else {
			result.AddRewriterWarning(test_type, i+1, "Expected: " + current_test.Expected + " Got: " + test_output)
			all_passed = false
		}
	}
	return all_passed
}

func (result *CheckResult) CheckRewriters(req_tsf *proto.Transform, post_tsf *proto.Transform, rrules []*proto.RewriteRule, projectPath string, logger *golog.Logger) bool {
	test_path := filepath.Join(projectPath, TEST_FILE)
	test_cases, err := read_test_cases(test_path)
	if err != nil {
		return false
	}

	engine := whale.NewEngine(logger)
	passed_host := result.run_tests("Host", engine, req_tsf, rrules, test_cases.Host, create_host_http_req, read_host_results, logger)
	passed_link := result.run_tests("Link", engine, post_tsf, rrules, test_cases.Link, create_link_http_res, read_link_results, logger)
	passed_cookie := result.run_tests("Cookie", engine, post_tsf, rrules, test_cases.Cookie_Domain, create_cookie_http_res, read_cookie_results, logger)

	return passed_host && passed_link && passed_cookie
}
