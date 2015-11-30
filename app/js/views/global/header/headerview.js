define([
	'jquery'
	,'underscore'
	,'backbone'
	,'velocity'
	,'applogic'
	,'text!template/global/header/header_main.html'
],

function($, _, Backbone, Velocity, APP, template) {

	var HeaderView = Backbone.View.extend({

		el: $('#masthead')

		,render: function(){
			// OBSCURE EMAIL
			var email = APP.riddleEmail(false);

			// Compile the template using Underscores micro-templating
			var compiledTemplate = _.template( template, { email: email });
			this.$el.html(compiledTemplate);

			this.$title = $('.header-inner-left');
			this.$nav = $('.header-nav-block');

			// tween in sucka
			$('#masthead').css('opacity', 0)
			.velocity({ opacity: 1 }, {
				duration: 600,
				easing: 'easeOutQuad'
			});

			$('#masthead-shadow').css('opacity', 0)
			.velocity({ opacity: 1 }, {
				duration: 400,
				delay: 200,
				easing: 'easeOutQuad'
			});

			this.$title.css({
				opacity: 0,
				marginLeft: 10
			})
			.velocity({
				opacity: 1,
				marginLeft: 0
			}, {
				duration: 600,
				easing: 'easeOutQuad'
			});

			this.$nav.css('opacity', 0)
			.velocity({ opacity: 1 }, {
				duration: 600,
				easing: 'easeOutQuad'
			});
		}

		,events: {
			'click .header-title-block' : 'onTitleClick'
			,'click .header-nav-block li' : 'onNavClick'
		}

		,onTitleClick: function(e){
 			APP.instances.mainRouter.navigate('projects', {trigger: true});
		}

		,onNavClick: function(e) {
			var $li = $(e.target).parent().parent();
			var id = $li.attr('id').split('_')[1];
			if(!$li.find('.nav-item').hasClass('active') || ( id == 'projects' )) {
				// ID MUST MATCH ROUTES
				// OR, GO BACK TO GRID VIEW FROM DETAILS VIEW
	 			APP.instances.mainRouter.navigate(id, {trigger: true});
			}
		}

		,setNav: function(key) {
			this.$el.find('li').each(function(index) {
				var id = $(this).attr('id').split('_')[1];
				var $hl = $(this).find('.header-nav-highlight-bar');
				var $item = $(this).find('.nav-item');

				// SET NAV STATE
				if(key == id) {
					if(!$item.hasClass('active')) {
						$item.addClass('active');
						$hl.velocity({ width: '100%' }, {
							duration: 200,
							easing: 'easeOutQuad'
						});
					}
				} else {
					$item.removeClass('active');
					$hl.velocity({ width: 0 }, {
						duration: 200,
						easing: 'easeOutQuad'
					});
				}
			});
		}
	});

	// Our module now returns our view
	return HeaderView;
});