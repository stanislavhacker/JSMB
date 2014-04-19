/*global global */
(function () {
	"use strict";

	/**
	 * Lisener
	 * @param {map.<string>} all
	 * @param {global.jsmb.data.Source} who
	 * @param {function(message: global.jsmb.data.Message): boolean} handler
	 * @constructor
	 */
	global.jsmb.bus.Lisener = function (all, who, handler) {

		/** @type {global.jsmb.data.Source}*/
		this.who = who;
		/** @type {function(global.jsmb.data.Message): boolean}*/
		this.handler = handler;

		//noinspection JSUnresolvedFunction
		this.addLisener(all);
	};

	/**
	 * Get who
	 * @returns {global.jsmb.data.Source}
	 */
	global.jsmb.bus.Lisener.prototype.getWho = function () {
		return this.who;
	};

	/**
	 * @private
	 * @param {map.<string>} all
	 */
	global.jsmb.bus.Lisener.prototype.addLisener = function (all) {
		var who = this.who;

		//if not exists
		if (!all[who.id]) {
			all[who.id] = [];
		}
		//push self into object
		all[who.id].push(this);
	};

}());