define(['backbone'], function(Backbone) {

	var DotNavItem = Backbone.View.extend({

		el: '#container' // TODO - REMOVE THIS SHIT

		,initialize: function(container, id) {
			this.el = container;
			this.id = id;
			this.destroyEvents();
		}

		,render: function() {
			this.container = document.createElement('div');
			this.outer = document.createElement('div');
			this.inner = document.createElement('div');
			this.container.setAttribute('class', 'container');
			this.outer.setAttribute('class', 'outer');
			this.inner.setAttribute('class', 'inner');
			this.container.appendChild(this.outer);
			this.container.appendChild(this.inner);
			this.el.appendChild(this.container);
		}

		,destroyEvents: function() {
		    //COMPLETELY UNBIND THE VIEW
		    this.undelegateEvents();
		    // TODO - ALIAS JQUERY unbind()
		    // $(this.el).removeData().unbind();
	    }

		,events: {
			,'click' 	  : 'onClick'
			,'mouseenter' : 'onOver'
			,'mouseleave' : 'onOut'
		}

		,onClick: function(e){
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
		,onOver: function(e){
			e.preventDefault();
			e.stopPropagation();
			var $img = $(e.currentTarget).find(".arrow-wrapper > img");
			$img.stop().show().animate({opacity: 1}, 200);
		}
		,onOut: function(e){
			e.preventDefault();
			e.stopPropagation();
			var $img = $(e.currentTarget).find(".arrow-wrapper > img");
			$img.stop().show().animate({opacity: 0}, 200);
		}

		,setActive: function(isActive) {
			this.active = isActive;
		}

	});

	return DotNavItem;
});