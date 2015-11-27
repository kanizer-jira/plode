define(['backbone', 'views/nav/DotNavItem'], function(Backbone, DotNavItem) {

	var DotNav = Backbone.View.extend({

		el: '#container' // TODO - REMOVE THIS SHIT

		,initialize: function(container, collection, selectedId) {
			this.el = container;
			this.collection = collection;
			this.selectedId = selectedId;

			// this.id = id;
			// this.$el.append("<div id='project-detail'></div>");
			// this.$wrapper = this.$el.find("#project-detail");
			// this.$wrapper.css("display", "none");
			this.destroyEvents();
		}

		,render: function() {
			this.collection.models.forEach(function(item, ind) {
				var navItem = new DotNavItem(this.el, item.id);
				navItem.render(); // TODO - WHY DO I HAVE TO EXPLICITLY CALL?
				navItem.setActive(item.id === this.selectedId);
			}.bind(this));

			// // Compile the template using Underscores micro-templating
			// var compiledTemplate = this.model.detail.vid
			// 	? _.template( template, this.model)
			// 	: _.template( templateStatic, this.model);
			// this.$el.find("#project-detail").html(compiledTemplate);
			// // this.$badges = this.$el.find(".plode-badge");
			// // this.$badges.css({ backgroundColor: this.model.color });
			// this.$wrapper.fadeIn(400);
		}

		,destroyEvents: function() {
		    //COMPLETELY UNBIND THE VIEW
		    this.undelegateEvents();
		    // TODO - ALIAS JQUERY unbind()
		    // $(this.el).removeData().unbind();
	    }

		// ,events:{
		// 	"click .detail-tags .plode-badge" : "onBadgeClick"
		// 	,"click .arrow" : "onArrowClick"
		// 	,"mouseenter .arrow" : "onArrowOver"
		// 	,"mouseleave .arrow" : "onArrowOut"
		// }
		// ,onBadgeClick: function(e){
		// 	var id = $(e.currentTarget).html();
		// 	APP.instances.mainRouter.navigate("projects/" + id, {trigger: true});
		// }
		// ,onArrowClick: function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();

		// 	// GET NEXT PROJECT ID
		// 	var inc = ($(e.currentTarget).hasClass("arrow-l")) ? -1 : 1;
		// 	var ind = $.inArray(this.model, this.collection.models) + inc;
		// 	if (ind < 0) ind = this.collection.models.length - 1
		// 	else if(ind > this.collection.models.length - 1 ) ind = 0;

		// 	var id = this.collection.models[ind].id;
		// 	var path =  "detail/" + id;

		// 	APP.instances.mainRouter.navigate(path, {trigger: true});
		// }
		// ,onArrowOver: function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	var $img = $(e.currentTarget).find(".arrow-wrapper > img");
		// 	$img.stop().show().animate({opacity: 1}, 200);
		// }
		// ,onArrowOut: function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	var $img = $(e.currentTarget).find(".arrow-wrapper > img");
		// 	$img.stop().show().animate({opacity: 0}, 200);
		// }
	});

	return DotNav;
});