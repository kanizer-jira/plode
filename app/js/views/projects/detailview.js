// file: views/projects/detailview.js

define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'

	// DESATURATE PLUGIN
	,'libs/jquery.desaturate'

	// Pull in the Collection module from above
	,'collections/projects'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/projects/detail_item.html'
], 

function($, _, Backbone, APP, desat, ProjectsCollection, template)
{
	var DetailView = Backbone.View.extend({
		el: '#content'
		,initialize: function(id){
			this.id = id;
			this.$el.append("<div id='project-detail'></div>");
			this.$wrapper = this.$el.find("#project-detail");
			this.$wrapper.css("display", "none");
			this.destroyEvents();
		}
		,render: function(){
			this.collection = new ProjectsCollection();
			this.model = this.collection.get(this.id);
			
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, this.model);
			this.$el.find("#project-detail").html(compiledTemplate);
			this.$wrapper.fadeIn(200);
		}
		,destroyEvents: function() {
		    //COMPLETELY UNBIND THE VIEW
		    this.undelegateEvents();
		    $(this.el).removeData().unbind(); 
	    }
		,events:{
			"click .detail-tags .plode-badge" : "onBadgeClick"
			,"click .arrow" : "onArrowClick"
			,"mouseenter .arrow" : "onArrowOver"
			,"mouseleave .arrow" : "onArrowOut"
		}
		,onBadgeClick: function(e){
			var id = $(e.currentTarget).html();
			APP.instances.mainRouter.navigate("projects/" + id, {trigger: true});
		}
		,onArrowClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			
			// GET NEXT PROJECT ID
			var inc = ($(e.currentTarget).hasClass("arrow-l")) ? -1 : 1;
			var ind = $.inArray(this.model, this.collection.models) + inc;
			if (ind < 0) ind = this.collection.models.length - 1
			else if(ind > this.collection.models.length - 1 ) ind = 0;

			var id = this.collection.models[ind].id;
			var path =  "detail/" + id;

			APP.instances.mainRouter.navigate(path, {trigger: true});
		}
		,onArrowOver: function(e){
			e.preventDefault();
			e.stopPropagation();
			var $img = $(e.currentTarget).find(".arrow-wrapper > img");
			$img.stop().show().animate({opacity: 1}, 200);
		}
		,onArrowOut: function(e){
			e.preventDefault();
			e.stopPropagation();
			var $img = $(e.currentTarget).find(".arrow-wrapper > img");
			$img.stop().show().animate({opacity: 0}, 200);
		}
	});

	// Our module now returns our view	
	return DetailView;
});