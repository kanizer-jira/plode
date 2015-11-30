require.config({
	paths: {
		underscore : 'libs/amd-enabled/underscore-min',
		backbone   : 'libs/amd-enabled/backbone-min',
		jquery     : 'libs/jquery-1.8.3.min',
		spin       : 'libs/spin.min',
		velocity   : 'libs/velocity.min',
		applogic   : 'applogic',
		text       : 'libs/text',
		template   : '../templates'
	},
	shim: {
	    'velocity': {
	        deps: [ 'jquery' ]
	    },
	    // // Optional, if you're using the UI pack:
	    // 'velocity-ui': {
	    //     deps: [ 'velocity' ]
	    // }
	}
});

require(['app'], function(App) {
	App.initialize();
});
