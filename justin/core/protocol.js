var util = require("util");
var events = require("events");

var bufferUtils = require('../utils/buffer_utils.js');
var sig = require('./md5.js');


var PacketConsts = {
	ERROR_RESPONSE_CHUNK: [0x00, 0x7F],
	PACKET_START_CHUNK: [0x7F, 0x80],
	COMMAND_START_CHUNK: [0x7F, 0x7F],
	HANDSHAKE_START_CHUNK: [0x7F, 0x80]
};

exports.ClientCommands = {
	LISTEN_TOPIC: [0x00,0x01]
};

exports.ProtocolErrors = {
	NO_TOPIC_FOUND: [0x00, 0x01]	
};

function PacketProvider () {
	this.getServerErrorResponse = function (error) {
		return new Buffer(PacketConsts.ERROR_RESPONSE_CHUNK).merge(bufferUtils.bufferFromNumber(signature));
	};
	
	this.getClientHandshake = function (signature, themeId) {
		return this.getRawPacket (signature, new Buffer(themeId, 'ascii'));
	};
	
	this.getClientCommand = function (signature, command, params) {
		if (command == exports.ClientCommands.LISTEN_TOPIC) {
			return this.getRawPacket(signature, new Buffer(command).merge(new Buffer(params, 'ascii')));
		} else {
			console.log("Unknown command from client: " + command);
			return null;
		}
	};
	
	this.getRawPacket = function (signature, dataBuffer) {
		return     
		new Buffer(PacketConsts.PACKET_START_CHUNK)
			.merge(
				   new Buffer(
					         sig.hash(data.merge(bufferUtils.bufferFromNumber(signature)))
							 )
				  )
			.merge(dataBuffer.lengthBuffer())
			.merge(dataBuffer);
	};
	
	this.getServerHandshake = function (signature) {
		return new Buffer(PacketConsts.HANDSHAKE_START_CHUNK)
		.merge(bufferUtils.bufferFromNumber(signature));
	};
}

/**
 * Object accepts data from server object and parses it,
 * then emits event if command or packet received.
 * */
function PacketParser () {
	this.streamBuffer = null;
	
	this.lastPacket = null;
	
	this.storeData = function (buffer) {
		if (this.streamBuffer) {
			this.streamBuffer.merge(buffer);
		} else {
			this.streamBuffer = buffer;
		}
	};
	
	//clientHandshake
	//clientCommand
	//clientData
}
util.inherits(PacketParser, events.EventEmitter);

exports.PacketProvider = PacketProvider;
exports.PacketParser = PacketParser;