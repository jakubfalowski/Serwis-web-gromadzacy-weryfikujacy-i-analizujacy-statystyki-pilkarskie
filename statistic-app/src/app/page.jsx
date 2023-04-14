"use client"
import IAppShell from "./components/IAppShell";
import MainPage from "./MainPage";

export default function App() {
  return (<IAppShell contain={<MainPage />}/>)
}
