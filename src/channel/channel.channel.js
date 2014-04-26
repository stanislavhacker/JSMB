/*global jsmb, global */
(function () {
	"use strict";

	/**
	 * Channel
	 * @param {global.jsmb.bus.Liseners} liseners
	 * @constructor
	 */
	global.jsmb.channel.Channel = function (liseners) {
		/** @type {null} */
		this.channel = null;
		/** @type {global.jsmb.bus.Liseners}*/
		this.liseners = liseners;
	};

	/**
	 * Create channel
	 */
	global.jsmb.channel.Channel.prototype.createChannel = function () {
		var liseners = this.liseners,
			queue = liseners.queue,
			response,
			self = this,
			headers = {};

		//send on server
		headers['Client-Id'] = liseners.id;
		headers['Content-Type'] = "text/json";
		this.channel = global.jsmb.libraries.promise.get(liseners.getUrl(global.jsmb.enum.ACTION.CHANNEL), null, headers);

		//callback
		this.channel.then(function (error, data) {
			//new channel
			self.createChannel();
			//process data
			if (!error) {
				//json
				data =  JSON.parse(data);
				//resolve type
				switch (data.type) {
					case global.jsmb.enum.RESPONSE_TYPE.ACK:
						response = new global.jsmb.response.Ack().clone.apply(data);
						response.message = queue.get(response.message.id) || response.message;
						response.message.ack(response.source);
						break;
					default:
						break;
				}
			}
		});
	};

}());
