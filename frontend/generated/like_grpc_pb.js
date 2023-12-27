// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var like_pb = require('./like_pb.js');
var review_pb = require('./review_pb.js');

function serialize_like_LikeRequest(arg) {
  if (!(arg instanceof like_pb.LikeRequest)) {
    throw new Error('Expected argument of type like.LikeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_like_LikeRequest(buffer_arg) {
  return like_pb.LikeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_like_LikeResponse(arg) {
  if (!(arg instanceof like_pb.LikeResponse)) {
    throw new Error('Expected argument of type like.LikeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_like_LikeResponse(buffer_arg) {
  return like_pb.LikeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_like_ListLikedReviewsRequest(arg) {
  if (!(arg instanceof like_pb.ListLikedReviewsRequest)) {
    throw new Error('Expected argument of type like.ListLikedReviewsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_like_ListLikedReviewsRequest(buffer_arg) {
  return like_pb.ListLikedReviewsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_ReviewList(arg) {
  if (!(arg instanceof review_pb.ReviewList)) {
    throw new Error('Expected argument of type review.ReviewList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_ReviewList(buffer_arg) {
  return review_pb.ReviewList.deserializeBinary(new Uint8Array(buffer_arg));
}


var LikeServiceService = exports.LikeServiceService = {
  getLike: {
    path: '/like.LikeService/GetLike',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.LikeRequest,
    responseType: like_pb.LikeResponse,
    requestSerialize: serialize_like_LikeRequest,
    requestDeserialize: deserialize_like_LikeRequest,
    responseSerialize: serialize_like_LikeResponse,
    responseDeserialize: deserialize_like_LikeResponse,
  },
  listLikedReviews: {
    path: '/like.LikeService/ListLikedReviews',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.ListLikedReviewsRequest,
    responseType: review_pb.ReviewList,
    requestSerialize: serialize_like_ListLikedReviewsRequest,
    requestDeserialize: deserialize_like_ListLikedReviewsRequest,
    responseSerialize: serialize_review_ReviewList,
    responseDeserialize: deserialize_review_ReviewList,
  },
  like: {
    path: '/like.LikeService/Like',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.LikeRequest,
    responseType: like_pb.LikeResponse,
    requestSerialize: serialize_like_LikeRequest,
    requestDeserialize: deserialize_like_LikeRequest,
    responseSerialize: serialize_like_LikeResponse,
    responseDeserialize: deserialize_like_LikeResponse,
  },
  unlike: {
    path: '/like.LikeService/Unlike',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.LikeRequest,
    responseType: like_pb.LikeResponse,
    requestSerialize: serialize_like_LikeRequest,
    requestDeserialize: deserialize_like_LikeRequest,
    responseSerialize: serialize_like_LikeResponse,
    responseDeserialize: deserialize_like_LikeResponse,
  },
};

exports.LikeServiceClient = grpc.makeGenericClientConstructor(LikeServiceService);
