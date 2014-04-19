/*global jsmb, global */
(function () {
	"use strict";


	/**
	 * Source
	 * @param {Object=} instance
	 * @param {string=} id
	 * @constructor
	 */
	global.jsmb.data.Source = function (instance, id) {
		/** @type {Object} */
		this.instance = instance;
		/** @type {string} */
		this.id = id;
	};

	/**
	 * Clone
	 * @returns {global.jsmb.data.Source}
	 */
	global.jsmb.data.Source.prototype.clone = function () {
		return new global.jsmb.data.Source(this.instance, this.id);
	};

	/**
	 * Get instance
	 * @returns {Object}
	 */
	global.jsmb.data.Source.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * Get id
	 * @returns {string}
	 */
	global.jsmb.data.Source.prototype.getId = function () {
		return this.id;
	};


	/**
	 * To source array
	 * @param {object} data
	 * @returns {Array<global.jsmb.data.Source>}
	 * @constructor
	 */
	global.jsmb.data.Source.ToSourceArray = function (data) {
		var objects = typeof data === "string" ? JSON.parse(data) : data,
			sources = [],
			clone,
			i;

		for (i = 0; i < objects.length; i++) {
			clone = objects[i].clone ? objects[i].clone() : new global.jsmb.data.Source().clone.apply(objects[i]);
			sources.push(clone);
		}

		return sources;
	};

}());
