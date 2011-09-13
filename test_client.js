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

/*var p = require ('./justin/core/protocol.js');

var buffer = new Buffer([1,2,3]);
var result = buffer.merge(new Buffer([4,5,6]));
console.log(result);*/

/*
var random = require('./justin/core/random.js');


var values = [];
var count = 5E3;

for (var i = 0; i < count; i++) {
	console.log(random.get());
//	values.push(random.get());
}
console.log('calculated');


var collisions = [];
var collisionsCount = 0;
for (var i = 0; i < values.length; i++) {
	if (isNaN(collisions[values[i].toString()])) 
		collisions[values[i].toString()] = true;
	else {
		collisionsCount++;
	}
}

console.log('Totally ' + collisionsCount + ':' + count);

//var fs = require('fs');
//var f = fs.openSync('data.rnd', 'w');
//var buffer = '';
//for (var i = 0; i < values.length; i++) {
//	buffer += values[i].toString() + "\n";
//}
//fs.writeSync(f, buffer, 0);
//fs.close(f);
*/
