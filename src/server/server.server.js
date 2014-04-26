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
		/** @type {object}*/
		this.responses = {};
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
			if (url === global.jsmb.enum.ACTION.CHANNEL) {
				self.channel(request, response);
			}
		});
		server.listen(global.jsmb.setting.port);
		//save
		this.server = server;
	};

	/**
	 * Channel
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 */
	global.jsmb.server.Server.prototype.incoming = function (request, response) {
		var liseners = this.liseners,
			id = request.headers["client-id"],
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
			self.applyCallbacks(message, id);

			//on message and then send response
			liseners.message(message).then(function (error, receivers) {
				response.writeHead(200, {"Content-Type" : "text/json"});
				response.write(JSON.stringify(receivers));
				response.end();
			});

		});
	};

	/**
	 * Incoming message
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 */
	global.jsmb.server.Server.prototype.channel = function (request, response) {
		var responses = this.responses,
			id = request.headers["client-id"];

		//noinspection JSUnresolvedFunction
		request.on('end', function() {
			responses[id] = response;
		});
	};

	/**
	 * Apply callbacks
	 * @param {global.jsmb.data.Message} message
	 * @param {string} id
	 */
	global.jsmb.server.Server.prototype.applyCallbacks = function (message, id) {
		var responses = this.responses,
			data,
			response;

		message.onDie = function (message, receivers) {
			console.log('DIE', message, receivers);
		};
		message.onAck = function (message, source) {
			//data
			data = new global.jsmb.response.Ack(message, source);
			//send response through channel
			response = responses[id];
			response.writeHead(200, {"Content-Type" : "text/json"});
			response.write(JSON.stringify(data));
			response.end();
		};
		message.onSuccess = function (message, receivers) {
			console.log('SUCCESS', message, receivers);
		};
	};

}());
