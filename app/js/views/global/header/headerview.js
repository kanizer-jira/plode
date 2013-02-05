// file: views/global/header/headermain.js

define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'

  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/global/header/header_main.html'
], 

function($, _, Backbone, APP, template)
{
	var HeaderView = Backbone.View.extend({
		el: $('#masthead')
		,render: function(){

			// OBSCURE EMAIL
			var email = APP.riddleEmail(false);
		
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, { email: email });
			this.$el.html(compiledTemplate);
		}
		
		,events: {
			"click .header-title-block" : "onTitleClick"
			,"click .nav-item" : "onNavClick"
		}
		
		,onTitleClick: function(e){
 			APP.instances.mainRouter.navigate("projects", {trigger: true});
		}
		
		,onNavClick: function(e){
			var $li = $(e.target).parent().parent();
			var id = $li.attr("id").split("_")[1];
			if(!$li.find(".nav-item").hasClass("active") || ( id == "projects" ))
			{
				// ID MUST MATCH ROUTES
				// OR, GO BACK TO GRID VIEW FROM DETAILS VIEW
	 			APP.instances.mainRouter.navigate(id, {trigger: true});
			}
		}
		
		,setNav: function(key){
			this.$el.find("li").each(function(index){
				var id = $(this).attr("id").split("_")[1];
				var $hl = $(this).find(".header-nav-highlight-bar");

				// SET NAV STATE
				if(key == id)
				{
					$(this).find(".nav-item").addClass("active");
					$hl.height(2).css("margin-top", -2);
				}
				else
				{
					$(this).find(".nav-item").removeClass("active");
					$hl.height(0).css("margin-top", 0);
				}
			});
		}
	});

	// Our module now returns our view	
	return HeaderView;
});