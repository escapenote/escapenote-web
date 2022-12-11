const withImages = require('next-images');

module.exports = withImages({
  experimental: {
    scrollRestoration: true,
  },
  images: {
    disableStaticImages: true,
  },
});
