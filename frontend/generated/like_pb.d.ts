// package: like
// file: like.proto

import * as jspb from "google-protobuf";
import * as review_pb from "./review_pb";

export class LikeRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LikeRequest): LikeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LikeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeRequest;
  static deserializeBinaryFromReader(message: LikeRequest, reader: jspb.BinaryReader): LikeRequest;
}

export namespace LikeRequest {
  export type AsObject = {
    reviewid: string,
  }
}

export class ListLikedReviewsRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  hasPagenation(): boolean;
  clearPagenation(): void;
  getPagenation(): review_pb.ListReviewsRequest | undefined;
  setPagenation(value?: review_pb.ListReviewsRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLikedReviewsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListLikedReviewsRequest): ListLikedReviewsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListLikedReviewsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLikedReviewsRequest;
  static deserializeBinaryFromReader(message: ListLikedReviewsRequest, reader: jspb.BinaryReader): ListLikedReviewsRequest;
}

export namespace ListLikedReviewsRequest {
  export type AsObject = {
    username: string,
    pagenation?: review_pb.ListReviewsRequest.AsObject,
  }
}

export class LikeResponse extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  getIsliked(): boolean;
  setIsliked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LikeResponse): LikeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LikeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeResponse;
  static deserializeBinaryFromReader(message: LikeResponse, reader: jspb.BinaryReader): LikeResponse;
}

export namespace LikeResponse {
  export type AsObject = {
    reviewid: string,
    isliked: boolean,
  }
}

