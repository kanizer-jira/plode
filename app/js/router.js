define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
	'applogic',
	'collections/projects',
	'views/projects/gridview',
	'views/projects/detailview',
	'views/resume/resumeview',
	'views/global/header/headerview',
	'views/global/footer/footerview'
],
function($, _, Backbone, APP, ProjectCollection, ProjectGridView, DetailView, ResumeView, HeaderView, FooterView){

	var MainRouter = Backbone.Router.extend(
	{
		initialize: function(){
		}
		
		,routes:{
			"" 				: "showHome"
			,"projects"		: "showHome"
			,"projects/:id"	: "showHomeFiltered"
			,"about" 		: "showResume"
			,"detail/:id" 	: "showDetail"
		}
	
		,showHomeFiltered: function(id){
			console.log("ROUTE: showHomeFiltered: ", id);

 			APP.instances.headerView.setNav("projects");
 			this.cleanup("projects");
 			
			// Call render on the module we loaded in via the dependency array
			// 'views/projects/list'
			var gridView = new ProjectGridView({id: id});
			gridView.render();
		}

		,showResume: function(e){
			console.log("ROUTE: showResume");

 			APP.instances.headerView.setNav("about");
 			this.cleanup("about");
 			
			var resumeView = new ResumeView();
			resumeView.render();
		}

		,showDetail: function(id){
			console.log("ROUTE: showDetail", id);

 			APP.instances.headerView.setNav("projects");
 			this.cleanup("detail");

			var detailView = new DetailView({id: id});
			detailView.render();
		}
		
		,cleanup: function(id){
			_.each(["about:about", "detail:project-detail", "projects:project-grid"]
				,function(s){
					var key = s.split(":")[0];
					var label = "#" + s.split(":")[1];
					if(id != key) $(label).remove();
				});
		}
	});


	// DRAW MASTHEAD
	var header = new HeaderView();
	header.render();
	APP.instances.headerView = header;
	
	// DRAW FOOTER
	var footer = new FooterView();
	footer.render();
	APP.instances.footerView = footer;
	
	// INIT COLLECTION
	var col = new ProjectCollection();
	APP.instances.projectCollection = col;



	var initialize = function(){
	
		var app_router = new MainRouter();
		app_router.on("route:showHome", function(){
			console.log("ROUTE: showHome");

 			APP.instances.headerView.setNav("projects");
 			this.cleanup("projects");

			// Call render on the module we loaded in via the dependency array
			// 'views/projects/list'
			var gridView = new ProjectGridView();
			gridView.render();
		});
	
		app_router.on('defaultAction', function(actions){
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		});

		Backbone.history.start();
		//Backbone.history.start({pushState: false, root: "test.html"});
		
		return app_router;
	};

	return {
		initialize: initialize
	};

});