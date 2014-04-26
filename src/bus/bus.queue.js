/*global jsmb, global, promise, require */
(function () {
	"use strict";

	/**
	 * Queue object
	 * @constructor
	 */
	global.jsmb.bus.Queue = function () {
		/** @type {Array.<global.jsmb.data.Message>}*/
		this.queue = [];
		/** @type {map.<global.jsmb.data.Message>}*/
		this.map = {};
	};

	/**
	 * Push message
	 * @param {global.jsmb.data.Message} message
	 */
	global.jsmb.bus.Queue.prototype.push = function (message) {
		this.queue.push(message);
		this.map[message.identifier()] = message;
	};

	/**
	 * Retrieve message
	 * @returns {global.jsmb.data.Message}
	 */
	global.jsmb.bus.Queue.prototype.pop = function () {
		return this.queue.shift();
	};

	/**
	 * Get message
	 * @param {string} id
	 * @returns {global.jsmb.data.Message}
	 */
	global.jsmb.bus.Queue.prototype.get = function (id) {
		return this.map[id];
	};

}());
