define(['backbone', 'views/nav/DotNavItem'], function(Backbone, DotNavItem) {

	var DotNav = Backbone.View.extend({

		el: '#container' // TODO - REMOVE THIS SHIT

		,initialize: function(container, collection, selectedId) {
			this.el = container;
			this.collection = collection;
			this.selectedId = selectedId;

			this.destroyEvents();
		}

		,render: function() {
			this.collection.models.forEach(function(item, ind) {
				var navItem = new DotNavItem(this.el, item.id);
				navItem.render(); // TODO - WHY DO I HAVE TO EXPLICITLY CALL?
				navItem.setActive(item.id === this.selectedId);
			}.bind(this));
		}

		,destroyEvents: function() {
		    this.undelegateEvents();
	    }

	});

	return DotNav;
});