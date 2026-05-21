import type { NextConfig } from "next";
import webpack from "webpack"; // Import Webpack explicitly

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fullySpecified: false, // Prevents Webpack from requiring fully specified imports
      alias: {
        ...config.resolve.alias,
        // Add aliases for Node.js core modules if needed
      },
    };

    // Use the imported Webpack instance
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, "");
        },
      ),
    );

    return config;
  },
};

export default nextConfig;
