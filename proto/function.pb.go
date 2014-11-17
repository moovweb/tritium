// Code generated by protoc-gen-go.
// source: function.proto
// DO NOT EDIT!

package proto

import proto1 "code.google.com/p/goprotobuf/proto"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto1.Marshal
var _ = math.Inf

type Function struct {
	Name        *string `protobuf:"bytes,1,opt,name=name" json:"name,omitempty"`
	Description *string `protobuf:"bytes,11,opt,name=description" json:"description,omitempty"`
	Filename    *string `protobuf:"bytes,12,opt,name=filename" json:"filename,omitempty"`
	LineNumber  *int32  `protobuf:"varint,13,opt,name=line_number" json:"line_number,omitempty"`
	Namespace   *string `protobuf:"bytes,14,opt,name=namespace" json:"namespace,omitempty"`
	// Linked
	ScopeTypeId  *int32  `protobuf:"varint,2,opt,name=scope_type_id" json:"scope_type_id,omitempty"`
	ScopeType    *string `protobuf:"bytes,8,opt,name=scope_type" json:"scope_type,omitempty"`
	ReturnTypeId *int32  `protobuf:"varint,3,opt,name=return_type_id" json:"return_type_id,omitempty"`
	ReturnType   *string `protobuf:"bytes,9,opt,name=return_type" json:"return_type,omitempty"`
	OpensTypeId  *int32  `protobuf:"varint,4,opt,name=opens_type_id" json:"opens_type_id,omitempty"`
	OpensType    *string `protobuf:"bytes,10,opt,name=opens_type" json:"opens_type,omitempty"`
	// Only informative post-linking
	BuiltIn *bool                `protobuf:"varint,5,opt,name=built_in" json:"built_in,omitempty"`
	Args    []*Function_Argument `protobuf:"bytes,6,rep,name=args" json:"args,omitempty"`
	// Only for non-built-in functions
	Instruction      *Instruction `protobuf:"bytes,7,opt,name=instruction" json:"instruction,omitempty"`
	XXX_unrecognized []byte       `json:"-"`
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

func (m *Function) GetDescription() string {
	if m != nil && m.Description != nil {
		return *m.Description
	}
	return ""
}

func (m *Function) GetFilename() string {
	if m != nil && m.Filename != nil {
		return *m.Filename
	}
	return ""
}

func (m *Function) GetLineNumber() int32 {
	if m != nil && m.LineNumber != nil {
		return *m.LineNumber
	}
	return 0
}

func (m *Function) GetNamespace() string {
	if m != nil && m.Namespace != nil {
		return *m.Namespace
	}
	return ""
}

func (m *Function) GetScopeTypeId() int32 {
	if m != nil && m.ScopeTypeId != nil {
		return *m.ScopeTypeId
	}
	return 0
}

func (m *Function) GetScopeType() string {
	if m != nil && m.ScopeType != nil {
		return *m.ScopeType
	}
	return ""
}

func (m *Function) GetReturnTypeId() int32 {
	if m != nil && m.ReturnTypeId != nil {
		return *m.ReturnTypeId
	}
	return 0
}

func (m *Function) GetReturnType() string {
	if m != nil && m.ReturnType != nil {
		return *m.ReturnType
	}
	return ""
}

func (m *Function) GetOpensTypeId() int32 {
	if m != nil && m.OpensTypeId != nil {
		return *m.OpensTypeId
	}
	return 0
}

func (m *Function) GetOpensType() string {
	if m != nil && m.OpensType != nil {
		return *m.OpensType
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
