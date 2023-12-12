// package: follow
// file: follow.proto

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";

export class ListFollowsRequest extends jspb.Message {
  clearUsernamesList(): void;
  getUsernamesList(): Array<string>;
  setUsernamesList(value: Array<string>): void;
  addUsernames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFollowsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFollowsRequest): ListFollowsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListFollowsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFollowsRequest;
  static deserializeBinaryFromReader(message: ListFollowsRequest, reader: jspb.BinaryReader): ListFollowsRequest;
}

export namespace ListFollowsRequest {
  export type AsObject = {
    usernamesList: Array<string>,
  }
}

export class FollowRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FollowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FollowRequest): FollowRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FollowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FollowRequest;
  static deserializeBinaryFromReader(message: FollowRequest, reader: jspb.BinaryReader): FollowRequest;
}

export namespace FollowRequest {
  export type AsObject = {
    username: string,
  }
}

export class FollowResponse extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getImmutableid(): string;
  setImmutableid(value: string): void;

  getDisplayname(): string;
  setDisplayname(value: string): void;

  getIsfollowing(): boolean;
  setIsfollowing(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FollowResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FollowResponse): FollowResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FollowResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FollowResponse;
  static deserializeBinaryFromReader(message: FollowResponse, reader: jspb.BinaryReader): FollowResponse;
}

export namespace FollowResponse {
  export type AsObject = {
    username: string,
    immutableid: string,
    displayname: string,
    isfollowing: boolean,
  }
}

export class FollowResponseList extends jspb.Message {
  clearFollowresponsesList(): void;
  getFollowresponsesList(): Array<FollowResponse>;
  setFollowresponsesList(value: Array<FollowResponse>): void;
  addFollowresponses(value?: FollowResponse, index?: number): FollowResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FollowResponseList.AsObject;
  static toObject(includeInstance: boolean, msg: FollowResponseList): FollowResponseList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FollowResponseList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FollowResponseList;
  static deserializeBinaryFromReader(message: FollowResponseList, reader: jspb.BinaryReader): FollowResponseList;
}

export namespace FollowResponseList {
  export type AsObject = {
    followresponsesList: Array<FollowResponse.AsObject>,
  }
}

