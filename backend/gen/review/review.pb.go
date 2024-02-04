// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        v4.24.4
// source: review.proto

package review

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ListReviewsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Cursor string `protobuf:"bytes,1,opt,name=cursor,proto3" json:"cursor,omitempty"`
	Limit  int32  `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`
}

func (x *ListReviewsRequest) Reset() {
	*x = ListReviewsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListReviewsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListReviewsRequest) ProtoMessage() {}

func (x *ListReviewsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListReviewsRequest.ProtoReflect.Descriptor instead.
func (*ListReviewsRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{0}
}

func (x *ListReviewsRequest) GetCursor() string {
	if x != nil {
		return x.Cursor
	}
	return ""
}

func (x *ListReviewsRequest) GetLimit() int32 {
	if x != nil {
		return x.Limit
	}
	return 0
}

type ListReviewsByUsernameRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	Cursor   string `protobuf:"bytes,2,opt,name=cursor,proto3" json:"cursor,omitempty"`
	Limit    int32  `protobuf:"varint,3,opt,name=limit,proto3" json:"limit,omitempty"`
}

func (x *ListReviewsByUsernameRequest) Reset() {
	*x = ListReviewsByUsernameRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListReviewsByUsernameRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListReviewsByUsernameRequest) ProtoMessage() {}

func (x *ListReviewsByUsernameRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListReviewsByUsernameRequest.ProtoReflect.Descriptor instead.
func (*ListReviewsByUsernameRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{1}
}

func (x *ListReviewsByUsernameRequest) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *ListReviewsByUsernameRequest) GetCursor() string {
	if x != nil {
		return x.Cursor
	}
	return ""
}

func (x *ListReviewsByUsernameRequest) GetLimit() int32 {
	if x != nil {
		return x.Limit
	}
	return 0
}

type GetReviewByIdRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ReviewId string `protobuf:"bytes,1,opt,name=reviewId,proto3" json:"reviewId,omitempty"`
}

func (x *GetReviewByIdRequest) Reset() {
	*x = GetReviewByIdRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetReviewByIdRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetReviewByIdRequest) ProtoMessage() {}

func (x *GetReviewByIdRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetReviewByIdRequest.ProtoReflect.Descriptor instead.
func (*GetReviewByIdRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{2}
}

func (x *GetReviewByIdRequest) GetReviewId() string {
	if x != nil {
		return x.ReviewId
	}
	return ""
}

type CreateReviewRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AlbumId         string `protobuf:"bytes,1,opt,name=albumId,proto3" json:"albumId,omitempty"`
	Title           string `protobuf:"bytes,2,opt,name=title,proto3" json:"title,omitempty"`
	Content         string `protobuf:"bytes,3,opt,name=content,proto3" json:"content,omitempty"`
	PublishedStatus string `protobuf:"bytes,4,opt,name=publishedStatus,proto3" json:"publishedStatus,omitempty"`
}

func (x *CreateReviewRequest) Reset() {
	*x = CreateReviewRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateReviewRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateReviewRequest) ProtoMessage() {}

func (x *CreateReviewRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateReviewRequest.ProtoReflect.Descriptor instead.
func (*CreateReviewRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{3}
}

func (x *CreateReviewRequest) GetAlbumId() string {
	if x != nil {
		return x.AlbumId
	}
	return ""
}

func (x *CreateReviewRequest) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *CreateReviewRequest) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *CreateReviewRequest) GetPublishedStatus() string {
	if x != nil {
		return x.PublishedStatus
	}
	return ""
}

type UpdateReviewRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ReviewId        string `protobuf:"bytes,1,opt,name=reviewId,proto3" json:"reviewId,omitempty"`
	AlbumId         string `protobuf:"bytes,2,opt,name=albumId,proto3" json:"albumId,omitempty"`
	Title           string `protobuf:"bytes,3,opt,name=title,proto3" json:"title,omitempty"`
	Content         string `protobuf:"bytes,4,opt,name=content,proto3" json:"content,omitempty"`
	PublishedStatus string `protobuf:"bytes,5,opt,name=publishedStatus,proto3" json:"publishedStatus,omitempty"`
}

func (x *UpdateReviewRequest) Reset() {
	*x = UpdateReviewRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateReviewRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateReviewRequest) ProtoMessage() {}

