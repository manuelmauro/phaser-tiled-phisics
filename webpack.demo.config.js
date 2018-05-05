const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
  entry: {
    TiledPhysics: './src/TiledPhysics.js',
    demo: [
      'babel-polyfill',
      path.resolve(__dirname, 'demo/js/main.js'),
    ],
    vendor: ['phaser'],
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dev'),
    publicPath: './dev/',
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  watch: true,
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './demo/index.html',
      chunks: ['vendor', 'physics', 'demo'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false,
      },
      hash: false,
    }),
    new CopyWebpackPlugin([
      { from: 'demo/assets', to: 'assets' },
      { from: 'demo/js', to: 'js' },
    ]),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './dev'],
      },
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
      // { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    alias: {
    },
  },
};
