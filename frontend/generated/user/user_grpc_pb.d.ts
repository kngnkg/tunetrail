// GENERATED CODE -- DO NOT EDIT!

// package: user
// file: user.proto

import * as user_pb from "./user_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUserById: grpc.MethodDefinition<user_pb.GetByIdRequest, user_pb.UserReply>;
  createUser: grpc.MethodDefinition<user_pb.CreateRequest, user_pb.UserReply>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  getUserById: grpc.handleUnaryCall<user_pb.GetByIdRequest, user_pb.UserReply>;
  createUser: grpc.handleUnaryCall<user_pb.CreateRequest, user_pb.UserReply>;
}

export class UserServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getUserById(argument: user_pb.GetByIdRequest, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  getUserById(argument: user_pb.GetByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  getUserById(argument: user_pb.GetByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateRequest, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
  createUser(argument: user_pb.CreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserReply>): grpc.ClientUnaryCall;
}
