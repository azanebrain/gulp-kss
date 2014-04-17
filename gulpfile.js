var gulp   = require('gulp'),
		compass = require('gulp-compass'),
		clean = require('gulp-clean'),
		gulpkss = require('gulp-kss'),
		livereload = require('gulp-livereload'),
		lr = require('tiny-lr'),
		server = lr();

gulp.task('kss', function () {
	//Clean out the current documentation folder
	gulp.src([
		'styleguide/**/*'
	], {read: false})
		.pipe(clean({force: true}))

	//Create the fresh documentation by reading through the sass files
	gulp.src(['demo/**/*.sass'])
		.pipe(gulpkss({
			overview: 'demo/styleguide.md' //Absolute path to markdown file which is used for styleguide home page
			// templateDirectory: Absolute path to template directory, by default kss-node default template is used.
			// kss: Options supported by KSS-Node (https://github.com/hughsk/kss-node)
    }))
    // .pipe(gulp.dest( dist + '/styleguide/'));
    .pipe(gulp.dest( 'styleguide/'));

	//Compile the KSS documentation page's style sheet so the styles will load accurately within the docs
	gulp.src( 'demo/sass/style.sass')
		.pipe(compass({
			css: 'styleguide/public'
			, sass: 'demo/sass'
			// , require: ['compass']
		}))
		.pipe(gulp.dest( 'styleguide/public'));

	//Add any styleguide images
	gulp.src( 'demo/styleguide-images/**/*')
		.pipe(gulp.dest( 'styleguide/'));
});

// Watch and livereload
gulp.task('watch', function() { 
  // Listen on port 35729
  server.listen(35729, function (err) {
	if (err) {
	  return console.log(err)
	};

 	gulp.watch(['demo/**/*'], ['kss']);
 
  }); //server.listen()
 
});

gulp.task('default', ['kss']);