const gulp = require('gulp');
const webpack = require('webpack-stream');

const paths = {
  js: './app/client.jsx',
  html: './app/index.html',
  css: './app/**/*.css'
};

const webpackConf = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
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

gulp.task('copy', () => {
  return gulp.src([paths.html, paths.css])
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle', () => {
  return gulp.src(paths.js)
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'bundle']);
