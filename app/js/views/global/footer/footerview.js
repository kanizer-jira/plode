// file: views/global/footer/footermain.js

define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'

  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/global/footer/footer_main.html'
], 

function($, _, Backbone, APP, template)
{
	var FooterView = Backbone.View.extend({
		el: $('#footer'),
		render: function(){
		
			// OBSCURE EMAIL
			var email = APP.riddleEmail(false);
			var emailHref = APP.riddleEmail(true);
		
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