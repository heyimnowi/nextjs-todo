import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faPencil, faTrash);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Todo App</title>
        <meta name='description' content='NextJS Todo App' />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
