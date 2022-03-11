/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['ro', 'en'],
        defaultLocale: 'ro',
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/:path*', // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
