import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import api from 'api';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cafes = await api.sitemaps.fetchCafes();

  const fields: ISitemapField[] = cafes.map(item => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/cafes/${item.id}`,
    lastmod: new Date(item.updatedAt).toISOString(),
    changefreq: 'daily',
    priority: 0.5,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
