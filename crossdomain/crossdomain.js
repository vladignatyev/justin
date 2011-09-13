/**
 * 
 * Implementation of pure server for providing 
 * Adobe Flash crossdomain policy file
 *  
 */

var fs = require('fs');

exports.CrossdomainServer = function (policyFilePath, socketPort, policyPort, policyHost) {
	var policyFile = this.policyFile = 
		fs.readFileSync(policyFilePath, 'utf-8')
		.replace("%{LISTEN_PORT}", socketPort);
	
	this.connectionHandler = function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/xml'});
		response.end(policyFile);
	};
	
	var server = require('http').createServer(this.connectionHandler);
	
	if (policyHost != '') {
		server.listen(policyPort, policyHost);
	} else {
		server.listen(policyPort);
	}
};