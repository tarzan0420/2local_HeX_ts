import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wallet.advcash.com/wsm/merchantWebService?wsdl',
      changeOrigin: true,
    })
  );
};