const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.json());

// Proxy endpoint
app.use('/api', createProxyMiddleware({
  target: 'https://webhook.site/2aa2e7dc-5643-4d32-89ff-f8da800dfa41',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));

const port = 5000;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
