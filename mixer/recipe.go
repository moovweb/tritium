package hermes

import (
	ap "athena"
	proto "code.google.com/p/goprotobuf/proto"
	"io/ioutil"
	"path/filepath"
)

func BuildRecipes(path string) []*ap.Recipe {
	recipes := make([]*ap.Recipe, 0)
	recipeDirectories, err := ioutil.ReadDir(path)

	if err != nil {
		//TODO(SJ) : Make this a debug log
		println("Warning: No recipes found")
	}

	for _, recipeDirectory := range recipeDirectories {
		// fmt.Printf("Loading recipe: %v", recipeDirectory)

		_, name := filepath.Split(recipeDirectory.Name())
		files := ap.CollectFiles(filepath.Join(path, name))

		recipe := &ap.Recipe{
			Name:  proto.String(name),
			Files: files,
		}

		recipes = append(recipes, recipe)
	}

	return recipes
}
