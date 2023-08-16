/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/actions/helpers/weatherLoader.js",
  },
};

module.exports = nextConfig;
