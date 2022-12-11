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
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          />
          <Analytics />
        </Head>
        <body>
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
