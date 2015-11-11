define([
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

	var MainRouter = Backbone.Router.extend( {

		initialize: function() {}

		,routes:{
			"" 				: "showHome"
			,"projects"		: "showHome"
			,"projects/:id"	: "showHome"
			,"about" 		: "showResume"
			,"detail/:id" 	: "showDetail"
		}

		,showHome: function(id){
			APP.log("ROUTE: showHome: ", id);

 			APP.instances.headerView.setNav("projects");
 			this.cleanup("projects");

			var param = {};
 			if(id != undefined)
 			{
	 			// CREATE ARRAY OF FILTER KEYS
				var a = id.split("+");
				param = {ids:a};
			}


			// Call render on the module we loaded in via the dependency array
			// 'views/projects/list'
			var gridView = new ProjectGridView(param);
			gridView.render();
		}

		,showResume: function(e){
			APP.log("ROUTE: showResume");

 			APP.instances.headerView.setNav("about");
 			this.cleanup("about");

			var resumeView = new ResumeView();
			resumeView.render();
		}

		,showDetail: function(id){
			APP.log("ROUTE: showDetail", id);

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
					else if(id == "detail" && $("#project-detail") != null) $(label).remove();
					else if(id == "projects" && $("#project-grid") != null) $(label).remove();
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
		Backbone.history.start();
		return app_router;
	};

	return { initialize: initialize };

});
