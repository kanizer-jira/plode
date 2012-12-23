// file: views/projects/list.js

define([
	'jquery'
	,'underscore'
	,'backbone'

	// Pull in the Collection module from above
	,'collections/projects'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/projects/list.html'
], 

function($, _, Backbone, ProjectsCollection, projectListTemplate)
{
	var ProjectListView = Backbone.View.extend({
		el: $('#wrapper'),
		render: function(){
			this.collection = new ProjectsCollection();
			this.collection.add({ name: "Ginger Kid" });
			
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( projectListTemplate, { name: "Ginger Kid" });//{ projects: this.collection.models } );
			this.$el.html(compiledTemplate);
		}
	});

	// Our module now returns our view	
	return ProjectListView;
});