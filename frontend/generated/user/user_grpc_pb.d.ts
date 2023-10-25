// GENERATED CODE -- DO NOT EDIT!

// package: user
// file: user.proto

import * as user_pb from "./user_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listUsers: grpc.MethodDefinition<user_pb.ListUsersRequest, user_pb.UserListReply>;
  getUserById: grpc.MethodDefinition<user_pb.GetUserByIdRequest, user_pb.UserReply>;
  createUser: grpc.MethodDefinition<user_pb.CreateUserRequest, user_pb.UserReply>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  listUsers: grpc.handleUnaryCall<user_pb.ListUsersRequest, user_pb.UserListReply>;
  getUserById: grpc.handleUnaryCall<user_pb.GetUserByIdRequest, user_pb.UserReply>;
  createUser: grpc.handleUnaryCall<user_pb.CreateUserRequest, user_pb.UserReply>;
}

export class UserServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  listUsers(argument: user_pb.ListUsersRequest, callback: grpc.requestCallback<user_pb.UserListReply>): grpc.ClientUnaryCall;
  listUsers(argument: user_pb.ListUsersRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserListReply>): grpc.ClientUnaryCall;
  listUsers(argument: user_pb.ListUsersRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserListReply>): grpc.ClientUnaryCall;
  getUserById(argument: user_pb.GetUserByIdRequest, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  getUserById(argument: user_pb.GetUserByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  getUserById(argument: user_pb.GetUserByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
}
