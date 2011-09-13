/**
 * 
 * Entry for running Justin Socket Broadcaster Server
 *  
 * */
var net = require('net');
var Config = require('./config/config.js').Configuration;
var Justin = require('./justin/justin.js').Justin;
var Lang = require('./justin/lang/' + Config.LOCALE + '/strings.js');

function bootServer(server) {
	if (Config.LISTEN_SOCKET != '') {
		server.listen(Config.LISTEN_SOCKET);
		console.log (Lang.Strings.STARTED_LISTENING_SOCKET + Config.LISTEN_SOCKET);
	} else {
		server.listen(Config.LISTEN_PORT, 'localhost');
		console.log (Lang.Strings.STARTED_LISTENING_PORT + Config.LISTEN_PORT);
	}
}

function handleErrors(server) {
	server.on ('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			if (Config.LISTEN_PORT) {
				console.log(Lang.ErrorStrings.PORT_IN_USE(Config.LISTEN_PORT));
				setTimeout(function () {
					server.restart();
			    }, Config.RESTART_TIMEOUT);
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
	console.log(Lang.Strings.HELLO_MSG);
	var justin = net.createServer(Justin.handleConnection);
	handleErrors(justin);
	bootServer(justin);

	try {
		if (Config.Flash.POLICY) {
			var crossdomain = new require('./crossdomain/crossdomain.js')
				.CrossdomainServer(Config.Flash.POLICY_FILEPATH || './crossdomain/crossdomain.xml',
						Config.LISTEN_PORT, Config.Flash.POLICY_PORT, Config.Flash.POLICY_HOST);
		}
		console.log(Lang.Strings.STARTED_CROSSDOMAIN(Config.Flash.POLICY_PORT));
	} catch (e) {
		console.log(Lang.ErrorStrings.CROSSDOMAIN_SERVER_FAULT);
	}
}

main(process.argv.length, process.argv);
	