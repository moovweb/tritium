package spec

type error struct {
	Name string
	Got string
	Expected string
	Message string
	Panic bool
}
type Result struct {
	Errors []*error
	hadPanic bool
}
func (r *Result) Merge(n *Result) {
	for _, err := range(n.Errors) {
		r.Errors = append(r.Errors, err)
	}
}
func NewResult() (*Result) {
	return &Result{
		Errors: make([]*error, 0),
	}
}

func (r *Result) Passed() (bool) {
	return (len(r.Errors) == 0)
}

func (r *Result) CharStatus() (string) {
	if r.hadPanic == true {
		return "E"
	}
	if r.Passed() {
		return "."
	}
	return "F"
}

func (r *Result) Error(name, message string) {
	e := &error{
		Name: name,
		Message: message,
		Panic: true,
	}
	r.hadPanic = true
	r.Errors = append(r.Errors, e)
}
func (r *Result) Fail(named, got, expected, message string) {
	e := &error{
		Name: named,
		Got: got,
		Expected: expected,
		Message: message,
		Panic: false,
	}
	r.Errors = append(r.Errors, e)
}