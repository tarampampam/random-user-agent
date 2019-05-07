var gulp = require('gulp'),
  jsonfile = require('jsonfile'),
  minifyCss = require('gulp-clean-css'),
  importCss = require('gulp-import-css'),
  htmlmin = require('gulp-html-minifier'),
  cssImport = require('gulp-cssimport'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  zip = require('gulp-zip'),
  chalk = require('chalk'),
  fancy = require('fancy-log'),
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

function html()
{
  return gulp.src(src_dir + '/html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(build_dir + '/html/'));

}

/**
 * Scripts.
 */

function js_app()
{
  return gulp.src(src_dir + '/js/**/*.js')
    .pipe(uglify({
      //mangle: false
    }))
    .pipe(gulp.dest(build_dir + '/js/'));
}

function js_vendor()
{
  return gulp.src(src_dir + vendor_dir + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(build_dir + vendor_dir));
}

const js = gulp.series(js_app, js_vendor);

/**
 * CSS.
 */

function css()
{
  return gulp.src(src_dir + '/css/*.css')
    .pipe(importCss())
    .pipe(minifyCss({
      processImport: false
    }))
    .pipe(gulp.dest(build_dir + '/css'));
}

/**
 * Fonts.
 */

function fonts()
{
  return gulp.src(src_dir + '/fonts/**/*')
    .pipe(gulp.dest(build_dir + '/fonts/'));
}

/**
 * Images.
 */

function images()
{
  return gulp.src(src_dir + '/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(build_dir + '/img/'));
}

/**
 * Copy files.
 */

function copy_files()
{
  gulp.src([manifest_path])
    .pipe(gulp.dest(build_dir));
  return gulp.src(src_dir + '/_locales/**/*.json')
    .pipe(gulp.dest(build_dir + '/_locales/'));
}

/**
 * Pack build to single archive.
 */

function pack()
{
  var manifest = jsonfile.readFileSync(manifest_path),
    timestamp = (new Date).toISOString().replace(/z|t/gi, ' ').trim().replace(/\:/g, '-').replace(/\s/g, '_'),
    build_file_name = 'build_v' + manifest.version + '_' + timestamp + '.zip';
  return gulp.src(build_dir + '/**/*')
    .pipe(zip(build_file_name))
    .pipe(gulp.dest(builds_dir))
    .on('end', function () {
      fancy('Build saved into archive: ' + chalk.green(builds_dir + '/' + build_file_name));
    });
}

/**
 * Remove build directory.
 */

function build_clean()
{
  return gulp.src(build_dir, {allowEmpty: true})
    .pipe(clean());
}

/**
 * TASKS.
 */

function watch()
{
  gulp.watch(src_dir + '/html/**/*.html', ['html']);
  gulp.watch([src_dir + '/js/**/*.js', src_dir + vendor_dir + '/**/*.js'], ['js']);
  gulp.watch([src_dir + '/css/**/*.css'], ['css']);
  gulp.watch(src_dir + '/fonts/**/*', ['fonts']);
  gulp.watch(src_dir + '/img/**/*', ['images']);
  gulp.watch([manifest_path, src_dir + '/_locales/**/*.json'], ['copy-files']);
}

const build = gulp.series(gulp.parallel(css, html, fonts, js, images), copy_files);


exports.watch = watch;
exports.build = build;
exports.clean = build_clean;
exports.default = gulp.series(build, pack, build_clean);
