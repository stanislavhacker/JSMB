/*global require*/
var http = require("http"),
	messages = require("../../src/jsmb"),
	server;

(function () {
	"use strict";

	server = http.createServer(function(request, response) {
		var a = messages;
		console.log('a');
		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write("Hello World");
		response.end();
	});
	server.listen(1010);

}());