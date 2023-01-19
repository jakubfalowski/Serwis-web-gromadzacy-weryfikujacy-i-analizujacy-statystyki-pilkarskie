"use client"
import IAppShell from "../../components/IAppShell";
import GameChart from "./gameChart";

export default function page(){
    return(<IAppShell contain={<GameChart />}/>)
}