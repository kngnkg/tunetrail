// package: review
// file: review.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class ListReviewsRequest extends jspb.Message {
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
    cursor: string,
    limit: number,
  }
}

export class GetReviewByIdRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReviewByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReviewByIdRequest): GetReviewByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetReviewByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReviewByIdRequest;
  static deserializeBinaryFromReader(message: GetReviewByIdRequest, reader: jspb.BinaryReader): GetReviewByIdRequest;
}

export namespace GetReviewByIdRequest {
  export type AsObject = {
    reviewid: string,
  }
}

export class CreateReviewRequest extends jspb.Message {
  getAlbumid(): string;
  setAlbumid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getPublishedstatus(): string;
  setPublishedstatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReviewRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReviewRequest): CreateReviewRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateReviewRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReviewRequest;
  static deserializeBinaryFromReader(message: CreateReviewRequest, reader: jspb.BinaryReader): CreateReviewRequest;
}

export namespace CreateReviewRequest {
  export type AsObject = {
    albumid: string,
    title: string,
    content: string,
    publishedstatus: string,
  }
}

export class UpdateReviewRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getPublishedstatus(): string;
  setPublishedstatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateReviewRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateReviewRequest): UpdateReviewRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateReviewRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateReviewRequest;
  static deserializeBinaryFromReader(message: UpdateReviewRequest, reader: jspb.BinaryReader): UpdateReviewRequest;
}

export namespace UpdateReviewRequest {
  export type AsObject = {
    reviewid: string,
    title: string,
    content: string,
    publishedstatus: string,
  }
}

export class DeleteReviewRequest extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteReviewRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteReviewRequest): DeleteReviewRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteReviewRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteReviewRequest;
  static deserializeBinaryFromReader(message: DeleteReviewRequest, reader: jspb.BinaryReader): DeleteReviewRequest;
}

export namespace DeleteReviewRequest {
  export type AsObject = {
    reviewid: string,
  }
}

export class Review extends jspb.Message {
  getReviewid(): string;
  setReviewid(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): Author | undefined;
  setUser(value?: Author): void;

  getAlbumid(): string;
  setAlbumid(value: string): void;

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
    user?: Author.AsObject,
    albumid: string,
    title: string,
    content: string,
    publishedstatus: string,
    likescount: number,
    createdat: string,
    updatedat: string,
  }
}

export class Author extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getImmutableid(): string;
  setImmutableid(value: string): void;

  getDisplayname(): string;
  setDisplayname(value: string): void;

  getAvatarurl(): string;
  setAvatarurl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Author.AsObject;
  static toObject(includeInstance: boolean, msg: Author): Author.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Author, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Author;
  static deserializeBinaryFromReader(message: Author, reader: jspb.BinaryReader): Author;
}

export namespace Author {
  export type AsObject = {
    username: string,
    immutableid: string,
    displayname: string,
    avatarurl: string,
  }
}

export class ReviewList extends jspb.Message {
  clearReviewsList(): void;
  getReviewsList(): Array<Review>;
  setReviewsList(value: Array<Review>): void;
  addReviews(value?: Review, index?: number): Review;

  getNextcursor(): string;
  setNextcursor(value: string): void;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReviewList.AsObject;
  static toObject(includeInstance: boolean, msg: ReviewList): ReviewList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReviewList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReviewList;
  static deserializeBinaryFromReader(message: ReviewList, reader: jspb.BinaryReader): ReviewList;
}

export namespace ReviewList {
  export type AsObject = {
    reviewsList: Array<Review.AsObject>,
    nextcursor: string,
    total: number,
  }
}

