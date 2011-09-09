/**
 * 
 * Entry for running Justin Server
 *  
 * */
var net = require('net');
var config = require('./config/config.js');
var justin = require('./justin/justin.js');
var lang = require('./justin/lang/' + config.Configuration.LOCALE + '/strings.js');

var server = net.createServer(justin.Justin.handleConnection);

function bootServer() {
	try {
		server.close();
	} catch (e) {
		console.log(lang.Strings.HELLO_MSG);
	}
	
	if (config.Configuration.LISTEN_SOCKET != '') {
		server.listen(config.Configuration.LISTEN_SOCKET);
		console.log (lang.Strings.STARTED_LISTENING_SOCKET + config.Configuration.LISTEN_SOCKET);
	} else {
		server.listen(config.Configuration.LISTEN_PORT, 'localhost');
		console.log (lang.Strings.STARTED_LISTENING_PORT + config.Configuration.LISTEN_PORT);
	}
}

function handleErrors() {
	server.on ('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			if (config.Configuration.LISTEN_PORT) {
				console.log(lang.Strings.PORT_IN_USE(config.Configuration.LISTEN_PORT));
				setTimeout(function () {
					server.restart();
			    }, config.Configuration.RETRY_TIMEOUT);
			}
		}
	});
}

function main () {
	bootServer();
	handleErrors();
}

main();