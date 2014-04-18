/*global jsmb */
(function () {
	"use strict";

	/**
	 * Destination
	 * @param {jsmb.enum.MESSAGE_TYPE} type
	 * @param {jsmb.enum.DELIVERY_TYPE} deliveryAs
	 * @param {Object=} instance
	 * @param {string=} id
	 * @constructor
	 */
	jsmb.data.Destination = function (type, deliveryAs, instance, id) {
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
	jsmb.data.Destination.prototype.getType = function () {
		return this.type;
	};

	/**
	 * Get delivery as
	 * @returns {jsmb.enum.DELIVERY_TYPE}
	 */
	jsmb.data.Destination.prototype.getDeliveryAs = function () {
		return this.deliveryAs;
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	jsmb.data.Destination.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	jsmb.data.Destination.prototype.getId = function () {
		return this.id;
	};

}());
