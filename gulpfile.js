var gulp = require('gulp');
var del = require('del');
var gulpCopy = require('gulp-copy');
var replace = require('gulp-replace-task');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');

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
		'!build/data',
		'!build/data/*',
		'!build/data/backups/*'
	]);
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

gulp.task('copy', ['clean', 'buildindex', 'minifycss', 'minifyjs'], function () {
	var files = [
		"auth/**/*",
		"templates/**/*",
		"images/**/*",
		"banners/**/*",
		//"css/**/*",
		"php/**/*",
		"favicon/**/*",
		//"index.html",
		//"app.js",
		"favicon.ico"
	];

	return gulp.src(files, {cwd:"src/"}).pipe(gulpCopy("build/", {expand:true}));
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*','!src/**/*.ts'], ['copy']);
});

gulp.task('default', ['copy']);