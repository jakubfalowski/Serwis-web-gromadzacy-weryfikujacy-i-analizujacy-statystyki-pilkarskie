"use client"
import IAppShell from "../../components/IAppShell";
import AdvancedPlayer from "./AdvancedPlayer";

export default function Page({params}){
    return(<IAppShell contain={<AdvancedPlayer parameter={params.name} />}/>)
}