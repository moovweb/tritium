// Code generated by protoc-gen-go.
// source: slug.proto
// DO NOT EDIT!

package proto

import proto1 "github.com/golang/protobuf/proto"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto1.Marshal
var _ = math.Inf

type Slug struct {
	Name             *string        `protobuf:"bytes,1,req,name=name" json:"name,omitempty"`
	Version          *string        `protobuf:"bytes,2,req,name=version" json:"version,omitempty"`
	Transformers     []*Transform   `protobuf:"bytes,3,rep,name=transformers" json:"transformers,omitempty"`
	Rrules           []*RewriteRule `protobuf:"bytes,4,rep,name=rrules" json:"rrules,omitempty"`
	SslWhitelist     []string       `protobuf:"bytes,5,rep,name=ssl_whitelist" json:"ssl_whitelist,omitempty"`
	Credentials      *Credentials   `protobuf:"bytes,6,opt,name=credentials" json:"credentials,omitempty"`
	ActiveLayers     []string       `protobuf:"bytes,7,rep,name=active_layers" json:"active_layers,omitempty"`
	JavaScript       *string        `protobuf:"bytes,8,opt,name=java_script" json:"java_script,omitempty"`
	Config           *string        `protobuf:"bytes,9,opt,name=config" json:"config,omitempty"`
	XXX_unrecognized []byte         `json:"-"`
}

func (m *Slug) Reset()         { *m = Slug{} }
func (m *Slug) String() string { return proto1.CompactTextString(m) }
func (*Slug) ProtoMessage()    {}

func (m *Slug) GetName() string {
	if m != nil && m.Name != nil {
		return *m.Name
	}
	return ""
}

func (m *Slug) GetVersion() string {
	if m != nil && m.Version != nil {
		return *m.Version
	}
	return ""
}

func (m *Slug) GetTransformers() []*Transform {
	if m != nil {
		return m.Transformers
	}
	return nil
}

func (m *Slug) GetRrules() []*RewriteRule {
	if m != nil {
		return m.Rrules
	}
	return nil
}

func (m *Slug) GetSslWhitelist() []string {
	if m != nil {
		return m.SslWhitelist
	}
	return nil
}

func (m *Slug) GetCredentials() *Credentials {
	if m != nil {
		return m.Credentials
	}
	return nil
}

func (m *Slug) GetActiveLayers() []string {
	if m != nil {
		return m.ActiveLayers
	}
	return nil
}

func (m *Slug) GetJavaScript() string {
	if m != nil && m.JavaScript != nil {
		return *m.JavaScript
	}
	return ""
}

func (m *Slug) GetConfig() string {
	if m != nil && m.Config != nil {
		return *m.Config
	}
	return ""
}

func init() {
}
