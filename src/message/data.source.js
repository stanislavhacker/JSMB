/*global jsmb, exports */
(function (exports) {
	"use strict";


	/**
	 * Source
	 * @param {Object} instance
	 * @param {string} id
	 * @constructor
	 */
	exports.Source = function (instance, id) {
		/** @type {Object} */
		this.instance = instance;
		/** @type {string} */
		this.id = id;
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	exports.Source.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	exports.Source.prototype.getId = function () {
		return this.id;
	};

}(typeof exports === 'undefined' ? jsmb.data : exports));
