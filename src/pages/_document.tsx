import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import Analytics from 'components/templates/Analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    const setInitialTheme = `
      function getUserPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      document.body.dataset.theme = getUserPreference();
    `;

    return (
      <Html lang="ko">
        <Head>
          <Analytics />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
