import gulp from 'gulp'
import stylus from 'gulp-stylus'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import del from 'del'
import minifyHTML from 'gulp-minify-html'
import concat from 'gulp-concat'
import inline from 'gulp-inline'
import webpack from 'webpack-stream'


export function clean(cb) {
  del('./public/**');
	cb();
}

export function CSS(cb) {
	gulp
		.src('./src/css/**.styl')
		.pipe(stylus())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist'));
	cb();
}

export function JS(cb) {
	gulp
		.src('./src/js/**.js')
		.pipe(concat('all.js'))
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(uglify())
		.pipe(rename('main.js'))
		.pipe(gulp.dest('./dist'));
	cb();
}

export function HTML(cb) {
	gulp
		.src('./src/html/**.html')
		.pipe(minifyHTML())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./dist'));
	cb();
}

export function toinline() {
	return gulp
		.src('./dist/index.html')
		.pipe(inline({
			base: './',
		}))
		.pipe(gulp.dest('./public'));
}


gulp.task('default', done => {
	gulp.series('clean','wat','CSS','JS','HTML','toinline');
	done();
});