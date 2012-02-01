package proto

import(
	pb "goprotobuf.googlecode.com/hg/proto"
	"io/ioutil"
	"path/filepath"
	"fmt"
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

func (m *Mixer) Write(path string) (outputPath string) {

	name := pb.GetString(m.Name)
	version := pb.GetString(m.Version)
	outputFilename := filepath.Join(path, name + "-" + version + ".mxr")

	bytes, err := pb.Marshal(m)
	
	if err != nil {
		panic("Could not marshal mixer (" + name + "), " + err.String())
	}

	//bytes = crypto.Encrypt(bytes)

	ioutil.WriteFile(outputFilename, bytes, uint32(0666) )

	return outputFilename
}

func OpenMixer(location string) (m *Mixer) {

	data, err := ioutil.ReadFile(location)

	if err != nil {
		panic("Could not find mixer file:" + location)
	}

	//data = crypto.Decrypt(data)

	thisMixer := &Mixer{}
	err = pb.Unmarshal(data, thisMixer)

	if err != nil {
		panic("Error unmarshalling mixer at:" + location)
	}

	return thisMixer
}

func (m *Mixer) Inspect() {
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
	if m.Package != nil {
		fmt.Printf("\t\t -- Name: %v\n", pb.GetString(m.Package.Name) )
		fmt.Printf("\t\t -- Types: %v\n", m.Package.Types )
		fmt.Printf("\t\t -- Dependencies:  %v\n", m.Package.Dependencies )		
	}

}