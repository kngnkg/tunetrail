// source: review.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var user_pb = require('./user_pb.js');
goog.object.extend(proto, user_pb);
var album_pb = require('./album_pb.js');
goog.object.extend(proto, album_pb);
goog.exportSymbol('proto.review.CreateRequest', null, global);
goog.exportSymbol('proto.review.Review', null, global);
goog.exportSymbol('proto.review.ReviewReply', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.review.CreateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.review.CreateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.review.CreateRequest.displayName = 'proto.review.CreateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.review.ReviewReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.review.ReviewReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.review.ReviewReply.displayName = 'proto.review.ReviewReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.review.Review = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.review.Review, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.review.Review.displayName = 'proto.review.Review';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.review.CreateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.review.CreateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.review.CreateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.CreateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    albumid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    content: jspb.Message.getFieldWithDefault(msg, 4, ""),
    publishedstatus: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.review.CreateRequest}
 */
proto.review.CreateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.review.CreateRequest;
  return proto.review.CreateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.review.CreateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.review.CreateRequest}
 */
proto.review.CreateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAlbumid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPublishedstatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.review.CreateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.review.CreateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.review.CreateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.CreateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAlbumid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPublishedstatus();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string userId = 1;
 * @return {string}
 */
proto.review.CreateRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.CreateRequest} returns this
 */
proto.review.CreateRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string albumId = 2;
 * @return {string}
 */
proto.review.CreateRequest.prototype.getAlbumid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.CreateRequest} returns this
 */
proto.review.CreateRequest.prototype.setAlbumid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.review.CreateRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.CreateRequest} returns this
 */
proto.review.CreateRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string content = 4;
 * @return {string}
 */
proto.review.CreateRequest.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.CreateRequest} returns this
 */
proto.review.CreateRequest.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string publishedStatus = 5;
 * @return {string}
 */
proto.review.CreateRequest.prototype.getPublishedstatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.CreateRequest} returns this
 */
proto.review.CreateRequest.prototype.setPublishedstatus = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.review.ReviewReply.prototype.toObject = function(opt_includeInstance) {
  return proto.review.ReviewReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.review.ReviewReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.ReviewReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    review: (f = msg.getReview()) && proto.review.Review.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.review.ReviewReply}
 */
proto.review.ReviewReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.review.ReviewReply;
  return proto.review.ReviewReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.review.ReviewReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.review.ReviewReply}
 */
proto.review.ReviewReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.review.Review;
      reader.readMessage(value,proto.review.Review.deserializeBinaryFromReader);
      msg.setReview(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.review.ReviewReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.review.ReviewReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.review.ReviewReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.ReviewReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReview();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.review.Review.serializeBinaryToWriter
    );
  }
};


/**
 * optional Review review = 1;
 * @return {?proto.review.Review}
 */
proto.review.ReviewReply.prototype.getReview = function() {
  return /** @type{?proto.review.Review} */ (
    jspb.Message.getWrapperField(this, proto.review.Review, 1));
};


/**
 * @param {?proto.review.Review|undefined} value
 * @return {!proto.review.ReviewReply} returns this
*/
proto.review.ReviewReply.prototype.setReview = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.review.ReviewReply} returns this
 */
proto.review.ReviewReply.prototype.clearReview = function() {
  return this.setReview(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.review.ReviewReply.prototype.hasReview = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.review.Review.prototype.toObject = function(opt_includeInstance) {
  return proto.review.Review.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.review.Review} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.Review.toObject = function(includeInstance, msg) {
  var f, obj = {
    reviewid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    user: (f = msg.getUser()) && user_pb.User.toObject(includeInstance, f),
    album: (f = msg.getAlbum()) && album_pb.Album.toObject(includeInstance, f),
    title: jspb.Message.getFieldWithDefault(msg, 4, ""),
    content: jspb.Message.getFieldWithDefault(msg, 5, ""),
    publishedstatus: jspb.Message.getFieldWithDefault(msg, 6, ""),
    likescount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    createdat: jspb.Message.getFieldWithDefault(msg, 8, ""),
    updatedat: jspb.Message.getFieldWithDefault(msg, 9, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.review.Review}
 */
proto.review.Review.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.review.Review;
  return proto.review.Review.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.review.Review} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.review.Review}
 */
proto.review.Review.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReviewid(value);
      break;
    case 2:
      var value = new user_pb.User;
      reader.readMessage(value,user_pb.User.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 3:
      var value = new album_pb.Album;
      reader.readMessage(value,album_pb.Album.deserializeBinaryFromReader);
      msg.setAlbum(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPublishedstatus(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLikescount(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatedat(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdatedat(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.review.Review.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.review.Review.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.review.Review} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.review.Review.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReviewid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      user_pb.User.serializeBinaryToWriter
    );
  }
  f = message.getAlbum();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      album_pb.Album.serializeBinaryToWriter
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getPublishedstatus();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getLikescount();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getCreatedat();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getUpdatedat();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string reviewId = 1;
 * @return {string}
 */
proto.review.Review.prototype.getReviewid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setReviewid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional user.User user = 2;
 * @return {?proto.user.User}
 */
proto.review.Review.prototype.getUser = function() {
  return /** @type{?proto.user.User} */ (
    jspb.Message.getWrapperField(this, user_pb.User, 2));
};


/**
 * @param {?proto.user.User|undefined} value
 * @return {!proto.review.Review} returns this
*/
proto.review.Review.prototype.setUser = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.review.Review.prototype.hasUser = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional album.Album album = 3;
 * @return {?proto.album.Album}
 */
proto.review.Review.prototype.getAlbum = function() {
  return /** @type{?proto.album.Album} */ (
    jspb.Message.getWrapperField(this, album_pb.Album, 3));
};


/**
 * @param {?proto.album.Album|undefined} value
 * @return {!proto.review.Review} returns this
*/
proto.review.Review.prototype.setAlbum = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.clearAlbum = function() {
  return this.setAlbum(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.review.Review.prototype.hasAlbum = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string title = 4;
 * @return {string}
 */
proto.review.Review.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string content = 5;
 * @return {string}
 */
proto.review.Review.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string publishedStatus = 6;
 * @return {string}
 */
proto.review.Review.prototype.getPublishedstatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setPublishedstatus = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional int32 likesCount = 7;
 * @return {number}
 */
proto.review.Review.prototype.getLikescount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setLikescount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional string createdAt = 8;
 * @return {string}
 */
proto.review.Review.prototype.getCreatedat = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setCreatedat = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string updatedAt = 9;
 * @return {string}
 */
proto.review.Review.prototype.getUpdatedat = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.review.Review} returns this
 */
proto.review.Review.prototype.setUpdatedat = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


goog.object.extend(exports, proto.review);
