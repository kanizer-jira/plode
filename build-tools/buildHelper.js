var Promise      = require('bluebird');
var _            = require('lodash');
var fse          = require('fs-extra');
var glob         = require('glob');
var chalk        = require('chalk');
var sass         = require('node-sass');
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');
var conf         = require('../package.json').buildTools.sass;

//----------------------------------------------------------------------
//
// transpile sass
//
//----------------------------------------------------------------------

// promisify methods
var sassRender = Promise.promisify(sass.render);
var globbers = Promise.promisify(glob);

var count = conf.files.length; // re-used in copyFiles()!
_.forEach(conf.files, compileSass);

function compileSass(file) {
	sassRender({
		file: file.src,
		outputStyle: 'compressed',
		outFile: file.dest,
		sourceMap: true, // or an absolute or relative (to outFile) path
	})
	.catch(function(err) {
		console.log(chalk.red('sass render error', err));
	})
	.then(function(result) {
		// No errors during the compilation, write this result on the disk
		if(result) {

			// autoprefix
			postcss([autoprefixer]).process(result.css.toString('utf8'))
				.then(function(prefixed) {
					prefixed.warnings().forEach(function(warn) {
						console.log('buildHelper.js: warn.toString():', warn.toString());
					})

					fse.writeFile(file.dest, prefixed, function(writeErr) {
						if(!writeErr) {
							// file written on disk
							count--;
							if(count === 0) {
								console.log(chalk.bgGreen('All sass files successfully compiled!'));
								copyBuilt(); // lame-o
							}
						} else {
							console.log(chalk.red(file.src, 'sass compilation writeErr', writeErr));
						}
					});
				});
		}
	});
}


//----------------------------------------------------------------------
//
// copy files to deploy directory;
// aka spend all day re-writing a gulp task that already exists
//
//----------------------------------------------------------------------

var cwd = 'app/css/';
var dest = 'deploy/css/';
function copyBuilt() {
	// remove old deploy
	fse.remove('deploy', function(err) {
		if(err) console.log(chalk.red('error cleaning deploy folder', err));

		// copy to deploy
		globbers('*.css', {cwd: cwd})
			.catch(function(err) {
				console.log(chalk.red('css glob failure', err));
			})
			.then(function(files) {
				cwd = 'app/css/';
				dest = 'deploy/css/';
				return copyFiles(files, 'css');
			})
			.then(function(label) {
				console.log(chalk.bgGreen(label, 'copied to deploy'));
				cwd = 'app/';
				dest = 'deploy/';
				return globbers('sitemap.xml', {cwd: cwd})
			})
			.then(function(files) {
				return copyFiles(files, 'sitemap')
			})
			.then(function(label) {
				console.log(chalk.bgGreen(label, 'copied to deploy'));
				return globbers('*.html', {cwd: cwd, ignore: 'index.html'})
			})
			.then(function(files) {
				return copyFiles(files, 'html')
			})
			.then(function(label) {
				console.log(chalk.bgGreen(label, 'copied to deploy'));
				cwd = 'app/';
				dest = 'deploy/';
				return globbers('*.txt', {cwd: cwd})
			})
			.then(function(files) {
				return copyFiles(files, 'txt')
			})
			.then(function() {
				return copyFiles(['favicon.ico'], 'ico');
			})
			.then(function(label) {
				console.log(chalk.bgGreen(label, 'copied to deploy'));
				return copyFolder('app/img', 'deploy/img', 'images');
			})
			.then(function(label) {
				console.log(chalk.bgGreen(label, 'copied to deploy'));
				return copyFolder('app/media', 'deploy/media', 'media');
			})

			// update index for prod
			.then(updateIndex);
	});
}

function copyFiles(files, label) {
	count = files.length;
	return new Promise(function(resolve, reject) {
		_.forEach(files, function(file) {
			fse.copy(cwd + file, dest + file, function (err) {
				if (err) {
					reject(err);
					return console.log(chalk.red(file, 'copy failure:', err));
				}
				count--;
				if(count === 0) {
					resolve(label);
				}
			});
		})
	});
}

function copyFolder(src, dest, label) {
	return new Promise(function(resolve, reject) {
		fse.copy(src, dest, function (err) {
			if (err) {
				reject(err);
				return console.log(chalk.red(label, 'copy failure:', err));
			}
			console.log(chalk.bgGreen(label, 'copied to deploy'));
			resolve(label);
		});
	});
}

function updateIndex() {
	fse.readFile('app/index.html', {encoding: 'UTF-8'}, function(err, data) {
		data = data
		    .replace(/<!--\{\{STARTPROD\}\}/g, '')
		    .replace(/\{\{ENDPROD\}\}-->/g, '')
		    .replace(/<!--\{\{STARTDEV\}\}[\s\S]*\{\{ENDDEV\}\}-->/g, '');
		fse.writeFile('deploy/index.html', data, function(res) {
			// console.log('buildHelper.js: res:', res);
		});
	});
}
