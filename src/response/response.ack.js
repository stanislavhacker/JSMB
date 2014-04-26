/*global jsmb, global */
(function () {
	"use strict";

	/**
	 * Ack response
	 * @param {global.jsmb.data.Message=} message
	 * @param {global.jsmb.data.Source=} source
	 * @constructor
	 */
	global.jsmb.response.Ack = function (message, source) {
		/** @type {global.jsmb.data.Message}*/
		this.message = message;
		/** @type {global.jsmb.data.Source}*/
		this.source = source;
		/** @type {global.jsmb.enum.RESPONSE_TYPE}*/
		this.type = global.jsmb.enum.RESPONSE_TYPE.ACK;
	};

	/**
	 * Clone
	 * @returns {global.jsmb.response.Ack}
	 */
	global.jsmb.response.Ack.prototype.clone = function () {
		var clone = new global.jsmb.response.Ack();

		clone.message = this.message.clone ? this.message.clone() : new global.jsmb.data.Message().clone.apply(this.message);
		clone.source = this.source.clone ? this.source.clone() : new global.jsmb.data.Source().clone.apply(this.source);
		clone.type = this.type;

		return clone;
	};

}());
