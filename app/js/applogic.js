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
			id: "jordan"
			,sequence: 0
			,label: "JORDAN"
			,desc: "Chris Paul 3 Site"
			,img: "img/thumb_cp.jpg"
			,tags: ["weidenkennedy", "actionscript", "flashmediaserver", "web"]
			,detail:{
				desc: "Jordan wanted to showcase Chris Paul and his CP3.V shoe with a site that celebrates the on the court chaos where Chris Paul's skills shine. By immersing the viewer on the court during the final play of a game, the viewer is encouraged to explore the scene from numerous angles, speeds and scenes. <br><br>Balancing load times, FMS latency and interactivity required several integrated systems to cross-reference and track images, videos, interaction points and progress."
				,links:[{ label: "launch site", path: "http://www.nike.com/jumpman23/cp3v/chaos/"}, { label: "view at thefwa.com", path: "http://www.thefwa.com/site/quick-controls-chaos?search=quick%20controls%20chaos"}]
				,vid: "../media/cp.mp4"
				,vid_mp4: "media/cp.mp4"
				,vid_webm: "media/cp.webm"
				,vid_ogv: "media/cp.ogv"
				,slate: "img/slate_cp.jpg"
			}
		}
		,{
			id: "visa"
			,sequence: 1
			,label: "VISA"
			,desc: "go.visa.com Site"
			,img: "img/thumb_visa.jpg"
			,tags: ["actionscript", "akqa", "papervision3d", "web"]
			,detail:{
				desc: "The Visa Go site was designed to allow users to explore the experiences available through assorted Visa Signature Card programs. <br><br>A database of offers was presented as a scrolling, 3D grid of tiles that can be sorted and deep-linked into for integration with assorted ad units. <br><br>A singular code base was dynamically re-skinned and ported to alternate iterations that ran in parallel on Yahoo and Facebook."
				,links:[{ label: "view at akqa.com", path: "http://www.akqa.com/#/work/visa/go/awards"}]
				,vid: "../media/visa.mp4"
				,vid_mp4: "media/visa.mp4"
				,vid_webm: "media/visa.webm"
				,vid_ogv: "media/visa.ogv"
				,slate: "img/slate_visa.jpg"
			}
		}
		,{
			id: "kobe"
			,sequence: 2
			,label: "Nike"
			,desc: "Zoom Kobe IV Site"
			,img: "img/thumb_kobe.jpg"
			,tags: ["actionscript", "javascript", "akqa", "web"]
			,detail:{
				desc: "The Zoom site explored the R&D processes and concepts that contributed to the creation of this shoe. <br><br>Flash content modules were integrated into a proprietary templating system that Nike utilizes for their online properties. A blend of Javascript and flash content was used to create a seamless, modular, localizable, and easily-customized user experience."
				,vid: "../media/kobe.mp4"
				,vid_mp4: "media/kobe.mp4"
				,vid_webm: "media/kobe.webm"
				,vid_ogv: "media/kobe.ogv"
				,slate: "img/slate_kobe.jpg"
			}
		}
		,{
			id: "motion"
			,sequence: 3
			,label: "Various"
			,desc: "Assorted Motion Projects"
			,img: "img/thumb_motion.jpg"
			,tags: ["silverlight", "akqa", "web"]
			,detail:{
				desc: "Selected samples of motion and interactivity are showcased here."
				,vid: "../media/motion.mp4"
				,vid_mp4: "media/motion.mp4"
				,vid_webm: "media/motion.webm"
				,vid_ogv: "media/motion.ogv"
				,slate: "img/slate_motion.jpg"
			}
		}
		,{
			id: "rrl"
			,sequence: 4
			,label: "Ralph Lauren"
			,desc: "RRL Site"
			,img: "img/thumb_rrl.jpg"
			,tags: ["actionscript", "ralphlauren", "web"]
			,detail:{
				desc: "Ralph Lauren launched the RRL line of clothing and retail outlets with a site centered around photo shoots that reflected the vintage style of the brand. <br><br>Integration with the overarching Ralph Lauren site framework required a fair amount of JS communication to react to browser resizing, scrolling and interaction with navigation on the page yet outside of the flash module. Ralph Lauren's product API was utilized to populate, sort and search through the dynamic array of shoppable items displayed in the site."
				,vid: "../media/rrl.mp4"
				,vid_mp4: "media/rrl.mp4"
				,vid_webm: "media/rrl.webm"
				,vid_ogv: "media/rrl.ogv"
				,slate: "img/slate_rrl.jpg"
			}
		}
		,{
			id: "xbox"
			,sequence: 5
			,label: "XBOX"
			,desc: "Carousel & Media Player"
			,img: "img/thumb_xbox.jpg"
			,tags: ["silverlight", "akqa", "web"]
			,detail:{
				desc: "Xbox.com was redesigned to simplify and organize the extensive amount of content available into a coherent, unified system. <br><br>The home page slide show and global media player were designed to be configured per locale and property via Xbox's CMS.  Both modules are scaleable in scope and type of content."
				,vid: "../media/xbox.mp4"
				,vid_mp4: "media/xbox.mp4"
				,vid_webm: "media/xbox.webm"
				,vid_ogv: "media/xbox.ogv"
				,slate: "img/slate_xbox.jpg"
			}
		}
		,{
			id: "flip"
			,sequence: 6
			,label: "Flip"
			,desc: "theflip.com Site"
			,img: "img/thumb_flip.jpg"
			,tags: ["actionscript", "akqa", "web"]
			,detail:{
				desc: "Flip's site served to educate users about Flip products and features. <br><br>An Actionscript framework was designed to integrate legacy site modules and provide a templating system for future content to be implemented by Flip's internal development team. This framework supported localization and deep-linking."
				,vid: "../media/flip.mp4"
				,vid_mp4: "media/flip.mp4"
				,vid_webm: "media/flip.webm"
				,vid_ogv: "media/flip.ogv"
				,slate: "img/slate_flip.jpg"
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
				desc: "Xbox and Rufian Games wanted to generate some interest in this title prior to launch. Users could learn more about the game and story through video galleries, contests and other game feature highlights. <br><br>Built in Silverlight 3 and designed to be modular, this site was available in varying configurations and was localized for seven languages."
				,vid: "../media/crackdown.mp4"
				,vid_mp4: "media/crackdown.mp4"
				,vid_webm: "media/crackdown.webm"
				,vid_ogv: "media/crackdown.ogv"
				,slate: "img/slate_crackdown.jpg"
			}
		}
		,{
			id: "target"
			,sequence: 8
			,label: "TARGET"
			,desc: "Weekly Ad"
			,img: "img/thumb_target.jpg"
			,tags: ["actionscript", "akqa", "web"]
			,detail:{
				desc: "Target wanted to bring their long-standing, offline marketing tool to the web. Users can browse weekly deals in an extremely configurable, shareable format. <br><br>This site brings social media platforms, Target's deals database and a customized user experience together."
				,vid: "../media/target.mp4"
				,vid_mp4: "media/target.mp4"
				,vid_webm: "media/target.webm"
				,vid_ogv: "media/target.ogv"
				,slate: "img/slate_target.jpg"
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