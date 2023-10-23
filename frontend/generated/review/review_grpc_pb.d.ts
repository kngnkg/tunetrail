// GENERATED CODE -- DO NOT EDIT!

// package: review
// file: review.proto

import * as review_pb from "./review_pb";
import * as grpc from "@grpc/grpc-js";

interface IReviewServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  create: grpc.MethodDefinition<review_pb.CreateRequest, review_pb.ReviewReply>;
}

export const ReviewServiceService: IReviewServiceService;

export interface IReviewServiceServer extends grpc.UntypedServiceImplementation {
  create: grpc.handleUnaryCall<review_pb.CreateRequest, review_pb.ReviewReply>;
}

export class ReviewServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  create(argument: review_pb.CreateRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  create(argument: review_pb.CreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  create(argument: review_pb.CreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
}
