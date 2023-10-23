// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var review_pb = require('./review_pb.js');
var user_pb = require('./user_pb.js');
var album_pb = require('./album_pb.js');

function serialize_review_CreateRequest(arg) {
  if (!(arg instanceof review_pb.CreateRequest)) {
    throw new Error('Expected argument of type review.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_review_CreateRequest(buffer_arg) {
  return review_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
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


var ReviewServiceService = exports.ReviewServiceService = {
  create: {
    path: '/review.ReviewService/Create',
    requestStream: false,
    responseStream: false,
    requestType: review_pb.CreateRequest,
    responseType: review_pb.ReviewReply,
    requestSerialize: serialize_review_CreateRequest,
    requestDeserialize: deserialize_review_CreateRequest,
    responseSerialize: serialize_review_ReviewReply,
    responseDeserialize: deserialize_review_ReviewReply,
  },
};

exports.ReviewServiceClient = grpc.makeGenericClientConstructor(ReviewServiceService);
