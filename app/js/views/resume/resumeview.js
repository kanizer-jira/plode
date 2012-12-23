// file: views/resume/resumeview.js

define([
	'jquery'
	,'underscore'
	,'backbone'

	// Pull in the Collection module from above
	,'collections/projects'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/resume/resume_job_item.html'
], 

function($, _, Backbone, ProjectsCollection, projectListTemplate)
{
	var ResumeView = Backbone.View.extend({
		el: $('#wrapper'),
		render: function(){
			this.collection = new ProjectsCollection();
			this.collection.add({ 
				title: "PLODE | Mar 2011 - Current"
				,role: "Freelance Creative Developer"
				,body: "clients: <a href='#'>Wieden+Kennedy</a> (Nike, ESPN), <a href='#'>Night Agency</a> (Levi’s) and Ralph Lauren. <br /><a href='#'>www.plode.com</a>"
			});
			
			// Compile the template using Underscores micro-templating
			var tempModel = this.collection.models[0].attributes;
			console.log(tempModel);
			var compiledTemplate = _.template( projectListTemplate, tempModel);//{ projects: this.collection.models } );
			this.$el.html(compiledTemplate);
		}
	});

	// Our module now returns our view	
	return ResumeView;
});