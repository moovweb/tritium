package main;

func main() {
	pkg := NewPackage()
	pkg.Load("packages/base")
	pkg.Load("packages/node")
	pkg.Load("packages/libxml")
}