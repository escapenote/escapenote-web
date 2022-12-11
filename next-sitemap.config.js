/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['!*.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/accounts/*',
          '/users/*',
          '/posts/*',
          '/404',
          '/500',
          '/store',
        ],
      },
    ],
  },
};
