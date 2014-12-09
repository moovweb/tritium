package proto

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

import (
	"tritium/dependencies/butler/crypto"
	"tritium/dependencies/butler/fileutil"
	"tritium/dependencies/butler/null"
	pb "code.google.com/p/goprotobuf/proto"
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

	name := null.GetString(m.Name)
	version := null.GetString(m.Version)
	outputPath = filepath.Join(path, name+"-"+version+".mxr")

	bytes, err := pb.Marshal(m)
	if err != nil {
		return
	}

	bytes = crypto.Encrypt(bytes)

	err = os.MkdirAll(path, fileutil.DIR_PERMS)
	if err != nil {
		return
	}

	err = ioutil.WriteFile(outputPath, bytes, fileutil.FILE_PERMS)
	if err != nil {
		return
	}

	return
}

func (m *Mixer) Inspect(printFunctions bool) {
	println("\tRewriters:")
	for _, rewriter := range m.Rewriters {
		fmt.Printf("\t\t -- %v\n", null.GetString(rewriter.Path))
	}

	println("\tRoot Package:")
	fmt.Printf(m.packageSummary(printFunctions))
}

func (m *Mixer) Unpack(path string) {
	fullPath := filepath.Join(path, null.GetString(m.Name)+"-"+null.GetString(m.Version))
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
		summary += fmt.Sprintf("\t\t -- Name: %v\n", null.GetString(m.Package.Name))
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

func (mxr *Mixer) Clone() *Mixer {
	bytes, err := pb.Marshal(mxr)
	if err != nil {
		panic("internal error: unable to copy mixer " + mxr.GetName())
	}
	copy := new(Mixer)
	pb.Unmarshal(bytes, copy)
	return copy
}
