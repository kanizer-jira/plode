//Filename: app.js

define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
	'router' // request router.js
],
function($, _, Backbone, Router){

	var initialize = function(){
		// Pass in our Router module and call it's initialize function
		Router.initialize();
	}
	
	return {
		initialize: initialize
	};
});