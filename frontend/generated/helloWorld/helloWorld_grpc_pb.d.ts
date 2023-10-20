// GENERATED CODE -- DO NOT EDIT!

// package: helloworld
// file: helloWorld.proto

import * as helloWorld_pb from "./helloWorld_pb";
import * as grpc from "@grpc/grpc-js";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: grpc.MethodDefinition<helloWorld_pb.HelloRequest, helloWorld_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<helloWorld_pb.HelloRequest, helloWorld_pb.HelloReply>;
}

export class GreeterClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sayHello(argument: helloWorld_pb.HelloRequest, callback: grpc.requestCallback<helloWorld_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: helloWorld_pb.HelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<helloWorld_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: helloWorld_pb.HelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<helloWorld_pb.HelloReply>): grpc.ClientUnaryCall;
}
