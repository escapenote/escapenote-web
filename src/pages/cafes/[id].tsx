import Router from 'next/router';

import { wrapper } from 'store';

CafeDetailPage.getInitialProps = wrapper.getInitialPageProps(
  () =>
    async ({ res, query }) => {
      const id = query.id as string;
      if (res) {
        res.writeHead(302, { Location: `/cafes/${id}/themes` });
        res.end();
      } else {
        Router.push(`/cafes/${id}/themes`);
      }

      return {};
    },
);

export default function CafeDetailPage() {}