func (x *UpdateReviewRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateReviewRequest.ProtoReflect.Descriptor instead.
func (*UpdateReviewRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{4}
}

func (x *UpdateReviewRequest) GetReviewId() string {
	if x != nil {
		return x.ReviewId
	}
	return ""
}

func (x *UpdateReviewRequest) GetAlbumId() string {
	if x != nil {
		return x.AlbumId
	}
	return ""
}

func (x *UpdateReviewRequest) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *UpdateReviewRequest) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *UpdateReviewRequest) GetPublishedStatus() string {
	if x != nil {
		return x.PublishedStatus
	}
	return ""
}

type DeleteReviewRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ReviewId string `protobuf:"bytes,1,opt,name=reviewId,proto3" json:"reviewId,omitempty"`
}

func (x *DeleteReviewRequest) Reset() {
	*x = DeleteReviewRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeleteReviewRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeleteReviewRequest) ProtoMessage() {}

func (x *DeleteReviewRequest) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeleteReviewRequest.ProtoReflect.Descriptor instead.
func (*DeleteReviewRequest) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{5}
}

func (x *DeleteReviewRequest) GetReviewId() string {
	if x != nil {
		return x.ReviewId
	}
	return ""
}

type Review struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ReviewId        string  `protobuf:"bytes,1,opt,name=reviewId,proto3" json:"reviewId,omitempty"`
	User            *Author `protobuf:"bytes,2,opt,name=user,proto3" json:"user,omitempty"`
	AlbumId         string  `protobuf:"bytes,3,opt,name=albumId,proto3" json:"albumId,omitempty"`
	Title           string  `protobuf:"bytes,4,opt,name=title,proto3" json:"title,omitempty"`
	Content         string  `protobuf:"bytes,5,opt,name=content,proto3" json:"content,omitempty"`
	PublishedStatus string  `protobuf:"bytes,6,opt,name=publishedStatus,proto3" json:"publishedStatus,omitempty"`
	LikesCount      int32   `protobuf:"varint,7,opt,name=likesCount,proto3" json:"likesCount,omitempty"`
	CreatedAt       string  `protobuf:"bytes,8,opt,name=createdAt,proto3" json:"createdAt,omitempty"`
	UpdatedAt       string  `protobuf:"bytes,9,opt,name=updatedAt,proto3" json:"updatedAt,omitempty"`
}

func (x *Review) Reset() {
	*x = Review{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Review) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Review) ProtoMessage() {}

func (x *Review) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Review.ProtoReflect.Descriptor instead.
func (*Review) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{6}
}

func (x *Review) GetReviewId() string {
	if x != nil {
		return x.ReviewId
	}
	return ""
}

func (x *Review) GetUser() *Author {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *Review) GetAlbumId() string {
	if x != nil {
		return x.AlbumId
	}
	return ""
}

func (x *Review) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *Review) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *Review) GetPublishedStatus() string {
	if x != nil {
		return x.PublishedStatus
	}
	return ""
}

func (x *Review) GetLikesCount() int32 {
	if x != nil {
		return x.LikesCount
	}
	return 0
}

func (x *Review) GetCreatedAt() string {
	if x != nil {
		return x.CreatedAt
	}
	return ""
}

func (x *Review) GetUpdatedAt() string {
	if x != nil {
		return x.UpdatedAt
	}
	return ""
}

type Author struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username    string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	ImmutableId string `protobuf:"bytes,2,opt,name=immutableId,proto3" json:"immutableId,omitempty"`
	DisplayName string `protobuf:"bytes,3,opt,name=displayName,proto3" json:"displayName,omitempty"`
	AvatarUrl   string `protobuf:"bytes,4,opt,name=avatarUrl,proto3" json:"avatarUrl,omitempty"`
}

func (x *Author) Reset() {
	*x = Author{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Author) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Author) ProtoMessage() {}

func (x *Author) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Author.ProtoReflect.Descriptor instead.
func (*Author) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{7}
}

func (x *Author) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *Author) GetImmutableId() string {
	if x != nil {
		return x.ImmutableId
	}
	return ""
}

func (x *Author) GetDisplayName() string {
	if x != nil {
		return x.DisplayName
	}
	return ""
}

func (x *Author) GetAvatarUrl() string {
	if x != nil {
		return x.AvatarUrl
	}
	return ""
}

