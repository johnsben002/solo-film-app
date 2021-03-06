const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: 'http://localhost:8080/build/',
    hot: true,
    proxy: {
      '/api/films': 'http://localhost:3000',
      '/api/getFilms': 'http://localhost:3000',
      '/api/deleteFilm': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
