// Code generated by protoc-gen-go.
// source: instruction.proto
// DO NOT EDIT!

package proto

import proto1 "github.com/golang/protobuf/proto"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto1.Marshal
var _ = math.Inf

type Instruction struct {
	Type  *int32  `protobuf:"varint,1,req,name=type" json:"type,omitempty"`
	Value *string `protobuf:"bytes,2,opt,name=value" json:"value,omitempty"`
	// only used if we are an import and we're all linked into an Transform
	ObjectId  *int32         `protobuf:"varint,3,opt,name=object_id" json:"object_id,omitempty"`
	Children  []*Instruction `protobuf:"bytes,4,rep,name=children" json:"children,omitempty"`
	Arguments []*Instruction `protobuf:"bytes,5,rep,name=arguments" json:"arguments,omitempty"`
	// Linked: Function Reference
	// Until this happens, value says the function call name
	FunctionId *int32 `protobuf:"varint,6,opt,name=function_id" json:"function_id,omitempty"`
	LineNumber *int32 `protobuf:"varint,7,opt,name=line_number" json:"line_number,omitempty"`
	// Used for yield() calls, because we need to know parent type
	YieldTypeId *int32 `protobuf:"varint,8,opt,name=yield_type_id" json:"yield_type_id,omitempty"`
	IsValid     *bool  `protobuf:"varint,9,opt,name=is_valid" json:"is_valid,omitempty"`
	// used for function calls and variable references
	Namespace        *string `protobuf:"bytes,10,opt,name=namespace" json:"namespace,omitempty"`
	TypeQualifier    *string `protobuf:"bytes,11,opt,name=type_qualifier" json:"type_qualifier,omitempty"`
	IsUserCalled     *bool   `protobuf:"varint,12,opt,name=is_user_called" json:"is_user_called,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *Instruction) Reset()         { *m = Instruction{} }
func (m *Instruction) String() string { return proto1.CompactTextString(m) }
func (*Instruction) ProtoMessage()    {}

func (m *Instruction) GetType() int32 {
	if m != nil && m.Type != nil {
		return *m.Type
	}
	return 0
}

func (m *Instruction) GetValue() string {
	if m != nil && m.Value != nil {
		return *m.Value
	}
	return ""
}

func (m *Instruction) GetObjectId() int32 {
	if m != nil && m.ObjectId != nil {
		return *m.ObjectId
	}
	return 0
}

func (m *Instruction) GetChildren() []*Instruction {
	if m != nil {
		return m.Children
	}
	return nil
}

func (m *Instruction) GetArguments() []*Instruction {
	if m != nil {
		return m.Arguments
	}
	return nil
}

func (m *Instruction) GetFunctionId() int32 {
	if m != nil && m.FunctionId != nil {
		return *m.FunctionId
	}
	return 0
}

func (m *Instruction) GetLineNumber() int32 {
	if m != nil && m.LineNumber != nil {
		return *m.LineNumber
	}
	return 0
}

func (m *Instruction) GetYieldTypeId() int32 {
	if m != nil && m.YieldTypeId != nil {
		return *m.YieldTypeId
	}
	return 0
}

func (m *Instruction) GetIsValid() bool {
	if m != nil && m.IsValid != nil {
		return *m.IsValid
	}
	return false
}

func (m *Instruction) GetNamespace() string {
	if m != nil && m.Namespace != nil {
		return *m.Namespace
	}
	return ""
}

func (m *Instruction) GetTypeQualifier() string {
	if m != nil && m.TypeQualifier != nil {
		return *m.TypeQualifier
	}
	return ""
}

func (m *Instruction) GetIsUserCalled() bool {
	if m != nil && m.IsUserCalled != nil {
		return *m.IsUserCalled
	}
	return false
}

func init() {
}
