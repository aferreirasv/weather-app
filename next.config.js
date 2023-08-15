/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./weatherLoader.js",
  },
};

module.exports = nextConfig;
