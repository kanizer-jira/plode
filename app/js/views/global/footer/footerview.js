define([
	'jquery'
	,'underscore'
	,'backbone'
	,'util/EmailRiddler'
	,'text!template/global/footer/footer_main.html'
],

function($, _, Backbone, EmailRiddler, template) {

	var FooterView = Backbone.View.extend({
		el: $('#footer')

		,initialize: function() {
			this.render();
		}

		,render: function(){
			// OBSCURE EMAIL
			var email = EmailRiddler.riddleEmail(false);
			var emailHref = EmailRiddler.riddleEmail(true);

			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, { email: email, emailHref: emailHref });
			this.$el.html(compiledTemplate);
		}
		,events:{
			"click .download-resume" : "onDownloadResume"
		}

		,onDownloadResume: function(){
			console.log("onDownloadResume");

			// TODO - CREATE SERVICE TO GENERATE PDF
		}
	});

	// Our module now returns our view
	return FooterView;
});