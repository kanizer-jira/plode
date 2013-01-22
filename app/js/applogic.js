//Filename: applogic.js

define([
	// These are path alias that we configured in our bootstrap
	'jquery',
	'underscore',
	'backbone',
	'spin'
],
function($, _, Backbone, Spinner){

	var APP = {};


	// PROJECT DATASET
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
			,desc: "go.visa.com Site"
			,img: "img/thumb_visa.jpg"
			,tags: ["actionscript", "akqa", "papervision3d", "web"]
			,detail:{
				desc: "The Visa Go site was designed to allow users to explore the experiences available through assorted Visa Signature Card programs. A database of offers was presented as a scrolling, 3D grid of tiles that can be sorted and deep-linked into for integration with assorted ad units. A singular code base was dynamically re-skinned and ported to alternate iterations that ran in parallel on Yahoo and Facebook."
				,links:[{ label: "link1", path: "#"}, { label: "link2", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_aol_stylelist.jpg"
			}
		}
		,{
			id: "jordan"
			,sequence: 0
			,label: "JORDAN"
			,desc: "Chris Paul 3 Site"
			,img: "img/thumb_sample.jpg"
			,tags: ["weidenkennedy", "actionscript", "flashmediaserver", "web"]
			,detail:{
				desc: "Jordan wanted to showcase Chris Paul and his CP3.V shoe with a site that celebrates the on the court chaos where Chris Paul's skills shine. By immersing the viewer on the court during the final play of a game, the viewer is encouraged to explore the scene from numerous angles, speeds and scenes. Balancing load times, FMS latency and interactivity required several integrated systems to cross-reference and track images, videos, interaction points and progress."
				,links:[{ label: "link1", path: "#"}, { label: "link2", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_cp.jpg"
			}
		}
		,{
			id: "target"
			,sequence: 2
			,label: "TARGET"
			,desc: "Weekly Ad"
			,img: "img/thumb_target.jpg"
			,tags: ["actionscript", "akqa", "web"]
			,detail:{
				desc: "Target wanted to bring their long-standing, offline marketing tool to the web. Users can browse weekly deals in an extremely configurable, shareable format. This site brings social media platforms, Target's deals database and a customized user experience together."
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
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
				desc: "Ralph Lauren launched the RRL line of clothing and retail outlets with a site centered around photo shoots that reflected the vintage style of the brand. Integration with the overarching Ralph Lauren site framework required a fair amount of JS communication to react to browser resizing, scrolling and interaction with navigation on the page yet outside of the flash module. Ralph Lauren's product API was utilized to populate, sort and search through the dynamic array of shoppable items displayed in the site."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_rl.jpg"
			}
		}
		,{
			id: "xbox"
			,sequence: 4
			,label: "XBOX"
			,desc: "Carousel & Media Player"
			,img: "img/thumb_xbox.jpg"
			,tags: ["silverlight", "akqa", "web"]
			,detail:{
				desc: "Xbox.com was redesigned to simplify and organize the extensive amount of content available into a coherent, unified system. The home page slide show and global media player were designed to be configured per locale and property via Xbox's CMS.  Both modules are scaleable in scope and type of content."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_xbox.jpg"
			}
		}
		,{
			id: "kobe"
			,sequence: 5
			,label: "Nike"
			,desc: "Zoom Kobe IV Site"
			,img: "img/thumb_kobe.jpg"
			,tags: ["actionscript", "javascript", "akqa", "web"]
			,detail:{
				desc: "The Zoom site explored the R&D processes and concepts that contributed to the creation of this shoe. Flash content modules were integrated into a proprietary templating system that Nike utilizes for their online properties. A blend of Javascript and flash content was used to create a seamless, modular, localizable, and easily-customized user experience."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_kobe.jpg"
			}
		}
		,{
			id: "motion"
			,sequence: 6
			,label: "Various"
			,desc: "Assorted Motion Projects"
			,img: "img/thumb_motion.jpg"
			,tags: ["silverlight", "akqa", "web"]
			,detail:{
				desc: "Selected samples of motion and interactivity are showcased here."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_motion.jpg"
			}
		}
		,{
			id: "crackdown"
			,sequence: 7
			,label: "Xbox"
			,desc: "Crackdown 2 Site"
			,img: "img/thumb_crackdown.jpg"
			,tags: ["silverlight", "akqa", "web"]
			,detail:{
				desc: "Xbox and Rufian Games wanted to generate some interest in this title prior to launch. Users could learn more about the game and story through video galleries, contests and other game feature highlights. Built in Silverlight 3 and designed to be modular, this site was available in varying configurations and was localized for seven languages."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_crackdown.jpg"
			}
		}
		,{
			id: "flip"
			,sequence: 8
			,label: "Flip"
			,desc: "theflip.com Site"
			,img: "img/thumb_flip.jpg"
			,tags: ["actionscript", "akqa", "web"]
			,detail:{
				desc: "Flip's site served to educate users about Flip products and features. An Actionscript framework was designed to integrate legacy site modules and provide a templating system for future content to be implemented by Flip's internal development team. This framework supported localization and deep-linking."
				,links:[{ label: "link1", path: "#"}]
				,vid: "../media/Chrome_ImF.mp4"
				,vid_mp4: "media/Chrome_ImF.mp4"
				,vid_webm: "media/Chrome_ImF.webm"
				,vid_ogv: "media/Chrome_ImF.ogv"
				,slate: "img/detail_flip.jpg"
			}
		}		
	]};




    // BASE URL
    APP.baseApiUrl = 'testingApiUrl';
	



    // PINWHEEL
	APP.showPinwheel = function($tar)
	{
	    var opts = {
		  lines: 13, // The number of lines to draw
		  length: 2, // The length of each line
		  width: 2, // The line thickness
		  radius: 7, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  color: '#666666', // #rgb or #rrggbb
		  speed: 1, // Rounds per second
		  trail: 65, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 0,//2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};
		
		var spinner = new Spinner(opts).spin($tar[0]);

		// INSERT BREAK FOR CENTERING
		$tar.find(".spinner").after("<p></p>");
	}



	// POPULATE EMAILS
    APP.riddleEmail = function(full)
    {
		var emailriddlerarray = [110,101,108,115,111,110,64,112,108,111,100,101,46,99,111,109];

		/***********************************************
		* Encrypt Email script- Please keep notice intact
		* Tool URL: http://www.dynamicdrive.com/emailriddler/
		* **********************************************/
		var encryptedemail = '';
		for (var i=0; i<emailriddlerarray.length; i++)
			encryptedemail += String.fromCharCode(emailriddlerarray[i]);

		var s = (full) 
			? "mailto:" + encryptedemail + "?subject=Mail plode.com"
			: encryptedemail;
			
		return s;
    }



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




    APP.db = {}; // a place to put global references to collections / models
    APP.models = {};
    APP.collections = {};
    APP.routers = {};
    APP.views = {};
    APP.consts = {};
    APP.instances = {};
    
    
  	return APP;
});