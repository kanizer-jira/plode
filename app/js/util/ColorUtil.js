define(function() {

	var ColorUtil = {};

	ColorUtil.hexToRgb = function(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	};

	ColorUtil.componentToHex = function(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	};

	ColorUtil.rgbToHex = function(r, g, b) {
	    return "#" + ColorUtil.componentToHex(r) + ColorUtil.componentToHex(g) + ColorUtil.componentToHex(b);
	};

	// RANDOM HEX
	// - http://www.paulirish.com/2009/random-hex-color-code-snippets/
	ColorUtil.getRandomHex = function(returnRaw) {
		var h = Math.floor(Math.random()*16777215);
		if(returnRaw) {
			return h;
		} else {
			h = '#' + h.toString(16);
			return h.length === 7 ? h : h + '0';
		}
	};

	ColorUtil.setColorSaturation = function(sat, hex) {
	    sat = sat / 100;
	    var col = ColorUtil.hexToRgb(hex);
	    var gray = col.r * 0.3086 + col.g * 0.6094 + col.b * 0.0820;

	    col.r = Math.round(col.r * sat + gray * (1 - sat));
	    col.g = Math.round(col.g * sat + gray * (1 - sat));
	    col.b = Math.round(col.b * sat + gray * (1 - sat));

	    return ColorUtil.rgbToHex(col.r, col.g, col.b);
	};

	return ColorUtil;

});
