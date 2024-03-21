/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');

const nextConfig = {
  reactStrictMode: false, // 避免开发模式下useEffect执行两次
  images: {
    domains: ['typora-imgae-cloud.oss-cn-beijing.aliyuncs.com'],
  },
  compiler: {
    // styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7001/:path*',
      },
    ]
  },

  async middleware () {
    return [
      createProxyMiddleware('/api', {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      }),
    ]
  }
}

module.exports = nextConfig
