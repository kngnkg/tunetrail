// GENERATED CODE -- DO NOT EDIT!

// package: follow
// file: follow.proto

import * as follow_pb from "./follow_pb";
import * as grpc from "@grpc/grpc-js";

interface IFollowServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  lookupRelationships: grpc.MethodDefinition<follow_pb.LookupRelationshipRequest, follow_pb.RelationshipResponseList>;
  follow: grpc.MethodDefinition<follow_pb.FollowRequest, follow_pb.RelationshipResponse>;
}

export const FollowServiceService: IFollowServiceService;

export interface IFollowServiceServer extends grpc.UntypedServiceImplementation {
  lookupRelationships: grpc.handleUnaryCall<follow_pb.LookupRelationshipRequest, follow_pb.RelationshipResponseList>;
  follow: grpc.handleUnaryCall<follow_pb.FollowRequest, follow_pb.RelationshipResponse>;
}

export class FollowServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  lookupRelationships(argument: follow_pb.LookupRelationshipRequest, callback: grpc.requestCallback<follow_pb.RelationshipResponseList>): grpc.ClientUnaryCall;
  lookupRelationships(argument: follow_pb.LookupRelationshipRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.RelationshipResponseList>): grpc.ClientUnaryCall;
  lookupRelationships(argument: follow_pb.LookupRelationshipRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.RelationshipResponseList>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, callback: grpc.requestCallback<follow_pb.RelationshipResponse>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.RelationshipResponse>): grpc.ClientUnaryCall;
  follow(argument: follow_pb.FollowRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<follow_pb.RelationshipResponse>): grpc.ClientUnaryCall;
}
