// GENERATED CODE -- DO NOT EDIT!

// package: follow
// file: follow.proto

import * as follow_pb from "./follow_pb";
import * as user_pb from "./user_pb";
import * as grpc from "@grpc/grpc-js";

interface IFollowServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listFollows: grpc.MethodDefinition<follow_pb.ListFollowsRequest, follow_pb.FollowResponseList>;
  listFollowings: grpc.MethodDefinition<user_pb.ListUsersRequest, user_pb.UserList>;
  listFollowers: grpc.MethodDefinition<user_pb.ListUsersRequest, user_pb.UserList>;
  follow: grpc.MethodDefinition<follow_pb.FollowRequest, follow_pb.FollowResponse>;
  unfollow: grpc.MethodDefinition<follow_pb.FollowRequest, follow_pb.FollowResponse>;
}

export const FollowServiceService: IFollowServiceService;

export interface IFollowServiceServer extends grpc.UntypedServiceImplementation {
  listFollows: grpc.handleUnaryCall<follow_pb.ListFollowsRequest, follow_pb.FollowResponseList>;
  listFollowings: grpc.handleUnaryCall<user_pb.ListUsersRequest, user_pb.UserList>;
  listFollowers: grpc.handleUnaryCall<user_pb.ListUsersRequest, user_pb.UserList>;
  follow: grpc.handleUnaryCall<follow_pb.FollowRequest, follow_pb.FollowResponse>;
  unfollow: grpc.handleUnaryCall<follow_pb.FollowRequest, follow_pb.FollowResponse>;
}

export class FollowServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  listFollows(argument: follow_pb.ListFollowsRequest, callback: grpc.requestCallback<follow_pb.FollowResponseList>): grpc.ClientUnaryCall;
  listFollows(argument: follow_pb.ListFollowsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponseList>): grpc.ClientUnaryCall;
  listFollows(argument: follow_pb.ListFollowsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponseList>): grpc.ClientUnaryCall;
  listFollowings(argument: user_pb.ListUsersRequest, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listFollowings(argument: user_pb.ListUsersRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listFollowings(argument: user_pb.ListUsersRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listFollowers(argument: user_pb.ListUsersRequest, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listFollowers(argument: user_pb.ListUsersRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  listFollowers(argument: user_pb.ListUsersRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserList>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
  unfollow(argument: follow_pb.FollowRequest, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
  unfollow(argument: follow_pb.FollowRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
  unfollow(argument: follow_pb.FollowRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.FollowResponse>): grpc.ClientUnaryCall;
}
