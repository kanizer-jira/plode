define([
	'jquery'
	,'underscore'
	,'backbone'
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
			this.$about.fadeIn(400);
		}
		,events:{
			"click .print a" : "onClickPrint"
		}
		,onClickPrint: function(e){
			e.stopPropagation();
			e.preventDefault();
			window.print();
		}
	});

	// Our module now returns our view
	return ResumeView;
});