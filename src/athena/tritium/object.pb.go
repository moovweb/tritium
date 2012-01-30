// Code generated by protoc-gen-go from "object.proto"
// DO NOT EDIT!

package tritium

import proto "goprotobuf.googlecode.com/hg/proto"
import "math"
import "os"

// Reference proto, math & os imports to suppress error if they are not otherwise used.
var _ = proto.GetString
var _ = math.Inf
var _ os.Error

type ScriptObject struct {
	Name             *string      `protobuf:"bytes,1,opt,name=name,def=main" json:"name,omitempty"`
	Root             *Instruction `protobuf:"bytes,2,opt,name=root" json:"root,omitempty"`
	Functions        []*Function  `protobuf:"bytes,3,rep,name=functions" json:"functions,omitempty"`
	ScopeTypeId      *int32       `protobuf:"varint,4,opt,name=scope_type_id" json:"scope_type_id,omitempty"`
	Linked           *bool        `protobuf:"varint,5,opt,name=linked" json:"linked,omitempty"`
	XXX_unrecognized []byte       `json:",omitempty"`
}

func (this *ScriptObject) Reset()         { *this = ScriptObject{} }
func (this *ScriptObject) String() string { return proto.CompactTextString(this) }

const Default_ScriptObject_Name string = "main"

func init() {
}
