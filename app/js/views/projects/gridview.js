define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'
	,'collections/projects'
	,'text!template/projects/grid_item.html'
],

function($, _, Backbone, APP, ProjectsCollection, template) {

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
		className: "grid-item-column"
		,initialize:  function(model){
			this.model = model.model;
		}
		,render: function(){
			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, this.model);
			this.$el.html(compiledTemplate);
			this.$el.attr("thumb-id", this.model.id);

//			this.$img = this.$el.find(".grid-item-bg");
			this.$overlayWrapper = this.$el.find(".grid-item-overlay");
			this.$bg = this.$el.find(".grid-item-overlay-bg");
			this.$label = this.$el.find(".grid-item-label-wrapper");
			this.$move = this.$el.find(".move");
			this.$text = this.$el.find(".grid-item-label");
			this.$tags = this.$el.find(".grid-item-tags");
			this.$arrow = this.$el.find(".grid-item-arrow");
			this.$arrowLrg = this.$el.find(".arrow-lrg");

			// ADD SPINNER
			APP.showPinwheel(this.$el.find(".pinwheel"));

			this.onRollout = _.debounce(this.animateRollout, 100);
		}
		,events: {
			"mouseenter" 	: "onItemOver"
			,"mouseleave" 	: "onItemOut"
			,"click"	  	: "onItemClick"
		}
		,onItemOver: function(e) {
			var cnt = 0;
			clearTimeout(this.animTimer);

			// hide label & arrow
			this.$label.css({ opacity: 0 });
			this.$arrow.css({ display: "none" });

			// hide band
			cnt += 50;
			this.animTimer = setTimeout(function() {
				this.$bg.css({
					height: 0,
					bottom: ThumbView.redbandHeight/2,
					opacity: 0,
					background: 'red'
				});
			}.bind(this), cnt);

			// fade in vignette
			cnt += 80;
			this.animTimer = setTimeout(function() {
				this.$overlayWrapper.css({ margin: 0 });
				this.$bg.css({
					width: '100%',
					height: '100%',
					bottom: 0,
					background: 'black'
				});
			}.bind(this), cnt);

			// show large label
			cnt += 50;
			this.animTimer = setTimeout(function() {
				this.$label.css({
					opacity: 1,
					top: 20
				});
				this.$text
					.css({ padding: '0 20px'})
					.find("span").css("font-size", "2em");
				this.$tags.css({
					height: 'auto',
					paddingTop: 5,
					opacity: 1
				});
				this.$bg.css({ opacity: 0.6 });
			}.bind(this), cnt);
		}
		,onItemOut: function() {
			return this.onRollout();
		}

		,animateRollout: function() {
			var cnt = 0;
			clearTimeout(this.animTimer);

			// hide label and bg
			this.$bg.css({ opacity: 0 });
			this.$label.css({ opacity: 0 });
			this.$tags.css({
				paddingTop: 0,
				opacity: 0
			});

			// reposition label strip
			cnt += 50;
			this.animTimer = setTimeout(function() {
				this.$overlayWrapper.css({ margin: 5 });
				this.$bg.css({
					height: 0,
					bottom: 0,
					background: 'red'
				});
				this.$tags.css({ height: 0 });
				this.$arrow.css({ display: 'table-cell' });
				this.$text
					.css({ padding: '0 10px'})
					.find("span").css("font-size", "1em");

			}.bind(this), cnt);

			// fade red bar
			cnt += 100;
			this.animTimer = setTimeout(function() {
				this.$bg.css({
					height: ThumbView.redbandHeight,
					opacity: 0.7,
				});
			}.bind(this), cnt);

			// show small label
			cnt += 50;
			this.animTimer = setTimeout(function() {
				this.$label.css({
					opacity: 1,
					top: 'auto'
				});
			}.bind(this), cnt);
		}
		,onItemClick: function(e){
			var id = $(e.currentTarget).attr("thumb-id");
			this.$el.fadeOut(100, function(){
				APP.instances.mainRouter.navigate("detail/" + id, {trigger: true});
			});
		}
	},
	{
		// Set class level constants
		redbandHeight: 30 // match with css static height attr
	});


	// Our module now returns our view
	return ProjectGridView;
});