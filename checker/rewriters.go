package checker

import (
	"io/ioutil"
	"strings"
	"time"

	"golog"
	"goyaml"
	"tritium/protoface"
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
	response += "Set-Cookie: Name=hi"
	if len(test.Test) != 0 {
		response += "; Domain=" + test.Test
	}
	return response
}

func read_cookie_results(result string) string {
	lines := strings.Split(result, "\n")
	for _, l := range lines {
		if strings.HasPrefix(l, "Set-Cookie:") {
			cooky := strings.Split(l[10:], ";")
			for _, c := range cooky {
				c = strings.TrimSpace(c)
				if strings.HasPrefix(strings.ToLower(c), "domain=") {
					dom := strings.Split(c, "=")
					return strings.TrimSpace(dom[1])
				}
			}
		}
	}
	return ""
}

//TODO Passing in request tsf every time because of the hack mentioned inside.
func (result *CheckResult) run_tests(test_type string, engine *whale.Whale, transformer protoface.Transform, req_transform protoface.Transform, rrules []protoface.RewriteRule, tests []RewriteTestCase, create_cmd create_http_cmd, read_result_cmd read_cmd_transform, logger *golog.Logger) bool {
	all_passed := true

	for i, current_test := range tests {
		env := map[string]string{}
		env["host"] = current_test.Host
		//TODO temporary hack to make cookie rewriters work.  The problem is that
		//the cookie rewriters hinge on environment variables that are set only
		//after rewriting request.ts, so we have to go through that transformation
		//first before we can do the response_post transformation for the cookies.

		// Temporarily just try to create a really large timeout.
		timeout := time.Now().Add(time.Duration(1) * time.Minute)
		if test_type == "Cookie" {
			req_cmd := "GET / HTTP/1.0\r\nHost: " + current_test.Host
			// run the engine to populate the environment
			exhaust := engine.Run(req_transform, rrules, req_cmd, env, timeout, "test", "test", "test", make([]string, 0), false)
			for _, arr := range exhaust.Exports {
				if len(arr) != 2 {
				} else if arr[0] == "set-cookie" {
					env[arr[0]] = env[arr[0]] + arr[1]
				} else {
					env[arr[0]] = arr[1]
				}
			}
			// env should now be populated with all the things we need, so we can run
			// the rest of the test.
		}

		http_cmd := create_cmd(current_test)
		exhaust := engine.Run(transformer, rrules, http_cmd, env, timeout, "test", "test", "test", make([]string, 0), false)
		test_output := read_result_cmd(exhaust.Output)

		test_passed := test_output == current_test.Expected
		//TODO cookie hax, omnimobile and simple mobile translate cookie domains
		//differently, simply makes them more general, omni makes them more precise
		//in order to accomodate test passing on both, we compare that the result
		//is at least a subset of the domain that we expect.
		if test_type == "Cookie" {
			test_passed = whale.IsDomainCovered(test_output, current_test.Expected)
		}

		if test_passed {
			print(".")
		} else {
			result.AddRewriterWarning(test_type, i+1, "Expected: "+current_test.Expected+" Got: "+test_output)
			all_passed = false
		}
	}
	return all_passed
}

/*
func (result *CheckResult) CheckRewriters(req_tsf *proto.Transform, post_tsf *proto.Transform, rrules []*proto.RewriteRule, projectPath string, logger *golog.Logger) bool {
	test_path := filepath.Join(projectPath, TEST_FILE)
	test_cases, err := read_test_cases(test_path)
	if err != nil {
		return false
	}

	engine := whale.NewEngine(logger)
	passed_host := result.run_tests("Host", engine, req_tsf, req_tsf, rrules, test_cases.Host, create_host_http_req, read_host_results, logger)
	passed_link := result.run_tests("Link", engine, post_tsf, req_tsf, rrules, test_cases.Link, create_link_http_res, read_link_results, logger)
	passed_cookie := result.run_tests("Cookie", engine, post_tsf, req_tsf, rrules, test_cases.Cookie_Domain, create_cookie_http_res, read_cookie_results, logger)

	return passed_host && passed_link && passed_cookie
}
*/
