var gulp = require('gulp');

require('gulp-run-seq');
require('web-component-tester').gulp.init(gulp);

var clean = require('gulp-clean');
var vulcanize = require('gulp-vulcanize');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DEFAULT FOR 'gulp' COMMAND
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gulp.task('default', [['clean', 'build-vulcanize', 'lint']], function () {
  console.log('default end.');
});

gulp.task('test', [[ 'test:local']], function () {
  console.log('test end.');
});


gulp.task('clean', function () {
  return gulp.src(['dist', 'build'], {read: false})
    .pipe(clean()); // Delete dist and build to allow for nice, clean files!
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test TASKS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

gulp.task('test', [['test:local']], function () {
  console.log('test end.');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// BUILD TASKS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gulp.task('build-vulcanize', function () {
  return gulp.src('tt-crud.html')
    // Concatenate Polymer web components into a single file (dist).
    .pipe(vulcanize({
      dest: 'build',
      excludes: {
        imports: ['(.*)polymer/polymer.html(.*)']
      },
      // Make sure inline (and external) scripts get exported to index.js to be in accordance with CSP; styles are inlined.
      inline: false,
      csp: true,
      // Minify; remove comments.
      strip: true
    }))
    .pipe(gulp.dest('build'));
});


gulp.task('lint', function () {
  return gulp.src('*.html')
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DIST TASKS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

gulp.task('dist', function () {
  gulp.task('dist-vulcanize', function () {
    return gulp.src('tt-crud.html')
      // Concatenate Polymer web components into a single file (dist).
      .pipe(vulcanize({
        dest: 'dist',
        // Make sure inline (and external) scripts get exported to index.js to be in accordance with CSP; styles are inlined.
        inline: false,
        csp: true,
        // Minify; remove comments.
        strip: true
      }))
      .pipe(gulp.dest('dist'));
  });

});
