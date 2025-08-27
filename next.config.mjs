/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://115.186.185.230:9090/:path*", // 👈 backend server
      },
    ];
  },
};

export default nextConfig;
