define(function() {
    return {
    	riddleEmail: function(full) {
			var emailriddlerarray = [110,101,108,115,111,110,64,112,108,111,100,101,46,99,111,109];

			/***********************************************
			* Encrypt Email script- Please keep notice intact
			* Tool URL: http://www.dynamicdrive.com/emailriddler/
			* **********************************************/
			var encryptedemail = '';
			for (var i=0; i<emailriddlerarray.length; i++)
				encryptedemail += String.fromCharCode(emailriddlerarray[i]);

			return (full) ? 'mailto:' + encryptedemail + '?subject=Mail plode.com' : encryptedemail;
		}
    };
});
