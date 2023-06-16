"use client";
import IAppShell from "../components/IAppShell";
import { Test } from "../components/test";

export default function page() {
  return <IAppShell contain={<Test />} />;
}
