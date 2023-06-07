const isProduction = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: [],
});
const withImages = require('next-images');

module.exports = withPWA(
  withImages({
    experimental: {
      scrollRestoration: true,
    },
    images: {
      disableStaticImages: true,
    },
  }),
);
