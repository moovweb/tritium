package proto

import (
	pb "code.google.com/p/goprotobuf/proto"
	"io/ioutil"
	"strings"
	"time"
	"tritium/protoface"
)

func NewSlug(name string, version string, stages int) (slug *Slug, err error) {
	slug = &Slug{
		Name:         pb.String(strings.TrimSpace(name)),
		Version:      pb.String(strings.TrimSpace(version)),
		Transformers: make([]*Transform, stages),
	}

	return
}

func (slug *Slug) WriteFile(filename string) (err error) {
	var data []byte

	data, err = pb.Marshal(slug)
	if err != nil {
		return
	}

	err = ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return
	}

	return
}

func (slug *Slug) IGetActiveLayers() []string {
	return slug.ActiveLayers
}

func (slug *Slug) FindInstruction(fileName string, lineNumber int) int {
	for _, tf := range slug.Transformers {
		for _, obj := range tf.Objects {
			if obj.IGetName() != fileName {
				continue
			}
			root := obj.GetRoot()
			if root == nil {
				return 0
			}
			return findNearestInstruction(root, lineNumber)
		}
	}
	return 0
}

func findNearestInstruction(ins *Instruction, target int) int {
	current := int32(ins.IGetLineNumber())

	if int32(target) <= current {
		return int(current)
	} else if ins.Children != nil {
		for _, child := range ins.Children {
			foundOrNot := findNearestInstruction(child, target)
			if foundOrNot == 0 {
				continue
			} else {
				return foundOrNot
			}
		}
	} else {
		return 0
	}

	return 0
}

type SlugInfo struct {
	Slug      *Slug
	SlugSize  int
	Timestamp time.Time
	Customer  string
	Project   string
	Path      string
}

func (si *SlugInfo) Size() int {
	return si.SlugSize
}

func (si *SlugInfo) Reset() {
	if si.Slug != nil {
		si.Slug.Reset()
	}
}

func NewSlugInfo() *SlugInfo {
	slugInfo := &SlugInfo{}
	//runtime.SetFinalizer(slugInfo, (*SlugInfo).Reset)
	return slugInfo
}

func (si *SlugInfo) IGetSlug() protoface.Slug {
	return si.Slug
}

func (si *SlugInfo) IGetSize() int {
	return si.Size()
}

func (si *SlugInfo) IGetTimestamp() time.Time {
	return si.Timestamp
}

func (si *SlugInfo) IGetCustomer() string {
	return si.Customer
}

func (si *SlugInfo) IGetProject() string {
	return si.Project
}

func (si *SlugInfo) IGetPath() string {
	return si.Path
}
