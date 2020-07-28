/**
 * Gulpfile created by 3SIGN
 */

// Define general plugins.
var gulp = require('gulp'),
    chalk = require('chalk'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename');

// Define sass plugins.
var sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    sassLint = require('gulp-sass-lint');

// Define javascript plugins.
var uglify = require('gulp-uglify');

// Define image plugins.
var imagemin = require('gulp-imagemin');

// Configure path variables.
var basePath = {
  src: './src/',
  dist: './dist/',
  templates: './templates/'
};

var path = {
  styles: {
    src: basePath.src + 'scss/',
    dist: basePath.dist + 'css/'
  },
  scripts: {
    src: basePath.src + 'js/',
    dist: basePath.dist + 'js/'
  },
  images: {
    src: basePath.dist + 'image/',
    dist: basePath.dist + 'image/'
  },
  templates: {
    dist: basePath.templates
  },
  bower: 'bower_components/'
};

// Log a change event.
var changeEvent = function(e) {
  gutil.log('File', gutil.colors.cyan(e.path.replace(new RegExp('/.*(?=/' + basePath.src + ')/'), '')), 'was', gutil.colors.magenta(e.type));
};

// Configure SASS task.
gulp.task('sass', function(minify) {
  return gulp.src(path.styles.src + '**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: [
          path.bower,
          './'
        ],
        outputStyle: 'expanded'
      }))
      .on('error', function (error) {
        gutil.log(gutil.colors.black.bgRed(" SASS ERROR", gutil.colors.white.bgBlack(" " + (error.message.split(' ')[2]))));
        gutil.log(gutil.colors.black.bgRed(" FILE:", gutil.colors.white.bgBlack(" " + (error.message.split('\n')[0]))));
        gutil.log(gutil.colors.black.bgRed(" LINE:", gutil.colors.white.bgBlack(" " + error.line)));
        gutil.log(gutil.colors.black.bgRed(" COLUMN:", gutil.colors.white.bgBlack(" " + error.column)));
        gutil.log(gutil.colors.black.bgRed(" ERROR:", gutil.colors.white.bgBlack(" " + error.formatted.split('\n')[0])));
        return this.emit('end');
      })
      .pipe(autoprefix({
        browsers: ['last 2 versions']
      }))
      .pipe(cleanCss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.styles.dist));
});

// Configure SASS-Lint task.
gulp.task('sass-lint', function () {
  return gulp.src(path.styles.src + '**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format());
});

// Configure Uglify task.
gulp.task('scripts', function() {
  return gulp.src(path.scripts.src + '/*.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(path.scripts.dist));
});

// Configure Imagemin task.
gulp.task('imagemin', function() {
  return gulp.src(path.images.src + '*')
      .pipe(imagemin())
      .pipe(gulp.dest(path.images.dist));
});

// Configure Clear Cache task.
gulp.task('clearcache', function(done) {
  return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
      .on('close', done);
});

// Configure Watch task.
gulp.task('watch', gulp.series('sass', 'sass-lint', 'scripts', function() {
  gulp.watch(path.styles.src + '**/*.scss', gulp.parallel('sass')).on('change', sassLint).on('add', sassLint);
  gulp.watch(path.templates.dist + '**/*.html.twig');
  gulp.watch(path.scripts.src + '*.js', gulp.parallel('scripts')).on('change', uglify).on('add', uglify);
}));
