package main

import "os"
import "tritium/packager"
//import . "tritium/linker"
import s "tritium/spec"

func show_usage() {
	println("General purpose Tritium command line interface. Commands are: package, link, test")
}

func main() {
	if len(os.Args) > 1 {
		command := os.Args[1]

		if command == "package" {

			if (len(os.Args) == 3) {
				// Build the package specified by the path
				path := os.Args[2]
				
				pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions() )
				pkg.Load(path)
				//pkg.SerializedOutput()
				//println(pkg.DebugInfo())

			} else {

				pkg := packager.BuildDefaultPackage()
				pkg.SerializedOutput()
			}
		} else if command == "pkginfo" {
			name := os.Args[2]
			pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions() )
			pkg.Load(name)
			println(pkg.DebugInfo())
		} else if command == "link" {
			println("Linking files found in the directory:", os.Args[2])
			//LinkerToBytes(os.Args[2])
		} else if command == "test" {
			println("Running tests found in the directory:", os.Args[2])
			s.All(os.Args[2])
		} else {
			println("No such command", command)
			show_usage()
		}
	} else {
		show_usage()
	}
}
