"use client"
import { useEffect, useState } from "react";

import { Grid, Table } from '@mantine/core';

import FetchResults from "../fetchResults";

import { getPoints, getHomePoints, getAwayPoints } from "../calculation/getPoints";
import { getGoals, getAwayGoals, getHomeGoals } from "../calculation/getGoals";
import { convertToDate } from "../calculation/convertToDate";
import { sortByTime } from "../calculation/sortByTime";
import { getTeamStrength } from "../calculation/getTeamStrength";
import { getWinner } from "../calculation/getWinner";

import "../../styles/App.scss";
import "../../styles/Table.scss";
import { getAverageGoals } from "../calculation/getAverageGoals";
import { getResult } from "../calculation/getResult";
import FetchBet from "../fetchBet";

import { oddsHead, probabilityHead, profitableProbabilityHead, appForebetHead } from "./tableHead";
import { dictClubs } from "../dictClubs";
import FetchForebet from "../fetchForebet";


let matchesCopy = [];
let oddsTab;
export function PredictPage(props){
    const match = props.match;
    const home = props.home;
    const away = props.away;

    const [homeTeamMatches, setHomeTeamMatches] = useState();
    const [awayTeamMatches, setAwayTeamMatches] = useState();
    const [forebetTab, setForebetTab] = useState();

    const [homeName, setHomeName] = useState();
    const [awayName, setAwayName] = useState();

    const getMatches = () => {
        return new Promise ((resolve, reject) => { 
        if(matchesCopy && matchesCopy.length < 1){
            FetchResults(home, away).then((value) => {
                matchesCopy = value;
                resolve()
              })
        }
        })
    }

    const matchesTab = new Array(0);

    function initalizeData(){
        if(matchesTab[0] && !homeTeamMatches && !awayTeamMatches){
            setHomeTeamMatches(matchesTab[0][0].sort(sortByTime));
            setAwayTeamMatches(matchesTab[0][1].sort(sortByTime));
        }
    }

    let homeTeamStrength;
    let awayTeamStrength;
    let probabilityScoreGoalsByHomeTeam;
    let probabilityLostGoalsByHomeTeam;
    let probabilityScoreGoalsByAwayTeam;
    let probabilityLostGoalsByAwayTeam;
    let homePercent;
    let drawPercent;
    let awayPercent;
    let allPercent;

    if(homeTeamMatches && awayTeamMatches && oddsTab){
        homeTeamStrength = getTeamStrength(homeTeamMatches.slice(0, 15), home, true);
        awayTeamStrength = getTeamStrength(awayTeamMatches.slice(0, 15), away, false);
        probabilityScoreGoalsByHomeTeam = (getAverageGoals(getGoals(homeTeamMatches.slice(0, 15),home,away).home,getGoals(homeTeamMatches.slice(0, 15),home,away).away,getHomeGoals(homeTeamMatches, home).home,getHomeGoals(homeTeamMatches, home).away).score).toFixed(2);
        probabilityLostGoalsByHomeTeam = (getAverageGoals(getGoals(homeTeamMatches.slice(0, 15),home,away).home,getGoals(homeTeamMatches.slice(0, 15),home,away).away,getHomeGoals(homeTeamMatches, home).home,getHomeGoals(homeTeamMatches, home).away).lost).toFixed(2);
        probabilityScoreGoalsByAwayTeam = (getAverageGoals(getGoals(awayTeamMatches.slice(0, 15),home,away).home,getGoals(awayTeamMatches.slice(0, 15),home,away).away,getAwayGoals(awayTeamMatches, away).away,getAwayGoals(awayTeamMatches, away).home).score).toFixed(2);
        probabilityLostGoalsByAwayTeam = (getAverageGoals(getGoals(awayTeamMatches.slice(0, 15),home,away).home,getGoals(awayTeamMatches.slice(0, 15),home,away).away,getAwayGoals(awayTeamMatches, away).away,getAwayGoals(awayTeamMatches, away).home).lost).toFixed(2);
        homePercent = getWinner(homeTeamStrength, awayTeamStrength).home;
        drawPercent = getWinner(homeTeamStrength, awayTeamStrength).draw;
        awayPercent = getWinner(homeTeamStrength, awayTeamStrength).away;
        allPercent = (1/parseFloat(oddsTab.home))*100+(1/parseFloat(oddsTab.draw))*100+(1/parseFloat(oddsTab.away))*100
    }
    

    useEffect(()=>{
        getMatches().then(() => {
            matchesTab.push(matchesCopy);
        }).then(initalizeData);
    
        new Promise ((resolve, reject) => { 
            if(!oddsTab){
                FetchBet(match).then((value) => {
                    oddsTab = value;
                    resolve()
                })
            }
        })
    
        new Promise ((resolve, reject) => { 
            if(!forebetTab){
                FetchForebet().then((value) => {
                    setForebetTab(value);
                    resolve()
                })
            }
        })
    },[matchesTab, oddsTab, forebetTab])
    

    const oddsRows = (
        oddsTab && homeTeamStrength && awayTeamStrength &&
        <tr>
            <td>{oddsTab.home}</td>
            <td>{oddsTab.draw}</td>
            <td>{oddsTab.away}</td>
        </tr>
      );

      const probabilityRows = (
        oddsTab && homeTeamStrength && awayTeamStrength &&
        <tr>
            <td>{(((1/(parseFloat(oddsTab.home)))*100/allPercent)*100).toFixed(2)}%</td>
            <td>{(((1/(parseFloat(oddsTab.draw)))*100/allPercent)*100).toFixed(2)}%</td>
            <td>{(((1/(parseFloat(oddsTab.away)))*100/allPercent)*100).toFixed(2)}%</td>
        </tr>
      );

      const profitableProbabilityRows = (
        oddsTab && homeTeamStrength && awayTeamStrength &&
        <tr>
            <td>{((1/(parseFloat(oddsTab.home)*88/100))*100).toFixed(2)}%</td> 
            <td>{((1/(parseFloat(oddsTab.draw)*88/100))*100).toFixed(2)}%</td> 
            <td>{((1/(parseFloat(oddsTab.away)*88/100))*100).toFixed(2)}%</td>
        </tr>
      );

      const appRows = (
        <tr>
            <td>{homePercent}</td>
            <td>{drawPercent}</td>
            <td>{awayPercent}</td>
            <td>{getResult(homePercent, drawPercent, awayPercent,probabilityScoreGoalsByHomeTeam, probabilityLostGoalsByHomeTeam, probabilityScoreGoalsByAwayTeam, probabilityLostGoalsByAwayTeam)}</td>
        </tr>
      )


    return(
        <div>
            <h2 style={{textAlign:"center"}}>{homeName} - {awayName}</h2>
            <Table className="tbl three-columns marginbottom" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                <caption>Wartości jakie oferuje jeden z bukmacherów za każdą postawioną złotówke</caption>
                    <thead>{oddsHead}</thead>
                    <tbody>{oddsRows}</tbody>  
            </Table>
            <Table className="tbl three-columns marginbottom" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                <caption>Przełożenie powyższych kursów na prawdopodobieństwo według bukmachera</caption>
                    <thead>{probabilityHead}</thead>
                    <tbody>{probabilityRows}</tbody>  
            </Table>
            <Table className="tbl three-columns marginbottom" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                <caption>Procent prawdopodobieństwa, jaki powinien być w rzeczywistości, aby klientowi opłacało się korzystać z usług bukmacherskich</caption>
                    <thead>{profitableProbabilityHead}</thead>
                    <tbody>{profitableProbabilityRows}</tbody> 
            </Table>
            <Table className="tbl four-columns marginbottom" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                <caption>Najbardziej prawdopodobny wynik meczu, według portalu forebet.com</caption>
                    <thead>{appForebetHead}</thead>
                    <tbody>
                    {
                        forebetTab && homeName && awayName && Object.entries(forebetTab).map(bet =>{
                            if(bet[1].homeName === homeName && bet[1].awayName === awayName){
                                return(
                                    <tr>
                                        <td>{bet[1].homePercent}</td>
                                        <td>{bet[1].drawPercent}</td>
                                        <td>{bet[1].awayPercent}</td>
                                        <td>{bet[1].result}</td>
                                    </tr>)
                            }

                        })
                    }
                    </tbody>  
            </Table>
            <Table className="tbl four-columns" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                <caption>Najbardziej prawdopodobny wynik meczu, według mojej aplikacji</caption>
                <thead>{appForebetHead}</thead>
                <tbody>{appRows}</tbody>  
            </Table>
            <div className="two-grids">
            <Grid className="last-results left-last-results">
                <Grid.Col span={12} className="last-results-box">
                    <h1>Gospodarze {homeName}</h1>
                    <p>W ostatnich 15 meczach zdobyli { homeTeamMatches && getPoints(homeTeamMatches.slice(0, 15), home, away)} punktów, średnia { homeTeamMatches && (getPoints(homeTeamMatches.slice(0, 15), home, away)/15).toFixed(2)} pkt na mecz, bilans bramkowy {homeTeamMatches && getGoals(homeTeamMatches.slice(0, 15),home,away).home+":"+getGoals(homeTeamMatches.slice(0, 15),home,away).away}</p>
                    <p>W ostatnich 5 meczach u siebie zdobyli {homeTeamMatches && getHomePoints(homeTeamMatches, home)} punktów, średnia {homeTeamMatches && (getHomePoints(homeTeamMatches, home)/5).toFixed(2)} pkt na mecz bilans, bramkowy {homeTeamMatches && getHomeGoals(homeTeamMatches, home).home+":"+getHomeGoals(homeTeamMatches, home).away }</p>
                    <p>Siła tej drużyny na podstawie formy i gry u siebie: {homeTeamMatches && getTeamStrength(homeTeamMatches.slice(0, 15), home, true)}</p>
                    <p>Przewidywane bramki u siebie: {homeTeamMatches &&  probabilityScoreGoalsByHomeTeam+":"+probabilityLostGoalsByHomeTeam }</p>
                </Grid.Col>

            {
                homeTeamMatches && homeTeamMatches.slice(0, 15).map(match => {
                    if( !homeName && match.HOME_PARTICIPANT_IDS[0] === home ) setHomeName(dictClubs(match.HOME_NAME))
                    return(
                        <Grid.Col span={12} className="last-results-box">
                            <img className="clubLogo" src={match.HOME_IMAGES[0]} alt="Team Home" />
                            <img className="clubLogo" src={match.AWAY_IMAGES[0]} alt="Team Away" />
                            <a>{dictClubs(match.HOME_NAME)} {match.HOME_SCORE_CURRENT}-{match.AWAY_SCORE_CURRENT}  ({match.HOME_SCORE_PART_1}-{match.AWAY_SCORE_PART_1})  {dictClubs(match.AWAY_NAME)}</a><br />
                            <p>{match.ROUND}</p>
                            <p>{convertToDate(match.START_TIME)}</p>
                        </Grid.Col>
                    )
                })
            }    

            </Grid>

            <Grid className="last-results right-last-results">
                <Grid.Col span={12} className="last-results-box">
                    <h1>Goście {awayName}</h1>
                    <p>W ostatnich 15 meczach zdobyli { awayTeamMatches && getPoints(awayTeamMatches.slice(0, 15), home, away)} punktów, średnia { awayTeamMatches && (getPoints(awayTeamMatches.slice(0, 15), home, away)/15).toFixed(2)} pkt na mecz, bilans bramkowy {awayTeamMatches && getGoals(awayTeamMatches.slice(0, 15),home,away).home+":"+getGoals(awayTeamMatches.slice(0, 15),home,away).away}</p>
                    <p>W ostatnich 5 meczach na wyjeździe zdobyli {awayTeamMatches && getAwayPoints(awayTeamMatches, away)} punktów, średnia { awayTeamMatches && (getAwayPoints(awayTeamMatches, away)/5).toFixed(2)} pkt na mecz bilans bramkowy {awayTeamMatches && getAwayGoals(awayTeamMatches, away).away+":"+getAwayGoals(awayTeamMatches, away).home}</p>
                    <p>Siła tej drużyny na podstawie formy i gry na wyjeździe: {awayTeamMatches && getTeamStrength(awayTeamMatches.slice(0, 15), away, false)}</p>
                    <p>Przewidywane bramki na wyjeździe: {awayTeamMatches &&  probabilityScoreGoalsByAwayTeam+":"+probabilityLostGoalsByAwayTeam }</p>
                </Grid.Col>
            {
                awayTeamMatches && awayTeamMatches.slice(0, 15).map(match =>{
                    if( !awayName && match.AWAY_PARTICIPANT_IDS[0] === away ) setAwayName(dictClubs(match.AWAY_NAME))
                    return(
                        <Grid.Col span={12} className="last-results-box">
                            <img className="clubLogo" src={match.HOME_IMAGES[0]} alt="Team Home" />
                            <img className="clubLogo" src={match.AWAY_IMAGES[0]} alt="Team Away" />
                            <a>{dictClubs(match.HOME_NAME)} {match.HOME_SCORE_CURRENT}-{match.AWAY_SCORE_CURRENT} ({match.HOME_SCORE_PART_1}-{match.AWAY_SCORE_PART_1}) {dictClubs(match.AWAY_NAME)}</a><br />
                            <p>{match.ROUND}</p>
                            <p>{convertToDate(match.START_TIME)}</p>
                        </Grid.Col>
                    )
                })
            }
            </Grid>
            </div>
        </div>
    )
}

export default PredictPage;