import React from 'react';
import Head from 'next/head';

const HeadDefaultMeta: React.FC = () => {
  const title = 'Escape Note';
  const color = 'rgb(246, 244, 240)';

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />

      <meta name="theme-color" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* 도메인 리소스 외부 연결시 시간 단축 */}
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API} />
    </Head>
  );
};

export default HeadDefaultMeta;
