/*global jsmb, exports */
(function (exports) {
	"use strict";


	/**
	 * Destinations
	 * @constructor
	 */
	exports.Destinations = function () {
		/** @type {Array<jsmb.data.Destination>}*/
		this.destinations = [];
	};

	/**
	 * Add new destionation
	 * @param {jsmb.data.Destination} destination
	 */
	exports.Destinations.prototype.add = function (destination) {
		this.destinations.push(destination);
	};

	/**
	 * Get destinations
	 * @return {Array.<jsmb.data.Destination>}
	 */
	exports.Destinations.prototype.get = function () {
		return this.destinations;
	};

}(typeof exports === 'undefined' ? jsmb.data : exports));
