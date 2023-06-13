import React from 'react';
import Head from 'next/head';

const name = '이스케이프노트';
const title = '이스케이프노트 - 방탈출에 대한 모든 것';
const lightColor = '#ffffff';
const darkColor = '#1c1c24';

const HeadDefaultMeta: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content="website" />

      {/* 아이콘 및 색상 정보 */}
      <meta name="theme-color" content={lightColor} />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={darkColor}
      />
      <meta name="apple-mobile-web-app-status-bar-style" content={lightColor} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        media="(prefers-color-scheme: dark)"
        content={darkColor}
      />
      <meta name="msapplication-TileColor" content={lightColor} />
      <meta
        name="msapplication-TileColor"
        media="(prefers-color-scheme: dark)"
        content={darkColor}
      />
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/android-icon-192x192.png"
      />
      <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="/icons/apple-icon-precomposed.png"
      />
      <meta
        name="msapplication-TileImage"
        content="/icons/ms-icon-144x144.png"
      />

      {/* iOS 스플래쉬 이미지 */}
      <link
        href="/images/iphone5-splash-light.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphone5-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphone6-splash-light.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphone6-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphoneplus-splash-light.png"
        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphoneplus-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonex-splash-light.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonex-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonexr-splash-light.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonexr-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonexsmax-splash-light.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/iphonexsmax-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipad-splash-light.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipad-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro1-splash-light.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro1-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro3-splash-light.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro3-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro2-splash-light.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/ipadpro2-splash-dark.png"
        media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />

      {/* 도메인 리소스 외부 연결시 시간 단축 */}
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API} />

      {/* 네이버 웹 마스터도구 연동 */}
      <meta
        name="naver-site-verification"
        content={process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}
      />

      {/* 네이버 지도 */}
      <script
        async
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}`}
      />

      {/* 구글 애드센스 */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        crossOrigin="anonymous"
      />
    </Head>
  );
};

export default HeadDefaultMeta;
