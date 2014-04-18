/*global jsmb */
(function () {
	"use strict";


	/**
	 * Source
	 * @param {Object} instance
	 * @param {string} id
	 * @constructor
	 */
	jsmb.data.Source = function (instance, id) {
		/** @type {Object} */
		this.instance = instance;
		/** @type {string} */
		this.id = id;
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	jsmb.data.Source.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	jsmb.data.Source.prototype.getId = function () {
		return this.id;
	};

}());
