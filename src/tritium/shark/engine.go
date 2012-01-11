package shark

import(
	tp "tritium/proto"
	"libxml/xpath"
	"rubex"
	proto "goprotobuf.googlecode.com/hg/proto"
)

type Shark struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
	Functions []*Function
	Types []string
}

type Function struct {
	Stub string
	*tp.Function
}

func NewEngine() (*Shark) {
	e := &Shark{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
	}
	return e
}

func (eng *Shark) UsePackage(pkg *tp.Package) {
	eng.Types = make([]string, len(pkg.Types))
	for i, t := range(pkg.Types) {
		eng.Types[i] = proto.GetString(t.Name)
	}
	
	eng.Functions = make([]*Function, len(pkg.Functions))
	for i, f := range(pkg.Functions) {
		fun := &Function{
			Function: f,
		}
		eng.Functions[i] = fun
	}
}

func (eng *Shark) Run(transform *tp.Transform, input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	eng.UsePackage(transform.Pkg)
	data = input
	exports = make([][]string, 0)
	logs = make([]string, 0)
	return
}
/*
func (eng *Shark) runInstruction(ins *tp.Instruction) (returnValue interface{}) {
	
}
*/