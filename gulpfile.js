'use strict';

var gulp = require('gulp'),
  debug = require('gulp-debug'),
  inject = require('gulp-inject'),
  tslint = require('gulp-tslint'),
  sourcemaps = require('gulp-sourcemaps'),
  rimraf = require('gulp-rimraf'),
  tsc = require('gulp-typescript');

var Config = require('./gulpfile.config');

var config = new Config();

var connectInit = function (livereload, port) {
  require('gulp-connect').server({
    port: 9999,
    root: 'dist',
    livereload: livereload
  });
};

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
  var target = gulp.src(config.appTypeScriptReferences);
  var sources = gulp.src([config.allTypeScript], {read: false});
  return target.pipe(inject(sources, {
    starttag: '//{',
    endtag: '//}',
    transform: function (filepath) {
      return '/// <reference path="../..' + filepath + '" />';
    }
  })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  return gulp.src(config.allTypeScript)
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
  var sourceTsFiles = [config.allTypeScript,                //path to typescript files
    config.libraryTypeScriptDefinitions, //reference to library .d.ts files
    config.appTypeScriptReferences];     //reference to app.d.ts files

  var tsResult = gulp.src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc({
      target: 'ES5', module: 'commonjs', reporter: tsc.reporter.nullReporter(),
      emitDecoratorMetadata: true,
      // Don't use the version of typescript that gulp-typescript depends on, we need 1.5
      // see https://github.com/ivogabe/gulp-typescript#typescript-version
      typescript: require('typescript')
    }));

  tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
});

gulp.task('copy-static', function () {
  gulp.src(config.allHtml)
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(config.dist));
});

gulp.task('watch', ['build'], function () {
  gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs']);
  gulp.watch([config.allHtml], ['copy-static']);
});

gulp.task('build', ['ts-lint', 'copy-static', 'compile-ts', 'gen-ts-refs']);

gulp.task('serve', ['watch'], function () {
  connectInit(true, 3000);
});
