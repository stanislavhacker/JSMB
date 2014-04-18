/*global jsmb, exports */
(function (exports) {
	"use strict";

	/**
	 * Message type
	 * @enum
	 */
	exports.MESSAGE_TYPE = {
		ALL: "all",
		INSTANCES: "instances",
		SPECIFIC: "specific",
		NONE: "none"
	};

	/**
	 * Message state
	 * @enum
	 */
	exports.MESSAGE_STATE = {
		NEW: "new",
		KILLED: "killed",
		SUCCESS: "success"
	};

	/**
	 * Delivery type
	 * @enum
	 */
	exports.DELIVERY_TYPE = {
		NORMAL: "normal",
		HIDDEN: "hidden"
	};

	/**
	 * Error
	 * @enum
	 */
	exports.ERROR = {
		INVALID_DESTINATION: "Invalid destination of message."
	};

}(typeof exports === 'undefined' ? jsmb.enum : exports));