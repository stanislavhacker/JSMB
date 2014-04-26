/*global jsmb, global, promise */
(function () {
	"use strict";


	/**
	 * Iterate
	 * @param {map.<string>} liseners
	 * @param {function(global.jsmb.bus.Lisener)} callback
	 */
	function iterate(liseners, callback) {
		var instances,
			lisener,
			key,
			i;

		for (key in liseners) {
			if (liseners.hasOwnProperty(key)) {
				instances = /** @type {Array.<global.jsmb.bus.Lisener>}*/ liseners[key];
				for (i = 0; i < instances.length; i++) {
					lisener = /** @type {global.jsmb.bus.Lisener}*/ instances[i];
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
	 * @param {function(global.jsmb.bus.Lisener)} callback
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
					lisener = /** @type {global.jsmb.bus.Lisener}*/ instances[i];
					callback(lisener);
				}
			}
		}
	}


	/**
	 * Liseners
	 * @param {global.jsmb.bus.Queue} queue
	 * @constructor
	 */
	global.jsmb.bus.Liseners = function (queue) {
		/** @type {map.<string>}*/
		this.liseners = {};
		/** @type {global.jsmb.bus.Queue} */
		this.queue = queue;
		/** @type {string}*/
		this.id = Math.random().toString(36);
	};

	/**
	 * Listen on messages
	 * @param {global.jsmb.data.Source} who
	 * @param {function(message: global.jsmb.data.Message): boolean} handler
	 * @return {global.jsmb.bus.Lisener}
	 */
	global.jsmb.bus.Liseners.prototype.add = function (who, handler) {
		return new global.jsmb.bus.Lisener(this.liseners, who, handler);
	};

	/**
	 * Message
	 * @param {global.jsmb.data.Message} message
	 * @return {promise.Promise}
	 */
	global.jsmb.bus.Liseners.prototype.message = function (message) {
		var promise = new global.jsmb.libraries.promise.Promise(),
			to = message.to(),
			destinations = to.get(),
			receivers = [],
			destination,
			i;

		for (i = 0; i < destinations.length; i++) {
			destination = destinations[i];
			switch (destination.getType()) {
				case global.jsmb.enum.MESSAGE_TYPE.ALL:
					receivers = receivers.concat(this.sendToAll(message, destination));
					break;
				case global.jsmb.enum.MESSAGE_TYPE.INSTANCES:
					receivers = receivers.concat(this.sendToInstance(message, destination));
					break;
				case global.jsmb.enum.MESSAGE_TYPE.SPECIFIC:
					receivers = receivers.concat(this.sendToSpecific(message, destination));
					break;
				default:
					throw global.jsmb.enum.ERROR.INVALID_DESTINATION;
			}
		}

		//remote
		this.remote(message).then(function (error, remoteReceivers) {
			if (remoteReceivers) {
				remoteReceivers = global.jsmb.data.Source.ToSourceArray(remoteReceivers);
				for (i = 0; i < remoteReceivers.length; i++) {
					//noinspection JSUnresolvedVariable
					message.acks.push(remoteReceivers[i]);
				}
				receivers = receivers.concat(remoteReceivers);
			}
			promise.done(error, receivers);
		});

		//noinspection JSValidateTypes
		return promise;
	};

	/**
	 * @private
	 * Send to all
	 * @param {global.jsmb.data.Message} message
	 * @param {global.jsmb.data.Destination} destination
	 * @returns {Array.<global.jsmb.data.Source>}
	 */
	global.jsmb.bus.Liseners.prototype.sendToAll = function (message, destination) {
		var self = this,
			receivers = [];
		//iterate all
		iterate(this.liseners, function (lisener) {
			//noinspection JSUnresolvedFunction
			if (!message.served(lisener.getWho()) && lisener.handler(message)) {
				self.acknowledge(message, destination, lisener);
				receivers.push(lisener.getWho());
			}
		});
		return receivers;
	};

	/**
	 * @private
	 * Send to instance
	 * @param {global.jsmb.data.Message} message
	 * @param {global.jsmb.data.Destination} destination
	 * @returns {Array.<global.jsmb.data.Source>}
	 */
	global.jsmb.bus.Liseners.prototype.sendToInstance = function (message, destination) {
		var self = this,
			receivers = [],
			instance = destination.getInstance();
		//iterate all
		iterate(this.liseners, function (lisener) {
			if (lisener.getWho().getInstance() === instance) {
				//noinspection JSUnresolvedFunction
				if (!message.served(lisener.getWho()) && lisener.handler(message)) {
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
	 * @param {global.jsmb.data.Message} message
	 * @param {global.jsmb.data.Destination} destination
	 * @returns {Array.<global.jsmb.data.Source>}
	 */
	global.jsmb.bus.Liseners.prototype.sendToSpecific = function (message, destination) {
		var self = this,
			receivers = [],
			id = destination.getId(),
			instance = destination.getInstance();
		//specific lisener
		specific(this.liseners, instance, id, function (lisener) {
			//noinspection JSUnresolvedFunction
			if (!message.served(lisener.getWho()) && lisener.handler(message)) {
				self.acknowledge(message, destination, lisener);
				receivers.push(lisener.getWho());
			}
		});

		return receivers;
	};

	/**
	 * @private
	 * Acknowledge
	 * @param {global.jsmb.data.Message} message
	 * @param {global.jsmb.data.Destination} destination
	 * @param {global.jsmb.bus.Lisener} lisener
	 */
	global.jsmb.bus.Liseners.prototype.acknowledge = function (message, destination, lisener) {
		if (destination.getDeliveryAs() === global.jsmb.enum.DELIVERY_TYPE.NORMAL) {
			message.ack(lisener.getWho());
		}
	};

	/**
	 * Get url
	 * @param {global.jsmb.enum.ACTION} action
	 * @returns {string}
	 */
	global.jsmb.bus.Liseners.prototype.getUrl = function (action) {
		var setting = global.jsmb.setting;
		return setting.protocol + "://" + setting.server + ":" + setting.port + "/" + action;
	};

	/**
	 * @private
	 * Push message
	 * @param {global.jsmb.data.Message} message
	 * @return {promise.Promise}
	 */
	global.jsmb.bus.Liseners.prototype.remote = function (message) {
		var headers = {},
			setting = global.jsmb.setting,
			isServer = global.jsmb.isServer,
			promise = new global.jsmb.libraries.promise.Promise();

		//send on server
		if (setting.clientOnly || isServer) {
			promise.done(false, []);
			//noinspection JSValidateTypes
			return promise;
		}

		//send on server
		headers['Content-Type'] = "text/json";
		headers['Client-Id'] = this.id;
		return global.jsmb.libraries.promise.post(this.getUrl(global.jsmb.enum.ACTION.MESSAGE), JSON.stringify(message), headers);
	};

}());
