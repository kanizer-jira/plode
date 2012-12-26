// file: views/projects/detailview.js

define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'

	// Pull in the Collection module from above
	,'collections/projects'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/projects/detail_item.html'
], 

function($, _, Backbone, APP, ProjectsCollection, template)
{
	var DetailView = Backbone.View.extend({
		el: '#content'
		,initialize: function(id){
			this.id = id;
			this.$el.append("<div id='project-detail'></div>");
			this.$wrapper = this.$el.find("#project-detail");
			this.$wrapper.css("display", "none");
		}
		,render: function(){
			this.collection = new ProjectsCollection();
			var model = this.collection.get(this.id);
			
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, model);
			this.$el.find("#project-detail").html(compiledTemplate);
			this.$wrapper.fadeIn(200);
		}
		,events:{
			"click .plode-badge" : "onBadgeClick"
		}
		,onBadgeClick: function(e){
			var id = $(e.currentTarget).html();
			APP.instances.mainRouter.navigate("projects/" + id, {trigger: true});
		}
	});

	// Our module now returns our view	
	return DetailView;
});