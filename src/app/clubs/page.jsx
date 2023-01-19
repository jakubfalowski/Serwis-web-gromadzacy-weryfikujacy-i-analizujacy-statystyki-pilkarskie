"use client"
import PageIndex from "./views/matchPage"
import IAppShell from "../components/IAppShell";

export default function Page(){
    return(<IAppShell contain={<PageIndex />}/>)
}