const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/list',
    createProxyMiddleware({
      target: 'http://kodikapi.com',
      changeOrigin: true,
    })
  );
};
