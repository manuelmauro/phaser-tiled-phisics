const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  watch: false,
  context: `${__dirname}/src/`,

  entry: {
    TiledPhysics: './TiledPhysics.js',
    'TiledPhysics.min': './TiledPhysics.js',
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: 'TiledPhysics',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  plugins: [
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        compress: true,
        ie8: false,
        ecma: 5,
        output: {
          comments: false,
        },
        warnings: false,
      },
      warningsFilter: src => false,
    }),

  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
    ],
  },
};
