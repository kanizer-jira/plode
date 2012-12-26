// file: views/global/footer/footermain.js

define([
	'jquery'
	,'underscore'
	,'backbone'

  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/global/footer/footer_main.html'
], 

function($, _, Backbone, template)
{
	var FooterView = Backbone.View.extend({
		el: $('#footer'),
		render: function(){
		
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, { name: "Ginger Kid" });
			this.$el.html(compiledTemplate);

			/**
			 *
			 * TODO - ADD OBFUSCATION FUNCTIONALITY
			 *
			 **/
		
		}
	});

	// Our module now returns our view	
	return FooterView;
});