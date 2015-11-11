define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'applogic'
],
function($, _, Backbone, Router, APP) {
	var initialize = function(){
		var mainRouter = Router.initialize();
		APP.instances.mainRouter = mainRouter;
	};

	return { initialize: initialize };
});