package proto

import(
	pb "goprotobuf.googlecode.com/hg/proto"
	"io/ioutil"
	"path/filepath"
	"strings"
	"os"
	)

type FileList struct {
	RootDirectory string
	Files []*File
}

func (fl *FileList) VisitDir(path string, f *os.FileInfo) bool {
	return true
}

func (fl *FileList)  VisitFile(path string, f *os.FileInfo) {
	file := fl.buildFile(path)
	fl.Files = append( fl.Files, file )
}

func CollectFiles(dir string) ([]*File){
	fileList := &FileList{
	RootDirectory: dir,
	Files: make([]*File,0),
	}

	filepath.Walk(dir, fileList, nil)

	return fileList.Files
}



func (fl *FileList) buildFile(path string) (*File) {

	data, err := ioutil.ReadFile(path)

	if err != nil {
		panic("Could not read file (" + path + "):" + err.String() )
	}

	pdata := make([][]uint8,0)
	pdata = append(pdata, data)


	path = relativePath(fl.RootDirectory, path)

	file := &File{
	Path: pb.String(path),
	Data: pdata,
	}

	return file
}

func (f *File) Write(dir string) {
	absolutePath := filepath.Join(dir, pb.GetString(f.Path) )

	err := ioutil.WriteFile( absolutePath, f.Data[0], uint32(0777) )

	if err != nil {
		panic("Couldn't write file (" + absolutePath + "):" + err.String() )
	}
}

func relativePath(parentDirectory string, path string) (string) {
	cleanedParentPath := filepath.Clean(parentDirectory)
	relativePath := strings.Replace(path, cleanedParentPath, "", 1)
	return relativePath
}
