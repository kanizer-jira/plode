//Filename: app.js

define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
	'router', // request router.js
	'applogic',
],
function($, _, Backbone, Router, APP){
	var initialize = function(){
		// Pass in our Router module and call it's initialize function
		var mainRouter = Router.initialize();
		APP.instances.mainRouter = mainRouter;
	}
	
	
	return {
		initialize: initialize
	};
});