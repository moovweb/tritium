package proto

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

import (
	pb "code.google.com/p/goprotobuf/proto"
	"tritium/crypto"
)

func NewMixer(path string) *Mixer {
	version, err := ioutil.ReadFile(filepath.Join(path, "VERSION"))

	if err != nil {
		panic("Couldn't find a version for mixer:" + path + ":" + err.Error())
	}

	versionStr := strings.TrimSpace(string(version))

	_, name := filepath.Split(path)

	return &Mixer{
		Name:      pb.String(name),
		Version:   pb.String(versionStr),
		Rewriters: make([]*File, 0),
		Package:   nil,
	}
}

func (m *Mixer) Write(path string) (outputPath string, err error) {

	name := pb.GetString(m.Name)
	version := pb.GetString(m.Version)
	outputPath = filepath.Join(path, name+"-"+version+".mxr")

	bytes, err := pb.Marshal(m)
	if err != nil {
		return
	}

	bytes = crypto.Encrypt(bytes)

	err = ioutil.WriteFile(outputPath, bytes, 0644)
	if err != nil {
		return
	}

	return
}

func (m *Mixer) Inspect(printFunctions bool) {
	println("\tRewriters:")
	for _, rewriter := range m.Rewriters {
		fmt.Printf("\t\t -- %v\n", pb.GetString(rewriter.Path))
	}

	println("\tRoot Package:")
	fmt.Printf(m.packageSummary(printFunctions))
}

func (m *Mixer) Unpack(path string) {
	fullPath := filepath.Join(path, pb.GetString(m.Name)+"-"+pb.GetString(m.Version))
	err := os.MkdirAll(fullPath, 0755)
	if err != nil {
		panic(err.Error())
	}

	err = m.unpackFiles(filepath.Join(fullPath, "rewriters"), m.Rewriters)
	if err != nil {
		panic(err)
	}

	summary := m.packageSummary(true)
	packageFile := filepath.Join(fullPath, "package-summary.txt")

	err = ioutil.WriteFile(packageFile, []byte(summary), 0644)

	if err != nil {
		fmt.Printf("Warning : Couldn't write package summary")
	}

	fmt.Printf("* %v\n", packageFile)
}

func (m *Mixer) unpackFiles(path string, files []*File) (err error) {
	fl := &FileList{
		RootDirectory: path,
		Files:         files,
	}

	err = fl.Unpack(true)

	return
}

func (m *Mixer) packageSummary(printFunctions bool) string {
	summary := ""
	if m.Package != nil {
		summary += fmt.Sprintf("\t\t -- Name: %v\n", pb.GetString(m.Package.Name))
		summary += fmt.Sprintf("\t\t -- Types: %v\n", m.Package.Types)
		summary += fmt.Sprintf("\t\t -- Dependencies:  %v\n", m.Package.Dependencies)
		if printFunctions {
			summary += fmt.Sprintf("\t\t -- Functions (%v):\n", len(m.Package.Functions))
			for _, function := range m.Package.Functions {
				summary += fmt.Sprintf("\t\t\t %v\n", function.Stub(m.Package))
			}
		}
	}
	return summary
}
