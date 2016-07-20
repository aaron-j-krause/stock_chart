const gulp = require('gulp');
const webpack = require('webpack-stream');
const wp = require('webpack');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');


const paths = {
  js: './app/js/client.js',
  html: './app/index.html',
  scss: './app/**/*.scss',
  build: './build',
  assets: './assets/*',
  css: './app/**/*.css'
};

gulp.task('lint', () => {
  return gulp.src(['./app/**/*.js', 'gulpfile.js', '!node_modules/**'])
    .pipe(eslint(__dirname + '/.eslintrc'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy', () => {
  return gulp.src([paths.html, paths.css, paths.assets])
    .pipe(gulp.dest(paths.build));
});

gulp.task('bundle', () => {
  return gulp.src(paths.js)
    .pipe(webpack({
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
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('bundle:production', () => {
  return gulp.src(paths.js)
    .pipe(webpack({
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
      },
      plugins: [new wp.optimize.UglifyJsPlugin()]
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass:production', () => {
  return gulp.src(paths.scss)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('default', ['copy', 'sass', 'bundle']);

gulp.task('production', ['copy', 'sass:production', 'bundle:production']);

gulp.task('watch', () => {
  gulp.watch('./app/**/*', ['default']);
});
