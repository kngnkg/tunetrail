// package: review
// file: review.proto

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";
import * as album_pb from "./album_pb";

export class ListReviewsRequest extends jspb.Message {
  clearReviewidsList(): void;
  getReviewidsList(): Array<string>;
  setReviewidsList(value: Array<string>): void;
  addReviewids(value: string, index?: number): string;

  clearUseridsList(): void;
  getUseridsList(): Array<string>;
  setUseridsList(value: Array<string>): void;
  addUserids(value: string, index?: number): string;

  clearAlbumidsList(): void;
  getAlbumidsList(): Array<string>;
  setAlbumidsList(value: Array<string>): void;
  addAlbumids(value: string, index?: number): string;

  getCursor(): string;
  setCursor(value: string): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListReviewsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListReviewsRequest): ListReviewsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListReviewsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListReviewsRequest;
  static deserializeBinaryFromReader(message: ListReviewsRequest, reader: jspb.BinaryReader): ListReviewsRequest;
}

export namespace ListReviewsRequest {
  export type AsObject = {
    reviewidsList: Array<string>,
    useridsList: Array<string>,
    albumidsList: Array<string>,
    cursor: string,
    limit: number,
  }
}

export class GetByIdRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

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
    reviewid: string,
  }
}

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

export class UpdateRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getPublishedstatus(): string;
  setPublishedstatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    reviewid: string,
    title: string,
    content: string,
    publishedstatus: string,
  }
}

export class ReviewReply extends jspb.Message {
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

export class ReviewListReply extends jspb.Message {
  clearReviewsList(): void;
  getReviewsList(): Array<Review>;
  setReviewsList(value: Array<Review>): void;
  addReviews(value?: Review, index?: number): Review;

  getNextcursor(): string;
  setNextcursor(value: string): void;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReviewListReply.AsObject;
  static toObject(includeInstance: boolean, msg: ReviewListReply): ReviewListReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReviewListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReviewListReply;
  static deserializeBinaryFromReader(message: ReviewListReply, reader: jspb.BinaryReader): ReviewListReply;
}

export namespace ReviewListReply {
  export type AsObject = {
    reviewsList: Array<Review.AsObject>,
    nextcursor: string,
    total: number,
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
  getAlbum(): album_pb.SimpleAlbum | undefined;
  setAlbum(value?: album_pb.SimpleAlbum): void;

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
    album?: album_pb.SimpleAlbum.AsObject,
    title: string,
    content: string,
    publishedstatus: string,
    likescount: number,
    createdat: string,
    updatedat: string,
  }
}

