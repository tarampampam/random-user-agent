var gulp = require('gulp'),
  jsonfile = require('jsonfile'),
  runSequence = require('run-sequence'),
  minifyCss = require('gulp-clean-css'),
  importCss = require('gulp-import-css'),
  htmlmin = require('gulp-html-minifier'),
  cssImport = require('gulp-cssimport'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  zip = require('gulp-zip'),
  chalk = require('chalk'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean');

/**
 * Settings.
 */

var src_dir = './extension',
  vendor_dir = '/js/3rd',
  manifest_path = src_dir + '/manifest.json',
  build_dir = './.build',
  builds_dir = './builds';

/**
 * HTML.
 */

gulp.task('html', function () {
  return gulp.src(src_dir + '/html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(build_dir + '/html/'));
});

/**
 * Scripts.
 */

gulp.task('js', function (callback) {
  return runSequence('js-app', 'js-vendor', callback);
});

gulp.task('js-app', function () {
  return gulp.src(src_dir + '/js/**/*.js')
    .pipe(uglify({
      //mangle: false
    }))
    .pipe(gulp.dest(build_dir + '/js/'));
});

gulp.task('js-vendor', function () {
  return gulp.src(src_dir + vendor_dir + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(build_dir + vendor_dir));
});

/**
 * CSS.
 */

gulp.task('css', function () {
  return gulp.src(src_dir + '/css/*.css')
    .pipe(importCss())
    .pipe(minifyCss({
      processImport: false
    }))
    .pipe(gulp.dest(build_dir + '/css'));
});

/**
 * Fonts.
 */

gulp.task('fonts', function () {
  return gulp.src(src_dir + '/fonts/**/*')
    .pipe(gulp.dest(build_dir + '/fonts/'));
});

/**
 * Images.
 */

gulp.task('images', function () {
  return gulp.src(src_dir + '/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(build_dir + '/img/'));
});

/**
 * Copy files.
 */

gulp.task('copy-files', function () {
  gulp.src([manifest_path])
    .pipe(gulp.dest(build_dir));
  return gulp.src(src_dir + '/_locales/**/*.json')
    .pipe(gulp.dest(build_dir + '/_locales/'));
});

/**
 * Pack build to single archive.
 */

gulp.task('pack', function () {
  var manifest = jsonfile.readFileSync(manifest_path),
    timestamp = (new Date).toISOString().replace(/z|t/gi, ' ').trim().replace(/\:/g, '-').replace(/\s/g, '_'),
    build_file_name = 'build_v' + manifest.version + '_' + timestamp + '.zip';
  return gulp.src(build_dir + '/**/*')
    .pipe(zip(build_file_name))
    .pipe(gulp.dest(builds_dir))
    .on('end', function () {
      gutil.log('Build saved into archive: ' + chalk.green(builds_dir + '/' + build_file_name));
    });
});

/**
 * Remove build directory.
 */

gulp.task('build-clean', function () {
  return gulp.src(build_dir)
    .pipe(clean());
});

/**
 * TASKS.
 */

gulp.task('watch', function () {
  gulp.watch(src_dir + '/html/**/*.html', ['html']);
  gulp.watch([src_dir + '/js/**/*.js', src_dir + vendor_dir + '/**/*.js'], ['js']);
  gulp.watch([src_dir + '/css/**/*.css'], ['css']);
  gulp.watch(src_dir + '/fonts/**/*', ['fonts']);
  gulp.watch(src_dir + '/img/**/*', ['images']);
  gulp.watch([manifest_path, src_dir + '/_locales/**/*.json'], ['copy-files']);
});

gulp.task('build', ['css', 'html', 'fonts', 'js', 'images', 'copy-files']);

gulp.task('clean', ['build-clean']);

gulp.task('default', function (callback) {
  return runSequence('build', 'pack', 'clean', callback);
});