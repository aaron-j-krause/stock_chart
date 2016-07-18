//for hot loader, build in gulpfile

const config = module.exports = {
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

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server', 
    './app/js/client'
  ],

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  }
}