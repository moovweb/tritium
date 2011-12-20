package main

import "os"
import "tritium/packager"
import "tritium/linker"

func main() {
	command := os.Args[1]
	if command == "package" {
		pkg := packager.BuildDefaultPackage()
		println(string(pkg.Marshal()))
	} else if command == "link" {
		println("Linking files found in the directory:", os.Args[2])
		linker.RunLinker(os.Args[2])
	} else {
		println("No such command ", command)
		println("General purpose Tritium command line interface. Commands are: package")
	}
}