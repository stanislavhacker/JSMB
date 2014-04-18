/*global jsmb */
(function () {
	"use strict";


	/**
	 * Message
	 * @constructor
	 */
	jsmb.data.Message = function () {
		/**
		 * @private
		 * @type {Date}
		 **/
		this.createdDate = new Date();
		/**
		 * @private
		 * @type {Date}
		 **/
		this.killedDate = new Date();
		/**
		 * @private
		 * @type {Date}
		 **/
		this.successDate = new Date();

		/**
		 * @private
		 * @type {jsmb.enum.MESSAGE_STATE}
		 * */
		this.state = jsmb.enum.MESSAGE_STATE.NEW;

		/**
		 * @private
		 * @type {jsmb.data.Source}
		 * */
		this.source = null;
		/**
		 * @private
		 * @type {jsmb.data.Destinations}
		 * */
		this.destinations = new jsmb.data.Destinations();
		/**
		 * @private
		 * @type {Object}
		 * */
		this.data = null;
		/**
		 * @private
		 * @type {number}
		 * */
		this.ttl = 15;

		/** @type {function(message: jsmb.data.Message)}*/
		this.onDie = null;
		this.onDie = function (message) {};

		/** @type {function(message: jsmb.data.Message, source: jsmb.data.Source)}*/
		this.onAck = null;
		this.onAck = function (message, source) {};

		/** @type {function(message: jsmb.data.Message, receivers: Array.<jsmb.data.Source>)}*/
		this.onSuccess = null;
		this.onSuccess = function (message, receivers) {};
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
	 * Created
	 * @returns {Date}
	 */
	jsmb.data.Message.prototype.created = function () {
		return this.createdDate;
	};

	/**
	 * Killed
	 * @returns {Date}
	 */
	jsmb.data.Message.prototype.killed = function () {
		return this.killedDate;
	};

	/**
	 * Serviced
	 * @returns {Date}
	 */
	jsmb.data.Message.prototype.serviced = function () {
		return this.successDate;
	};

	/**
	 * Age
	 * @returns {number} Age in ms
	 */
	jsmb.data.Message.prototype.age = function () {
		var state = this.state;

		//for killed state
		if (state === jsmb.enum.MESSAGE_STATE.KILLED) {
			return this.killedDate.getTime() - this.createdDate.getTime();
		}

		//for success state
		if (state === jsmb.enum.MESSAGE_STATE.SUCCESS) {
			return this.successDate.getTime() - this.createdDate.getTime();
		}

		//for new message
		return (new Date().getTime() - this.createdDate.getTime());
	};

	/**
	 * Status
	 * @returns {jsmb.enum.MESSAGE_STATE} Status of message
	 */
	jsmb.data.Message.prototype.status = function () {
		return this.state;
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
	 * @param {Object=} data
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
		this.killedDate = new Date();
		this.state = jsmb.enum.MESSAGE_STATE.KILLED;
		this.onDie(this);
	};

	/**
	 * Ack
	 * @param {jsmb.data.Source} who
	 */
	jsmb.data.Message.prototype.ack = function (who) {
		this.onAck(this, who);
	};

	/**
	 * Success
	 * @param {Array.<jsmb.data.Source>} receivers
	 */
	jsmb.data.Message.prototype.success = function (receivers) {
		this.successDate = new Date();
		this.state = jsmb.enum.MESSAGE_STATE.SUCCESS;
		this.onSuccess(this, receivers);
	};

}());
