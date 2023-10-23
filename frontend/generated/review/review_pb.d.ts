// package: review
// file: review.proto

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";
import * as album_pb from "./album_pb";

export class CreateRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getAlbumid(): string;
  setAlbumid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getPublishedstatus(): string;
  setPublishedstatus(value: string): void;

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
    albumid: string,
    title: string,
    content: string,
    publishedstatus: string,
  }
}

export class ReviewReply extends jspb.Message {
  hasReview(): boolean;
  clearReview(): void;
  getReview(): Review | undefined;
  setReview(value?: Review): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReviewReply.AsObject;
  static toObject(includeInstance: boolean, msg: ReviewReply): ReviewReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReviewReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReviewReply;
  static deserializeBinaryFromReader(message: ReviewReply, reader: jspb.BinaryReader): ReviewReply;
}

export namespace ReviewReply {
  export type AsObject = {
    review?: Review.AsObject,
  }
}

export class Review extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): user_pb.User | undefined;
  setUser(value?: user_pb.User): void;

  hasAlbum(): boolean;
  clearAlbum(): void;
  getAlbum(): album_pb.Album | undefined;
  setAlbum(value?: album_pb.Album): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getPublishedstatus(): string;
  setPublishedstatus(value: string): void;

  getLikescount(): number;
  setLikescount(value: number): void;

  getCreatedat(): string;
  setCreatedat(value: string): void;

  getUpdatedat(): string;
  setUpdatedat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Review.AsObject;
  static toObject(includeInstance: boolean, msg: Review): Review.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Review, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Review;
  static deserializeBinaryFromReader(message: Review, reader: jspb.BinaryReader): Review;
}

export namespace Review {
  export type AsObject = {
    reviewid: string,
    user?: user_pb.User.AsObject,
    album?: album_pb.Album.AsObject,
    title: string,
    content: string,
    publishedstatus: string,
    likescount: number,
    createdat: string,
    updatedat: string,
  }
}

