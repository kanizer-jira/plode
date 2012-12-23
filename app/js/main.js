// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3.min',
		underscore: 'libs/amd-enabled/underscore-min',
		backbone: 'libs/amd-enabled/backbone-min',
		text: 'libs/text',
		template: '../templates'
	}
});

require([
	// Load our app module and pass it to our definition function
	'app'
], 
function(App){

	console.log('init');

	// The "app" dependency is passed in as "App"
	App.initialize();
});