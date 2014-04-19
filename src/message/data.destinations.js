/*global jsmb, global */
(function () {
	"use strict";


	/**
	 * Destinations
	 * @constructor
	 */
	global.jsmb.data.Destinations = function () {
		/** @type {Array<global.jsmb.data.Destination>}*/
		this.destinations = [];
	};

	/**
	 * Clone
	 * @returns {global.jsmb.data.Destinations}
	 */
	global.jsmb.data.Destinations.prototype.clone = function () {
		var clone = new global.jsmb.data.Destinations(),
			destinations = this.destinations,
			destionation,
			i;

		for (i = 0; i < destinations.length; i++) {
			destionation = destinations[i].clone ? destinations[i].clone() : new global.jsmb.data.Destination().clone.apply(destinations[i]);
			clone.add(destionation);
		}

		return clone;
	};

	/**
	 * Add new destionation
	 * @param {global.jsmb.data.Destination} destination
	 */
	global.jsmb.data.Destinations.prototype.add = function (destination) {
		this.destinations.push(destination);
	};

	/**
	 * Get destinations
	 * @return {Array.<global.jsmb.data.Destination>}
	 */
	global.jsmb.data.Destinations.prototype.get = function () {
		return this.destinations;
	};

}());
