/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
