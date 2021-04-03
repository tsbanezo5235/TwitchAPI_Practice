const gulp = require('gulp');
const inline = require('gulp-inline');
var stylus = require('gulp-stylus');

gulp.task('inline', function() {
    return gulp.src('index.html')
			.pipe(inline({
				base: './',
			}))
			.pipe(gulp.dest('dist/'));
})

gulp.task('defalut', ['inline']);