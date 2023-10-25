// package: user
// file: user.proto

import * as jspb from "google-protobuf";

export class ListUsersRequest extends jspb.Message {
  clearUseridsList(): void;
  getUseridsList(): Array<string>;
  setUseridsList(value: Array<string>): void;
  addUserids(value: string, index?: number): string;

  clearDisplayidsList(): void;
  getDisplayidsList(): Array<string>;
  setDisplayidsList(value: Array<string>): void;
  addDisplayids(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUsersRequest): ListUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUsersRequest;
  static deserializeBinaryFromReader(message: ListUsersRequest, reader: jspb.BinaryReader): ListUsersRequest;
}

export namespace ListUsersRequest {
  export type AsObject = {
    useridsList: Array<string>,
    displayidsList: Array<string>,
  }
}

export class CreateUserRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    userid: string,
    displayid: string,
    name: string,
    avatarurl: string,
    bio: string,
  }
}

export class GetUserByIdRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByIdRequest): GetUserByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByIdRequest;
  static deserializeBinaryFromReader(message: GetUserByIdRequest, reader: jspb.BinaryReader): GetUserByIdRequest;
}

export namespace GetUserByIdRequest {
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

export class UserListReply extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<UserReply>;
  setUsersList(value: Array<UserReply>): void;
  addUsers(value?: UserReply, index?: number): UserReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserListReply.AsObject;
  static toObject(includeInstance: boolean, msg: UserListReply): UserListReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserListReply;
  static deserializeBinaryFromReader(message: UserListReply, reader: jspb.BinaryReader): UserListReply;
}

export namespace UserListReply {
  export type AsObject = {
    usersList: Array<UserReply.AsObject>,
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

