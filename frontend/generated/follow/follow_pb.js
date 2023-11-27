// source: follow.proto
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

goog.exportSymbol('proto.follow.FollowRequest', null, global);
goog.exportSymbol('proto.follow.LookupRelationshipRequest', null, global);
goog.exportSymbol('proto.follow.Relationship', null, global);
goog.exportSymbol('proto.follow.RelationshipResponse', null, global);
goog.exportSymbol('proto.follow.RelationshipResponseList', null, global);
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
proto.follow.LookupRelationshipRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.follow.LookupRelationshipRequest.repeatedFields_, null);
};
goog.inherits(proto.follow.LookupRelationshipRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.follow.LookupRelationshipRequest.displayName = 'proto.follow.LookupRelationshipRequest';
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
proto.follow.FollowRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.follow.FollowRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.follow.FollowRequest.displayName = 'proto.follow.FollowRequest';
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
proto.follow.RelationshipResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.follow.RelationshipResponse.repeatedFields_, null);
};
goog.inherits(proto.follow.RelationshipResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.follow.RelationshipResponse.displayName = 'proto.follow.RelationshipResponse';
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
proto.follow.RelationshipResponseList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.follow.RelationshipResponseList.repeatedFields_, null);
};
goog.inherits(proto.follow.RelationshipResponseList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.follow.RelationshipResponseList.displayName = 'proto.follow.RelationshipResponseList';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.follow.LookupRelationshipRequest.repeatedFields_ = [1];



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
proto.follow.LookupRelationshipRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.follow.LookupRelationshipRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.follow.LookupRelationshipRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.LookupRelationshipRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    usernamesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.follow.LookupRelationshipRequest}
 */
proto.follow.LookupRelationshipRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.follow.LookupRelationshipRequest;
  return proto.follow.LookupRelationshipRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.follow.LookupRelationshipRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.follow.LookupRelationshipRequest}
 */
proto.follow.LookupRelationshipRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addUsernames(value);
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
proto.follow.LookupRelationshipRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.follow.LookupRelationshipRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.follow.LookupRelationshipRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.LookupRelationshipRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsernamesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string usernames = 1;
 * @return {!Array<string>}
 */
proto.follow.LookupRelationshipRequest.prototype.getUsernamesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.follow.LookupRelationshipRequest} returns this
 */
proto.follow.LookupRelationshipRequest.prototype.setUsernamesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.follow.LookupRelationshipRequest} returns this
 */
proto.follow.LookupRelationshipRequest.prototype.addUsernames = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.follow.LookupRelationshipRequest} returns this
 */
proto.follow.LookupRelationshipRequest.prototype.clearUsernamesList = function() {
  return this.setUsernamesList([]);
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
proto.follow.FollowRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.follow.FollowRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.follow.FollowRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.FollowRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    username: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.follow.FollowRequest}
 */
proto.follow.FollowRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.follow.FollowRequest;
  return proto.follow.FollowRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.follow.FollowRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.follow.FollowRequest}
 */
proto.follow.FollowRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
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
proto.follow.FollowRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.follow.FollowRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.follow.FollowRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.FollowRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string username = 1;
 * @return {string}
 */
proto.follow.FollowRequest.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.follow.FollowRequest} returns this
 */
proto.follow.FollowRequest.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.follow.RelationshipResponse.repeatedFields_ = [4];



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
proto.follow.RelationshipResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.follow.RelationshipResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.follow.RelationshipResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.RelationshipResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    username: jspb.Message.getFieldWithDefault(msg, 1, ""),
    immutableid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    displayname: jspb.Message.getFieldWithDefault(msg, 3, ""),
    relationshipsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
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
 * @return {!proto.follow.RelationshipResponse}
 */
proto.follow.RelationshipResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.follow.RelationshipResponse;
  return proto.follow.RelationshipResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.follow.RelationshipResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.follow.RelationshipResponse}
 */
proto.follow.RelationshipResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setImmutableid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisplayname(value);
      break;
    case 4:
      var values = /** @type {!Array<!proto.follow.Relationship>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addRelationships(values[i]);
      }
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
proto.follow.RelationshipResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.follow.RelationshipResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.follow.RelationshipResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.RelationshipResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getImmutableid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDisplayname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getRelationshipsList();
  if (f.length > 0) {
    writer.writePackedEnum(
      4,
      f
    );
  }
};


/**
 * optional string username = 1;
 * @return {string}
 */
proto.follow.RelationshipResponse.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string immutableId = 2;
 * @return {string}
 */
proto.follow.RelationshipResponse.prototype.getImmutableid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.setImmutableid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string displayName = 3;
 * @return {string}
 */
proto.follow.RelationshipResponse.prototype.getDisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.setDisplayname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated Relationship relationships = 4;
 * @return {!Array<!proto.follow.Relationship>}
 */
proto.follow.RelationshipResponse.prototype.getRelationshipsList = function() {
  return /** @type {!Array<!proto.follow.Relationship>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<!proto.follow.Relationship>} value
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.setRelationshipsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {!proto.follow.Relationship} value
 * @param {number=} opt_index
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.addRelationships = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.follow.RelationshipResponse} returns this
 */
proto.follow.RelationshipResponse.prototype.clearRelationshipsList = function() {
  return this.setRelationshipsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.follow.RelationshipResponseList.repeatedFields_ = [1];



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
proto.follow.RelationshipResponseList.prototype.toObject = function(opt_includeInstance) {
  return proto.follow.RelationshipResponseList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.follow.RelationshipResponseList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.RelationshipResponseList.toObject = function(includeInstance, msg) {
  var f, obj = {
    relationshipsList: jspb.Message.toObjectList(msg.getRelationshipsList(),
    proto.follow.RelationshipResponse.toObject, includeInstance)
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
 * @return {!proto.follow.RelationshipResponseList}
 */
proto.follow.RelationshipResponseList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.follow.RelationshipResponseList;
  return proto.follow.RelationshipResponseList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.follow.RelationshipResponseList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.follow.RelationshipResponseList}
 */
proto.follow.RelationshipResponseList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.follow.RelationshipResponse;
      reader.readMessage(value,proto.follow.RelationshipResponse.deserializeBinaryFromReader);
      msg.addRelationships(value);
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
proto.follow.RelationshipResponseList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.follow.RelationshipResponseList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.follow.RelationshipResponseList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.follow.RelationshipResponseList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRelationshipsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.follow.RelationshipResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated RelationshipResponse relationships = 1;
 * @return {!Array<!proto.follow.RelationshipResponse>}
 */
proto.follow.RelationshipResponseList.prototype.getRelationshipsList = function() {
  return /** @type{!Array<!proto.follow.RelationshipResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.follow.RelationshipResponse, 1));
};


/**
 * @param {!Array<!proto.follow.RelationshipResponse>} value
 * @return {!proto.follow.RelationshipResponseList} returns this
*/
proto.follow.RelationshipResponseList.prototype.setRelationshipsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.follow.RelationshipResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.follow.RelationshipResponse}
 */
proto.follow.RelationshipResponseList.prototype.addRelationships = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.follow.RelationshipResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.follow.RelationshipResponseList} returns this
 */
proto.follow.RelationshipResponseList.prototype.clearRelationshipsList = function() {
  return this.setRelationshipsList([]);
};


/**
 * @enum {number}
 */
proto.follow.Relationship = {
  NONE: 0,
  FOLLOWING: 1,
  FOLLOWED_BY: 2
};

goog.object.extend(exports, proto.follow);