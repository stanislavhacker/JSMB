/*global jsmb, exports */
(function (exports) {
	"use strict";


	/**
	 * Iterate
	 * @param {map.<string>} liseners
	 * @param {function(jsmb.bus.Lisener)} callback
	 */
	function iterate(liseners, callback) {
		var instances,
			lisener,
			key,
			i;

		for (key in liseners) {
			if (liseners.hasOwnProperty(key)) {
				instances = /** @type {Array.<jsmb.bus.Lisener>}*/ liseners[key];
				for (i = 0; i < instances.length; i++) {
					lisener = /** @type {jsmb.bus.Lisener}*/ instances[i];
					callback(lisener);
				}
			}
		}
	}

	/**
	 * Iterate
	 * @param {map.<string>} liseners
	 * @param {object} instance
	 * @param {string} id
	 * @param {function(jsmb.bus.Lisener)} callback
	 */
	function specific(liseners, instance, id, callback) {
		var instances = liseners[id],
			lisener,
			who,
			i;

		if (instances && instances.length) {
			lisener = instances[0];
			who = lisener.getWho();
			if (who.getInstance() === instance && who.getId() === id) {
				for (i = 0; i < instances.length; i++) {
					lisener = /** @type {jsmb.bus.Lisener}*/ instances[i];
					callback(lisener);
				}
			}
		}
	}


	/**
	 * Liseners
	 * @constructor
	 */
	exports.Liseners = function () {
		/** @type {map.<string>}*/
		this.liseners = {};
	};

	/**
	 * Listen on messages
	 * @param {jsmb.data.Source} who
	 * @param {function(message: jsmb.data.Message): boolean} handler
	 * @return {jsmb.bus.Lisener}
	 */
	exports.Liseners.prototype.add = function (who, handler) {
		return new exports.Lisener(this.liseners, who, handler);
	};

	/**
	 * Message
	 * @param {jsmb.data.Message} message
	 * @return {Array.<jsmb.data.Source>}
	 */
	exports.Liseners.prototype.message = function (message) {
		var to = message.to(),
			destinations = to.get(),
			receivers = [],
			destination,
			i;

		for (i = 0; i < destinations.length; i++) {
			destination = destinations[i];
			switch (destination.getType()) {
				case jsmb.enum.MESSAGE_TYPE.ALL:
					receivers = receivers.concat(this.sendToAll(message, destination));
					break;
				case jsmb.enum.MESSAGE_TYPE.INSTANCES:
					receivers = receivers.concat(this.sendToInstance(message, destination));
					break;
				case jsmb.enum.MESSAGE_TYPE.SPECIFIC:
					receivers = receivers.concat(this.sendToSpecific(message, destination));
					break;
				default:
					throw jsmb.enum.ERROR.INVALID_DESTINATION;
			}
		}

		return receivers;
	};

	/**
	 * @private
	 * Send to all
	 * @param {jsmb.data.Message} message
	 * @param {jsmb.data.Destination} destination
	 * @returns {Array.<jsmb.data.Source>}
	 */
	exports.Liseners.prototype.sendToAll = function (message, destination) {
		var self = this,
			receivers = [];
		//iterate all
		iterate(this.liseners, function (lisener) {
			if (lisener.handler(message)) {
				self.acknowledge(message, destination, lisener);
				receivers.push(lisener.getWho());
			}
		});
		return receivers;
	};

	/**
	 * @private
	 * Send to instance
	 * @param {jsmb.data.Message} message
	 * @param {jsmb.data.Destination} destination
	 * @returns {Array.<jsmb.data.Source>}
	 */
	exports.Liseners.prototype.sendToInstance = function (message, destination) {
		var self = this,
			receivers = [],
			instance = destination.getInstance();
		//iterate all
		iterate(this.liseners, function (lisener) {
			if (lisener.getWho().getInstance() === instance) {
				if (lisener.handler(message)) {
					self.acknowledge(message, destination, lisener);
					receivers.push(lisener.getWho());
				}
			}
		});
		return receivers;
	};

	/**
	 * @private
	 * Send to specific
	 * @param {jsmb.data.Message} message
	 * @param {jsmb.data.Destination} destination
	 * @returns {Array.<jsmb.data.Source>}
	 */
	exports.Liseners.prototype.sendToSpecific = function (message, destination) {
		var self = this,
			receivers = [],
			id = destination.getId(),
			instance = destination.getInstance();
		//specific lisener
		specific(this.liseners, instance, id, function (lisener) {
			if (lisener.handler(message)) {
				self.acknowledge(message, destination, lisener);
				receivers.push(lisener.getWho());
			}
		});

		return receivers;
	};

	/**
	 * @private
	 * Acknowledge
	 * @param {jsmb.data.Message} message
	 * @param {jsmb.data.Destination} destination
	 * @param {jsmb.bus.Lisener} lisener
	 */
	exports.Liseners.prototype.acknowledge = function (message, destination, lisener) {
		if (destination.getDeliveryAs() === jsmb.enum.DELIVERY_TYPE.NORMAL) {
			message.ack(lisener.getWho());
		}
	};

}(typeof exports === 'undefined' ? jsmb.bus : exports));
