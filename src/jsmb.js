/*global exports, require*/
var jsmb,
	MESSAGE;

(function (exports) {
	"use strict";

	var isServer = typeof require !== 'undefined';

	//data namespace
	exports.data = {};
	if (isServer) {
		exports.data.Message = require('./message/data.message').Message;
		exports.data.Source = require('./message/data.source').Source;
		exports.data.Destination = require('./message/data.destination').Destination;
		exports.data.Destinations = require('./message/data.destinations').Destinations;
	}

	//enum namespace
	exports.enum = {};
	if (isServer) {
		exports.enum = require('./enum');
	}

	//bus namespace
	exports.bus = {};
	if (isServer) {
		exports.bus.Lisener = require('./bus/bus.lisener').Lisener;
		exports.bus.Liseners = require('./bus/bus.liseners').Liseners;
		exports.bus.Queue = require('./bus/bus.queue').Queue;
		exports.bus.Bus = require('./bus/bus.bus').Bus;
	}

	/**
	 * Static class of bus
	 * @type {jsmb.bus.Bus}
	 * @client
	 */
	MESSAGE = null;

}(typeof exports === 'undefined' ? jsmb = {} : exports));