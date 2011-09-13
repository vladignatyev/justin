/**
 * 
 * Implementation of pure server for providing 
 * Adobe Flash crossdomain policy file
 *  
 */

var fs = require('fs');

exports.CrossdomainServer = function () {
	var Configuration = require('../config/config.js').Configuration;
	var policyFile = this.policyFile = 
		fs.readFileSync(Configuration.Flash.POLICY_FILEPATH || 'config/crossdomain.xml', 'utf-8')
		.replace("%{Configuration.LISTEN_PORT}", Configuration.LISTEN_PORT);
	
	this.connectionHandler = function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/xml'});
		response.end(policyFile);
	};
	
	var server = require('http').createServer(this.connectionHandler);
	server.listen(Configuration.Flash.POLICY_PORT, Configuration.Flash.POLICY_HOST);
};