/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"contract/zlegal/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});