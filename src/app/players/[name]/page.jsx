"use client";
import IAppShell from "../../components/IAppShell";
import { PlayerPage } from "./playerPage";

export default function Page({ params }) {
  return <IAppShell contain={<PlayerPage player={params.name} />} />;
}
