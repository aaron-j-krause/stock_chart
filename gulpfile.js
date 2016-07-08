const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');

const paths = {
  js: './app/js/client.jsx',
  html: './app/index.html',
  scss: './app/**/*.scss',
  build: './build'
};

const webpackConf = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
};

gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.build));
});

gulp.task('bundle', () => {
  return gulp.src(paths.js)
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['copy', 'sass', 'bundle']);

gulp.task('watch', () => {
  gulp.watch('./app/**/*', ['default']);
});
