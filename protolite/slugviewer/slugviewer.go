package slugviewer

import (
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"strings"
	"time"
)

import (
	pb "code.google.com/p/goprotobuf/proto"
	"manhattan/commands"
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
	if len(args) > 1 {
		cmd.options.SlugLoc2 = args[1]
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

	slug1 := &tp.Slug{}
	startTime := time.Now()
	err = pb.Unmarshal(data, slug1)
	duration := time.Now().Sub(startTime)
	if err != nil {
		return err
	}

	if cmd.options.Compare {
		data, err = ioutil.ReadFile(cmd.options.SlugLoc2)
		if err != nil {
			return errors.New("Problem opening the slug for reading.")
		}

		slug2 := &tp.Slug{}
		startTime2 := time.Now()
		err = pb.Unmarshal(data, slug2)
		duration2 := time.Now().Sub(startTime2)
		if err != nil {
			return err
		}

		compSlugs(slug1, slug2, 0)

		fmt.Printf("Duration of unmarshaling slug 1: %v\n", duration)
		fmt.Printf("Duration of unmarshaling slug 2: %v\n", duration2)

	} else {
		if !cmd.options.TimeOnly {
			printSlug(slug1, 0)
		}
		fmt.Printf("Duration of unmarshaling: %v\n", duration)

	}

	return nil
}

func printIndent(str string, indLvl int, rest ...interface{}) {
	fmt.Printf(strings.Repeat("  ", indLvl)+str+"\n", rest...)
}

func compSlugs(s1 *tp.Slug, s2 *tp.Slug, indLvl int) {
	printIndent("Slug 1: %v, Slug 2: %v", indLvl, s1.GetName(), s2.GetName())
	indLvl += 1
	printIndent("Differences:", indLvl)
	indLvl += 1

	if s1.GetName() != s2.GetName() {
		printIndent("Name ->", indLvl)
		printIndent("slug 1: %v", indLvl, s1.GetName())
		printIndent("slug 2: %v", indLvl, s2.GetName())
	}
	if s1.GetVersion() != s2.GetVersion() {
		printIndent("Version ->", indLvl)
		printIndent("slug 1: %v", indLvl, s1.GetVersion())
		printIndent("slug 2: %v", indLvl, s2.GetVersion())
	}
	if s1.GetCredentials() != s2.GetCredentials() {
		printIndent("Credentials ->", indLvl)
		printIndent("slug 1: %v", indLvl, s1.GetCredentials())
		printIndent("slug 2: %v", indLvl, s2.GetCredentials())
	}
	rr1 := s1.GetRrules()
	rr2 := s2.GetRrules()
	for ind, item := range rr1 {
		if item.String() != rr2[ind].String() {
			printIndent("Rewriter Rule ->", indLvl)
			printIndent("slug 1: Rrule[%d] -> %v", indLvl, ind, item)
			printIndent("slug 2: Rrule[%d] -> %v", indLvl, ind, rr2[ind])
		}
	}
	ssl1 := s1.GetSslWhitelist()
	ssl2 := s2.GetSslWhitelist()
	for ind, item := range ssl1 {
		if item != ssl2[ind] {
			printIndent("SSL Whitelist ->", indLvl)
			printIndent("slug 1: whitelist[%d] -> %v", indLvl, ind, item)
			printIndent("slug 2: whitelist[%d] -> %v", indLvl, ind, ssl2[ind])
		}
	}
	t1 := s1.GetTransformers()
	t2 := s2.GetTransformers()
	indLvl += 1
	for ind, item := range t1 {
		// Package
		pkg1 := item.GetPkg()
		pkg2 := t2[ind].GetPkg()
		if pkg1.GetName() != pkg2.GetName() {
			printIndent("Transform[%d] Package Name ->", indLvl, ind)
			printIndent("slug 1: transform package name -> %v", indLvl, pkg1.GetName())
			printIndent("slug 2: transform package name -> %v", indLvl, pkg2.GetName())
		}
		if pkg1.GetPath() != pkg2.GetPath() {
			printIndent("Transform[%d] Package Path ->", indLvl, ind)
			printIndent("slug 1: transform package path -> %v", indLvl, pkg1.GetPath())
			printIndent("slug 2: transform package path -> %v", indLvl, pkg2.GetPath())
		}
		dep2 := pkg2.GetDependencies()
		for di, do := range pkg1.GetDependencies() {
			if do != dep2[di] {
				printIndent("Transform[%d] Package Dependency[%d] ->", indLvl, ind, di)
				printIndent("slug 1: transform package dep -> %v", indLvl, do)
				printIndent("slug 2: transform package dep -> %v", indLvl, dep2[di])
			}
		}
		types2 := pkg2.GetTypes()
		for di, do := range pkg1.GetTypes() {
			if do.String() != types2[di].String() {
				printIndent("Transform[%d] Package Type[%d] ->", indLvl, ind, di)
				printIndent("slug 1: transform package type -> %v", indLvl, do)
				printIndent("slug 2: transform package type -> %v", indLvl, types2[di])
			}
		}
		f2 := pkg2.GetFunctions()
		for di, do := range pkg1.GetFunctions() {
			if do.GetName() != f2[di].GetName() {
				printIndent("Transform[%d] Package Function[%d] Name ->", indLvl, ind, di)
				printIndent("slug 1: transform package func name -> %v", indLvl, do)
				printIndent("slug 2: transform package func name -> %v", indLvl, f2[di].GetName())
			}
			if do.GetDescription() != f2[di].GetDescription() {
				printIndent("Transform[%d] Package Function[%d] Desc ->", indLvl, ind, di)
				printIndent("slug 1: transform package func desc -> %v", indLvl, do)
				printIndent("slug 2: transform package func desc -> %v", indLvl, f2[di].GetDescription())
			}
			if do.GetFilename() != f2[di].GetFilename() {
				printIndent("Transform[%d] Package Function[%d] Filename ->", indLvl, ind, di)
				printIndent("slug 1: transform package func filename -> %v", indLvl, do)
				printIndent("slug 2: transform package func filename -> %v", indLvl, f2[di].GetFilename())
			}
			if do.GetLineNumber() != f2[di].GetLineNumber() {
				printIndent("Transform[%d] Package Function[%d] LineNum ->", indLvl, ind, di)
				printIndent("slug 1: transform package func linenum -> %v", indLvl, do)
				printIndent("slug 2: transform package func linenum -> %v", indLvl, f2[di].GetLineNumber())
			}
			if do.GetNamespace() != f2[di].GetNamespace() {
				printIndent("Transform[%d] Package Function[%d] namespace ->", indLvl, ind, di)
				printIndent("slug 1: transform package func namespace -> %v", indLvl, do)
				printIndent("slug 2: transform package func namespace -> %v", indLvl, f2[di].GetNamespace())
			}
			if do.GetScopeTypeId() != f2[di].GetScopeTypeId() {
				printIndent("Transform[%d] Package Function[%d] scope type id ->", indLvl, ind, di)
				printIndent("slug 1: transform package func scope type id -> %v", indLvl, do)
				printIndent("slug 2: transform package func scope type id -> %v", indLvl, f2[di].GetScopeTypeId())
			}
			if do.GetScopeType() != f2[di].GetScopeType() {
				printIndent("Transform[%d] Package Function[%d] scope type ->", indLvl, ind, di)
				printIndent("slug 1: transform package func scope type -> %v", indLvl, do)
				printIndent("slug 2: transform package func scope type -> %v", indLvl, f2[di].GetScopeType())
			}
			if do.GetReturnTypeId() != f2[di].GetReturnTypeId() {
				printIndent("Transform[%d] Package Function[%d] return type id ->", indLvl, ind, di)
				printIndent("slug 1: transform package func return type id -> %v", indLvl, do)
				printIndent("slug 2: transform package func return type id -> %v", indLvl, f2[di].GetReturnTypeId())
			}
			if do.GetReturnType() != f2[di].GetReturnType() {
				printIndent("Transform[%d] Package Function[%d] return type ->", indLvl, ind, di)
				printIndent("slug 1: transform package func return type -> %v", indLvl, do)
				printIndent("slug 2: transform package func return type -> %v", indLvl, f2[di].GetReturnType())
			}
			if do.GetOpensTypeId() != f2[di].GetOpensTypeId() {
				printIndent("Transform[%d] Package Function[%d] opens type id ->", indLvl, ind, di)
				printIndent("slug 1: transform package func opens type id -> %v", indLvl, do)
				printIndent("slug 2: transform package func opens type id -> %v", indLvl, f2[di].GetOpensTypeId())
			}
			if do.GetOpensType() != f2[di].GetOpensType() {
				printIndent("Transform[%d] Package Function[%d] opens type ->", indLvl, ind, di)
				printIndent("slug 1: transform package func opens type -> %v", indLvl, do)
				printIndent("slug 2: transform package func opens type -> %v", indLvl, f2[di].GetOpensType())
			}
			if do.GetBuiltIn() != f2[di].GetBuiltIn() {
				printIndent("Transform[%d] Package Function[%d] built in ->", indLvl, ind, di)
				printIndent("slug 1: transform package func built in -> %v", indLvl, do)
				printIndent("slug 2: transform package func built in -> %v", indLvl, f2[di].GetBuiltIn())
			}
			args2 := f2[di].GetArgs()
			for ai, ao := range do.GetArgs() {
				if ao.String() != args2[ai].String() {
					printIndent("Transform[%d] Package Function[%d] argument[%d] ->", indLvl, ind, di, ai)
					printIndent("slug 1: transform package func arg -> %v", indLvl, ao)
					printIndent("slug 2: transform package func arg -> %v", indLvl, args2[ai])
				}
			}
			ins1 := do.GetInstruction()
			ins2 := f2[di].GetInstruction()
			compInstruction(ins1, ins2, indLvl, ind)

		}

		//layers
		if item.GetLayers() != t2[ind].GetLayers() {
			printIndent("Transform[%d] Layers ->", indLvl, ind)
			printIndent("slug 1: transform layer -> %v", indLvl, item.GetLayers())
			printIndent("slug 2: transform layer -> %v", indLvl, t2[ind].GetLayers())
		}
		obj2 := t2[ind].GetObjects()
		for i, x := range item.GetObjects() {
			if x.GetName() != obj2[i].GetName() {
				printIndent("Transform[%d] Script Objects Name ->", indLvl, ind)
				printIndent("slug 1: transform object name -> %v", indLvl, x.GetName())
				printIndent("slug 2: transform object name -> %v", indLvl, obj2[i].GetName())
			}
			if x.GetScopeTypeId() != obj2[i].GetScopeTypeId() {
				printIndent("Transform[%d] Script Objects scope type ->", indLvl, ind)
				printIndent("slug 1: transform object scope type -> %v", indLvl, x.GetScopeTypeId())
				printIndent("slug 2: transform object scope type -> %v", indLvl, obj2[i].GetScopeTypeId())
			}
			if x.GetLinked() != obj2[i].GetLinked() {
				printIndent("Transform[%d] Script Objects linked ->", indLvl, ind)
				printIndent("slug 1: transform object linked -> %v", indLvl, x.GetLinked())
				printIndent("slug 2: transform object linked -> %v", indLvl, obj2[i].GetLinked())
			}
			if x.GetModule() != obj2[i].GetModule() {
				printIndent("Transform[%d] Script Objects module ->", indLvl, ind)
				printIndent("slug 1: transform object module -> %v", indLvl, x.GetModule())
				printIndent("slug 2: transform object module -> %v", indLvl, obj2[i].GetModule())
			}
			root1 := x.GetRoot()
			root2 := obj2[i].GetRoot()
			compInstruction(root1, root2, indLvl, ind)

		}
	}
}

func compInstruction(root1 *tp.Instruction, root2 *tp.Instruction, indLvl, ind int) {
	if root1.GetType() != root2.GetType() {
		printIndent("Transform[%d] Script Objects root type ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetType())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetType())
	}
	if root1.GetValue() != root2.GetValue() {
		printIndent("Transform[%d] Script Objects root value ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetValue())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetValue())
	}
	if root1.GetObjectId() != root2.GetObjectId() {
		printIndent("Transform[%d] Script Objects root object id ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetObjectId())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetObjectId())
	}
	if root1.GetFunctionId() != root2.GetFunctionId() {
		printIndent("Transform[%d] Script Objects root function id ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetFunctionId())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetFunctionId())
	}
	if root1.GetLineNumber() != root2.GetLineNumber() {
		printIndent("Transform[%d] Script Objects root line number ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetLineNumber())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetLineNumber())
	}
	if root1.GetYieldTypeId() != root2.GetYieldTypeId() {
		printIndent("Transform[%d] Script Objects root yield type id ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetYieldTypeId())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetYieldTypeId())
	}
	if root1.GetIsValid() != root2.GetIsValid() {
		printIndent("Transform[%d] Script Objects root yield is valid ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetIsValid())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetIsValid())
	}
	if root1.GetNamespace() != root2.GetNamespace() {
		printIndent("Transform[%d] Script Objects root yield is valid ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetNamespace())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetNamespace())
	}
	if root1.GetTypeQualifier() != root2.GetTypeQualifier() {
		printIndent("Transform[%d] Script Objects root yield type qualifier ->", indLvl, ind)
		printIndent("slug 1: transform object root -> %v", indLvl, root1.GetTypeQualifier())
		printIndent("slug 2: transform object root -> %v", indLvl, root2.GetTypeQualifier())
	}
	children2 := root2.GetChildren()
	for i, item := range root1.GetChildren() {
		compInstruction(item, children2[i], indLvl+1, ind)
	}
	args2 := root2.GetArguments()
	for i, item := range root1.GetArguments() {
		compInstruction(item, args2[i], indLvl+1, ind)
	}
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
	printIndent("Transforms:", indLvl)
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
