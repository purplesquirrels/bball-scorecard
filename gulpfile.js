var gulp = require('gulp');
var del = require('del');
var gulpCopy = require('gulp-copy');
var replace = require('gulp-replace-task');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var svg2png = require('gulp-svg2png');

gulp.task('minifycss', function () {
	return gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('build/css'));
});

gulp.task('minifyjs', function () {
	return gulp.src('src/*.js')
		.pipe(jsmin())
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
	return del([
		'build/**/*',
		'!build/',
		'!build/data',
		'!build/data/*',
		'!build/data/backups/*',
		'!build/data/archive/*'
	]);
});

gulp.task('svg2png', function () {
    gulp.src('./src/images/badge/*.svg')
        .pipe(svg2png({width:100,height:100}))
        .pipe(gulp.dest('./build/images/badge'));

    gulp.src('./src/images/powerup/*.svg')
        .pipe(svg2png({width:100,height:100}))
        .pipe(gulp.dest('./build/images/powerup'));
});


gulp.task('buildindex', function () {
	
	return gulp.src('src/index.html')
	.pipe(replace({
		patterns: [
			{
				match: 'nocache',
				replacement: new Date().getTime()
			}
		]
	}))
	.pipe(gulp.dest('build'));
});

gulp.task('copy', ['clean', 'buildindex', 'minifycss', 'minifyjs'/*, 'svg2png'*/], function () {
	var files = [
		"auth/**/*",
		"templates/**/*",
		"images/**/*",
		"banners/**/*",
		"external/**/*",
		"php/**/*",
		"favicon/**/*",
		"favicon.ico"
	];

	return gulp.src(files, {cwd:"src/"}).pipe(gulpCopy("build/", {expand:true}));
});

gulp.task('build', [/*'clean', 'buildindex',  'minifycss', 'minifyjs', */'copy'/*,'svg2png'*/ ]);

gulp.task('watch', function() {
	gulp.watch(['src/**/*','!src/**/*.ts'], ['build']);
});

gulp.task('default', ['copy']);