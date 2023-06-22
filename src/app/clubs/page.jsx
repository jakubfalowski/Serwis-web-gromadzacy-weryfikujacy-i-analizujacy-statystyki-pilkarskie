"use client";
import IAppShell from "../components/IAppShell";
import PageIndex from "./views/matchPage";

export default function Page() {
  return <IAppShell contain={<PageIndex />} forbiddenScroll={true} />;
}
