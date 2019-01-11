'use strict';

const webpack = require('webpack');
const path = require('path');

const CopyWebPackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },

      {
        test: [/\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js']
  },

  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      watch: false,
      beforeEmit: true
    }),

    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),

    new CopyWebPackPlugin([
      { from: './src/assets/sprites', to: 'assets/sprites'},
      { from: './src/assets/audio/music', to: 'assets/audio/music'},
      { from: './src/index.html', to: 'index.html'}
    ]),
  ],

  devServer: {
    contentBase: '/dist/',
    index: 'index.js',
    port: 3000,
  }
};