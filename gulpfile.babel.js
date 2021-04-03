import gulp from 'gulp'
import stylus from 'gulp-stylus'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import del from 'del'
import minifyHTML from 'gulp-minify-html'
import concat from 'gulp-concat'
import inline from 'gulp-inline'
// import { css } from 'jquery'
// const gulp = require('gulp');
// const stylus = require('gulp-stylus');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const del = require('del');
// const minifyHTML = require('gulp-minify-html');
// const concat = require('gulp-concat');
// const inline = require('gulp-inline');

export function clean(cb) {
  return del('./public')
  cb();
}

export function tostylus(cb) {
	return gulp.src('./css/**.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css'));
		cb();
}

export function minifyCss(cb) {
	return gulp.src('./css/**.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist'));
		cb();
}

export function js(cb) {
	return gulp.src('./src/js/**.js')
		.pipe(concat())
		.pipe(uglify())
		.pipe(rename(function(path) {
			path.basename += ".min";
			path.extname = ".js";
	  }))
		.pipe(gulp.dest('./dist'));
		cb();
}

export function HTML(cb) {
	return gulp.src('./src/html/**.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('./dist'));
		cb();
}

export function toinline() {
	return gulp.src('./src/html/twitch_search.html')
		.pipe(inline({
			base: 'public/',
			js: './dist/**.js',
			css: './dist/**.css'
		}))
		.pipe(gulp.dest('./public'));
		
}


gulp.task('default', (cb) => {
	gulp.series('clean','tostylus','minifyCss','js','HTML','toinline');
	cb();
});