package spec

type error struct {
	Name string
	Got string
	Expected string
	Message string
}
type Result struct {
	Errors []*error
}
func (r *Result) Merge(n *Result) {
	for _, err := range(n.Errors) {
		r.Errors = append(r.Errors, err)
	}
}
func newResult() (*Result) {
	return &Result{
		Errors: make([]*error, 0),
	}
}

func (r *Result) Passed() (bool) {
	return (len(r.Errors) == 0)
}

func (r *Result) Error(named, got, expected, message string) {
	e := &error{
		Name: named,
		Got: got,
		Expected: expected,
		Message: message,
	}
	r.Errors = append(r.Errors, e)
}