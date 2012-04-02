package spec

type tError struct {
	Location string
	Name     string
	Got      string
	Expected string
	Message  string
	Panic    bool
}
type Result struct {
	Errors   []*tError
	hadPanic bool
}

func (r *Result) Merge(n *Result) {
	for _, err := range n.Errors {
		r.Errors = append(r.Errors, err)
	}
}
func NewResult() *Result {
	return &Result{
		Errors: make([]*tError, 0),
	}
}

func (r *Result) Passed() bool {
	return (len(r.Errors) == 0)
}

func (r *Result) CharStatus() string {
	if r.hadPanic == true {
		return "E"
	}
	if r.Passed() {
		return "."
	}
	return "F"
}

func (r *Result) Error(loc, message string) {
	e := &tError{
		Location: loc,
		Message:  message,
		Panic:    true,
	}
	r.hadPanic = true
	r.Errors = append(r.Errors, e)
}
func (r *Result) Fail(location, named, got, expected, message string) {
	e := &tError{
		Location: location,
		Name:     named,
		Got:      got,
		Expected: expected,
		Message:  message,
		Panic:    false,
	}
	r.Errors = append(r.Errors, e)
}
