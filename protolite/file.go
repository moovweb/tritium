package proto

import (
	"errors"
	"io/ioutil"
)

func (f *File) Write(dir string) (err error) {
	absolutePath := f.AbsolutePath(dir)

	err = ioutil.WriteFile(absolutePath, f.Data, 0644)

	if err != nil {
		err = errors.New("Couldn't write file (" + absolutePath + "):" + err.Error())
	}

	return
}
