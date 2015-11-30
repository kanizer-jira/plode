define([
	'jquery'
	,'underscore'
	,'backbone'
	,'text!template/global/blurb.html'
	,'text!template/resume/resume.html'
],
function($, _, Backbone, blurb, template) {

	var ResumeView = Backbone.View.extend({

		el: '#content'

		,initialize: function() {
			this.$el.append("<div id='about'></div>");
			this.$about = this.$el.find("#about");
			this.$about.css("display", "none");
		}

		,render: function() {
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template(blurb);
			this.$about.html(compiledTemplate);

			compiledTemplate = _.template(template);
			this.$about.append(compiledTemplate);
			this.$about.fadeIn(400);
		}

		,events: {
			"click .print a" : "onClickPrint"
		}

		,onClickPrint: function(e) {
			e.stopPropagation();
			e.preventDefault();
			window.print();
		}

	});

	return ResumeView;
});
