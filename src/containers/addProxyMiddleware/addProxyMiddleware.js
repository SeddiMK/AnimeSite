const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function addProxyMiddleware(app) {
  app.use(
    '/list',
    createProxyMiddleware({
      target: 'http://kodikapi.com',
      changeOrigin: true,
    })
  );
};
//  headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods':
//           'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//         'Access-Control-Allow-Headers':
//           'X-Requested-With, content-type, Authorization',
//       },
