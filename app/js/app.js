define([
	'jquery',
	'underscore',
	'backbone',
	'applogic',
	'views/projects/gridview',
	'views/projects/detailview',
	'views/resume/resumeview',
	'views/global/header/headerview',
	'views/global/footer/footerview'
],
function($, _, Backbone, APP, ProjectGridView, DetailView, ResumeView, HeaderView, FooterView) {

	var MainRouter = Backbone.Router.extend( {

		initialize: function() {
			this.header = new HeaderView();
			this.footer = new FooterView();
		}

		,routes:{
			"" 				: "showHome"
			,"projects"		: "showHome"
			,"projects/:id"	: "showHome"
			,"about" 		: "showResume"
			,"detail/:id" 	: "showDetail"
		}

		,showHome: function(id){
			console.log("ROUTE: showHome: ", id);

 			this.header.setNav("projects");
 			this.cleanup("projects");

			var param = {};
 			if(id != undefined) {
	 			// CREATE ARRAY OF FILTER KEYS
				var a = id.split("+");
				param = {ids:a};
			}

			var gridView = new ProjectGridView(param);
		}

		,showResume: function(e){
			console.log("ROUTE: showResume");

 			this.header.setNav("about");
 			this.cleanup("about");

			var resumeView = new ResumeView();
			resumeView.render();
		}

		,showDetail: function(id){
			console.log("ROUTE: showDetail", id);

 			this.header.setNav("projects");
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

	return {
		init: function(){
			APP.instances.mainRouter = new MainRouter();
			Backbone.history.start();
		}
	};

});
