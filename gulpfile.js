var fs = require('fs')
var path = require("path")
var _ = require('lodash')
var gulp = require('gulp')
var webpack = require('webpack-stream')
var uglify = require("gulp-uglify")
var cssmin = require('gulp-cssmin')
var sass = require('gulp-sass')
var htmlmin = require('gulp-htmlmin')
var concat = require('gulp-concat')
var jst = require('gulp-jst3')


gulp.task('client-index-js', function () {
  return gulp.src('client/index.js')
    .pipe(gulp.dest('dist/client/example'))
})


gulp.task('client-example-style', function () {
  return gulp.src('client-example/style/index.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('dist/client/example/css'))
})

gulp.task('client-example-js', function () {
  return gulp.src('client-example/index.js')
    .pipe(webpack({
      cache: false,
      target: 'web',
      output: {
        filename: "index.js"
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/client/example/js'))
})

gulp.task('client-example-img', function () {
  return gulp.src('client-example/images/**/*')
    .pipe(gulp.dest('dist/client/example/images'))
})

gulp.task('client-example-html', function () {
  return gulp.src('client-example/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/client/example'))
})


gulp.task('client-example-template', function () {
  return gulp.src('client-example/template/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(jst({
      interpolate : /\{\{(.+?)\}\}/g,
      evaluate: /\{\%(.+?)\%\}/g,
      ignorePath: process.cwd()+'/client-example/template'
    }))
    .pipe(concat('template.js'))
    .pipe(gulp.dest('dist/client/example/js/'))
})

gulp.task('client-example-template-concat', ['client-example-template'], function () {
  return gulp.src('dist/client/example/js/template.js')
    .pipe(webpack({
      cache: false,
      target: 'web',
      output: {
        filename: "template.js",
        library: "JST",
        libraryTarget: 'umd'
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/client/example/js'))
})

gulp.task('client-example', [
  'client-index-js',
  'client-example-style',
  'client-example-js',
  'client-example-html',
  'client-example-template-concat',
  'client-example-img'], function () {
  return gulp.src('client-example/images/**/*')
    .pipe(gulp.dest('dist/client/example/images'))
})

gulp.task('client-libs', function () {
  return gulp.src('client/libs/**/*')
    .pipe(gulp.dest('dist/client/libs'))
})

gulp.task('build', [
  'client-libs',
  'client-example'
])