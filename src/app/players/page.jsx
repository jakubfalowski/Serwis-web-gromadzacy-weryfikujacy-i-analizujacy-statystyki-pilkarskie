"use client";
import IAppShell from "../components/IAppShell";
import { PlayerTable } from "../components/PlayerTable";
import SearchPlayers from "./searchPlayers";

export default function page() {
  return (
    <IAppShell
      contain={
        <div className="container container-bg mx-auto bg-white rounded-2xl overflow-hidden">
          <SearchPlayers />
          <PlayerTable />
        </div>
      }
    />
  );
}
