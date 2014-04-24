/*global jsmb, global */
(function () {
	"use strict";


	/**
	 * Message
	 * @constructor
	 */
	global.jsmb.data.Message = function () {
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
		 * @type {global.jsmb.enum.MESSAGE_STATE}
		 * */
		this.state = global.jsmb.enum.MESSAGE_STATE.NEW;

		/**
		 * @private
		 * @type {Array.<global.jsmb.data.Source>}
		 * */
		this.acks = [];
		/**
		 * @private
		 * @type {global.jsmb.data.Source}
		 * */
		this.source = null;
		/**
		 * @private
		 * @type {global.jsmb.data.Destinations}
		 * */
		this.destinations = new global.jsmb.data.Destinations();
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

		/** @type {function(message: global.jsmb.data.Message, receivers: Array.<global.jsmb.data.Source>)}*/
		this.onDie = null;
		this.onDie = function (message, receivers) {};

		/** @type {function(message: global.jsmb.data.Message, source: global.jsmb.data.Source)}*/
		this.onAck = null;
		this.onAck = function (message, source) {};

		/** @type {function(message: global.jsmb.data.Message, receivers: Array.<global.jsmb.data.Source>)}*/
		this.onSuccess = null;
		this.onSuccess = function (message, receivers) {};
	};

	/**
	 * Clone
	 * @returns {global.jsmb.data.Message}
	 */
	global.jsmb.data.Message.prototype.clone = function () {
		var clone = new global.jsmb.data.Message(),
			acks = this.acks,
			ack,
			i;

		clone.createdDate = this.createdDate;
		clone.killedDate = this.killedDate;
		clone.successDate = this.successDate;
		clone.state = this.state;
		clone.source = this.source.clone ? this.source.clone() : new global.jsmb.data.Source().clone.apply(this.source);
		clone.destinations = this.destinations.clone ? this.destinations.clone() : new global.jsmb.data.Destinations().clone.apply(this.destinations);
		clone.data = this.data;
		clone.ttl = this.ttl;
		clone.onDie = this.onDie || function (message, receivers) {};
		clone.onAck = this.onAck || function (message, source) {};
		clone.onSuccess = this.onSuccess || function (message, receivers) {};

		for (i = 0; i < acks.length; i++) {
			ack = acks[i].clone ? acks[i].clone() : new global.jsmb.data.Source().clone.apply(acks[i]);
			clone.acks.add(ack);
		}

		return clone;
	};

	/**
	 * Set or get from
	 * @param {global.jsmb.data.Source=} from
	 * @returns {global.jsmb.data.Source}
	 */
	global.jsmb.data.Message.prototype.from = function (from) {
		this.source = this.source || from;
		return this.source;
	};

	/**
	 * Get destinations
	 * @returns {global.jsmb.data.Destinations}
	 */
	global.jsmb.data.Message.prototype.to = function () {
		return this.destinations;
	};

	/**
	 * Created
	 * @returns {Date}
	 */
	global.jsmb.data.Message.prototype.created = function () {
		return this.createdDate;
	};

	/**
	 * Killed
	 * @returns {Date}
	 */
	global.jsmb.data.Message.prototype.killed = function () {
		return this.killedDate;
	};

	/**
	 * Serviced
	 * @returns {Date}
	 */
	global.jsmb.data.Message.prototype.serviced = function () {
		return this.successDate;
	};

	/**
	 * Age
	 * @returns {number} Age in ms
	 */
	global.jsmb.data.Message.prototype.age = function () {
		var state = this.state;

		//for killed state
		if (state === global.jsmb.enum.MESSAGE_STATE.KILLED) {
			return this.killedDate.getTime() - this.createdDate.getTime();
		}

		//for success state
		if (state === global.jsmb.enum.MESSAGE_STATE.SUCCESS) {
			return this.successDate.getTime() - this.createdDate.getTime();
		}

		//for new message
		return (new Date().getTime() - this.createdDate.getTime());
	};

	/**
	 * Status
	 * @returns {global.jsmb.enum.MESSAGE_STATE} Status of message
	 */
	global.jsmb.data.Message.prototype.status = function () {
		return this.state;
	};

	/**
	 * Lifetime
	 * @param {number=} ttl
	 * @return {number}
	 */
	global.jsmb.data.Message.prototype.lifetime = function (ttl) {
		this.ttl = ttl || this.ttl;
		return this.ttl;
	};

	/**
	 * What
	 * @param {Object=} data
	 * @returns {Object}
	 */
	global.jsmb.data.Message.prototype.what = function (data) {
		this.data = this.data || data;
		return this.data;
	};

	/**
	 * Again
	 */
	global.jsmb.data.Message.prototype.again = function () {
		this.ttl--;
	};

	/**
	 * Die
	 */
	global.jsmb.data.Message.prototype.die = function () {
		this.killedDate = new Date();
		this.state = global.jsmb.enum.MESSAGE_STATE.KILLED;
		this.onDie(this, this.acks);
	};

	/**
	 * Ack
	 * @param {global.jsmb.data.Source} who
	 */
	global.jsmb.data.Message.prototype.ack = function (who) {
		this.acks.push(who);
		this.onAck(this, who);
	};

	/**
	 * Served?
	 * @param {global.jsmb.data.Source} who
	 * @returns {boolean}
	 */
	global.jsmb.data.Message.prototype.served = function (who) {
		var acks = this.acks,
			i;

		for (i = 0; i < acks.length; i++) {
			if (acks[i].getId() === who.getId() && acks[i].getInstance() === who.getInstance()) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Success
	 * @param {Array.<global.jsmb.data.Source>} receivers
	 */
	global.jsmb.data.Message.prototype.success = function (receivers) {
		this.successDate = new Date();
		this.state = global.jsmb.enum.MESSAGE_STATE.SUCCESS;
		this.onSuccess(this, receivers);
	};

}());
