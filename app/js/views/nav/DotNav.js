define(['backbone', 'applogic', 'views/nav/DotNavItem'], function(Backbone, APP, DotNavItem) {

	var DotNav = Backbone.View.extend({

		el: '#container' // TODO - REMOVE THIS SHIT

		,initialize: function(container, collection, selectedId) {
			this.el = container;
			this.collection = collection;
			this.selectedId = selectedId;
			this.items = [];

			this.destroyEvents();
		}

		,render: function() {
			this.collection.models.forEach(function(item, ind) {
				var navItem = new DotNavItem(this.el, item.id);
				navItem.render(); // TODO - WHY DO I HAVE TO EXPLICITLY CALL?
				navItem.setActive(item.id === this.selectedId);
				this.items.push(navItem);
			}.bind(this));
		}

		,destroyEvents: function() {
		    this.undelegateEvents();
	    }

		,getActiveId: function() {
			return this.items.filter(function(item) {
				return item.active;
			})[0].id;
		}

		,getNext: function(direction) {
			var model = this.collection.get(this.getActiveId());
			var ind = model.sequence + direction;
			if(ind < 0) ind = 0;
			else if (ind > this.collection.models.length - 1) ind = this.collection.models.length - 1;

			// collection.where is malfunctioning - possibly the ancient version i'm using
			// var next = this.collection.where({label: 'RALPH LAUREN'})[0];
			var next = this.collection.models.filter(function(model) {
				return model.sequence === ind;
			})[0];

			var path =  'detail/' + next.id;
			APP.instances.mainRouter.navigate(path, {trigger: true});
		}

		,next: function() {
			this.getNext(1);
		}

		,prev: function() {
			this.getNext(-1);
		}

	});

	return DotNav;
});
