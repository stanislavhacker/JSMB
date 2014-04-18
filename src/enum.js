/*global jsmb */
(function () {
	"use strict";

	/**
	 * Message type
	 * @enum
	 */
	jsmb.enum.MESSAGE_TYPE = {
		ALL: "all",
		INSTANCES: "instances",
		SPECIFIC: "specific",
		NONE: "none"
	};

	/**
	 * Message state
	 * @enum
	 */
	jsmb.enum.MESSAGE_STATE = {
		NEW: "new",
		KILLED: "killed",
		SUCCESS: "success"
	};

	/**
	 * Delivery type
	 * @enum
	 */
	jsmb.enum.DELIVERY_TYPE = {
		NORMAL: "normal",
		HIDDEN: "hidden"
	};

	/**
	 * Error
	 * @enum
	 */
	jsmb.enum.ERROR = {
		INVALID_DESTINATION: "Invalid destination of message."
	};

}());