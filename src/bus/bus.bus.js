/*global jsmb, MESSAGE:true */
(function () {
	"use strict";

	var queue = new jsmb.bus.Queue(),
		liseners = new jsmb.bus.Liseners();

	/**
	 * Bus
	 * @constructor
	 */
	jsmb.bus.Bus = function () {
		/** @type {number} */
		this.messageTimeout = 2000;
	};

	/**
	 * Send message
	 * @param {jsmb.data.Message} message
	 * @returns {boolean} success
	 */
	jsmb.bus.Bus.prototype.send = function (message) {
		queue.push(message);
		this.knock();
		return true;
	};

	/**
	 * Resend message
	 * @param {jsmb.data.Message} message
	 */
	jsmb.bus.Bus.prototype.resend = function (message) {
		var self = this;
		message.again();
		if (message.ttl === 0) {
			message.die();
		} else {
			setTimeout(function () {
				self.send(message);
			}, this.messageTimeout / message.ttl);
		}
	};

	/**
	 * Listen on messages
	 * @param {jsmb.data.Source} who
	 * @param {function(message: jsmb.data.Message): boolean} handler
	 * @return {jsmb.bus.Lisener}
	 */
	jsmb.bus.Bus.prototype.listen = function (who, handler) {
		return liseners.add(who, handler);
	};

	/**
	 * Knock on queue
	 */
	jsmb.bus.Bus.prototype.knock = function () {
		var self = this,
			receivers,
			message;

		setTimeout(function () {
			message = queue.pop();
			receivers = liseners.message(message);
			if (receivers.length === 0) {
				self.resend(message);
			} else {
				self.done(message, receivers);
			}
		}, 0);
	};

	/**
	 * @private
	 * Done
	 * @param {jsmb.data.Message} message
	 * @param {Array.<jsmb.data.Source>} receivers
	 */
	jsmb.bus.Bus.prototype.done = function (message, receivers) {
		message.success(receivers);
	};









	//noinspection JSUndeclaredVariable
	/**
	 * Static class of bus
	 * @type {jsmb.bus.Bus}
	 */
	MESSAGE = new jsmb.bus.Bus();

}());
