var net = require('net');
var config = require('./config/config.js');

var server = net.createServer(function (c) {
  c.write('hello\r\n');
  c.pipe(c);
  console.log(c);
  c.close();
});


server.restart = function () {
	try {
		server.close();
	} catch (e) {
		console.log("\n ---------------------");
		console.log("/Justin socket server/");
		console.log("---------------------\n");
		
	}
	if (config.Configuration.LISTEN_SOCKET != '') {
		server.listen(config.Configuration.LISTEN_SOCKET);
		console.log ("Started listening on unix socket" + config.Configuration.LISTEN_SOCKET);
	} else {
		server.listen(config.Configuration.LISTEN_PORT, 'localhost');
		console.log ("Started listening on port " + config.Configuration.LISTEN_PORT);
	}

};

server.on ('error', function (e) {
	if (e.code == 'EADDRINUSE') {
		if (config.Configuration.LISTEN_PORT) {
			console.log('[ERROR] Port ' + config.Configuration.LISTEN_PORT + ' is already in use. Unable to bind.');
			setTimeout(function () {
				server.restart();
		    }, 1000);
		}
	}
});

server.restart();