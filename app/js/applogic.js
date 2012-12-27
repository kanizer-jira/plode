//Filename: applogic.js

define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
],
function($, _, Backbone){

	var APP = {};

	APP.data = {
		tags: [ // CLIENTS
				"akqa"
				,"weidenkennedy"
				,"ralphlauren"

				// TECH
				,"actionscript"
				,"javascript"
				,"silverlight"
/*
				,"php"
				,"mysql"
				,"android"
				,"ios"
				,"css3"
				,"html5"
*/

				// TYPE
				,"web"
/*
				,"mobile"
				,"app"
*/

				// FRAMEWORKS
				,"flashmediaserver"
				,"motion"
				,"papervision3d"
/*
				,"backbonejs"
				,"jquery"
				,"jquerymobile"
				,"phonegap"
				,"sencha"
				,"codeigniter"
*/
			 ]
		,projects: [
		{
			id: "visa"
			,sequence: 1
			,label: "VISA"
			,desc: "go.visa.com site"
			,img: "img/thumb_visa.jpg"
			,tags: ["actionscript", "akqa", "papervision3d", "web"]
			,detail:{
				desc: "The Visa Go site was designed to allow users to explore the experiences available through assorted Visa Signature Card programs.<br /><br />A database of offers was presented as a scrolling, 3D grid of tiles that can be sorted and deep-linked into for integration with assorted ad units.<br /><br />A singular code base was dynamically re-skinned and ported to alternate iterations that ran in parallel on Yahoo and Facebook."
				,links:[{ label: "link1", path: "#"}, { label: "link2", path: "#"}]
				,vid: "Stylelist Redesign"
				,slate: "img/detail_aol_stylelist.jpg"
			}
		}
		,{
			id: "jordan"
			,sequence: 0
			,label: "JORDAN"
			,desc: "chris paul 3 site"
			,img: "img/thumb_sample.jpg"
			,tags: ["weidenkennedy", "actionscript", "flashmediaserver", "web"]
			,detail:{
				desc: "Jordan wanted to showcase Chris Paul and his CP3.V shoe with a site that celebrates the on the court chaos where Chris Paul's skills shine. By immersing the viewer on the court during the final play of a game, the viewer is encouraged to explore the scene from numerous angles, speeds and scenes.<br /><br />Balancing load times, FMS latency and interactivity required several integrated systems to cross-reference and track images, videos, interaction points and progress."
				,links:[{ label: "link1", path: "#"}, { label: "link2", path: "#"}]
				,vid: "path"
				,slate: "img/detail_cp.jpg"
			}
		}
		,{
			id: "target"
			,sequence: 2
			,label: "TARGET"
			,desc: '"weekly ad"'
			,img: "img/thumb_target.jpg"
			,tags: ["actionscript", "akqa", "web"]
			,detail:{
				desc: "Target wanted to bring their long-standing, offline marketing tool to the web. Users can browse weekly deals in an extremely configurable, shareable format.<br /><br />This site brings social media platforms, Target's deals database and a customized user experience together."
				,vid: "path"
				,slate: "img/detail_target.jpg"
			}
		}
		,{
			id: "rl"
			,sequence: 3
			,label: "Ralph Lauren"
			,desc: "RRL Site"
			,img: "img/thumb_rl.jpg"
			,tags: ["actionscript", "ralphlauren", "web"]
			,detail:{
				desc: "Ralph Lauren launched the RRL line of clothing and retail outlets with a site centered around photo shoots that reflected the vintage style of the brand.<br/><br />Integration with the overarching Ralph Lauren site framework required a fair amount of JS communication to react to browser resizing, scrolling and interaction with navigation on the page yet outside of the flash module. Ralph Lauren's product API was utilized to populate, sort and search through the dynamic array of shoppable items displayed in the site."
				,links:[{ label: "link1", path: "#"}]
				,vid: "path"
				,slate: "img/detail_rl.jpg"
			}
		}
	]};



    // BASE URL
    APP.baseApiUrl = 'testingApiUrl';
	
    // to simplify date formatting later
    APP.date = {
        months: [
            'January'
            ,'February'
            ,'March'
            ,'April'
            ,'May'
            ,'June'
            ,'July'
            ,'August'
            ,'September'
            ,'October'
            ,'November'
            ,'December'
        ]
    };

    // via https://gist.github.com/987036
    APP.getQueryStringValue = function(
        a, // the query string
        b, // placeholder
        c, // placeholder
        d, // placeholder
        e  // placeholder
        ) {
        for(
            b = /[?&]?([^=]+)=([^&]*)/g, // Create the regular expression to match key-value pairs.
                c = {},          // Create the object to store all the key-value pairs.
                e = decodeURIComponent;      // Alias the decodeURIComponent function to save bytes.
            d = b.exec(a.replace(/\+/g, ' '));
            c[e(d[1])] = e(d[2]) // store in the object.
            );

        return c; // return the object with the keys and pairs.
    };


    //------------------------------------------------------------------
    //
    // LOGGER UTILITY
    // - wraps ie console clause
    // - adds optional label param
    //
    //------------------------------------------------------------------

    // console fallback for IE, old firefox
    window.console = window.console || { log: function(){} };

    var loggerActive = true;

    APP.log = function(s, l)
    {
        if(loggerActive){
            if(l == undefined) console.log(s);
            else console.log(l + ': ', s);
        }
    };


    //----------------------------------------------------------
    //
    // SERIALIZE FORM DATA FOR JSON
    //
    //----------------------------------------------------------

    // CONVERT ARRAY OF OBJECTS INTO JSON OBJECT
    APP.serializeJSON=function(a) {
        var json = {};
        for(var i = 0; i < a.length; i++){
            var o = a[i];
            json[o['name']] = o['value'];
        }
        return json;
    };
    
    
    //----------------------------------------------------------
    //
    // STRIP PX AND RETURN INT
    //
    //----------------------------------------------------------

    APP.removePx = function(s){
    	return parseInt(s.split("px")[0]);	
    };


    //----------------------------------------------------------
    //
    // EMAIL VALIDATION
    //
    //----------------------------------------------------------
	APP.validateEmail = function(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	APP.validatePwd = function(pwd){
		var re= /^\S+$/; // no spaces
		return re.test(pwd);
	}



    APP.db = {}; // a place to put global references to collections / models
    APP.models = {};
    APP.collections = {};
    APP.routers = {};
    APP.views = {};
    APP.consts = {};
    APP.instances = {};
    
    
  	return APP;
});