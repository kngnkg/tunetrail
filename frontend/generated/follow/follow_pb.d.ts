// package: follow
// file: follow.proto

import * as jspb from "google-protobuf";

export class LookupRelationshipRequest extends jspb.Message {
  getImmutableid(): string;
  setImmutableid(value: string): void;

  clearTargetidsList(): void;
  getTargetidsList(): Array<string>;
  setTargetidsList(value: Array<string>): void;
  addTargetids(value: string, index?: number): string;

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
    immutableid: string,
    targetidsList: Array<string>,
  }
}

export class LookupRelationshipResponse extends jspb.Message {
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
  toObject(includeInstance?: boolean): LookupRelationshipResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LookupRelationshipResponse): LookupRelationshipResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LookupRelationshipResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LookupRelationshipResponse;
  static deserializeBinaryFromReader(message: LookupRelationshipResponse, reader: jspb.BinaryReader): LookupRelationshipResponse;
}

export namespace LookupRelationshipResponse {
  export type AsObject = {
    username: string,
    immutableid: string,
    displayname: string,
    relationshipsList: Array<RelationshipMap[keyof RelationshipMap]>,
  }
}

export interface RelationshipMap {
  NONE: 0;
  FOLLOWING: 1;
  FOLLOWED_BY: 2;
}

export const Relationship: RelationshipMap;

