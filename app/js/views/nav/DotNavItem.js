define([
	'backbone'
	,'velocity'
	,'applogic'
],
function(Backbone, Velocity, APP) {

	var DotNavItem = Backbone.View.extend({

		el: 'body' // TODO - REMOVE THIS SHIT

		,initialize: function(container, id) {
			this.container = container;
			this.id = id;
		}

		,render: function() {
			this.el = document.createElement('div');
			this.el.ref = this;
			this.inner = document.createElement('div');
			this.outer = document.createElement('div');
			this.el.setAttribute('class', 'container');
			this.inner.setAttribute('class', 'inner');
			this.outer.setAttribute('class', 'outer');
			this.el.appendChild(this.inner);
			this.el.appendChild(this.outer);
			this.container.appendChild(this.el);

			this.destroyEvents();
			this.addEvents();
		}

		,addEvents: function() {
			this.el.addEventListener('click', this.onClick.bind(this));
			this.el.addEventListener('mouseenter', this.onOver.bind(this));
			this.el.addEventListener('mouseleave', this.onOut.bind(this));
		}

		,destroyEvents: function() {
			this.el.removeEventListener('click', this.onClick);
			this.el.removeEventListener('mouseenter', this.onOver);
			this.el.removeEventListener('mouseleave', this.onOut);
	    }

		,onClick: function(e) {
			var path =  'detail/' + this.id;
			APP.instances.mainRouter.navigate(path, {trigger: true});
		}

		,onOver: function(e) {
			if(!this.active) {
				Velocity(this.outer, {
					width: 16,
					height: 16
				}, { duration: 100 });
			}
		}

		,onOut: function(e) {
			if(!this.active) {
				Velocity(this.outer, {
					width: 0,
					height: 0
				}, { duration: 100 });
			}
		}

		,setActive: function(isActive) {
			this.active = isActive;
			Velocity(this.inner, { backgroundColor: this.active ? '#f00' : '#bbb' }, { duration: 100 });
			Velocity(this.outer, {
				width: this.active ? 26 : 0,
				height: this.active ? 26 : 0
			}, { duration: 100 });
		}

	});

	return DotNavItem;
});