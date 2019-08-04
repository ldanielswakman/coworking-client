// Gulpfile.js
// Check required packages
var gulp = require('gulp');
var rename = require("gulp-rename");
// CSS compiling
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
// JS compiling
var concat = require('gulp-concat');
var minify = require('gulp-minify');

// Concatenate Sass task
// gulp.src('scss/**/*.scss')
gulp.task('sass', function() {
  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

// Clean & minify CSS (after Sass)
gulp.task('clean_css', gulp.series('sass', function() {
  gulp.src('css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css/'));
}));

// Combine style tasks
gulp.task('styles', gulp.series('sass', 'clean_css'));

// Concatenate & minify JS
gulp.task('scripts', function() {
  return gulp.src([
    './js/components/*.js',
    './js/views/*.js',
    './js/app.js',
    ])
    .pipe(concat('scripts.js'))
    .pipe(minify({ ext:{
            src:'.js',
            min:'.min.js'
        },
    }))
    .pipe(gulp.dest('./js/'));
});

// Watch task
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',gulp.series('styles'));
    gulp.watch('js/components/**/*.js',gulp.series('scripts'));
    gulp.watch('js/views/**/*.js',gulp.series('scripts'));
    gulp.watch('js/app.js',gulp.series('scripts'));
});

