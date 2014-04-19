/*global global, require, promise*/

//in node js global is GLOBAL scope
if (typeof global === 'undefined') {
	window.global = {};
}

(function (global) {
	"use strict";

	var server,
		http;

	//namespace
	global.jsmb = {};

	//check if context is server
	global.jsmb.isServer = typeof window === 'undefined';

	/**
	 * Static class of bus
	 * @type {global.jsmb.bus.Bus}
	 * @client
	 */
	global.MESSAGE = null;

	//enum namespace
	global.jsmb.enum = {};
	if (global.jsmb.isServer) {
		require('./enum');
	}

	//libraries namespace
	global.jsmb.libraries = {};
	if (global.jsmb.isServer) {
		//noinspection JSUnresolvedVariable
		global.jsmb.libraries.promise = require('../libraries/promise.min').promise;
	} else {
		global.jsmb.libraries.promise = promise;
	}

	//data namespace
	global.jsmb.data = {};
	if (global.jsmb.isServer) {
		require('./message/data.message');
		require('./message/data.source');
		require('./message/data.destination');
		require('./message/data.destinations');
	}

	//bus namespace
	global.jsmb.bus = {};
	if (global.jsmb.isServer) {
		require('./bus/bus.lisener');
		require('./bus/bus.liseners');
		require('./bus/bus.queue');
		require('./bus/bus.bus');
	}

	//server namespace
	global.jsmb.server = {};
	if (global.jsmb.isServer) {
		require('./server/server.server');
	}

	//settings
	global.jsmb.setting = {
		messageTimeout: 2000,
		port: 555,
		server: 'localhost',
		protocol: 'http',
		clientOnly: false
	};

}(typeof global === 'undefined' ? window.global : global));