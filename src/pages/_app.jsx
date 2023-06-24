import Head from "next/head";
import { favicon } from "../app/images/logo.png";

function CustomApp() {
  return (
    <>
      <Head>
        <title>BeAgro - zarządzanie i optymalizacja badań gleby</title>
        <link rel="icon" href={favicon} />
      </Head>
      <main>{/* <Component {...pageProps} /> */}</main>
    </>
  );
}

export default CustomApp;
