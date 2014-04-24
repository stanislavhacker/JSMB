/*global jsmb, global, require, console */
(function () {
	"use strict";

	/**
	 * Server
	 * @param {global.jsmb.bus.Liseners} liseners
	 * @constructor
	 */
	global.jsmb.server.Server = function (liseners) {
		/** @type {null} */
		this.server = null;
		/** @type {global.jsmb.bus.Liseners}*/
		this.liseners = liseners;
	};

	/**
	 * Create server
	 */
	global.jsmb.server.Server.prototype.createServer = function () {
		if (this.server) {
			return;
		}

		var server,
			self = this,
			http = require("http");

		//init
		server = http.createServer(function(request, response) {
			var url = /** @type {global.jsmb.enum.ACTION} */ request.url.replace("/", "");
			if (url === global.jsmb.enum.ACTION.MESSAGE) {
				self.incoming(request, response);
			}
		});
		server.listen(global.jsmb.setting.port);
		//save
		this.server = server;
	};

	/**
	 * Incoming message
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 */
	global.jsmb.server.Server.prototype.incoming = function (request, response) {
		var liseners = this.liseners,
			self = this,
			body = "",
			message;

		//noinspection JSUnresolvedFunction
		request.on('data', function(chunk) {
			body += chunk;
		});
		//noinspection JSUnresolvedFunction
		request.on('end', function() {

			//message received
			message = new global.jsmb.data.Message().clone.apply(JSON.parse(body));
			self.applyCallbacks(message);

			//on message and then send response
			liseners.message(message).then(function (error, receivers) {
				response.writeHead(200, {"Content-Type" : "text/json"});
				response.write(JSON.stringify(receivers));
				response.end();
			});

		});
	};

	/**
	 * Apply callbacks
	 * @param {global.jsmb.data.Message} message
	 */
	global.jsmb.server.Server.prototype.applyCallbacks = function (message) {
		message.onDie = function (message, receivers) {
			console.log('DIE', message, receivers);
		};
		message.onAck = function (message, source) {
			console.log('ACK', message, source);
		};
		message.onSuccess = function (message, receivers) {
			console.log('SUCCESS', message, receivers);
		};
	};

}());
