// Code generated by protoc-gen-go.
// source: tritium.proto
// DO NOT EDIT!

package proto

import proto1 "github.com/golang/protobuf/proto"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto1.Marshal
var _ = math.Inf

// A post-linking object for execution
type Transform struct {
	Objects          []*ScriptObject `protobuf:"bytes,1,rep,name=objects" json:"objects,omitempty"`
	Pkg              *Package        `protobuf:"bytes,2,req,name=pkg" json:"pkg,omitempty"`
	Layers           *string         `protobuf:"bytes,3,opt" json:"Layers,omitempty"`
	XXX_unrecognized []byte          `json:"-"`
}

func (m *Transform) Reset()         { *m = Transform{} }
func (m *Transform) String() string { return proto1.CompactTextString(m) }
func (*Transform) ProtoMessage()    {}

func (m *Transform) GetObjects() []*ScriptObject {
	if m != nil {
		return m.Objects
	}
	return nil
}

func (m *Transform) GetPkg() *Package {
	if m != nil {
		return m.Pkg
	}
	return nil
}

func (m *Transform) GetLayers() string {
	if m != nil && m.Layers != nil {
		return *m.Layers
	}
	return ""
}

func init() {
}
