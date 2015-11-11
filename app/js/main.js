require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3.min',
		underscore: 'libs/amd-enabled/underscore-min',
		backbone: 'libs/amd-enabled/backbone-min',
		spin: 'libs/spin.min',
		applogic: 'applogic',
		text: 'libs/text',
		template: '../templates'
	}
});

require(['app'], function(App) {
	App.initialize();
});
