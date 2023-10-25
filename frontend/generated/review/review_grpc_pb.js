// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var review_pb = require('./review_pb.js');
var user_pb = require('./user_pb.js');
var album_pb = require('./album_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_CreateRequest(arg) {
  if (!(arg instanceof review_pb.CreateRequest)) {
    throw new Error('Expected argument of type review.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_CreateRequest(buffer_arg) {
  return review_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_DeleteReviewRequest(arg) {
  if (!(arg instanceof review_pb.DeleteReviewRequest)) {
    throw new Error('Expected argument of type review.DeleteReviewRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_DeleteReviewRequest(buffer_arg) {
  return review_pb.DeleteReviewRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_GetByIdRequest(arg) {
  if (!(arg instanceof review_pb.GetByIdRequest)) {
    throw new Error('Expected argument of type review.GetByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_GetByIdRequest(buffer_arg) {
  return review_pb.GetByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_ListReviewsRequest(arg) {
  if (!(arg instanceof review_pb.ListReviewsRequest)) {
    throw new Error('Expected argument of type review.ListReviewsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_ListReviewsRequest(buffer_arg) {
  return review_pb.ListReviewsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_ReviewListReply(arg) {
  if (!(arg instanceof review_pb.ReviewListReply)) {
    throw new Error('Expected argument of type review.ReviewListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_ReviewListReply(buffer_arg) {
  return review_pb.ReviewListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_ReviewReply(arg) {
  if (!(arg instanceof review_pb.ReviewReply)) {
    throw new Error('Expected argument of type review.ReviewReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_ReviewReply(buffer_arg) {
  return review_pb.ReviewReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_UpdateRequest(arg) {
  if (!(arg instanceof review_pb.UpdateRequest)) {
    throw new Error('Expected argument of type review.UpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_UpdateRequest(buffer_arg) {
  return review_pb.UpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ReviewServiceService = exports.ReviewServiceService = {
  listReviews: {
    path: '/review.ReviewService/ListReviews',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.ListReviewsRequest,
    responseType: review_pb.ReviewListReply,
    requestSerialize: serialize_review_ListReviewsRequest,
    requestDeserialize: deserialize_review_ListReviewsRequest,
    responseSerialize: serialize_review_ReviewListReply,
    responseDeserialize: deserialize_review_ReviewListReply,
  },
  getReviewById: {
    path: '/review.ReviewService/GetReviewById',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.GetByIdRequest,
    responseType: review_pb.ReviewReply,
    requestSerialize: serialize_review_GetByIdRequest,
    requestDeserialize: deserialize_review_GetByIdRequest,
    responseSerialize: serialize_review_ReviewReply,
    responseDeserialize: deserialize_review_ReviewReply,
  },
  createReview: {
    path: '/review.ReviewService/CreateReview',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.CreateRequest,
    responseType: review_pb.ReviewReply,
    requestSerialize: serialize_review_CreateRequest,
    requestDeserialize: deserialize_review_CreateRequest,
    responseSerialize: serialize_review_ReviewReply,
    responseDeserialize: deserialize_review_ReviewReply,
  },
  updateReview: {
    path: '/review.ReviewService/UpdateReview',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.UpdateRequest,
    responseType: review_pb.ReviewReply,
    requestSerialize: serialize_review_UpdateRequest,
    requestDeserialize: deserialize_review_UpdateRequest,
    responseSerialize: serialize_review_ReviewReply,
    responseDeserialize: deserialize_review_ReviewReply,
  },
  deleteReview: {
    path: '/review.ReviewService/DeleteReview',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.DeleteReviewRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_review_DeleteReviewRequest,
    requestDeserialize: deserialize_review_DeleteReviewRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.ReviewServiceClient = grpc.makeGenericClientConstructor(ReviewServiceService);
