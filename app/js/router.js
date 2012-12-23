define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
	'views/projects/list',
	'views/resume/resumeview',
],
function($, _, Backbone, ProjectListView, ResumeView){

	var MainRouter = Backbone.Router.extend(
	{
		initialize: function(){
		}
		
		,routes:{
			"home"	: "showHome"
			,"resume" : "showResume"
		}
	
		,showResume: function(e){
			console.log("ROUTE: showResume");
			var resumeView = new ResumeView();
			resumeView.render();
		}
	});


	var initialize = function(){
	
		var app_router = new MainRouter();
		app_router.on("route:showHome", function(){
			// Call render on the module we loaded in via the dependency array
			// 'views/projects/list'
			var projectListView = new ProjectListView();
			projectListView.render();
		});
	
		app_router.on('defaultAction', function(actions){
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		});

		Backbone.history.start();
		//Backbone.history.start({pushState: false, root: "test.html"});
	};

	return {
		initialize: initialize
	};

});