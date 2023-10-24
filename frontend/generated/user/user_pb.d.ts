// package: user
// file: user.proto

import * as jspb from "google-protobuf";

export class CreateRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getDisplayid(): string;
  setDisplayid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAvatarurl(): string;
  setAvatarurl(value: string): void;

  getBio(): string;
  setBio(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    userid: string,
    displayid: string,
    name: string,
    avatarurl: string,
    bio: string,
  }
}

export class GetByIdRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetByIdRequest): GetByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByIdRequest;
  static deserializeBinaryFromReader(message: GetByIdRequest, reader: jspb.BinaryReader): GetByIdRequest;
}

export namespace GetByIdRequest {
  export type AsObject = {
    userid: string,
  }
}

export class UserReply extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getDisplayid(): string;
  setDisplayid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAvatarurl(): string;
  setAvatarurl(value: string): void;

  getBio(): string;
  setBio(value: string): void;

  getFollowerscount(): number;
  setFollowerscount(value: number): void;

  getFollowingcount(): number;
  setFollowingcount(value: number): void;

  getCreatedat(): string;
  setCreatedat(value: string): void;

  getUpdatedat(): string;
  setUpdatedat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserReply.AsObject;
  static toObject(includeInstance: boolean, msg: UserReply): UserReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserReply;
  static deserializeBinaryFromReader(message: UserReply, reader: jspb.BinaryReader): UserReply;
}

export namespace UserReply {
  export type AsObject = {
    userid: string,
    displayid: string,
    name: string,
    avatarurl: string,
    bio: string,
    followerscount: number,
    followingcount: number,
    createdat: string,
    updatedat: string,
  }
}

export class User extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getDisplayid(): string;
  setDisplayid(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAvatarurl(): string;
  setAvatarurl(value: string): void;

  getBio(): string;
  setBio(value: string): void;

  getFollowerscount(): number;
  setFollowerscount(value: number): void;

  getFollowingcount(): number;
  setFollowingcount(value: number): void;

  getCreatedat(): string;
  setCreatedat(value: string): void;

  getUpdatedat(): string;
  setUpdatedat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    userid: string,
    displayid: string,
    name: string,
    avatarurl: string,
    bio: string,
    followerscount: number,
    followingcount: number,
    createdat: string,
    updatedat: string,
  }
}

