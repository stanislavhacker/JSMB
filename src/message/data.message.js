/*global jsmb */
(function () {
	"use strict";


	/**
	 * Message
	 * @constructor
	 */
	jsmb.data.Message = function () {
		/** @type {Date}*/
		this.date = new Date();
		/** @type {jsmb.data.Source}*/
		this.source = null;
		/** @type {jsmb.data.Destinations}*/
		this.destinations = new jsmb.data.Destinations();
		/** @type {Object}*/
		this.data = null;
		/** @type {number}*/
		this.ttl = 15;
	};

	/**
	 * Set or get from
	 * @param {jsmb.data.Source=} from
	 * @returns {jsmb.data.Source}
	 */
	jsmb.data.Message.prototype.from = function (from) {
		this.source = this.source || from;
		return this.source;
	};

	/**
	 * Get destinations
	 * @returns {jsmb.data.Destinations}
	 */
	jsmb.data.Message.prototype.to = function () {
		return this.destinations;
	};

	/**
	 * When
	 * @returns {Date}
	 */
	jsmb.data.Message.prototype.when = function () {
		return this.date;
	};

	/**
	 * Lifetime
	 * @param {number} ttl
	 */
	jsmb.data.Message.prototype.lifetime = function (ttl) {
		this.ttl = ttl;
	};

	/**
	 * What
	 * @param {Object} data
	 * @returns {Object}
	 */
	jsmb.data.Message.prototype.what = function (data) {
		this.data = this.data || data;
		return this.data;
	};

	/**
	 * Again
	 */
	jsmb.data.Message.prototype.again = function () {
		this.ttl--;
	};

	/**
	 * Die
	 */
	jsmb.data.Message.prototype.die = function () {
		var time = new Date().getTime();
		console.log('Message die after ' + (time - this.date.getTime()) + 'ms', this);
	};

	/**
	 * Ack
	 * @param {jsmb.data.Source} who
	 */
	jsmb.data.Message.prototype.ack = function (who) {
		console.log('Message ack', who);
	};

	/**
	 * Success
	 * @param {Array.<jsmb.data.Source>} receivers
	 */
	jsmb.data.Message.prototype.success = function (receivers) {
		console.log('Message success', receivers.length, this);
	};

}());
