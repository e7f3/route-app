import Document, { Html, Head, Main, NextScript } from "next/document";

// Кастомный Document, добавляет имена классов компонентам html и body

class MyDocument extends Document {
  render() {
    return (
      <Html className="page" lang="ru">
        <Head></Head>
        <body className="page__body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
