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
