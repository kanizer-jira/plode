define(['spin'], function(Spinner) {
    var pinConfig = {
		lines     : 13, // The number of lines to draw
		length    : 6, // The length of each line
		width     : 3, // The line thickness
		radius    : 7, // The radius of the inner circle
		corners   : 1, // Corner roundness (0..1)
		rotate    : 0, // The rotation offset
		color     : '#666666', // #rgb or #rrggbb
		speed     : 1, // Rounds per second
		trail     : 65, // Afterglow percentage
		shadow    : false, // Whether to render a shadow
		hwaccel   : false, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the spinner
		zIndex    : 0, // The z-index (defaults to 2000000000)
		top       : 'auto', // Top position relative to parent in px
		left      : 'auto' // Left position relative to parent in px
	};

	return function(container) {
		return new Spinner(pinConfig).spin(container);
	};
});
