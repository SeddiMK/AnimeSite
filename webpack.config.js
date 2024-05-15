{
    resolve: {
      modules: [...],
            fallback: {
            "url": false,
                "http": false,
                "querystring": false,
                "zlib": false,
                "timers": false,
                    
            // "http": require.resolve("stream-http"),
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
      }
    },
    entry: [...],
    output: {...},
    module: {
      rules: [...]
    },
    plugins: [...],
    optimization: {
      minimizer: [...],
    },
    // node: {
    //   fs: 'empty',
    //   net: 'empty',
    //   tls: 'empty'
    // },
}

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // Other rules...
  plugins: [new NodePolyfillPlugin()],
  target: 'node',
};
