/*global jsmb, exports */
(function (exports) {
	"use strict";

	/**
	 * Destination
	 * @param {jsmb.enum.MESSAGE_TYPE} type
	 * @param {jsmb.enum.DELIVERY_TYPE} deliveryAs
	 * @param {Object=} instance
	 * @param {string=} id
	 * @constructor
	 */
	exports.Destination = function (type, deliveryAs, instance, id) {
		/** @enum {jsmb.enum.MESSAGE_TYPE}*/
		this.type = type || jsmb.enum.MESSAGE_TYPE.NONE;
		/** @enum {jsmb.enum.DELIVERY_TYPE}*/
		this.deliveryAs = deliveryAs || jsmb.enum.DELIVERY_TYPE.NORMAL;
		/** @type {Object} */
		this.instance = instance || null;
		/** @type {string} */
		this.id = id || null;
	};

	/**
	 * Get type
	 * @returns {jsmb.enum.MESSAGE_TYPE}
	 */
	exports.Destination.prototype.getType = function () {
		return this.type;
	};

	/**
	 * Get delivery as
	 * @returns {jsmb.enum.DELIVERY_TYPE}
	 */
	exports.Destination.prototype.getDeliveryAs = function () {
		return this.deliveryAs;
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	exports.Destination.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	exports.Destination.prototype.getId = function () {
		return this.id;
	};

}(typeof exports === 'undefined' ? jsmb.data : exports));
