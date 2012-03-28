package main

import "os"
import "tritium/src/tritium/packager"
import "tritium/src/tritium/doc"

func show_usage() {
	println("General purpose Tritium command line interface. Commands are: package, link, test")
	println("\tpackage:\n\t\ttritium package --name <pkg_name>\n\t\tOr\n\t\tpackage --output-path <path>")
}

func main() {
	if len(os.Args) > 1 {
		command := os.Args[1]

		if command == "package" {

			if len(os.Args) > 3 {
				if os.Args[2] == "--name" {
					// Build the package specified by the path
					path := os.Args[2]

					pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
					pkg.Load(path)
					//pkg.SerializedOutput()
					//println(pkg.DebugInfo())

				} else if os.Args[2] == "--output-path" {
					_, path := packager.OutputDefaultPackage(os.Args[3])
					println("Output default package to:", path)
				}

			} else {
				pkg := packager.BuildDefaultPackage()
				pkg.SerializedOutput()
			}

		} else if command == "pkginfo" {
			name := os.Args[2]
			pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
			pkg.Load(name)
			println(pkg.DebugInfo())
		} else if command == "doc" {
			name := os.Args[2]
			pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
			pkg.Load(name)
			println(doc.Process(pkg.Package))
		} else if command == "apollo-doc" {
			if len(os.Args) < 3 {
				println("Usage: tritium apollo-doc <output-file>")
				os.Exit(1)
			}
			outputFile := os.Args[2]

			doc.Generate(outputFile)
		} else if command == "link" {
			println("Linking files found in the directory:", os.Args[2])
			//LinkerToBytes(os.Args[2])
		} else {
			println("No such command", command)
			show_usage()
		}
	} else {
		show_usage()
	}
}
