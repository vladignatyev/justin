/**
 * 
 * Entry for running Justin Socket Broadcaster Server
 *  
 * */
var net = require('net');
var config = require('./config/config.js');
var justin = require('./justin/justin.js');
var lang = require('./justin/lang/' + config.Configuration.LOCALE + '/strings.js');
var memcache = require('./memcache/memcache.js');

function bootServer(server) {
	if (config.Configuration.LISTEN_SOCKET != '') {
		server.listen(config.Configuration.LISTEN_SOCKET);
		console.log (lang.Strings.STARTED_LISTENING_SOCKET + config.Configuration.LISTEN_SOCKET);
	} else {
		server.listen(config.Configuration.LISTEN_PORT, 'localhost');
		console.log (lang.Strings.STARTED_LISTENING_PORT + config.Configuration.LISTEN_PORT);
	}
}

function handleErrors(server) {
	server.on ('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			if (config.Configuration.LISTEN_PORT) {
				console.log(lang.Strings.PORT_IN_USE(config.Configuration.LISTEN_PORT));
				setTimeout(function () {
					server.restart();
			    }, config.Configuration.RESTART_TIMEOUT);
			}
		}
	});
}

/**
 * 
 * Entry point
 * 
 * */
function main (argc, argv) {
	console.log(lang.Strings.HELLO_MSG);
	
	var storage = new memcache.Client(config.Storage.PORT, config.Storage.HOST);
	storage.on('connect', function(){
		justin.Justin.setStorage(storage);
		
		var server = net.createServer(justin.Justin.handleConnection);
		handleErrors(server);
		bootServer(server);
		
		storage.on('timeout', function(){
		    // no arguments - socket timed out
		});
		
		storage.on('close', function(){
		    server.close();
		});
	});

	storage.on('error', function(e){
	    console.log(lang.Strings.STORAGE_INITIALIZATION_ERROR);
	});
	
	storage.connect();
}

main(process.argv.length, process.argv);
	