// Code generated by protoc-gen-go.
// source: function.proto
// DO NOT EDIT!

package proto

import proto1 "github.com/golang/protobuf/proto"
import json "encoding/json"
import math "math"

// Reference proto, json, and math imports to suppress error if they are not otherwise used.
var _ = proto1.Marshal
var _ = &json.SyntaxError{}
var _ = math.Inf

type Function struct {
	Name             *string              `protobuf:"bytes,1,opt,name=name" json:"name,omitempty"`
	BuiltIn          *bool                `protobuf:"varint,5,opt,name=built_in" json:"built_in,omitempty"`
	Args             []*Function_Argument `protobuf:"bytes,6,rep,name=args" json:"args,omitempty"`
	Instruction      *Instruction         `protobuf:"bytes,7,opt,name=instruction" json:"instruction,omitempty"`
	XXX_unrecognized []byte               `json:"-"`
}

func (m *Function) Reset()         { *m = Function{} }
func (m *Function) String() string { return proto1.CompactTextString(m) }
func (*Function) ProtoMessage()    {}

func (m *Function) GetName() string {
	if m != nil && m.Name != nil {
		return *m.Name
	}
	return ""
}

func (m *Function) GetBuiltIn() bool {
	if m != nil && m.BuiltIn != nil {
		return *m.BuiltIn
	}
	return false
}

func (m *Function) GetArgs() []*Function_Argument {
	if m != nil {
		return m.Args
	}
	return nil
}

func (m *Function) GetInstruction() *Instruction {
	if m != nil {
		return m.Instruction
	}
	return nil
}

type Function_Argument struct {
	TypeId           *int32  `protobuf:"varint,1,opt,name=type_id" json:"type_id,omitempty"`
	TypeString       *string `protobuf:"bytes,2,opt,name=type_string" json:"type_string,omitempty"`
	Name             *string `protobuf:"bytes,3,opt,name=name" json:"name,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *Function_Argument) Reset()         { *m = Function_Argument{} }
func (m *Function_Argument) String() string { return proto1.CompactTextString(m) }
func (*Function_Argument) ProtoMessage()    {}

func (m *Function_Argument) GetTypeId() int32 {
	if m != nil && m.TypeId != nil {
		return *m.TypeId
	}
	return 0
}

func (m *Function_Argument) GetTypeString() string {
	if m != nil && m.TypeString != nil {
		return *m.TypeString
	}
	return ""
}

func (m *Function_Argument) GetName() string {
	if m != nil && m.Name != nil {
		return *m.Name
	}
	return ""
}

type FunctionArray struct {
	Functions        []*Function `protobuf:"bytes,1,rep,name=functions" json:"functions,omitempty"`
	XXX_unrecognized []byte      `json:"-"`
}

func (m *FunctionArray) Reset()         { *m = FunctionArray{} }
func (m *FunctionArray) String() string { return proto1.CompactTextString(m) }
func (*FunctionArray) ProtoMessage()    {}

func (m *FunctionArray) GetFunctions() []*Function {
	if m != nil {
		return m.Functions
	}
	return nil
}

func init() {
}
