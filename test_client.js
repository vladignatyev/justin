/**
 * Justin test client
 */
/*
var socket = new require('net').Socket();

var packetProvider = new require('./justin/core/protocol.js').PacketProvider();

socket.connect(8124, 'localhost', function(){
	
	var data = [];
	
	for (var i = 0; i < 1000; i++) {
		data.push(Math.ceil(Math.random()*Math.pow(2,32)));
	}
	
	var pubSig = require('./justin/core/md5.js').strToRaw('test');
	
	socket.write(packetProvider.provideRawPacket(pubSig, data));
});*/

var p = require ('./justin/core/protocol.js');

var buffer = new Buffer([1,2,3]);
var result = buffer.merge(new Buffer([4,5,6]));
console.log(result);