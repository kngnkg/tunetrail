// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var follow_pb = require('./follow_pb.js');

function serialize_follow_LookupRelationshipRequest(arg) {
  if (!(arg instanceof follow_pb.LookupRelationshipRequest)) {
    throw new Error('Expected argument of type follow.LookupRelationshipRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_LookupRelationshipRequest(buffer_arg) {
  return follow_pb.LookupRelationshipRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_LookupRelationshipResponse(arg) {
  if (!(arg instanceof follow_pb.LookupRelationshipResponse)) {
    throw new Error('Expected argument of type follow.LookupRelationshipResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_LookupRelationshipResponse(buffer_arg) {
  return follow_pb.LookupRelationshipResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FollowServiceService = exports.FollowServiceService = {
  lookupRelationships: {
    path: '/follow.FollowService/LookupRelationships',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.LookupRelationshipRequest,
    responseType: follow_pb.LookupRelationshipResponse,
    requestSerialize: serialize_follow_LookupRelationshipRequest,
    requestDeserialize: deserialize_follow_LookupRelationshipRequest,
    responseSerialize: serialize_follow_LookupRelationshipResponse,
    responseDeserialize: deserialize_follow_LookupRelationshipResponse,
  },
};

exports.FollowServiceClient = grpc.makeGenericClientConstructor(FollowServiceService);
