/*global jsmb, MESSAGE:true, global */
(function () {
	"use strict";

	var queue = new global.jsmb.bus.Queue(),
		liseners = new global.jsmb.bus.Liseners(queue);

	/**
	 * Bus
	 * @constructor
	 */
	global.jsmb.bus.Bus = function () {
		/** @type {global.jsmb.server.Server}*/
		this.listener = null;
		/** @type {global.jsmb.channel.Channel}*/
		this.roure = null;
	};

	/**
	 * Send message
	 * @param {global.jsmb.data.Message} message
	 * @returns {boolean} success
	 */
	global.jsmb.bus.Bus.prototype.send = function (message) {
		queue.push(message);
		this.knock();
		return true;
	};

	/**
	 * Resend message
	 * @param {global.jsmb.data.Message} message
	 */
	global.jsmb.bus.Bus.prototype.resend = function (message) {
		var self = this;
		message.again();
		if (!message.lifetime()) {
			message.die();
		} else {
			setTimeout(function () {
				self.send(message);
			}, global.jsmb.setting.messageTimeout / message.lifetime());
		}
	};

	/**
	 * Listen on messages
	 * @param {global.jsmb.data.Source} who
	 * @param {function(message: global.jsmb.data.Message): boolean} handler
	 * @return {global.jsmb.bus.Lisener}
	 */
	global.jsmb.bus.Bus.prototype.listen = function (who, handler) {
		return liseners.add(who, handler);
	};

	/**
	 * Knock on queue
	 */
	global.jsmb.bus.Bus.prototype.knock = function () {
		var self = this,
			message;

		setTimeout(function () {
			message = queue.pop();
			liseners.message(message).then(function (error, receivers) {
				if (receivers.length === 0 || error) {
					self.resend(message);
				} else {
					self.done(message, receivers);
				}
			});
		}, 0);
	};

	/**
	 * @private
	 * Done
	 * @param {global.jsmb.data.Message} message
	 * @param {Array.<global.jsmb.data.Source>} receivers
	 */
	global.jsmb.bus.Bus.prototype.done = function (message, receivers) {
		message.success(receivers);
	};


	//////////////////////////////////////////////////////////////////
	////////////////////// SERVER ONLY FCE ///////////////////////////
	//////////////////////////////////////////////////////////////////

	/**
	 * Init server
	 */
	global.jsmb.bus.Bus.prototype.server = function () {
		var server = global.jsmb.isServer;
		if (server) {
			//create new lisener on server
			this.listener = new global.jsmb.server.Server(liseners);
			this.listener.createServer();
		} else {
			//throw error if call on client
			throw global.jsmb.enum.ERROR.SERVER_METHOD_ONLY;
		}
	};


	//////////////////////////////////////////////////////////////////
	////////////////////// CLIENT ONLY FCE ///////////////////////////
	//////////////////////////////////////////////////////////////////

	/**
	 * Init channel
	 */
	global.jsmb.bus.Bus.prototype.channel = function () {
		var server = global.jsmb.isServer;
		if (!server) {
			//create new channel on client
			this.roure = new global.jsmb.channel.Channel(liseners);
			this.roure.createChannel();
		} else {
			//throw error if call on server
			throw global.jsmb.enum.ERROR.CLIENT_METHOD_ONLY;
		}
	};


	//noinspection JSUndeclaredVariable
	/**
	 * Static class of bus
	 * @type {jsmb.bus.Bus}
	 */
	global.MESSAGE = new global.jsmb.bus.Bus();

	//init
	if (global.jsmb.isServer) {
		global.MESSAGE.server();
	} else {
		global.MESSAGE.channel();
	}

}());
