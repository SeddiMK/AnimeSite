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
