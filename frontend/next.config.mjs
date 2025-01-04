/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://backend:8000/api/:path*', // Proxy to Fastapi
        },
      ];
    },
  };
  
  export default nextConfig;