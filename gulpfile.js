/**
 * @author Gigi-DS
 */
//include gulp
var gulp = require('gulp');

//include plugins
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var less = require('gulp-less');
var path = require('path');


//boostrap 

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), {
      base: 'bower_components'
    })
    .pipe(gulp.dest('public/lib'));
});


gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});
//*bootstrap

//practice less css
gulp.task('less-css',function(){
	return gulp.src('content/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('./content'));
});

//browsersync
gulp.task('serve', ['minifyCSS', 'scripts'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./content/*.css", ['minifyCSS']);
    gulp.watch("./content/style.min.css").on('change', browserSync.reload);
    gulp.watch("./scripts/*.js", ['scripts']);
    gulp.watch("./scripts/scripts.min.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


//Coping and minify jquery
gulp.task('copy-min-jquery',function(){
	return gulp.src('bower_components/jquery/dist/jquery.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest('scripts/plugins'));
});

// Concatinate and Minize CSS
gulp.task('minifyCSS',['less-css'],function(){
	return gulp.src('content/*.css')
	.pipe(sourcemaps.init())
	.pipe(concat('style.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest('content'));
});

//concatinate and minify js 
gulp.task('scripts',function(){
	return gulp.src('scripts/*.js')
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts'))
});

//default task
//gulp.task('default',['copy-min-jquery' ,'minifyCSS', 'scripts', 'serve']);
