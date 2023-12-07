// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.24.4
// source: follow.proto

package follow

import (
	context "context"
	user "github.com/kngnkg/foderee/backend/gen/user"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	FollowService_ListFollows_FullMethodName    = "/follow.FollowService/ListFollows"
	FollowService_ListFollowings_FullMethodName = "/follow.FollowService/ListFollowings"
	FollowService_ListFollowers_FullMethodName  = "/follow.FollowService/ListFollowers"
	FollowService_Follow_FullMethodName         = "/follow.FollowService/Follow"
	FollowService_Unfollow_FullMethodName       = "/follow.FollowService/Unfollow"
)

// FollowServiceClient is the client API for FollowService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type FollowServiceClient interface {
	ListFollows(ctx context.Context, in *ListFollowsRequest, opts ...grpc.CallOption) (*FollowResponseList, error)
	ListFollowings(ctx context.Context, in *user.ListUsersRequest, opts ...grpc.CallOption) (*user.UserList, error)
	ListFollowers(ctx context.Context, in *user.ListUsersRequest, opts ...grpc.CallOption) (*user.UserList, error)
	Follow(ctx context.Context, in *FollowRequest, opts ...grpc.CallOption) (*FollowResponse, error)
	Unfollow(ctx context.Context, in *FollowRequest, opts ...grpc.CallOption) (*FollowResponse, error)
}

type followServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewFollowServiceClient(cc grpc.ClientConnInterface) FollowServiceClient {
	return &followServiceClient{cc}
}

func (c *followServiceClient) ListFollows(ctx context.Context, in *ListFollowsRequest, opts ...grpc.CallOption) (*FollowResponseList, error) {
	out := new(FollowResponseList)
	err := c.cc.Invoke(ctx, FollowService_ListFollows_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *followServiceClient) ListFollowings(ctx context.Context, in *user.ListUsersRequest, opts ...grpc.CallOption) (*user.UserList, error) {
	out := new(user.UserList)
	err := c.cc.Invoke(ctx, FollowService_ListFollowings_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *followServiceClient) ListFollowers(ctx context.Context, in *user.ListUsersRequest, opts ...grpc.CallOption) (*user.UserList, error) {
	out := new(user.UserList)
	err := c.cc.Invoke(ctx, FollowService_ListFollowers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *followServiceClient) Follow(ctx context.Context, in *FollowRequest, opts ...grpc.CallOption) (*FollowResponse, error) {
	out := new(FollowResponse)
	err := c.cc.Invoke(ctx, FollowService_Follow_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *followServiceClient) Unfollow(ctx context.Context, in *FollowRequest, opts ...grpc.CallOption) (*FollowResponse, error) {
	out := new(FollowResponse)
	err := c.cc.Invoke(ctx, FollowService_Unfollow_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// FollowServiceServer is the server API for FollowService service.
// All implementations must embed UnimplementedFollowServiceServer
// for forward compatibility
type FollowServiceServer interface {
	ListFollows(context.Context, *ListFollowsRequest) (*FollowResponseList, error)
	ListFollowings(context.Context, *user.ListUsersRequest) (*user.UserList, error)
	ListFollowers(context.Context, *user.ListUsersRequest) (*user.UserList, error)
	Follow(context.Context, *FollowRequest) (*FollowResponse, error)
	Unfollow(context.Context, *FollowRequest) (*FollowResponse, error)
	mustEmbedUnimplementedFollowServiceServer()
}

// UnimplementedFollowServiceServer must be embedded to have forward compatible implementations.
type UnimplementedFollowServiceServer struct {
}

func (UnimplementedFollowServiceServer) ListFollows(context.Context, *ListFollowsRequest) (*FollowResponseList, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListFollows not implemented")
}
func (UnimplementedFollowServiceServer) ListFollowings(context.Context, *user.ListUsersRequest) (*user.UserList, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListFollowings not implemented")
}
func (UnimplementedFollowServiceServer) ListFollowers(context.Context, *user.ListUsersRequest) (*user.UserList, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListFollowers not implemented")
}
func (UnimplementedFollowServiceServer) Follow(context.Context, *FollowRequest) (*FollowResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Follow not implemented")
}
func (UnimplementedFollowServiceServer) Unfollow(context.Context, *FollowRequest) (*FollowResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Unfollow not implemented")
}
func (UnimplementedFollowServiceServer) mustEmbedUnimplementedFollowServiceServer() {}

// UnsafeFollowServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to FollowServiceServer will
// result in compilation errors.
type UnsafeFollowServiceServer interface {
	mustEmbedUnimplementedFollowServiceServer()
}

func RegisterFollowServiceServer(s grpc.ServiceRegistrar, srv FollowServiceServer) {
	s.RegisterService(&FollowService_ServiceDesc, srv)
}

func _FollowService_ListFollows_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListFollowsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FollowServiceServer).ListFollows(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: FollowService_ListFollows_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FollowServiceServer).ListFollows(ctx, req.(*ListFollowsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FollowService_ListFollowings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(user.ListUsersRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FollowServiceServer).ListFollowings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: FollowService_ListFollowings_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FollowServiceServer).ListFollowings(ctx, req.(*user.ListUsersRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FollowService_ListFollowers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(user.ListUsersRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FollowServiceServer).ListFollowers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: FollowService_ListFollowers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FollowServiceServer).ListFollowers(ctx, req.(*user.ListUsersRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FollowService_Follow_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FollowRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FollowServiceServer).Follow(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: FollowService_Follow_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FollowServiceServer).Follow(ctx, req.(*FollowRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FollowService_Unfollow_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FollowRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FollowServiceServer).Unfollow(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: FollowService_Unfollow_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FollowServiceServer).Unfollow(ctx, req.(*FollowRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// FollowService_ServiceDesc is the grpc.ServiceDesc for FollowService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var FollowService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "follow.FollowService",
	HandlerType: (*FollowServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListFollows",
			Handler:    _FollowService_ListFollows_Handler,
		},
		{
			MethodName: "ListFollowings",
			Handler:    _FollowService_ListFollowings_Handler,
		},
		{
			MethodName: "ListFollowers",
			Handler:    _FollowService_ListFollowers_Handler,
		},
		{
			MethodName: "Follow",
			Handler:    _FollowService_Follow_Handler,
		},
		{
			MethodName: "Unfollow",
			Handler:    _FollowService_Unfollow_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "follow.proto",
}
