// GENERATED CODE -- DO NOT EDIT!

// package: review
// file: review.proto

import * as review_pb from "./review_pb";
import * as grpc from "@grpc/grpc-js";

interface IReviewServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getReviewById: grpc.MethodDefinition<review_pb.GetByIdRequest, review_pb.ReviewReply>;
  createReview: grpc.MethodDefinition<review_pb.CreateRequest, review_pb.ReviewReply>;
}

export const ReviewServiceService: IReviewServiceService;

export interface IReviewServiceServer extends grpc.UntypedServiceImplementation {
  getReviewById: grpc.handleUnaryCall<review_pb.GetByIdRequest, review_pb.ReviewReply>;
  createReview: grpc.handleUnaryCall<review_pb.CreateRequest, review_pb.ReviewReply>;
}

export class ReviewServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getReviewById(argument: review_pb.GetByIdRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
}
