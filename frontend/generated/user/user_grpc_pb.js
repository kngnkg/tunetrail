// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_user_CreateUserRequest(arg) {
  if (!(arg instanceof user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type user.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserRequest(buffer_arg) {
  return user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetUserByIdRequest(arg) {
  if (!(arg instanceof user_pb.GetUserByIdRequest)) {
    throw new Error('Expected argument of type user.GetUserByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUserByIdRequest(buffer_arg) {
  return user_pb.GetUserByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_user_UserListReply(arg) {
  if (!(arg instanceof user_pb.UserListReply)) {
    throw new Error('Expected argument of type user.UserListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserListReply(buffer_arg) {
  return user_pb.UserListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserReply(arg) {
  if (!(arg instanceof user_pb.UserReply)) {
    throw new Error('Expected argument of type user.UserReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserReply(buffer_arg) {
  return user_pb.UserReply.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  listUsers: {
    path: '/user.UserService/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.ListUsersRequest,
    responseType: user_pb.UserListReply,
    requestSerialize: serialize_user_ListUsersRequest,
    requestDeserialize: deserialize_user_ListUsersRequest,
    responseSerialize: serialize_user_UserListReply,
    responseDeserialize: deserialize_user_UserListReply,
  },
  getUserById: {
    path: '/user.UserService/GetUserById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserByIdRequest,
    responseType: user_pb.UserReply,
    requestSerialize: serialize_user_GetUserByIdRequest,
    requestDeserialize: deserialize_user_GetUserByIdRequest,
    responseSerialize: serialize_user_UserReply,
    responseDeserialize: deserialize_user_UserReply,
  },
  createUser: {
    path: '/user.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: user_pb.UserReply,
    requestSerialize: serialize_user_CreateUserRequest,
    requestDeserialize: deserialize_user_CreateUserRequest,
    responseSerialize: serialize_user_UserReply,
    responseDeserialize: deserialize_user_UserReply,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
