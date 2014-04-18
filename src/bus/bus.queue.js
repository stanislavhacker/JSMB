/*global jsmb, MESSAGE:true */
(function () {
	"use strict";

	/**
	 * Queue object
	 * @constructor
	 */
	jsmb.bus.Queue = function () {
		/** @type {Array.<jsmb.data.Message>}*/
		this.queue = [];
	};

	/**
	 * Push message
	 * @param {jsmb.data.Message} message
	 */
	jsmb.bus.Queue.prototype.push = function (message) {
		this.queue.push(message);
	};

	/**
	 * Retrieve message
	 * @returns {jsmb.data.Message}
	 */
	jsmb.bus.Queue.prototype.pop = function () {
		return this.queue.shift();
	};

}());
