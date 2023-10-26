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

function serialize_user_GetUserByUsernameRequest(arg) {
  if (!(arg instanceof user_pb.GetUserByUsernameRequest)) {
    throw new Error('Expected argument of type user.GetUserByUsernameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUserByUsernameRequest(buffer_arg) {
  return user_pb.GetUserByUsernameRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_user_User(arg) {
  if (!(arg instanceof user_pb.User)) {
    throw new Error('Expected argument of type user.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_User(buffer_arg) {
  return user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
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


var UserServiceService = exports.UserServiceService = {
  listUsers: {
    path: '/user.UserService/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.ListUsersRequest,
    responseType: user_pb.UserList,
    requestSerialize: serialize_user_ListUsersRequest,
    requestDeserialize: deserialize_user_ListUsersRequest,
    responseSerialize: serialize_user_UserList,
    responseDeserialize: deserialize_user_UserList,
  },
  getUserByUsername: {
    path: '/user.UserService/GetUserByUsername',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserByUsernameRequest,
    responseType: user_pb.User,
    requestSerialize: serialize_user_GetUserByUsernameRequest,
    requestDeserialize: deserialize_user_GetUserByUsernameRequest,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  createUser: {
    path: '/user.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: user_pb.User,
    requestSerialize: serialize_user_CreateUserRequest,
    requestDeserialize: deserialize_user_CreateUserRequest,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
