const { createProxyMiddleware } = require('http-proxy-middleware');

const filter = function (pathname, req) {
  let isShorturl = pathname.includes('/shorturl');

  if (isShorturl && req.method === 'GET') {
    return true;
  } else {
    return false;
  }
};

const apiProxy = createProxyMiddleware(filter, {
  target: "http://localhost:3001",
});

module.exports = function (app) {
  app.use(apiProxy);
};