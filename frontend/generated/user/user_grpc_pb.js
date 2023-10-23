// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_user_CreateRequest(arg) {
  if (!(arg instanceof user_pb.CreateRequest)) {
    throw new Error('Expected argument of type user.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateRequest(buffer_arg) {
  return user_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetByIdRequest(arg) {
  if (!(arg instanceof user_pb.GetByIdRequest)) {
    throw new Error('Expected argument of type user.GetByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetByIdRequest(buffer_arg) {
  return user_pb.GetByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  create: {
    path: '/user.UserService/Create',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateRequest,
    responseType: user_pb.UserReply,
    requestSerialize: serialize_user_CreateRequest,
    requestDeserialize: deserialize_user_CreateRequest,
    responseSerialize: serialize_user_UserReply,
    responseDeserialize: deserialize_user_UserReply,
  },
  getById: {
    path: '/user.UserService/GetById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetByIdRequest,
    responseType: user_pb.UserReply,
    requestSerialize: serialize_user_GetByIdRequest,
    requestDeserialize: deserialize_user_GetByIdRequest,
    responseSerialize: serialize_user_UserReply,
    responseDeserialize: deserialize_user_UserReply,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
