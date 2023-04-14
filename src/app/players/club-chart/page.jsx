"use client"
import IAppShell from "../../components/IAppShell";
import ClubChart from "./clubChart";

export default function page(){
    return(<IAppShell contain={<ClubChart />}/>)
}