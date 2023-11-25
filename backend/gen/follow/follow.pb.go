// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        v4.24.4
// source: follow.proto

package follow

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Relationship int32

const (
	Relationship_NONE        Relationship = 0 // 既定値
	Relationship_FOLLOWING   Relationship = 1
	Relationship_FOLLOWED_BY Relationship = 2
)

// Enum value maps for Relationship.
var (
	Relationship_name = map[int32]string{
		0: "NONE",
		1: "FOLLOWING",
		2: "FOLLOWED_BY",
	}
	Relationship_value = map[string]int32{
		"NONE":        0,
		"FOLLOWING":   1,
		"FOLLOWED_BY": 2,
	}
)

func (x Relationship) Enum() *Relationship {
	p := new(Relationship)
	*p = x
	return p
}

func (x Relationship) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Relationship) Descriptor() protoreflect.EnumDescriptor {
	return file_follow_proto_enumTypes[0].Descriptor()
}

func (Relationship) Type() protoreflect.EnumType {
	return &file_follow_proto_enumTypes[0]
}

func (x Relationship) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Relationship.Descriptor instead.
func (Relationship) EnumDescriptor() ([]byte, []int) {
	return file_follow_proto_rawDescGZIP(), []int{0}
}

type LookupRelationshipRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ImmutableId string   `protobuf:"bytes,1,opt,name=immutableId,proto3" json:"immutableId,omitempty"`
	TargetIds   []string `protobuf:"bytes,2,rep,name=targetIds,proto3" json:"targetIds,omitempty"`
}

func (x *LookupRelationshipRequest) Reset() {
	*x = LookupRelationshipRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_follow_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LookupRelationshipRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LookupRelationshipRequest) ProtoMessage() {}

