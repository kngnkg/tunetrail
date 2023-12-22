// GENERATED CODE -- DO NOT EDIT!

// package: like
// file: like.proto

import * as like_pb from "./like_pb";
import * as review_pb from "./review_pb";
import * as grpc from "@grpc/grpc-js";

interface ILikeServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getLike: grpc.MethodDefinition<like_pb.LikeRequest, like_pb.LikeResponse>;
  listLikedReviews: grpc.MethodDefinition<like_pb.ListLikedReviewsRequest, review_pb.ReviewList>;
  like: grpc.MethodDefinition<like_pb.LikeRequest, like_pb.LikeResponse>;
  unlike: grpc.MethodDefinition<like_pb.LikeRequest, like_pb.LikeResponse>;
}

export const LikeServiceService: ILikeServiceService;

export interface ILikeServiceServer extends grpc.UntypedServiceImplementation {
  getLike: grpc.handleUnaryCall<like_pb.LikeRequest, like_pb.LikeResponse>;
  listLikedReviews: grpc.handleUnaryCall<like_pb.ListLikedReviewsRequest, review_pb.ReviewList>;
  like: grpc.handleUnaryCall<like_pb.LikeRequest, like_pb.LikeResponse>;
  unlike: grpc.handleUnaryCall<like_pb.LikeRequest, like_pb.LikeResponse>;
}

export class LikeServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getLike(argument: like_pb.LikeRequest, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  getLike(argument: like_pb.LikeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  getLike(argument: like_pb.LikeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  listLikedReviews(argument: like_pb.ListLikedReviewsRequest, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listLikedReviews(argument: like_pb.ListLikedReviewsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  listLikedReviews(argument: like_pb.ListLikedReviewsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<review_pb.ReviewList>): grpc.ClientUnaryCall;
  like(argument: like_pb.LikeRequest, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  like(argument: like_pb.LikeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  like(argument: like_pb.LikeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  unlike(argument: like_pb.LikeRequest, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  unlike(argument: like_pb.LikeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
  unlike(argument: like_pb.LikeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<like_pb.LikeResponse>): grpc.ClientUnaryCall;
}
