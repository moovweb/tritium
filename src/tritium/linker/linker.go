package linker

import(
	tp "tritium/proto"
	packager "tritium/packager"
	. "io/ioutil"
	. "path"
	"log"
)

func RunLinker(directory string) {
	// This is run against a directory with a bunch of .tso files (generated in Ruby for
	// now) ./bin/ts2o AND possibly a package file. However, we can just ignore the "custom"
	// package file for now, and load up the object that comes in from the Packager.
	//
	exec := NewExecutable(packager.BuildDefaultPackage())
	objs := LoadScriptObjects(directory)
	//exec.InsertObjects(objs)
	// for each ScriptObject file in the directory
	  // add script to t
	// t.ProcessImports() (change string in Instruction objects to import_id)
	// t.ProcessInstructions()
		// Figure out function signature (name + arg types)
			// have to start at the bottom of the tree (args first) and check types.
		// Is this a real function?
			// aka, text(regexp()) ... have to see that regexp returns Regexp object,
			// which, then, when we go to process text() we notice we don't have a text(Regexp) 
			// function, so we need to throw a reasonable error
			// Hrrrm.... need line numbers, huh?
		// Set the function_id if it is real, error otherwise
	// optionally, remove functions from pkg that aren't used (dead code removal)
	// Now, return the Transformer object.
	println("THIS IS WHERE LINKING HAPPENS!!!! ZOMG!", exec, objs)
}

func LoadScriptObjects(dir string) ([]*tp.ScriptObject) {
	objs := make([]*tp.ScriptObject, 0)
	files, err := ReadDir(dir)
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range(files) {
		fullPath := Join(dir, file.Name)
		if Ext(fullPath) == ".to" {
			println("Found object file! ", fullPath)
		}
	}
	if len(objs) == 0 {
		log.Fatal("No files found in ", dir)
	}
	
	return objs
}