func (x *LookupRelationshipRequest) ProtoReflect() protoreflect.Message {
	mi := &file_follow_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LookupRelationshipRequest.ProtoReflect.Descriptor instead.
func (*LookupRelationshipRequest) Descriptor() ([]byte, []int) {
	return file_follow_proto_rawDescGZIP(), []int{0}
}

func (x *LookupRelationshipRequest) GetImmutableId() string {
	if x != nil {
		return x.ImmutableId
	}
	return ""
}

func (x *LookupRelationshipRequest) GetTargetIds() []string {
	if x != nil {
		return x.TargetIds
	}
	return nil
}

type LookupRelationshipResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username      string         `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	ImmutableId   string         `protobuf:"bytes,2,opt,name=immutableId,proto3" json:"immutableId,omitempty"`
	DisplayName   string         `protobuf:"bytes,3,opt,name=displayName,proto3" json:"displayName,omitempty"`
	Relationships []Relationship `protobuf:"varint,4,rep,packed,name=relationships,proto3,enum=follow.Relationship" json:"relationships,omitempty"`
}

func (x *LookupRelationshipResponse) Reset() {
	*x = LookupRelationshipResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_follow_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LookupRelationshipResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LookupRelationshipResponse) ProtoMessage() {}

func (x *LookupRelationshipResponse) ProtoReflect() protoreflect.Message {
	mi := &file_follow_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LookupRelationshipResponse.ProtoReflect.Descriptor instead.
func (*LookupRelationshipResponse) Descriptor() ([]byte, []int) {
	return file_follow_proto_rawDescGZIP(), []int{1}
}

func (x *LookupRelationshipResponse) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *LookupRelationshipResponse) GetImmutableId() string {
	if x != nil {
		return x.ImmutableId
	}
	return ""
}

func (x *LookupRelationshipResponse) GetDisplayName() string {
	if x != nil {
		return x.DisplayName
	}
	return ""
}

func (x *LookupRelationshipResponse) GetRelationships() []Relationship {
	if x != nil {
		return x.Relationships
	}
	return nil
}

var File_follow_proto protoreflect.FileDescriptor

var file_follow_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x66, 0x6f, 0x6c, 0x6c, 0x6f, 0x77, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x66, 0x6f, 0x6c, 0x6c, 0x6f, 0x77, 0x22, 0x5b, 0x0a, 0x19, 0x4c, 0x6f, 0x6f, 0x6b, 0x75, 0x70,
	0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x20, 0x0a, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61, 0x62, 0x6c, 0x65,
	0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61,
	0x62, 0x6c, 0x65, 0x49, 0x64, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x49,
	0x64, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x09, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74,
	0x49, 0x64, 0x73, 0x22, 0xb8, 0x01, 0x0a, 0x1a, 0x4c, 0x6f, 0x6f, 0x6b, 0x75, 0x70, 0x52, 0x65,
	0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x20,
	0x0a, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61, 0x62, 0x6c, 0x65, 0x49, 0x64, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61, 0x62, 0x6c, 0x65, 0x49, 0x64,
	0x12, 0x20, 0x0a, 0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61,
	0x6d, 0x65, 0x12, 0x3a, 0x0a, 0x0d, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68,
	0x69, 0x70, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0e, 0x32, 0x14, 0x2e, 0x66, 0x6f, 0x6c, 0x6c,
	0x6f, 0x77, 0x2e, 0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x52,
	0x0d, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x73, 0x2a, 0x38,
	0x0a, 0x0c, 0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x12, 0x08,
	0x0a, 0x04, 0x4e, 0x4f, 0x4e, 0x45, 0x10, 0x00, 0x12, 0x0d, 0x0a, 0x09, 0x46, 0x4f, 0x4c, 0x4c,
	0x4f, 0x57, 0x49, 0x4e, 0x47, 0x10, 0x01, 0x12, 0x0f, 0x0a, 0x0b, 0x46, 0x4f, 0x4c, 0x4c, 0x4f,
	0x57, 0x45, 0x44, 0x5f, 0x42, 0x59, 0x10, 0x02, 0x32, 0x6d, 0x0a, 0x0d, 0x46, 0x6f, 0x6c, 0x6c,
	0x6f, 0x77, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x5c, 0x0a, 0x13, 0x4c, 0x6f, 0x6f,
	0x6b, 0x75, 0x70, 0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x73,
	0x12, 0x21, 0x2e, 0x66, 0x6f, 0x6c, 0x6c, 0x6f, 0x77, 0x2e, 0x4c, 0x6f, 0x6f, 0x6b, 0x75, 0x70,
	0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x22, 0x2e, 0x66, 0x6f, 0x6c, 0x6c, 0x6f, 0x77, 0x2e, 0x4c, 0x6f, 0x6f,
	0x6b, 0x75, 0x70, 0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x68, 0x69, 0x70, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x2e, 0x5a, 0x2c, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6b, 0x6e, 0x67, 0x6e, 0x6b, 0x67, 0x2f, 0x66, 0x6f, 0x64,
	0x65, 0x72, 0x65, 0x65, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x67, 0x65, 0x6e,
	0x2f, 0x66, 0x6f, 0x6c, 0x6c, 0x6f, 0x77, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_follow_proto_rawDescOnce sync.Once
	file_follow_proto_rawDescData = file_follow_proto_rawDesc
)

func file_follow_proto_rawDescGZIP() []byte {
	file_follow_proto_rawDescOnce.Do(func() {
		file_follow_proto_rawDescData = protoimpl.X.CompressGZIP(file_follow_proto_rawDescData)
	})
	return file_follow_proto_rawDescData
}

var file_follow_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_follow_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_follow_proto_goTypes = []interface{}{
	(Relationship)(0),                  // 0: follow.Relationship
	(*LookupRelationshipRequest)(nil),  // 1: follow.LookupRelationshipRequest
	(*LookupRelationshipResponse)(nil), // 2: follow.LookupRelationshipResponse
}
var file_follow_proto_depIdxs = []int32{
	0, // 0: follow.LookupRelationshipResponse.relationships:type_name -> follow.Relationship
	1, // 1: follow.FollowService.LookupRelationships:input_type -> follow.LookupRelationshipRequest
	2, // 2: follow.FollowService.LookupRelationships:output_type -> follow.LookupRelationshipResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_follow_proto_init() }
func file_follow_proto_init() {
	if File_follow_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_follow_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LookupRelationshipRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_follow_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LookupRelationshipResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_follow_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_follow_proto_goTypes,
		DependencyIndexes: file_follow_proto_depIdxs,
		EnumInfos:         file_follow_proto_enumTypes,
		MessageInfos:      file_follow_proto_msgTypes,
	}.Build()
	File_follow_proto = out.File
	file_follow_proto_rawDesc = nil
	file_follow_proto_goTypes = nil
	file_follow_proto_depIdxs = nil
}
