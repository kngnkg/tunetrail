// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var review_pb = require('./review_pb.js');
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

function serialize_review_CreateReviewRequest(arg) {
  if (!(arg instanceof review_pb.CreateReviewRequest)) {
    throw new Error('Expected argument of type review.CreateReviewRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_CreateReviewRequest(buffer_arg) {
  return review_pb.CreateReviewRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_review_GetReviewByIdRequest(arg) {
  if (!(arg instanceof review_pb.GetReviewByIdRequest)) {
    throw new Error('Expected argument of type review.GetReviewByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_GetReviewByIdRequest(buffer_arg) {
  return review_pb.GetReviewByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_review_ListReviewsByUsernameRequest(arg) {
  if (!(arg instanceof review_pb.ListReviewsByUsernameRequest)) {
    throw new Error('Expected argument of type review.ListReviewsByUsernameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_ListReviewsByUsernameRequest(buffer_arg) {
  return review_pb.ListReviewsByUsernameRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_review_Review(arg) {
  if (!(arg instanceof review_pb.Review)) {
    throw new Error('Expected argument of type review.Review');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_Review(buffer_arg) {
  return review_pb.Review.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_review_UpdateReviewRequest(arg) {
  if (!(arg instanceof review_pb.UpdateReviewRequest)) {
    throw new Error('Expected argument of type review.UpdateReviewRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_UpdateReviewRequest(buffer_arg) {
  return review_pb.UpdateReviewRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ReviewServiceService = exports.ReviewServiceService = {
  listReviews: {
    path: '/review.ReviewService/ListReviews',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.ListReviewsRequest,
    responseType: review_pb.ReviewList,
    requestSerialize: serialize_review_ListReviewsRequest,
    requestDeserialize: deserialize_review_ListReviewsRequest,
    responseSerialize: serialize_review_ReviewList,
    responseDeserialize: deserialize_review_ReviewList,
  },
  listMyReviews: {
    path: '/review.ReviewService/ListMyReviews',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.ListReviewsRequest,
    responseType: review_pb.ReviewList,
    requestSerialize: serialize_review_ListReviewsRequest,
    requestDeserialize: deserialize_review_ListReviewsRequest,
    responseSerialize: serialize_review_ReviewList,
    responseDeserialize: deserialize_review_ReviewList,
  },
  listReviewsByUsername: {
    path: '/review.ReviewService/ListReviewsByUsername',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.ListReviewsByUsernameRequest,
    responseType: review_pb.ReviewList,
    requestSerialize: serialize_review_ListReviewsByUsernameRequest,
    requestDeserialize: deserialize_review_ListReviewsByUsernameRequest,
    responseSerialize: serialize_review_ReviewList,
    responseDeserialize: deserialize_review_ReviewList,
  },
  getReviewById: {
    path: '/review.ReviewService/GetReviewById',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.GetReviewByIdRequest,
    responseType: review_pb.Review,
    requestSerialize: serialize_review_GetReviewByIdRequest,
    requestDeserialize: deserialize_review_GetReviewByIdRequest,
    responseSerialize: serialize_review_Review,
    responseDeserialize: deserialize_review_Review,
  },
  getMyReviewById: {
    path: '/review.ReviewService/GetMyReviewById',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.GetReviewByIdRequest,
    responseType: review_pb.Review,
    requestSerialize: serialize_review_GetReviewByIdRequest,
    requestDeserialize: deserialize_review_GetReviewByIdRequest,
    responseSerialize: serialize_review_Review,
    responseDeserialize: deserialize_review_Review,
  },
  createReview: {
    path: '/review.ReviewService/CreateReview',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.CreateReviewRequest,
    responseType: review_pb.Review,
    requestSerialize: serialize_review_CreateReviewRequest,
    requestDeserialize: deserialize_review_CreateReviewRequest,
    responseSerialize: serialize_review_Review,
    responseDeserialize: deserialize_review_Review,
  },
  updateReview: {
    path: '/review.ReviewService/UpdateReview',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.UpdateReviewRequest,
    responseType: review_pb.Review,
    requestSerialize: serialize_review_UpdateReviewRequest,
    requestDeserialize: deserialize_review_UpdateReviewRequest,
    responseSerialize: serialize_review_Review,
    responseDeserialize: deserialize_review_Review,
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
