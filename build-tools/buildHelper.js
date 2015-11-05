var fs = require('fs');
var chalk = require('chalk');
var sass = require('node-sass');
var conf = require('../package.json').buildTools.sass;

var completed = 0;
for(var i = 0; i < conf.files.length; i++) {
	(function(ind) {
		var src = conf.files[ind].src;
		var dest = conf.files[ind].dest;
		sass.render({
			file: src,
			outputStyle: 'compressed',
			outFile: dest,
			sourceMap: true, // or an absolute or relative (to outFile) path
		}, function(err, result) {
			// console.log('result.stats', ind, result.stats);
			if(!err) {
				// No errors during the compilation, write this result on the disk
				fs.writeFile(dest, result.css, function(writeErr) {
					if(!writeErr) {
						// file written on disk
						console.log(chalk.cyan(src, 'compiled to:', dest));
						completed++;
						if(completed === conf.files.length) {
							console.log(chalk.bgGreen('All sass files successfully compiled!'));
						}
					} else {
						console.log(chalk.red('writeErr', writeErr));
					}
				});
			} else {
				console.log(chalk.red('err', err));
			}
		});
	})(i);
}
