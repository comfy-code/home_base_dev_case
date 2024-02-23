/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d126ytvel6227q.cloudfront.net",
        port: "",
        pathname: "/logos/**",
      },
    ],
  },
};

export default nextConfig;
