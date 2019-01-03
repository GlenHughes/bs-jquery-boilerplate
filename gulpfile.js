const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const pkg = require('./package.json');

// Main site js files
gulp.task('js', function() {

  gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './assets/js/*.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'))

})

// Main site css files
gulp.task('css', function() {

  gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './assets/css/*.css',
    ])
    .pipe(concat('site.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('./public/assets/css'))

})

// Default task
gulp.task('default', ['js', 'css']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'http://yoursite.local'
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./public/content/**/*.php', browserSync.reload);
  gulp.watch('./assets/css/*.css', ['css', browserSync.reload]);
  gulp.watch('./assets/js/*.js', ['js', browserSync.reload]);
});
