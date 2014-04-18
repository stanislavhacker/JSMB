/*global jsmb, exports */
(function (exports) {
	"use strict";

	/**
	 * Lisener
	 * @param {map.<string>} all
	 * @param {jsmb.data.Source} who
	 * @param {function(message: jsmb.data.Message): boolean} handler
	 * @constructor
	 */
	exports.Lisener = function (all, who, handler) {

		/** @type {jsmb.data.Source}*/
		this.who = who;
		this.handler = handler;

		this.insert(all);
	};

	/**
	 * Get who
	 * @returns {jsmb.data.Source}
	 */
	exports.Lisener.prototype.getWho = function () {
		return this.who;
	};

	/**
	 * @private
	 * @param {map.<string>} all
	 */
	exports.Lisener.prototype.insert = function (all) {
		var who = this.who;

		//if not exists
		if (!all[who.id]) {
			all[who.id] = [];
		}
		//push self into object
		all[who.id].push(this);
	};

}(typeof exports === 'undefined' ? jsmb.bus : exports));