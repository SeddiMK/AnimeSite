const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // Other rules...
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      querystring: require.resolve('querystring-es3'),
    },
    alias: {
      querystring: 'querystring-browser',
    },
  },
  plugins: [new NodePolyfillPlugin()],
  target: 'node',
};

const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],
};

var path = require('path');
var webpack = require('webpack');
var sassLintPlugin = require('sasslint-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/',
    filename: 'dist/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new sassLintPlugin({
      glob: 'src/**/*.s?(a|c)ss',
      ignoreFiles: ['src/normalize.scss'],
      failOnWarning: false, // Do it.
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './',
  },
};
