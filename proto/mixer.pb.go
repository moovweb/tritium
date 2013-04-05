// Code generated by protoc-gen-go.
// source: mixer.proto
// DO NOT EDIT!

package proto

import proto1 "code.google.com/p/goprotobuf/proto"
import json "encoding/json"
import math "math"

// Reference proto, json, and math imports to suppress error if they are not otherwise used.
var _ = proto1.Marshal
var _ = &json.SyntaxError{}
var _ = math.Inf

type Mixer struct {
	Name              *string  `protobuf:"bytes,1,req,name=name" json:"name,omitempty"`
	Version           *string  `protobuf:"bytes,2,req,name=version" json:"version,omitempty"`
	Rewriters         []*File  `protobuf:"bytes,3,rep,name=rewriters" json:"rewriters,omitempty"`
	Package           *Package `protobuf:"bytes,4,opt,name=package" json:"package,omitempty"`
	PackagerVersion   *int32   `protobuf:"varint,5,opt,name=packager_version" json:"packager_version,omitempty"`
	SubmixerNames   []string `protobuf:"bytes,6,rep,name=submixer_names" json:"submixer_names,omitempty"`
	SubmixerVersions []string `protobuf:"bytes,7,rep,name=submixer_versions" json:"submixer_versions,omitempty"`
	SubmixerOffsets []int32  `protobuf:"varint,8,rep,name=submixer_offsets" json:"submixer_offsets,omitempty"`
	XXX_unrecognized  []byte   `json:"-"`
}

func (this *Mixer) Reset()         { *this = Mixer{} }
func (this *Mixer) String() string { return proto1.CompactTextString(this) }
func (*Mixer) ProtoMessage()       {}

func (this *Mixer) GetName() string {
	if this != nil && this.Name != nil {
		return *this.Name
	}
	return ""
}

func (this *Mixer) GetVersion() string {
	if this != nil && this.Version != nil {
		return *this.Version
	}
	return ""
}

func (this *Mixer) GetPackage() *Package {
	if this != nil {
		return this.Package
	}
	return nil
}

func (this *Mixer) GetPackagerVersion() int32 {
	if this != nil && this.PackagerVersion != nil {
		return *this.PackagerVersion
	}
	return 0
}

func init() {
}
