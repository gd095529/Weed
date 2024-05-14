const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api2',
        createProxyMiddleware({
            target: 'https://www.data4library.kr',
            changeOrigin: true,
        })
    );
};
