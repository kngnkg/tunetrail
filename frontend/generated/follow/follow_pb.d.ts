// package: follow
// file: follow.proto

import * as jspb from "google-protobuf";

export class LookupRelationshipRequest extends jspb.Message {
  clearUsernamesList(): void;
  getUsernamesList(): Array<string>;
  setUsernamesList(value: Array<string>): void;
  addUsernames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LookupRelationshipRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LookupRelationshipRequest): LookupRelationshipRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LookupRelationshipRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LookupRelationshipRequest;
  static deserializeBinaryFromReader(message: LookupRelationshipRequest, reader: jspb.BinaryReader): LookupRelationshipRequest;
}

export namespace LookupRelationshipRequest {
  export type AsObject = {
    usernamesList: Array<string>,
  }
}

export class RelationshipResponse extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getImmutableid(): string;
  setImmutableid(value: string): void;

  getDisplayname(): string;
  setDisplayname(value: string): void;

  clearRelationshipsList(): void;
  getRelationshipsList(): Array<RelationshipMap[keyof RelationshipMap]>;
  setRelationshipsList(value: Array<RelationshipMap[keyof RelationshipMap]>): void;
  addRelationships(value: RelationshipMap[keyof RelationshipMap], index?: number): RelationshipMap[keyof RelationshipMap];

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelationshipResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RelationshipResponse): RelationshipResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelationshipResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelationshipResponse;
  static deserializeBinaryFromReader(message: RelationshipResponse, reader: jspb.BinaryReader): RelationshipResponse;
}

export namespace RelationshipResponse {
  export type AsObject = {
    username: string,
    immutableid: string,
    displayname: string,
    relationshipsList: Array<RelationshipMap[keyof RelationshipMap]>,
  }
}

export class RelationshipResponseList extends jspb.Message {
  clearRelationshipsList(): void;
  getRelationshipsList(): Array<RelationshipResponse>;
  setRelationshipsList(value: Array<RelationshipResponse>): void;
  addRelationships(value?: RelationshipResponse, index?: number): RelationshipResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelationshipResponseList.AsObject;
  static toObject(includeInstance: boolean, msg: RelationshipResponseList): RelationshipResponseList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelationshipResponseList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelationshipResponseList;
  static deserializeBinaryFromReader(message: RelationshipResponseList, reader: jspb.BinaryReader): RelationshipResponseList;
}

export namespace RelationshipResponseList {
  export type AsObject = {
    relationshipsList: Array<RelationshipResponse.AsObject>,
  }
}

export interface RelationshipMap {
  NONE: 0;
  FOLLOWING: 1;
  FOLLOWED_BY: 2;
}

export const Relationship: RelationshipMap;

