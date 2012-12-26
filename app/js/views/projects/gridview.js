// file: views/projects/gridview.js

define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'

	// Pull in the Collection module from above
	,'collections/projects'
  
  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/projects/grid_item.html'
], 

function($, _, Backbone, APP, ProjectsCollection, template)
{
	var ProjectGridView = Backbone.View.extend({
		el: '#content'
		,initialize: function(params){
			if(params) this.id = params.id;
			this.$el.append("<div id='project-grid'></div>");
			this.$grid = this.$el.find("#project-grid");
			this.$grid.css({ "display": "none" });
		}
		,render: function(){
			this.collection = new ProjectsCollection();
	        this.collection.forEach(this.addOne, this);
			this.$grid.fadeIn(200);
	    }
	    
        ,addOne: function(item) {
        	var view;
        	if(this.id){
	        	// FILTER RESULT SET
	        	if(item.tags.indexOf(this.id) > -1)
				{
			        view = new ThumbView({model: item});
			        view.render();
			        
			        // APPEND CORRECT GRID CLASS
			        this.$grid.append(view.el);
				}	        	
        	}else{
		        view = new ThumbView({model: item});
		        view.render();
		        
		        // APPEND CORRECT GRID CLASS
		        this.$grid.append(view.el);
        	}
		}
	});

	var ThumbView = Backbone.View.extend({
		className: "grid-item"
		,initialize:  function(model){
			this.model = model.model;
		}
		,render: function(){
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, this.model);
			this.$el.html(compiledTemplate);
			this.$el.attr("thumb-id", this.model.id);

			this.$bg = this.$el.find(".grid-item-overlay-bg");
			this.$label = this.$el.find(".grid-item-label-wrapper");
			this.$text = this.$el.find(".grid-item-label");
			this.$tags = this.$el.find(".grid-item-tags");
			this.$arrow = this.$el.find(".grid-item-arrow");
		}
		,events:{
			"mouseover" 	: "onItemOver"
			,"mouseout" 	: "onItemOut"
			,"click"	  	: "onItemClick"
		}
		,onItemOver: function(e){
			var w = this.$el.width();
			var h = this.$el.height();
			this.$bg.width(w).height(h)
			   .css({
			   		"background": "#000"
				    ,"margin-top": 0
				    ,"margin-left": 0
				    ,"margin-right": 0
		   		});
			this.$label.width(w).height(h)
			   	  .css({
					    "margin-top": 0
					    ,"margin-left": 5
				  });
			this.$text.find("span").css("font-size", "2em");
			this.$tags.css({
				"height": "auto"
				,"opacity": 1
			});
			this.$arrow.css("padding-right", 20);
		}
		,onItemOut: function(e){
			var hpadding = 3;
			var vpadding = 10;
			var w = this.$el.width() - hpadding * 2;
			var h = 40;
			var vmargin = (this.$el.height() - h - vpadding);
			this.$bg.width(w).height(h)
				   .css({
				   		"background": "#ff0000" // MATCH WITH RED CSS VAL
					    ,"margin-top": vmargin
					    ,"margin-left": hpadding
					    ,"margin-right": hpadding
			   		});
			this.$label.width(w).height(h)
			   	  .css({
					    "margin-top": vmargin
					    ,"margin-left": 0
				  });
			this.$text.find("span").css({
				"font-size": "1em"
			});
			this.$tags.css({
				"height": 0
				,"opacity": 0
			});
			this.$arrow.css({
				"padding-right": 10
			});
		}
		,onItemClick: function(e){
			var id = $(e.currentTarget).attr("thumb-id");
			this.$el.fadeOut(100, function(){
				APP.instances.mainRouter.navigate("detail/" + id, {trigger: true});
			});
		}
	});


	// Our module now returns our view	
	return ProjectGridView;
});