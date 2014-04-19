/*global require, global, console*/
require("../../src/jsmb");

//setting

//init
global.MESSAGE.server();

(function () {
	"use strict";

	var source = new global.jsmb.data.Source("S", "id99");
	global.MESSAGE.listen(source, function (message) {
		console.log('received', message.from(), message);
		return true;
	});

}());
