package main

import "os"
import "tritium/packager"
//import . "tritium/linker"
import "tritium/spec"
import proto "goprotobuf.googlecode.com/hg/proto"
import "log"

func show_usage() {
	println("General purpose Tritium command line interface. Commands are: package, link, test")
}

func main() {
	if len(os.Args) > 1 {
		command := os.Args[1]
		if command == "package" {
			pkg := packager.BuildDefaultPackage()
			bytes, err := proto.Marshal(pkg)
			if err != nil {
				log.Fatal(err)
			}
			println(string(bytes))
		} else if command == "link" {
			println("Linking files found in the directory:", os.Args[2])
			//LinkerToBytes(os.Args[2])
		} else if command == "test" {
			println("Running tests found in the directory:", os.Args[2])
			spec.RunTests(os.Args[2])
		} else {
			println("No such command", command)
			show_usage()
		}
	} else {
		show_usage()
	}
}
