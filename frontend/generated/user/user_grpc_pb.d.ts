// GENERATED CODE -- DO NOT EDIT!

// package: user
// file: user.proto

import * as user_pb from "./user_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listUsers: grpc.MethodDefinition<user_pb.ListUsersRequest, user_pb.UserList>;
  getUserByUsername: grpc.MethodDefinition<user_pb.GetUserByUsernameRequest, user_pb.User>;
  createUser: grpc.MethodDefinition<user_pb.CreateUserRequest, user_pb.User>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  listUsers: grpc.handleUnaryCall<user_pb.ListUsersRequest, user_pb.UserList>;
  getUserByUsername: grpc.handleUnaryCall<user_pb.GetUserByUsernameRequest, user_pb.User>;
  createUser: grpc.handleUnaryCall<user_pb.CreateUserRequest, user_pb.User>;
}

export class UserServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  listUsers(argument: user_pb.ListUsersRequest, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listUsers(argument: user_pb.ListUsersRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listUsers(argument: user_pb.ListUsersRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  getUserByUsername(argument: user_pb.GetUserByUsernameRequest, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
  getUserByUsername(argument: user_pb.GetUserByUsernameRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
  getUserByUsername(argument: user_pb.GetUserByUsernameRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.User>): grpc.ClientUnaryCall;
}
