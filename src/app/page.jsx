"use client";
import MainPage from "./MainPage";
import IAppShell from "./components/IAppShell";

export default function App() {
  return <IAppShell contain={<MainPage />} />;
}