type ReviewList struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Reviews    []*Review `protobuf:"bytes,1,rep,name=reviews,proto3" json:"reviews,omitempty"`
	NextCursor string    `protobuf:"bytes,2,opt,name=nextCursor,proto3" json:"nextCursor,omitempty"`
	Total      int32     `protobuf:"varint,3,opt,name=total,proto3" json:"total,omitempty"`
}

func (x *ReviewList) Reset() {
	*x = ReviewList{}
	if protoimpl.UnsafeEnabled {
		mi := &file_review_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ReviewList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ReviewList) ProtoMessage() {}

func (x *ReviewList) ProtoReflect() protoreflect.Message {
	mi := &file_review_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ReviewList.ProtoReflect.Descriptor instead.
func (*ReviewList) Descriptor() ([]byte, []int) {
	return file_review_proto_rawDescGZIP(), []int{8}
}

func (x *ReviewList) GetReviews() []*Review {
	if x != nil {
		return x.Reviews
	}
	return nil
}

func (x *ReviewList) GetNextCursor() string {
	if x != nil {
		return x.NextCursor
	}
	return ""
}

func (x *ReviewList) GetTotal() int32 {
	if x != nil {
		return x.Total
	}
	return 0
}

var File_review_proto protoreflect.FileDescriptor

var file_review_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0x42, 0x0a, 0x12, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x63, 0x75, 0x72,
	0x73, 0x6f, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x63, 0x75, 0x72, 0x73, 0x6f,
	0x72, 0x12, 0x14, 0x0a, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05,
	0x52, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x22, 0x68, 0x0a, 0x1c, 0x4c, 0x69, 0x73, 0x74, 0x52,
	0x65, 0x76, 0x69, 0x65, 0x77, 0x73, 0x42, 0x79, 0x55, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e,
	0x61, 0x6d, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x63, 0x75, 0x72, 0x73, 0x6f, 0x72, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x06, 0x63, 0x75, 0x72, 0x73, 0x6f, 0x72, 0x12, 0x14, 0x0a, 0x05, 0x6c,
	0x69, 0x6d, 0x69, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x6c, 0x69, 0x6d, 0x69,
	0x74, 0x22, 0x32, 0x0a, 0x14, 0x47, 0x65, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x42, 0x79,
	0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x49, 0x64, 0x22, 0x89, 0x01, 0x0a, 0x13, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a,
	0x07, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x61, 0x6c, 0x62, 0x75, 0x6d, 0x49, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x18, 0x0a,
	0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x28, 0x0a, 0x0f, 0x70, 0x75, 0x62, 0x6c, 0x69,
	0x73, 0x68, 0x65, 0x64, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x0f, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x65, 0x64, 0x53, 0x74, 0x61, 0x74, 0x75,
	0x73, 0x22, 0xa5, 0x01, 0x0a, 0x13, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69,
	0x65, 0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x49, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x49, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x49, 0x64, 0x12,
	0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12,
	0x28, 0x0a, 0x0f, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x65, 0x64, 0x53, 0x74, 0x61, 0x74,
	0x75, 0x73, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0f, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x73,
	0x68, 0x65, 0x64, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x31, 0x0a, 0x13, 0x44, 0x65, 0x6c,
	0x65, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x1a, 0x0a, 0x08, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x08, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x49, 0x64, 0x22, 0x98, 0x02, 0x0a,
	0x06, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x12, 0x1a, 0x0a, 0x08, 0x72, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x72, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x49, 0x64, 0x12, 0x22, 0x0a, 0x04, 0x75, 0x73, 0x65, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x0e, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x41, 0x75, 0x74, 0x68, 0x6f,
	0x72, 0x52, 0x04, 0x75, 0x73, 0x65, 0x72, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x6c, 0x62, 0x75, 0x6d,
	0x49, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x49,
	0x64, 0x12, 0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65,
	0x6e, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x74, 0x12, 0x28, 0x0a, 0x0f, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x65, 0x64, 0x53, 0x74,
	0x61, 0x74, 0x75, 0x73, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0f, 0x70, 0x75, 0x62, 0x6c,
	0x69, 0x73, 0x68, 0x65, 0x64, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x1e, 0x0a, 0x0a, 0x6c,
	0x69, 0x6b, 0x65, 0x73, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x07, 0x20, 0x01, 0x28, 0x05, 0x52,
	0x0a, 0x6c, 0x69, 0x6b, 0x65, 0x73, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x63,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09,
	0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x75, 0x70, 0x64,
	0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x18, 0x09, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x75, 0x70,
	0x64, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x22, 0x86, 0x01, 0x0a, 0x06, 0x41, 0x75, 0x74, 0x68,
	0x6f, 0x72, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x20,
	0x0a, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61, 0x62, 0x6c, 0x65, 0x49, 0x64, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0b, 0x69, 0x6d, 0x6d, 0x75, 0x74, 0x61, 0x62, 0x6c, 0x65, 0x49, 0x64,
	0x12, 0x20, 0x0a, 0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61,
	0x6d, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x61, 0x76, 0x61, 0x74, 0x61, 0x72, 0x55, 0x72, 0x6c, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x61, 0x76, 0x61, 0x74, 0x61, 0x72, 0x55, 0x72, 0x6c,
	0x22, 0x6c, 0x0a, 0x0a, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x28,
	0x0a, 0x07, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x0e, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x52,
	0x07, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x73, 0x12, 0x1e, 0x0a, 0x0a, 0x6e, 0x65, 0x78, 0x74,
	0x43, 0x75, 0x72, 0x73, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x6e, 0x65,
	0x78, 0x74, 0x43, 0x75, 0x72, 0x73, 0x6f, 0x72, 0x12, 0x14, 0x0a, 0x05, 0x74, 0x6f, 0x74, 0x61,
	0x6c, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x32, 0xb1,
	0x04, 0x0a, 0x0d, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x3f, 0x0a, 0x0b, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x73, 0x12,
	0x1a, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x72, 0x65,
	0x76, 0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x4c, 0x69, 0x73, 0x74, 0x22,
	0x00, 0x12, 0x41, 0x0a, 0x0d, 0x4c, 0x69, 0x73, 0x74, 0x4d, 0x79, 0x52, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x73, 0x12, 0x1a, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x4c, 0x69, 0x73, 0x74,
	0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12,
	0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x4c, 0x69,
	0x73, 0x74, 0x22, 0x00, 0x12, 0x53, 0x0a, 0x15, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x76, 0x69,
	0x65, 0x77, 0x73, 0x42, 0x79, 0x55, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x24, 0x2e,
	0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x73, 0x42, 0x79, 0x55, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x4c, 0x69, 0x73, 0x74, 0x22, 0x00, 0x12, 0x3f, 0x0a, 0x0d, 0x47, 0x65, 0x74,
	0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x42, 0x79, 0x49, 0x64, 0x12, 0x1c, 0x2e, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x42, 0x79, 0x49,
	0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x72, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x22, 0x00, 0x12, 0x41, 0x0a, 0x0f, 0x47, 0x65,
	0x74, 0x4d, 0x79, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x42, 0x79, 0x49, 0x64, 0x12, 0x1c, 0x2e,
	0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77,
	0x42, 0x79, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x72, 0x65,
	0x76, 0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x22, 0x00, 0x12, 0x3d, 0x0a,
	0x0c, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x12, 0x1b, 0x2e,
	0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x72, 0x65, 0x76,
	0x69, 0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x22, 0x00, 0x12, 0x3d, 0x0a, 0x0c,
	0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x12, 0x1b, 0x2e, 0x72,
	0x65, 0x76, 0x69, 0x65, 0x77, 0x2e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69,
	0x65, 0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x72, 0x65, 0x76, 0x69,
	0x65, 0x77, 0x2e, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x22, 0x00, 0x12, 0x45, 0x0a, 0x0c, 0x44,
	0x65, 0x6c, 0x65, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69, 0x65, 0x77, 0x12, 0x1b, 0x2e, 0x72, 0x65,
	0x76, 0x69, 0x65, 0x77, 0x2e, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x52, 0x65, 0x76, 0x69, 0x65,
	0x77, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79,
	0x22, 0x00, 0x42, 0x2e, 0x5a, 0x2c, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d,
	0x2f, 0x6b, 0x6e, 0x67, 0x6e, 0x6b, 0x67, 0x2f, 0x66, 0x6f, 0x64, 0x65, 0x72, 0x65, 0x65, 0x2f,
	0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x72, 0x65, 0x76, 0x69,
	0x65, 0x77, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_review_proto_rawDescOnce sync.Once
	file_review_proto_rawDescData = file_review_proto_rawDesc
)

func file_review_proto_rawDescGZIP() []byte {
	file_review_proto_rawDescOnce.Do(func() {
		file_review_proto_rawDescData = protoimpl.X.CompressGZIP(file_review_proto_rawDescData)
	})
	return file_review_proto_rawDescData
}

var file_review_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_review_proto_goTypes = []interface{}{
	(*ListReviewsRequest)(nil),           // 0: review.ListReviewsRequest
	(*ListReviewsByUsernameRequest)(nil), // 1: review.ListReviewsByUsernameRequest
	(*GetReviewByIdRequest)(nil),         // 2: review.GetReviewByIdRequest
	(*CreateReviewRequest)(nil),          // 3: review.CreateReviewRequest
	(*UpdateReviewRequest)(nil),          // 4: review.UpdateReviewRequest
	(*DeleteReviewRequest)(nil),          // 5: review.DeleteReviewRequest
	(*Review)(nil),                       // 6: review.Review
	(*Author)(nil),                       // 7: review.Author
	(*ReviewList)(nil),                   // 8: review.ReviewList
	(*emptypb.Empty)(nil),                // 9: google.protobuf.Empty
}
var file_review_proto_depIdxs = []int32{
	7,  // 0: review.Review.user:type_name -> review.Author
	6,  // 1: review.ReviewList.reviews:type_name -> review.Review
	0,  // 2: review.ReviewService.ListReviews:input_type -> review.ListReviewsRequest
	0,  // 3: review.ReviewService.ListMyReviews:input_type -> review.ListReviewsRequest
	1,  // 4: review.ReviewService.ListReviewsByUsername:input_type -> review.ListReviewsByUsernameRequest
	2,  // 5: review.ReviewService.GetReviewById:input_type -> review.GetReviewByIdRequest
	2,  // 6: review.ReviewService.GetMyReviewById:input_type -> review.GetReviewByIdRequest
	3,  // 7: review.ReviewService.CreateReview:input_type -> review.CreateReviewRequest
	4,  // 8: review.ReviewService.UpdateReview:input_type -> review.UpdateReviewRequest
	5,  // 9: review.ReviewService.DeleteReview:input_type -> review.DeleteReviewRequest
	8,  // 10: review.ReviewService.ListReviews:output_type -> review.ReviewList
	8,  // 11: review.ReviewService.ListMyReviews:output_type -> review.ReviewList
	8,  // 12: review.ReviewService.ListReviewsByUsername:output_type -> review.ReviewList
	6,  // 13: review.ReviewService.GetReviewById:output_type -> review.Review
	6,  // 14: review.ReviewService.GetMyReviewById:output_type -> review.Review
	6,  // 15: review.ReviewService.CreateReview:output_type -> review.Review
	6,  // 16: review.ReviewService.UpdateReview:output_type -> review.Review
	9,  // 17: review.ReviewService.DeleteReview:output_type -> google.protobuf.Empty
	10, // [10:18] is the sub-list for method output_type
	2,  // [2:10] is the sub-list for method input_type
	2,  // [2:2] is the sub-list for extension type_name
	2,  // [2:2] is the sub-list for extension extendee
	0,  // [0:2] is the sub-list for field type_name
}

func init() { file_review_proto_init() }
func file_review_proto_init() {
	if File_review_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_review_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListReviewsRequest); i {
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
		file_review_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListReviewsByUsernameRequest); i {
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
		file_review_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetReviewByIdRequest); i {
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
		file_review_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateReviewRequest); i {
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
		file_review_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateReviewRequest); i {
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
		file_review_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeleteReviewRequest); i {
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
		file_review_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Review); i {
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
		file_review_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Author); i {
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
		file_review_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ReviewList); i {
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
			RawDescriptor: file_review_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_review_proto_goTypes,
		DependencyIndexes: file_review_proto_depIdxs,
		MessageInfos:      file_review_proto_msgTypes,
	}.Build()
	File_review_proto = out.File
	file_review_proto_rawDesc = nil
	file_review_proto_goTypes = nil
	file_review_proto_depIdxs = nil
}
