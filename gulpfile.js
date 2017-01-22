var gulp    = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var strip = require('gulp-strip-comments');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('scripts', function() {
    gulp.src(['./src/client/public/**/*.js', '!./src/client/public/**/*.test.js', '!./src/client/public/js/app.min.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('./app.min.js'))
            .pipe(strip())
            .pipe(uglify({mangle: true}))
            .pipe(gulp.dest('./src/client/public/'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/client/public/'));
});

gulp.task('watch', function() {
    watch(['./src/client/public/**/*.js', '!./src/client/public/**/*.test.js', '!./src/client/public/app.min.js'], function () {
        gulp.start('scripts');
    });
});
gulp.task('default', ['scripts', 'watch']);