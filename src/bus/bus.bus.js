/*global jsmb, MESSAGE:true, exports */
(function (exports) {
	"use strict";

	var queue = new exports.Queue(),
		liseners = new exports.Liseners();

	/**
	 * Bus
	 * @constructor
	 */
	exports.Bus = function () {
		/** @type {number} */
		this.messageTimeout = 2000;
	};

	/**
	 * Send message
	 * @param {jsmb.data.Message} message
	 * @returns {boolean} success
	 */
	exports.Bus.prototype.send = function (message) {
		queue.push(message);
		this.knock();
		return true;
	};

	/**
	 * Resend message
	 * @param {jsmb.data.Message} message
	 */
	exports.Bus.prototype.resend = function (message) {
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
	exports.Bus.prototype.listen = function (who, handler) {
		return liseners.add(who, handler);
	};

	/**
	 * Knock on queue
	 */
	exports.Bus.prototype.knock = function () {
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
	exports.Bus.prototype.done = function (message, receivers) {
		message.success(receivers);
	};









	//noinspection JSUndeclaredVariable
	/**
	 * Static class of bus
	 * @type {jsmb.bus.Bus}
	 */
	MESSAGE = new exports.Bus();

}(typeof exports === 'undefined' ? jsmb.bus : exports));
