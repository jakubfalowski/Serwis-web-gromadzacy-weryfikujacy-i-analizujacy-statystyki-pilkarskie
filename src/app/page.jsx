"use client";
import MainPage from "./MainPage";
import IAppShell from "./components/IAppShell";
import Head from "next/head";

export default function App() {
  return (
    <>
      <Head>
        <title>elo</title>
      </Head>
      <main>
        <IAppShell contain={<MainPage />} />
      </main>
    </>
  );
}
