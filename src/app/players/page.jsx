"use client"
import IAppShell from "../components/IAppShell";
import SearchPlayers from "./searchPlayers";
import TableCompare from "./tableCompare";
import WatchDiagrams from "./watchDiagrams";

export default function page(){
    return(<IAppShell contain={<><SearchPlayers /><TableCompare /><WatchDiagrams /></>}/>)
}