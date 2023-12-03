// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var follow_pb = require('./follow_pb.js');
var user_pb = require('./user_pb.js');

function serialize_follow_FollowRequest(arg) {
  if (!(arg instanceof follow_pb.FollowRequest)) {
    throw new Error('Expected argument of type follow.FollowRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_FollowRequest(buffer_arg) {
  return follow_pb.FollowRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_FollowResponse(arg) {
  if (!(arg instanceof follow_pb.FollowResponse)) {
    throw new Error('Expected argument of type follow.FollowResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_FollowResponse(buffer_arg) {
  return follow_pb.FollowResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_FollowResponseList(arg) {
  if (!(arg instanceof follow_pb.FollowResponseList)) {
    throw new Error('Expected argument of type follow.FollowResponseList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_FollowResponseList(buffer_arg) {
  return follow_pb.FollowResponseList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_follow_ListFollowsRequest(arg) {
  if (!(arg instanceof follow_pb.ListFollowsRequest)) {
    throw new Error('Expected argument of type follow.ListFollowsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_follow_ListFollowsRequest(buffer_arg) {
  return follow_pb.ListFollowsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ListUsersRequest(arg) {
  if (!(arg instanceof user_pb.ListUsersRequest)) {
    throw new Error('Expected argument of type user.ListUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ListUsersRequest(buffer_arg) {
  return user_pb.ListUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserList(arg) {
  if (!(arg instanceof user_pb.UserList)) {
    throw new Error('Expected argument of type user.UserList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserList(buffer_arg) {
  return user_pb.UserList.deserializeBinary(new Uint8Array(buffer_arg));
}


var FollowServiceService = exports.FollowServiceService = {
  listFollows: {
    path: '/follow.FollowService/ListFollows',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.ListFollowsRequest,
    responseType: follow_pb.FollowResponseList,
    requestSerialize: serialize_follow_ListFollowsRequest,
    requestDeserialize: deserialize_follow_ListFollowsRequest,
    responseSerialize: serialize_follow_FollowResponseList,
    responseDeserialize: deserialize_follow_FollowResponseList,
  },
  listFollowings: {
    path: '/follow.FollowService/ListFollowings',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.ListUsersRequest,
    responseType: user_pb.UserList,
    requestSerialize: serialize_user_ListUsersRequest,
    requestDeserialize: deserialize_user_ListUsersRequest,
    responseSerialize: serialize_user_UserList,
    responseDeserialize: deserialize_user_UserList,
  },
  follow: {
    path: '/follow.FollowService/Follow',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.FollowRequest,
    responseType: follow_pb.FollowResponse,
    requestSerialize: serialize_follow_FollowRequest,
    requestDeserialize: deserialize_follow_FollowRequest,
    responseSerialize: serialize_follow_FollowResponse,
    responseDeserialize: deserialize_follow_FollowResponse,
  },
  unfollow: {
    path: '/follow.FollowService/Unfollow',
    requestStream: false,
    responseStream: false,
    requestType: follow_pb.FollowRequest,
    responseType: follow_pb.FollowResponse,
    requestSerialize: serialize_follow_FollowRequest,
    requestDeserialize: deserialize_follow_FollowRequest,
    responseSerialize: serialize_follow_FollowResponse,
    responseDeserialize: deserialize_follow_FollowResponse,
  },
};

exports.FollowServiceClient = grpc.makeGenericClientConstructor(FollowServiceService);
