/*global jsmb, MESSAGE:true */
(function () {
	"use strict";

	/**
	 * Lisener
	 * @param {map.<string>} all
	 * @param {jsmb.data.Source} who
	 * @param {function(message: jsmb.data.Message): boolean} handler
	 * @constructor
	 */
	jsmb.bus.Lisener = function (all, who, handler) {

		this.who = who;
		this.handler = handler;

		this.insert(all);
	};

	/**
	 * Get who
	 * @returns {jsmb.data.Source}
	 */
	jsmb.bus.Lisener.prototype.getWho = function () {
		return this.who;
	};

	/**
	 * @private
	 * @param {map.<string>} all
	 */
	jsmb.bus.Lisener.prototype.insert = function (all) {
		var who = this.who;

		//if not exists
		if (!all[who.id]) {
			all[who.id] = [];
		}
		//push self into object
		all[who.id].push(this);
	};

}());