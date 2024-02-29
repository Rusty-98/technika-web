const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

};

module.exports = nextConfig;
