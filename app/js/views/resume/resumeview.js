// file: views/resume/resumeview.js

define([
	'jquery'
	,'underscore'
	,'backbone'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/resume/resume.html'
], 

function($, _, Backbone, template)
{
	var ResumeView = Backbone.View.extend({
		el: '#content'
		,initialize: function(){
			this.$el.append("<div id='about'></div>");
			this.$about = this.$el.find("#about");
			this.$about.css("display", "none");
		}
		,render: function(){
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template);
			this.$about.html(compiledTemplate);
			this.$about.fadeIn(200);
		}
	});

	// Our module now returns our view	
	return ResumeView;
});