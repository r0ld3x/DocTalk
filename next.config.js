/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, defaultLoaders, isServer, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
