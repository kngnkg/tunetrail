// package: album
// file: album.proto

import * as jspb from "google-protobuf";

export class Album extends jspb.Message {
  getAlbumid(): string;
  setAlbumid(value: string): void;

  getSpotifyuri(): string;
  setSpotifyuri(value: string): void;

  getSpotifyurl(): string;
  setSpotifyurl(value: string): void;

  getName(): string;
  setName(value: string): void;

  clearArtistsList(): void;
  getArtistsList(): Array<SimpleArtist>;
  setArtistsList(value: Array<SimpleArtist>): void;
  addArtists(value?: SimpleArtist, index?: number): SimpleArtist;

  hasTracks(): boolean;
  clearTracks(): void;
  getTracks(): TrackPage | undefined;
  setTracks(value?: TrackPage): void;

  getCoverurl(): string;
  setCoverurl(value: string): void;

  getReleasedate(): string;
  setReleasedate(value: string): void;

  clearGenresList(): void;
  getGenresList(): Array<string>;
  setGenresList(value: Array<string>): void;
  addGenres(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Album.AsObject;
  static toObject(includeInstance: boolean, msg: Album): Album.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Album, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Album;
  static deserializeBinaryFromReader(message: Album, reader: jspb.BinaryReader): Album;
}

export namespace Album {
  export type AsObject = {
    albumid: string,
    spotifyuri: string,
    spotifyurl: string,
    name: string,
    artistsList: Array<SimpleArtist.AsObject>,
    tracks?: TrackPage.AsObject,
    coverurl: string,
    releasedate: string,
    genresList: Array<string>,
  }
}

export class SimpleAlbum extends jspb.Message {
  getAlbumid(): string;
  setAlbumid(value: string): void;

  getSpotifyuri(): string;
  setSpotifyuri(value: string): void;

  getSpotifyurl(): string;
  setSpotifyurl(value: string): void;

  getName(): string;
  setName(value: string): void;

  clearArtistsList(): void;
  getArtistsList(): Array<SimpleArtist>;
  setArtistsList(value: Array<SimpleArtist>): void;
  addArtists(value?: SimpleArtist, index?: number): SimpleArtist;

  getCoverurl(): string;
  setCoverurl(value: string): void;

  clearGenresList(): void;
  getGenresList(): Array<string>;
  setGenresList(value: Array<string>): void;
  addGenres(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleAlbum.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleAlbum): SimpleAlbum.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SimpleAlbum, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleAlbum;
  static deserializeBinaryFromReader(message: SimpleAlbum, reader: jspb.BinaryReader): SimpleAlbum;
}

export namespace SimpleAlbum {
  export type AsObject = {
    albumid: string,
    spotifyuri: string,
    spotifyurl: string,
    name: string,
    artistsList: Array<SimpleArtist.AsObject>,
    coverurl: string,
    genresList: Array<string>,
  }
}

export class SimpleArtist extends jspb.Message {
  getArtistid(): string;
  setArtistid(value: string): void;

  getSpotifyuri(): string;
  setSpotifyuri(value: string): void;

  getSpotifyurl(): string;
  setSpotifyurl(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleArtist.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleArtist): SimpleArtist.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SimpleArtist, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleArtist;
  static deserializeBinaryFromReader(message: SimpleArtist, reader: jspb.BinaryReader): SimpleArtist;
}

export namespace SimpleArtist {
  export type AsObject = {
    artistid: string,
    spotifyuri: string,
    spotifyurl: string,
    name: string,
  }
}

export class Track extends jspb.Message {
  getTrackid(): string;
  setTrackid(value: string): void;

  getSpotifyuri(): string;
  setSpotifyuri(value: string): void;

  getSpotifyurl(): string;
  setSpotifyurl(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getDurationms(): number;
  setDurationms(value: number): void;

  getTracknumber(): number;
  setTracknumber(value: number): void;

  getPreviewurl(): string;
  setPreviewurl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Track.AsObject;
  static toObject(includeInstance: boolean, msg: Track): Track.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Track, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Track;
  static deserializeBinaryFromReader(message: Track, reader: jspb.BinaryReader): Track;
}

export namespace Track {
  export type AsObject = {
    trackid: string,
    spotifyuri: string,
    spotifyurl: string,
    title: string,
    durationms: number,
    tracknumber: number,
    previewurl: string,
  }
}

export class TrackPage extends jspb.Message {
  clearTracksList(): void;
  getTracksList(): Array<Track>;
  setTracksList(value: Array<Track>): void;
  addTracks(value?: Track, index?: number): Track;

  getLimit(): number;
  setLimit(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  getTotal(): number;
  setTotal(value: number): void;

  getNext(): string;
  setNext(value: string): void;

  getPrevious(): string;
  setPrevious(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrackPage.AsObject;
  static toObject(includeInstance: boolean, msg: TrackPage): TrackPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrackPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrackPage;
  static deserializeBinaryFromReader(message: TrackPage, reader: jspb.BinaryReader): TrackPage;
}

export namespace TrackPage {
  export type AsObject = {
    tracksList: Array<Track.AsObject>,
    limit: number,
    offset: number,
    total: number,
    next: string,
    previous: string,
  }
}

