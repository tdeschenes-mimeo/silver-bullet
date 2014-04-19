'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var es6ify = require('es6ify');
var jsRoot = path.join(__dirname);
var bundlePath = path.join('dist', 'bundle.js');

es6ify.traceurOverrides = { blockBinding: true };


gulp.task('lint', function() {
  return gulp.src('dist/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  browserify()
  .add(es6ify.runtime)
  .transform(es6ify)
  .require(require.resolve('./src/util.js'), { entry: true })
  .bundle({debug: true})
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath));
});

gulp.task('default', ['scripts', 'lint']);
