var gulp = require('gulp');
var del = require('del');
var gulpCopy = require('gulp-copy');


gulp.task('clean', function () {
	return del([
		'build/**/*',
		'!build/data',
		'!build/data/*',
		'!build/data/backups/*'
	]);
});

gulp.task('copy', ['clean'], function () {
	var files = [
		"auth/**/*",
		"templates/**/*",
		"images/**/*",
		"banners/**/*",
		"css/**/*",
		"php/**/*",
		"favicon/**/*",
		"index.html",
		"app.js",
		"favicon.ico"
	];

	return gulp.src(files, {cwd:"src/"}).pipe(gulpCopy("build/", {expand:true}));
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*','!src/**/*.ts'], ['copy']);
});

gulp.task('default', ['copy']);