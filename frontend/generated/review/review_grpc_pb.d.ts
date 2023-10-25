// GENERATED CODE -- DO NOT EDIT!

// package: review
// file: review.proto

import * as review_pb from "./review_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "@grpc/grpc-js";

interface IReviewServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listReviews: grpc.MethodDefinition<review_pb.ListReviewsRequest, review_pb.ReviewListReply>;
  getReviewById: grpc.MethodDefinition<review_pb.GetByIdRequest, review_pb.ReviewReply>;
  createReview: grpc.MethodDefinition<review_pb.CreateRequest, review_pb.ReviewReply>;
  updateReview: grpc.MethodDefinition<review_pb.UpdateRequest, review_pb.ReviewReply>;
  deleteReview: grpc.MethodDefinition<review_pb.DeleteReviewRequest, google_protobuf_empty_pb.Empty>;
}

export const ReviewServiceService: IReviewServiceService;

export interface IReviewServiceServer extends grpc.UntypedServiceImplementation {
  listReviews: grpc.handleUnaryCall<review_pb.ListReviewsRequest, review_pb.ReviewListReply>;
  getReviewById: grpc.handleUnaryCall<review_pb.GetByIdRequest, review_pb.ReviewReply>;
  createReview: grpc.handleUnaryCall<review_pb.CreateRequest, review_pb.ReviewReply>;
  updateReview: grpc.handleUnaryCall<review_pb.UpdateRequest, review_pb.ReviewReply>;
  deleteReview: grpc.handleUnaryCall<review_pb.DeleteReviewRequest, google_protobuf_empty_pb.Empty>;
}

export class ReviewServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  listReviews(argument: review_pb.ListReviewsRequest, callback: grpc.requestCallback<review_pb.ReviewListReply>): grpc.ClientUnaryCall;
  listReviews(argument: review_pb.ListReviewsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewListReply>): grpc.ClientUnaryCall;
  listReviews(argument: review_pb.ListReviewsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewListReply>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetByIdRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateRequest, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewReply>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
}
