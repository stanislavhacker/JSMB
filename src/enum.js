/*global global */
(function () {
	"use strict";

	/**
	 * Message type
	 * @enum
	 */
	global.jsmb.enum.MESSAGE_TYPE = {
		ALL: "all",
		INSTANCES: "instances",
		SPECIFIC: "specific",
		NONE: "none"
	};

	/**
	 * Message state
	 * @enum
	 */
	global.jsmb.enum.MESSAGE_STATE = {
		NEW: "new",
		KILLED: "killed",
		SUCCESS: "success"
	};

	/**
	 * Delivery type
	 * @enum
	 */
	global.jsmb.enum.DELIVERY_TYPE = {
		NORMAL: "normal",
		HIDDEN: "hidden"
	};

	/**
	 * Error
	 * @enum
	 */
	global.jsmb.enum.ERROR = {
		INVALID_DESTINATION: "Invalid destination of message.",
		SERVER_METHOD_ONLY: "This method is used only on node.js server!"
	};

	/**
	 * Action
	 * @enum
	 */
	global.jsmb.enum.ACTION = {
		MESSAGE: "message"
	};

}());