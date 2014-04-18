/*global jsmb, exports */
(function (exports) {
	"use strict";

	/**
	 * Queue object
	 * @constructor
	 */
	exports.Queue = function () {
		/** @type {Array.<jsmb.data.Message>}*/
		this.queue = [];
	};

	/**
	 * Push message
	 * @param {jsmb.data.Message} message
	 */
	exports.Queue.prototype.push = function (message) {
		this.queue.push(message);
	};

	/**
	 * Retrieve message
	 * @returns {jsmb.data.Message}
	 */
	exports.Queue.prototype.pop = function () {
		return this.queue.shift();
	};

}(typeof exports === 'undefined' ? jsmb.bus : exports));
