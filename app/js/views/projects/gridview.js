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
			if(params) this.ids = params.ids;
			this.$el.append("<div id='project-grid'></div>");
			this.$grid = this.$el.find("#project-grid");
			this.$grid.css({ "display": "none" });
			this.$grid.append("<div id='project-grid-badges'></div>");
			this.$badges = this.$el.find("#project-grid-badges");
        	this.thumbsIdList = [];
			
			this.destroyEvents();
		}
		,render: function(){
			this.collection = new ProjectsCollection();
	        this.collection.forEach(this.addOne, this);

	        // DRAW TAGS
	        var tags = APP.data.tags;
	        var that = this;
			_.each(tags, function(tag){
				var $badge = $("<div class='plode-badge'>" + tag + "</div>");

	        	if(that.ids){
		        	// FILTER RESULT SET
//		        	if(that.ids.indexOf(tag) > -1)
		        	if($.inArray(tag, that.ids) > -1)
						$badge.addClass("active");
				}
				else $badge.addClass("active");
				
				that.$badges.append($badge[0]);
			});

			this.$grid.fadeIn(200);
	    }
	    
        ,addOne: function(thumbModel) {
        	var that = this;
        	var view;
        	
        	if(this.ids){
				_.each(that.ids, function(id){
		        	// FILTER RESULT SET
//		        	if(thumbModel.tags.indexOf(id) > -1 // TAG MATCHES FILTER ID
		        	if($.inArray(id, thumbModel.tags) > -1 // TAG MATCHES FILTER ID
		        		&& $.inArray(thumbModel.id, that.thumbsIdList) == -1 // VIEW DOESN'T ALREADY EXIST
		        		)
					{
				        view = new ThumbView({model: thumbModel});
				        view.render();

			        	// CREATE LIST OF EXISTING THUMBS
			        	that.thumbsIdList.push(thumbModel.id);
				        
				        // APPEND CORRECT GRID CLASS
				        that.$grid.append(view.el);
					}	        	
				});
        	}else{
		        view = new ThumbView({model: thumbModel});
		        view.render();
		        
		        // APPEND CORRECT GRID CLASS
		        this.$grid.append(view.el);
        	}
		}
		
		,events: {
			"click #project-grid-badges>.plode-badge" : "onBadgeClick"
		}

		,onBadgeClick: function(e){
			APP.log("click: ", e.currentTarget);
			var active = [];
			this.$badges.find(".plode-badge.active").each(function(){
				var tag = $(this).html();
				active.push(tag);
			});

			var $badge = $(e.currentTarget);
			var id = $badge.html();
			var re = new RegExp(",", "g");
			var s;
			
			var ind = $.inArray(id, active);
			if(!$badge.hasClass("active")){
				if(ind == -1) active.push(id);
			}
			else{
				if(ind > -1) active.splice(ind, 1);
			}

			var	s = active.toString().replace(re, "+");
			this.$grid.fadeOut(100, function(){
				$(this).remove();
				var path = (s == "") ? "projects" : "projects/" + s;
				APP.instances.mainRouter.navigate(path, {trigger: true});
			});
		}
		
		,destroyEvents: function() {
		    //COMPLETELY UNBIND THE VIEW
		    this.undelegateEvents();
		    $(this.el).removeData().unbind(); 
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

//			this.$img = this.$el.find(".grid-item-bg");
			this.$bg = this.$el.find(".grid-item-overlay-bg");
			this.$label = this.$el.find(".grid-item-label-wrapper");
			this.$move = this.$el.find(".move");
			this.$text = this.$el.find(".grid-item-label");
			this.$tags = this.$el.find(".grid-item-tags");
			this.$arrow = this.$el.find(".grid-item-arrow");
			this.$arrowLrg = this.$el.find(".arrow-lrg");
			
			// ADD SPINNER
			APP.showPinwheel(this.$el.find(".pinwheel"));
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
					    ,"margin-left": 10
				  });
			this.$text.find("span").css("font-size", "2em");
			this.$tags.css({
				"height": "auto"
				,"padding-top": 10
				,"opacity": 1
			});
			this.$arrow.css({"display": "none"});
			this.$arrowLrg.css({
				"margin-left": 0
				,"opacity": 1
				});
		}
		,onItemOut: function(e){
			var hpadding = 3;
			var vpadding = 10;
			var w = this.$el.width() - hpadding * 2 - 1;
			var h = 30;
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
				,"padding-top": 0
			});
			this.$arrow.fadeIn(200);
			this.$arrowLrg.css({
				"margin-left": 50
				,"opacity": 0
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