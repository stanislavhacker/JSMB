/*global require, global, console*/
require("../../src/jsmb");

//setting
(function () {
	"use strict";

	var source = new global.jsmb.data.Source("S", "id99");
	global.MESSAGE.listen(source, function (message) {
		console.log('Arrive     ', 'Destination:', source.id, 'Message:', message.what());
		return true;
	});

}());
