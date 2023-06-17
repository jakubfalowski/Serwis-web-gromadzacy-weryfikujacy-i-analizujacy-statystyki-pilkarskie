"use client";
import IAppShell from "../components/IAppShell";
import { PlayerTable } from "../components/PlayerTable";

export default function page() {
  return <IAppShell contain={<PlayerTable />} />;
}
