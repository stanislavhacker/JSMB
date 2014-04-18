/*global jsmb */
(function () {
	"use strict";


	/**
	 * Destinations
	 * @constructor
	 */
	jsmb.data.Destinations = function () {
		/** @type {Array<jsmb.data.Destination>}*/
		this.destinations = [];
	};

	/**
	 * Add new destionation
	 * @param {jsmb.data.Destination} destination
	 */
	jsmb.data.Destinations.prototype.add = function (destination) {
		this.destinations.push(destination);
	};

	/**
	 * Get destinations
	 * @return {Array.<jsmb.data.Destination>}
	 */
	jsmb.data.Destinations.prototype.get = function () {
		return this.destinations;
	};

}());
