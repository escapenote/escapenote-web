const Analytics = () => (
  <>
    {/* Google Analytics */}
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
        page_path: window.location.pathname
      });
    `,
      }}
    />
  </>
);

export default Analytics;
