package main

import "os"
import "fmt"
import "tritium/packager"

//import . "tritium/linker"
import s "tritium/spec"
import "tritium/doc"
import "tritium/test"

func show_usage() {
	fmt.Println("General purpose Tritium command line interface. Commands are: package, link, test")
	fmt.Println("\tpackage:\n\t\ttritium package --name <pkg_name>\n\t\tOr\n\t\tpackage --output-path <path>")
	fmt.Println("\te.g.\n\t\ttritium package --output-path ~/.manhattan/packages")
}

func main() {
	if len(os.Args) > 1 {
		command := os.Args[1]

		if command == "package" {

			if len(os.Args) > 3 {
				if os.Args[2] == "--name" {
					// Build the package specified by the path
					path := os.Args[3]
					pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
					pkg.Load(path)
					//pkg.SerializedOutput()
					//fmt.Println(pkg.DebugInfo())

				} else if os.Args[2] == "--output-path" {
					_, path := packager.OutputDefaultPackage(os.Args[3])
					fmt.Println("Output default package to:", path)
				}

			} else {
				pkg := packager.BuildDefaultPackage()
				pkg.SerializedOutput()
			}

		} else if command == "pkginfo" {
			name := os.Args[2]
			pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
			pkg.Load(name)
			fmt.Println(pkg.DebugInfo())
		} else if command == "doc" {
			name := os.Args[2]
			pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
			pkg.Load(name)
			fmt.Println(doc.Process(pkg.Package))
		} else if command == "apollo-doc" {
			if len(os.Args) < 3 {
				fmt.Println("Usage: tritium apollo-doc <output-file>")
				os.Exit(1)
			}
			outputFile := os.Args[2]

			doc.Generate(outputFile)
		} else if command == "link" {
			fmt.Println("Linking files found in the directory:", os.Args[2])
			//LinkerToBytes(os.Args[2])
		} else if command == "test" {
			fmt.Println("Running tests found in the directory:", os.Args[2])
			if len(os.Args) == 3 {
				test.TestCustomSuite(os.Args[2])
			} else {
				fmt.Println("Usage:\n    tritium test <package_name> <optional_mixer_path>")
			}
		} else if command == "benchmark" {
			fmt.Println("Bencmarking tests found in the directory:", os.Args[2])
			if len(os.Args) == 3 {
				test.BenchmarkCustomSuite(os.Args[2])
			} else {
				fmt.Println("Usage:\n    tritium benchmark <path_to_tests_from_root>")
			}
		} else if command == "debug" {
			fmt.Println("Running tests found in the directory:", os.Args[2])
			if len(os.Args) == 3 {
				s.All(command, os.Args[2])
			} else if len(os.Args) == 4 {
				s.All(command, os.Args[2], os.Args[3])
			} else {
				fmt.Println("Usage:\n    tritium test <package_name> <optional_mixer_path>")
			}

		} else if command == "old_test" {
			fmt.Println("Running tests found in the directory:", os.Args[2])
			if len(os.Args) == 3 {
				s.All(command, os.Args[2])
			} else if len(os.Args) == 4 {
				s.All(command, os.Args[2], os.Args[3])
			} else {
				fmt.Println("Usage:\n    tritium test <package_name> <optional_mixer_path>")
			}

		} else {
			fmt.Println("No such command", command)
			show_usage()
		}
	} else {
		show_usage()
	}
}
