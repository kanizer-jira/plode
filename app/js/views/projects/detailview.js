define([
	'jquery'
	,'underscore'
	,'backbone'
	,'applogic'
	,'views/nav/DotNav'

	// DESATURATE PLUGIN
	,'libs/jquery.desaturate'

	// Pull in the Collection module from above
	,'collections/projects'

  	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	,'text!template/projects/detail_item.html'
	,'text!template/projects/detail_item_static.html'
],

function($, _, Backbone, APP, DotNav, desat, ProjectsCollection, template, templateStatic) {

	var DetailView = Backbone.View.extend({
		el: '#content'
		,initialize: function(options){
			this.id = options.id;
			this.$el.append("<div id='project-detail'></div>");
			this.$wrapper = this.$el.find("#project-detail");
			this.$wrapper.css("display", "none");
			this.destroyEvents();
			this.keys = [];

			document.onkeydown = this.onKeyDown.bind(this);
			document.onkeyup = this.onKeyUp.bind(this);
		}
		,render: function(){
			this.collection = new ProjectsCollection();
			this.model = this.collection.get(this.id);

			// Compile the template using Underscores micro-templating
			var compiledTemplate = this.model.detail.vid
				? _.template( template, this.model)
				: _.template( templateStatic, this.model);
			this.$el.find("#project-detail").html(compiledTemplate);
			// this.$badges = this.$el.find(".plode-badge");
			// this.$badges.css({ backgroundColor: this.model.color });

			if(this.model.detail.vid) {
				this.setupVideo();
			}

			// setup dotnav
			this.dotnavContainer = this.$el.find('.detail-dotnav')[0];
			this.dotnav = new DotNav(this.dotnavContainer, this.collection, this.id);
			this.dotnav.render();

			// transition in
			this.$wrapper.fadeIn(400);
		}
		,destroyEvents: function() {
		    //COMPLETELY UNBIND THE VIEW
		    this.undelegateEvents();
		    $(this.el).removeData().unbind();
			document.onkeydown = null;
		}
		,events:{
			"click .detail-tags .plode-badge" : "onBadgeClick"
			,"click .arrow" : "onArrowClick"
			,"click .detail-grid-icon" : "onGridIconClick"
			,"mouseenter .arrow" : "onArrowOver"
			,"mouseleave .arrow" : "onArrowOut"
		}
		,setupVideo: function() {
			this.vidEl = document.getElementsByTagName('video')[0];
			this.vidEl.className = '';
			this.vidEl.oncanplay = function() {
				this.vidEl.className = 'ready';
			}.bind(this);
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
		,onGridIconClick: function(e) {
			APP.instances.mainRouter.navigate("projects", {trigger: true});
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
		,onKeyDown: function(e) {
			this.keys.push(e.keyCode);
			if(this.keys.length > 1) return;
			if(e.keyCode === 37) {
				this.dotnav.prev();
			} else if(e.keyCode === 39) {
				this.dotnav.next();
			}
		}
		,onKeyUp: function(e) {
			var ind = this.keys.indexOf(e.keyCode);
			if(ind > -1) {
				this.keys.splice(ind, 1);
			}
		}
	});

	// Our module now returns our view
	return DetailView;
});
