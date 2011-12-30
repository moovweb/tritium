package linker

import(
	tp "tritium/proto"
	packager "tritium/packager"
	. "io/ioutil"
	. "path"
	"log"
	proto "goprotobuf.googlecode.com/hg/proto"
)

func RunLinker(directory string) {
	// This is run against a directory with a bunch of .tso files (generated in Ruby for
	// now) ./bin/ts2o AND possibly a package file. However, we can just ignore the "custom"
	// package file for now, and load up the object that comes in from the Packager.
	//
	exec := NewExecutable(packager.BuildDefaultPackage())
	objs := LoadScriptObjects(directory)
	exec.ProcessObjects(objs)
	
	// Now, return the Execution object.
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
			obj := &tp.ScriptObject{}
			toFile, _ := ReadFile(fullPath);
			err = proto.Unmarshal(toFile, obj)
			if err != nil {
				log.Fatal(err)
			}
			objs = append(objs, obj)
		}
	}
	if len(objs) == 0 {
		log.Fatal("No files found in ", dir)
	} else {
		println("Read in", len(objs), "objects")
	}
	
	return objs
}