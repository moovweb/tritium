package spec

func All(directory string) { 
	Exec(directory)
}

func Exec(dir string) bool {
	//eng.Run(transform, input, vars)
	println("TESTING")
	LoadSpec(dir)
	return true
}