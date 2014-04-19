/*global jsmb, global */
(function () {
	"use strict";

	/**
	 * Destination
	 * @param {global.jsmb.enum.MESSAGE_TYPE=} type
	 * @param {global.jsmb.enum.DELIVERY_TYPE=} deliveryAs
	 * @param {Object=} instance
	 * @param {string=} id
	 * @constructor
	 */
	global.jsmb.data.Destination = function (type, deliveryAs, instance, id) {
		/** @enum {global.jsmb.enum.MESSAGE_TYPE}*/
		this.type = type || global.jsmb.enum.MESSAGE_TYPE.NONE;
		/** @enum {global.jsmb.enum.DELIVERY_TYPE}*/
		this.deliveryAs = deliveryAs || global.jsmb.enum.DELIVERY_TYPE.NORMAL;
		/** @type {Object} */
		this.instance = instance || null;
		/** @type {string} */
		this.id = id || null;
	};

	/**
	 * Clone
	 * @returns {global.jsmb.data.Destination}
	 */
	global.jsmb.data.Destination.prototype.clone = function () {
		return new global.jsmb.data.Destination(this.type, this.deliveryAs, this.instance, this.id);
	};

	/**
	 * Get type
	 * @returns {global.jsmb.enum.MESSAGE_TYPE}
	 */
	global.jsmb.data.Destination.prototype.getType = function () {
		return this.type;
	};

	/**
	 * Get delivery as
	 * @returns {global.jsmb.enum.DELIVERY_TYPE}
	 */
	global.jsmb.data.Destination.prototype.getDeliveryAs = function () {
		return this.deliveryAs;
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	global.jsmb.data.Destination.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	global.jsmb.data.Destination.prototype.getId = function () {
		return this.id;
	};

}());
