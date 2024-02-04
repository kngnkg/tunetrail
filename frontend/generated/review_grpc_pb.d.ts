// GENERATED CODE -- DO NOT EDIT!

// package: review
// file: review.proto

import * as review_pb from "./review_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "@grpc/grpc-js";

interface IReviewServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listReviews: grpc.MethodDefinition<review_pb.ListReviewsRequest, review_pb.ReviewList>;
  listMyReviews: grpc.MethodDefinition<review_pb.ListReviewsRequest, review_pb.ReviewList>;
  listReviewsByUsername: grpc.MethodDefinition<review_pb.ListReviewsByUsernameRequest, review_pb.ReviewList>;
  getReviewById: grpc.MethodDefinition<review_pb.GetReviewByIdRequest, review_pb.Review>;
  getMyReviewById: grpc.MethodDefinition<review_pb.GetReviewByIdRequest, review_pb.Review>;
  createReview: grpc.MethodDefinition<review_pb.CreateReviewRequest, review_pb.Review>;
  updateReview: grpc.MethodDefinition<review_pb.UpdateReviewRequest, review_pb.Review>;
  deleteReview: grpc.MethodDefinition<review_pb.DeleteReviewRequest, google_protobuf_empty_pb.Empty>;
}

export const ReviewServiceService: IReviewServiceService;

export interface IReviewServiceServer extends grpc.UntypedServiceImplementation {
  listReviews: grpc.handleUnaryCall<review_pb.ListReviewsRequest, review_pb.ReviewList>;
  listMyReviews: grpc.handleUnaryCall<review_pb.ListReviewsRequest, review_pb.ReviewList>;
  listReviewsByUsername: grpc.handleUnaryCall<review_pb.ListReviewsByUsernameRequest, review_pb.ReviewList>;
  getReviewById: grpc.handleUnaryCall<review_pb.GetReviewByIdRequest, review_pb.Review>;
  getMyReviewById: grpc.handleUnaryCall<review_pb.GetReviewByIdRequest, review_pb.Review>;
  createReview: grpc.handleUnaryCall<review_pb.CreateReviewRequest, review_pb.Review>;
  updateReview: grpc.handleUnaryCall<review_pb.UpdateReviewRequest, review_pb.Review>;
  deleteReview: grpc.handleUnaryCall<review_pb.DeleteReviewRequest, google_protobuf_empty_pb.Empty>;
}

export class ReviewServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  listReviews(argument: review_pb.ListReviewsRequest, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listReviews(argument: review_pb.ListReviewsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listReviews(argument: review_pb.ListReviewsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listMyReviews(argument: review_pb.ListReviewsRequest, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listMyReviews(argument: review_pb.ListReviewsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listMyReviews(argument: review_pb.ListReviewsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listReviewsByUsername(argument: review_pb.ListReviewsByUsernameRequest, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listReviewsByUsername(argument: review_pb.ListReviewsByUsernameRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listReviewsByUsername(argument: review_pb.ListReviewsByUsernameRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetReviewByIdRequest, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetReviewByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  getReviewById(argument: review_pb.GetReviewByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  getMyReviewById(argument: review_pb.GetReviewByIdRequest, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  getMyReviewById(argument: review_pb.GetReviewByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  getMyReviewById(argument: review_pb.GetReviewByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateReviewRequest, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateReviewRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  createReview(argument: review_pb.CreateReviewRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateReviewRequest, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateReviewRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  updateReview(argument: review_pb.UpdateReviewRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.Review>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  deleteReview(argument: review_pb.DeleteReviewRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
}
