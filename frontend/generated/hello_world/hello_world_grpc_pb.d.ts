// GENERATED CODE -- DO NOT EDIT!

// package: helloworld
// file: hello_world.proto

import * as hello_world_pb from "./hello_world_pb";
import * as grpc from "@grpc/grpc-js";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: grpc.MethodDefinition<hello_world_pb.HelloRequest, hello_world_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<hello_world_pb.HelloRequest, hello_world_pb.HelloReply>;
}

export class GreeterClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sayHello(argument: hello_world_pb.HelloRequest, callback: grpc.requestCallback<hello_world_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: hello_world_pb.HelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<hello_world_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: hello_world_pb.HelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<hello_world_pb.HelloReply>): grpc.ClientUnaryCall;
}
