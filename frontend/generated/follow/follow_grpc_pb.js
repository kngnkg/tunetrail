// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var follow_pb = require('./follow_pb.js');

function serialize_follow_FollowRequest(arg) {
  if (!(arg instanceof follow_pb.FollowRequest)) {
    throw new Error('Expected argument of type follow.FollowRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_FollowRequest(buffer_arg) {
  return follow_pb.FollowRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_LookupRelationshipRequest(arg) {
  if (!(arg instanceof follow_pb.LookupRelationshipRequest)) {
    throw new Error('Expected argument of type follow.LookupRelationshipRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_LookupRelationshipRequest(buffer_arg) {
  return follow_pb.LookupRelationshipRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_RelationshipResponse(arg) {
  if (!(arg instanceof follow_pb.RelationshipResponse)) {
    throw new Error('Expected argument of type follow.RelationshipResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_RelationshipResponse(buffer_arg) {
  return follow_pb.RelationshipResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_RelationshipResponseList(arg) {
  if (!(arg instanceof follow_pb.RelationshipResponseList)) {
    throw new Error('Expected argument of type follow.RelationshipResponseList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_RelationshipResponseList(buffer_arg) {
  return follow_pb.RelationshipResponseList.deserializeBinary(new Uint8Array(buffer_arg));
}


var FollowServiceService = exports.FollowServiceService = {
  lookupRelationships: {
    path: '/follow.FollowService/LookupRelationships',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.LookupRelationshipRequest,
    responseType: follow_pb.RelationshipResponseList,
    requestSerialize: serialize_follow_LookupRelationshipRequest,
    requestDeserialize: deserialize_follow_LookupRelationshipRequest,
    responseSerialize: serialize_follow_RelationshipResponseList,
    responseDeserialize: deserialize_follow_RelationshipResponseList,
  },
  follow: {
    path: '/follow.FollowService/Follow',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.FollowRequest,
    responseType: follow_pb.RelationshipResponse,
    requestSerialize: serialize_follow_FollowRequest,
    requestDeserialize: deserialize_follow_FollowRequest,
    responseSerialize: serialize_follow_RelationshipResponse,
    responseDeserialize: deserialize_follow_RelationshipResponse,
  },
};

exports.FollowServiceClient = grpc.makeGenericClientConstructor(FollowServiceService);
