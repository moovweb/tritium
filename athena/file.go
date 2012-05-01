package proto

import (
	pb "code.google.com/p/goprotobuf/proto"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type FileList struct {
	RootDirectory string
	Files         []*File
}

func (fl *FileList) VisitDir(path string, f os.FileInfo) bool {
	return true
}

func (fl *FileList) VisitFile(path string, f os.FileInfo) {
	file := fl.buildFile(path)
	fl.Files = append(fl.Files, file)
}

func CollectFiles(dir string) []*File {
	fileList := &FileList{
		RootDirectory: dir,
		Files:         make([]*File, 0),
	}

	markFn := func(path string, info os.FileInfo, err error) error {

		if info == nil {
			return nil
		}

		if info.IsDir() {
				return nil
		}

		if err != nil {
		    return err
		}
		file := fileList.buildFile(path)
		fileList.Files = append(fileList.Files, file)

		return nil
	}

	filepath.Walk(dir, markFn)

	return fileList.Files
}

func (fl *FileList) Unpack(verbose bool) (err error) {
	for _, file := range fl.Files {
		absolutePath := file.AbsolutePath(fl.RootDirectory)
		path, _ := filepath.Split(absolutePath)
		err = os.MkdirAll(path, 0755)

		if err != nil {
			panic(err.Error())
		}

		err = file.Write(fl.RootDirectory)

		if err != nil {
			return
		}

		if verbose {
			fmt.Printf("* %v\n", absolutePath)
		}
	}
	return
}

func (fl *FileList) buildFile(path string) *File {

	data, err := ioutil.ReadFile(path)

	if err != nil {
		panic("Could not read file (" + path + "):" + err.Error())
	}

	pdata := make([][]uint8, 0)
	pdata = append(pdata, data)

	path = relativePath(fl.RootDirectory, path)

	file := &File{
		Path: pb.String(path),
		Data: pdata,
	}

	return file
}

func (f *File) AbsolutePath(dir string) string {
	return filepath.Join(dir, pb.GetString(f.Path))
}

func (f *File) Write(dir string) (err error) {
	absolutePath := f.AbsolutePath(dir)

	err = ioutil.WriteFile(absolutePath, f.Data[0], 0644)

	if err != nil {
		err = errors.New("Couldn't write file (" + absolutePath + "):" + err.Error())
	}

	return
}

func relativePath(parentDirectory string, path string) string {
	cleanedParentPath := filepath.Clean(parentDirectory)
	relativePath := strings.Replace(path, cleanedParentPath, "", 1)
	return relativePath
}
