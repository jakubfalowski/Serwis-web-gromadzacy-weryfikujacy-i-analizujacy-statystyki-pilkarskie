"use client"
import IAppShell from "../../../../../components/IAppShell";
import PredictPage from "../../../../views/predictPage";

export default function Page({params}){
    return(<IAppShell contain={<PredictPage match={params.match} home={params.home} away={params.away} round={params.round} />}/>)
}