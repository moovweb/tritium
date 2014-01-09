package slugviewer

import (
	"errors"
	"flag"
	"fmt"
	"strings"
	"io/ioutil"
	"time"
)

import (
	"manhattan/commands"
	pb "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
)

const CmdName = "slugviewer"

type SlugViewCmd struct {
	options *Options
	flags   *flag.FlagSet
}

func New() *SlugViewCmd {
	cmd := SlugViewCmd{}
	cmd.flags = flag.NewFlagSet(CmdName, flag.ContinueOnError)
	cmd.options = &Options{}

	cmd.options.SetDefaults()
	cmd.options.SetupFlags(cmd.flags) 
	return &cmd
}

func (cmd *SlugViewCmd) Name() string {
	return CmdName
}

func (cmd *SlugViewCmd) Description() string {
	return "Opens up a slug for viewing."
}

func (cmd *SlugViewCmd) PrintUsage() {
	fmt.Println("Usage:")
	fmt.Println("moov " + CmdName + " <slug>")
	fmt.Println()
	fmt.Println("Flag Options:")
	cmd.flags.PrintDefaults()
}

func (cmd *SlugViewCmd) Execute(args []string) (err error) {
	args, err = commands.ParseFlags(cmd.flags, args)
	if err != nil {
		if err == flag.ErrHelp {
			return nil
		}
		return err
	}
	if len(args) > 0 {
		cmd.options.SlugLoc = args[0]
	}
	err = cmd.options.Reconcile()
	if err != nil {
		return commands.MakeHelpError(err)
	}

	var data []byte

	data, err = ioutil.ReadFile(cmd.options.SlugLoc)
	if err != nil {
		return errors.New("Problem opening the slug for reading.")
	}

	duration := time.Duration(0)
	slug := &tp.Slug{}
	for i := 0; i < 1000; i++ {
		startTime := time.Now()
		err = pb.Unmarshal(data, slug)
		duration += time.Now().Sub(startTime)
		if err != nil {
			return err
		}
	}

	if !cmd.options.TimeOnly {
		printSlug(slug, 0)
	}
	fmt.Printf("Duration of unmarshaling: %v\n", duration/time.Duration(100))

	return nil
}

func printIndent(str string, indLvl int, rest ...interface{}) {
	fmt.Printf(strings.Repeat("  ", indLvl)+str+"\n", rest...)
}

func printSlug(s *tp.Slug, indLvl int) {
	printIndent("Slug:", indLvl)
	indLvl += 1
	printIndent("Name -> %v", indLvl, s.GetName())
	printIndent("Version -> %v", indLvl, s.GetVersion())
	printIndent("Rewriter Rules:", indLvl)
	for ind, item := range s.GetRrules() {
		printIndent("Rrule[%d] -> %v", indLvl+1, ind, item)
	}
	printIndent("SSL Whitelist:", indLvl)
	for ind, item := range s.GetSslWhitelist() {
		printIndent("whitelist[%d] -> %v", indLvl+1, ind, item)
	}
	printIndent("Credentials -> %v", indLvl, s.GetCredentials())
	printIndent("Transforms:",indLvl)
	for ind, item := range s.GetTransformers() {
		printIndent("transform[%d]:", indLvl+1, ind)
		printTransform(item, indLvl+2)
	}
}

func printTransform(t *tp.Transform, indLvl int) {
	printIndent("Script Objects:", indLvl)
	for ind, item := range t.GetObjects() {
		printIndent("Script Obj[%d]:", indLvl+1, ind)
		printScriptObject(item, indLvl+2)
	}
	printIndent("Package:", indLvl)
	printPackage(t.GetPkg(), indLvl+1)
}

func printPackage(p *tp.Package, indLvl int) {
	printIndent("Name -> %v", indLvl, p.GetName())
	printIndent("Path -> %v", indLvl, p.GetPath())
	printIndent("Dependencies:", indLvl)
	for ind, item := range p.GetDependencies() {
		printIndent("Dependecny[%v] -> %v", indLvl+1, ind, item)
	}
	printIndent("Types:", indLvl)
	for ind, item := range p.GetTypes() {
		printIndent("Type[%v] -> %v", indLvl+1, ind, item)
	}
	printIndent("Functions:", indLvl)
	for ind, item := range p.GetFunctions() {
		printIndent("Function[%v]:", indLvl+1, ind)
		printFunction(item, indLvl+2)
	}
}

func printFunction(f *tp.Function, indLvl int) {
	printIndent("Name -> %v", indLvl, f.GetName())
	printIndent("Description -> %v", indLvl, f.GetDescription())
	printIndent("Filename -> %v", indLvl, f.GetFilename())
	printIndent("Line Number -> %v", indLvl, f.GetLineNumber())
	printIndent("Namespace -> %v", indLvl, f.GetNamespace())
	printIndent("Scope Type Id -> %v", indLvl, f.GetScopeTypeId())
	printIndent("Scope Type -> %v", indLvl, f.GetScopeType())
	printIndent("Return Type Id -> %v", indLvl, f.GetReturnTypeId())
	printIndent("Return Type -> %v", indLvl, f.GetReturnType())
	printIndent("Opens Type Id -> %v", indLvl, f.GetOpensTypeId())
	printIndent("Opens Type -> %v", indLvl, f.GetOpensType())
	printIndent("BuiltIn -> %v", indLvl, f.GetBuiltIn())
	printIndent("Arguments:", indLvl)
	for ind, item := range f.GetArgs() {
		printIndent("Argument[%d] -> %v", indLvl, ind, item)
	}
	printIndent("Instruction:", indLvl)
	printInstruction(f.GetInstruction(), indLvl+1)
}

func printScriptObject(so *tp.ScriptObject, indLvl int) {
	printIndent("Name -> %v", indLvl, so.GetName())
	printIndent("Scope Type -> %v", indLvl, so.GetScopeTypeId())
	printIndent("Linked -> %v", indLvl, so.GetLinked())
	printIndent("Module -> %v", indLvl, so.GetModule())
	printIndent("Root:", indLvl)
	printInstruction(so.GetRoot(), indLvl+1)
}

func printInstruction(i *tp.Instruction, indLvl int) {
	printIndent("Type -> %v", indLvl, i.GetType())
	printIndent("Value -> %v", indLvl, i.GetValue())
	printIndent("ObjectId -> %v", indLvl, i.GetObjectId())
	printIndent("Function Id -> %v", indLvl, i.GetFunctionId())
	printIndent("Line Number -> %v", indLvl, i.GetLineNumber())
	printIndent("Yield Type Id -> %v", indLvl, i.GetYieldTypeId())
	printIndent("Is Valid -> %v", indLvl, i.GetIsValid())
	printIndent("Namespace -> %v", indLvl, i.GetNamespace())
	printIndent("Type Qualifier -> %v", indLvl, i.GetTypeQualifier())
	//printIndent("Is User Called -> %v", indLvl, i.GetIsUserCalled()) //doesn't have an accessor for some reason
	printIndent("Children:", indLvl)
	for ind, item := range i.GetChildren() {
		printIndent("Child[%d]:", indLvl+1, ind)
		printInstruction(item, indLvl+2)
	}
	printIndent("Arguments:", indLvl)
	for ind, item := range i.GetArguments() {
		printIndent("Argument[%d]:", indLvl+1, ind)
		printInstruction(item, indLvl+2)
	}
}






















