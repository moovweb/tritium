package proto

import(
	pb "goprotobuf.googlecode.com/hg/proto"
	"io/ioutil"
	"path/filepath"
	"fmt"
	"os"
	"strings"
)


func NewMixer(path string) (*Mixer) {
	version, err := ioutil.ReadFile(path + "/VERSION")

	if err != nil {
		panic("Couldn't find a version for mixer:" + path + ":" + err.String() )
	}

	_, name := filepath.Split(path)

	return &Mixer{
	Name: pb.String(name),
	Version: pb.String( string(version) ),
	Assets: make([]*File,0),
	Features: make([]*Feature,0),
	Recipes: make([]*Recipe,0),
	Rewriters: make([]*File,0),
	Package: nil,
	}


}

func ResolveMixer(name string) (*Mixer) {
	path := os.ShellExpand("$GOHATTAN_DATA/mixers/")

	if !strings.Contains(name, ".mxr") {
		name = name + ".mxr"
	}

	fullPath := filepath.Join(path, name)
	return OpenMixer(fullPath)
}

func (m *Mixer) Write(path string) (outputPath string) {

	name := pb.GetString(m.Name)
	version := pb.GetString(m.Version)
	outputFilename := filepath.Join(path, name + "-" + version + ".mxr")

	bytes, err := pb.Marshal(m)
	
	if err != nil {
		panic("Could not marshal mixer (" + name + "), " + err.String())
	}

	bytes = Encrypt(bytes)

	ioutil.WriteFile(outputFilename, bytes, uint32(0666) )

	return outputFilename
}

func OpenMixer(location string) (m *Mixer) {

	data, err := ioutil.ReadFile(location)

	if err != nil {
		panic("Could not find mixer file:" + location)
	}

	data = Decrypt(data)

	thisMixer := &Mixer{}
	err = pb.Unmarshal(data, thisMixer)

	if err != nil {
		panic("Error unmarshalling mixer at:" + location)
	}

	return thisMixer
}

func (m *Mixer) Inspect(printFunctions bool) {
	fmt.Printf(" \tFeatures: \n\t\t%v\n", m.Features)

	println("\tAssets:")
	for _, asset := range(m.Assets) {
		fmt.Printf("\t\t -- %v\n", pb.GetString(asset.Path) )
	}

	println("\tRecipes:")
	for _, recipe := range(m.Recipes) {
		fmt.Printf("\t\t -- Recipe (%v) contains (%v) files.\n", pb.GetString(recipe.Name), len(recipe.Files) )
	}

	println("\tRewriters:")
	for _, rewriter := range(m.Rewriters) {
		fmt.Printf("\t\t -- %v\n", pb.GetString(rewriter.Path) )
	}

	println("\tRoot Package:")
	fmt.Printf(m.packageSummary(printFunctions))
}

func (m *Mixer) Unpack(path string) {
	err := os.MkdirAll(path, uint32(0755))
	if err != nil {
		panic(err.String())
	}

	err = m.unpackFiles(filepath.Join(path, "assets"), m.Assets)
	if err != nil {
		panic(err)
	}

	for _, recipe := range(m.Recipes) {
		err = m.unpackFiles(filepath.Join(path, "recipes", pb.GetString(recipe.Name)), recipe.Files)
		if err != nil {
			panic(err)
		}
	}

//	m.Recipes.Unpack(path)
//	m.Rewriters.Unpack(path)

	summary := m.packageSummary(true)	

	dir, _ := filepath.Split(path)
	err = ioutil.WriteFile(filepath.Join(dir, "package-summary.txt"), []byte(summary), uint32(0644))

	if err != nil {
		fmt.Printf("Warning : Couldn't write package summary")
	}
}

func (m *Mixer) unpackFiles(path string, files []*File) (err os.Error) {
	fl := &FileList{
	RootDirectory: path,
	Files: files,
	}

	err = fl.Unpack(true)

	return
}

func (m *Mixer) packageSummary(printFunctions bool) string {
	summary := ""
	if m.Package != nil {
		summary += fmt.Sprintf("\t\t -- Name: %v\n", pb.GetString(m.Package.Name) )
		summary += fmt.Sprintf("\t\t -- Types: %v\n", m.Package.Types )
		summary += fmt.Sprintf("\t\t -- Dependencies:  %v\n", m.Package.Dependencies )		
		if printFunctions {
			summary += fmt.Sprintf("\t\t -- Functions (%v):\n", len(m.Package.Functions))
			for _, function := range(m.Package.Functions) {
				summary += fmt.Sprintf("\t\t\t %v\n", function.Stub(m.Package) )
			}
		}
	}
	return summary
}

/* Dummy encryption for now */

func Encrypt(data []byte) []byte{
	for index, b := range(data) {
		data[index] = rot13(b)
	}
	return data
}

func Decrypt(data []byte) []byte{
	for index, b := range(data) {
		data[index] = rot13(b)
	}
	return data
}

func rot13(b byte) byte {
    	if 'a' <= b && b <= 'z' {
    		b = 'a' + ((b-'a')+13)%26
    	}
    	if 'A' <= b && b <= 'Z' {
    		b = 'A' + ((b-'A')+13)%26
    	}
    	return b
}