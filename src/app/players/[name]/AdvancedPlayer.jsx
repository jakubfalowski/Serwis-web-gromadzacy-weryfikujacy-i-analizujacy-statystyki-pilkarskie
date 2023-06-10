"use client"
import { useEffect, useState } from 'react';
import { playerTabFunction } from '../fetchData';
import { Table, LoadingOverlay, Group } from '@mantine/core';
import FetchSofaScore from './fetchSofascore';
import { sortByAttackFifa, sortByDefensiveFifa, sortByOverallFifa, sortByOverallFm, sortByPaceFifa, sortByPhysicalityFifa, sortByPaceFm, sortByPhysicalityFm, sortByAttackFm, sortByDefensiveFm, sortByDribblingFifa, sortByPassFifa, sortByTechniqueFm, sortByMentalityFm } from './sort';
import { DictClubs } from './dictClubs';
import { bestAssistsPerMatch, bestBigChancesPerMatch, bestClearancesPerMatch, bestDribblingPerMatch, bestGoalsPerMatch, bestInterceptionsPerMatch, bestKeyPassesPerMatch, bestRating, bestShotsPerMatch, bestTacklesPerMatch } from './bestRating';

let apiData = new Array(0);
let indexInQueue = new Array(0);
let playerRating = new Array(0);
let counter = 0;

let sortTab = new Array(14);
for(let i=0;i<14;i++) sortTab[i]=new Array(0);

export function AdvancedPlayer(props){

    const [data, setData] = useState();

    const playerTab = new Array(0);
    const name = decodeURIComponent(props.parameter);
    
    function setPlayer(){
        let indexOfName;
        if(playerTab[0]){
            playerTab[0].sort(sortByOverallFifa);
            for(let indexOfPlayer = 0; indexOfPlayer < playerTab[0].length; indexOfPlayer++){
                if(playerTab[0][indexOfPlayer][0] === name){
                    setData(playerTab[0][indexOfPlayer]);
                    indexOfName = indexOfPlayer;
                } 
            }

            if(playerRating.length < 1){
                for(let x = 1; x < 15; x++){
                    playerRating.push(playerTab[0][indexOfName][x])
                }
            }

            if(counter === 0){
                for(let typeStat = 0; typeStat < sortTab.length; typeStat++){
                    for(let columnOfPlayer = 0; columnOfPlayer < 438; columnOfPlayer++){
                        sortTab[typeStat].push(playerTab[0][columnOfPlayer])
                      }
                }
                
                counter++;
                sortTab[0].sort(sortByOverallFifa);
                sortTab[2].sort(sortByPaceFifa);
                sortTab[4].sort(sortByPhysicalityFifa);
                sortTab[6].sort(sortByAttackFifa);
                sortTab[8].sort(sortByDefensiveFifa);
                sortTab[10].sort(sortByDribblingFifa);
                sortTab[11].sort(sortByPassFifa);
                sortTab[1].sort(sortByOverallFm);
                sortTab[3].sort(sortByPaceFm);
                sortTab[5].sort(sortByPhysicalityFm);
                sortTab[7].sort(sortByAttackFm);
                sortTab[9].sort(sortByDefensiveFm);
                sortTab[12].sort(sortByTechniqueFm);
                sortTab[13].sort(sortByMentalityFm);
                
                let stop;

                for(let o = 0; o < sortTab.length; o++){
                    stop = false;
                    for(let i = 0; i < sortTab[0].length; i++){
                        if(sortTab[o][i][o+1] === playerRating[o] && stop === false){
                            stop = true;
                            indexInQueue.push(i);
                        }
                    }
                    
                }       
            }  
        }
        else console.log("error")
    }
        FetchSofaScore(name).then(async (value)=>{
            if(value && value.error === undefined) {
                apiData.push(
                    {"dribblesPerMatch": value.statistics.minutesPlayed > 89 ? value.statistics.successfulDribbles/(value.statistics.minutesPlayed/90): value.statistics.successfulDribbles , "wasFouled": value.statistics.wasFouled,
                        "percentAerialDuels" : value.statistics.aerialDuelsWonPercentage, "percentGroundDuels": value.statistics.groundDuelsWonPercentage,
                        "goals" : value.statistics.goals, "shots": value.statistics.totalShots,
                        "tackles": value.statistics.tackles, "interceptions": value.statistics.interceptions, "clearances": value.statistics.clearances,
                        "percentPasses": value.statistics.accuratePassesPercentage, "keyPasses": value.statistics.keyPasses, "bigChancesCreated": value.statistics.bigChancesCreated, "assists": value.statistics.assists ? value.statistics.assists : "0",
                        "rating": value.statistics.rating, "minutes": value.statistics.minutesPlayed
                    })
            } 
        })

        playerTabFunction().then((value) => {
            playerTab.push(value)
        }).then(setPlayer)

    
    return(
        <div className="ap" style={{
            maxWidth: "1800px",
            margin: "0 auto"
          }}>
            { (data && indexInQueue && sortTab[0][0] !== undefined) ?
            <>
                <div className='playerInfo'>
                    <h2> Nazwa zawodnika: {data[0]}</h2>
                    <h2> Klub: {DictClubs(data[15])}</h2>
                    <h2> Narodowość: {data[16]}</h2>
                    <p> { apiData.length > 0 && apiData[0].minutes} minut / {apiData.length > 0 && (apiData[0].minutes/90).toFixed(2)} meczów rozegranych w sezonie</p>
                </div>
                <Table className="tbl three-columns" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                    <caption>
                        <h2>Fifa</h2>
                    </caption>
                    <thead>
                        <tr className='statBox head'>
                            <td className='ratingBox'></td>
                            <td className='ratingBox'>ocena</td>
                            <td className='ratingBox'>nie gorszy niż</td>
                            <td className='ratingBox'>procent w stosunku do najlepszej oceny</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='statBox'>
                            <td>Overall</td>
                            <td className={indexInQueue[0] < indexInQueue[1] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{data[1]}</td>
                            <td className={indexInQueue[0] < indexInQueue[1] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[0]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[0] < indexInQueue[1] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{((data[1]/parseInt(sortTab[0][0][1]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Szybkość</td>
                            <td className={indexInQueue[2] < indexInQueue[3] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{data[3]}</td>
                            <td className={indexInQueue[2] < indexInQueue[3] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[2]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[2] < indexInQueue[3] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{((data[3]/parseInt(sortTab[2][0][3]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Fizyczność</td>
                            <td className={indexInQueue[4] < indexInQueue[5] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{data[5]}</td>
                            <td className={indexInQueue[4] < indexInQueue[5] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[4]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[4] < indexInQueue[5] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{((data[5]/parseInt(sortTab[4][0][5]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Atak</td>
                            <td className={indexInQueue[6] < indexInQueue[7] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{data[7]}</td>
                            <td className={indexInQueue[6] < indexInQueue[7] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[6]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[6] < indexInQueue[7] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{((data[7]/parseInt(sortTab[6][0][7]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Defensywa</td>
                            <td className={indexInQueue[8] < indexInQueue[9] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{data[9]}</td>
                            <td className={indexInQueue[8] < indexInQueue[9] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[8]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[8] < indexInQueue[9] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{((data[9]/parseInt(sortTab[8][0][9]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Technika</td>
                            <td className={indexInQueue[10]+indexInQueue[11] < indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{`Drybling: ${data[11]}, Podania: ${data[12]}`}</td>
                            <td className={indexInQueue[10]+indexInQueue[11] < indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && `Drybling: ${(100-(indexInQueue[10]/438)*100).toFixed(2)}%, Podania: ${(100-(indexInQueue[11]/438)*100).toFixed(2)}%`}</td>
                            <td className={indexInQueue[10]+indexInQueue[11] < indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{`Drybling: ${((data[11]/parseInt(sortTab[10][0][11]))*100).toFixed(2)}%, Podania: ${((data[12]/parseInt(sortTab[11][0][12]))*100).toFixed(2)}%`}</td>
                        </tr>             
                    </tbody>
                </Table>

                <Table className="tbl three-columns" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                    <caption>
                        <h2>Football Manager</h2>
                    </caption>
                    <thead>
                        <tr className='statBox head'>
                            <td className='ratingBox'></td>
                            <td className='ratingBox'>ocena</td>
                            <td className='ratingBox'>nie gorszy niż</td>
                            <td className='ratingBox'>procent w stosunku do najlepszej oceny</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='statBox'>
                            <td>Overall</td>
                            <td className={indexInQueue[1] < indexInQueue[0] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{data[2]}</td>
                            <td className={indexInQueue[1] < indexInQueue[0] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[1]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[1] < indexInQueue[0] ? 'ratingBox better': indexInQueue[0] === indexInQueue[1] ? 'ratingBox same' : 'ratingBox worse'}>{((data[2]/parseInt(sortTab[1][0][2]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Szybkość</td>                            
                            <td className={indexInQueue[3] < indexInQueue[2] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{data[4]}</td>
                            <td className={indexInQueue[3] < indexInQueue[2] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[3]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[3] < indexInQueue[2] ? 'ratingBox better': indexInQueue[2] === indexInQueue[3] ? 'ratingBox same' : 'ratingBox worse'}>{((data[4]/parseInt(sortTab[3][0][4]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Fizyczność</td>
                            <td className={indexInQueue[5] < indexInQueue[4] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{data[6]}</td>
                            <td className={indexInQueue[5] < indexInQueue[4] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[5]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[5] < indexInQueue[4] ? 'ratingBox better': indexInQueue[4] === indexInQueue[5] ? 'ratingBox same' : 'ratingBox worse'}>{((data[6]/parseInt(sortTab[5][0][6]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Atak</td>
                            <td className={indexInQueue[7] < indexInQueue[6] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{data[8]}</td>
                            <td className={indexInQueue[7] < indexInQueue[6] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[7]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[7] < indexInQueue[6] ? 'ratingBox better': indexInQueue[6] === indexInQueue[7] ? 'ratingBox same' : 'ratingBox worse'}>{((data[8]/parseInt(sortTab[7][0][8]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Defensywa</td>
                            <td className={indexInQueue[9] < indexInQueue[8] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{data[10]}</td>
                            <td className={indexInQueue[9] < indexInQueue[8] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[9]/438)*100).toFixed(2)}%</td>
                            <td className={indexInQueue[9] < indexInQueue[8] ? 'ratingBox better': indexInQueue[8] === indexInQueue[9] ? 'ratingBox same' : 'ratingBox worse'}>{((data[10]/parseInt(sortTab[9][0][10]))*100).toFixed(2)}%</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Technika</td>
                            <td className={indexInQueue[10]+indexInQueue[11] > indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{data[13]}</td>
                            <td className={indexInQueue[10]+indexInQueue[11] > indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{indexInQueue.length > 0 && (100-(indexInQueue[12]/438)*100).toFixed(2) }%</td>
                            <td className={indexInQueue[10]+indexInQueue[11] > indexInQueue[12]*2 ? 'ratingBox better': indexInQueue[10]+indexInQueue[11] === indexInQueue[12]*2 ? 'ratingBox same' : 'ratingBox worse'}>{((data[13]/parseInt(sortTab[12][0][13]))*100).toFixed(2)}%</td>
                        </tr>             
                    </tbody>
                </Table>
                
                <Table className="tbl two-columns" horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
                    <caption>
                        <h2>Sofascore</h2>
                    </caption>
                    <thead>
                        <tr className='statBox head'>
                            <td className='ratingBox'></td>
                            <td className='ratingBox'>ocena</td>
                            <td className='ratingBox'>procent w stosunku do najlepszej oceny</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='statBox'>
                            <td>Overall</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Średnia ocena: {(apiData[0].rating).toFixed(2)}</li></ul> : "-"}</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Średnia ocena: {((apiData[0].rating/bestRating)*100).toFixed(2)}%</li></ul> : "-"}</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Szybkość</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Minięcia przeciwników na mecz: {(apiData[0].dribblesPerMatch).toFixed(2)}</li><li>Ilość faulów na danym zawodniku: {apiData[0].wasFouled}</li></ul> : "-"}</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Minięcia przeciwników na mecz: {((apiData[0].dribblesPerMatch/bestDribblingPerMatch)*100).toFixed(2)}%</li></ul> : "-"}</td>

                        </tr>
                        <tr className='statBox'>
                            <td>Fizyczność</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Wygrane pojedynki powietrzne: {(apiData[0].percentAerialDuels).toFixed(2)}%</li><li>Wygrane pojedynki z piłką na trawie: {(apiData[0].percentGroundDuels).toFixed(2)}%</li></ul> : "-"}</td>
                            <td className='ratingBox same'>-</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Atak</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Liczba bramek: {apiData[0].goals}</li><li>Liczba strzałów: {apiData[0].shots}</li></ul> : "-"}</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Liczba bramek: {((apiData[0].goals/(apiData[0].minutes/90)/bestGoalsPerMatch)*100).toFixed(2)}%</li><li>Liczba strzałów: {((apiData[0].shots/(apiData[0].minutes/90)/bestShotsPerMatch)*100).toFixed(2)}%</li></ul> : "-"}</td>
                        </tr>
                        <tr className='statBox'> 
                            <td>Defensywa</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Odbiory: {apiData[0].interceptions}</li><li>Wślizgi: {apiData[0].tackles}</li><li>Wybicia: {apiData[0].clearances}</li></ul> : "-"}</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Odbiory: {(((apiData[0].interceptions/(apiData[0].minutes/90))/bestInterceptionsPerMatch)*100).toFixed(2)}%</li><li>Wślizgi: {((apiData[0].tackles/(apiData[0].minutes/90)/bestTacklesPerMatch)*100).toFixed(2)}%</li><li>Wybicia: {((apiData[0].clearances/(apiData[0].minutes/90)/bestClearancesPerMatch)*100).toFixed(2)}%</li></ul> : "-"}</td>
                        </tr>
                        <tr className='statBox'>
                            <td>Technika</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Asysty: {apiData[0].assists}</li><li>Kluczowe podania: {apiData[0].keyPasses}</li><li>Stworzone niebezpieczne sytuacje: {apiData[0].bigChancesCreated}</li><li>Procent celnych podań: {(apiData[0].percentPasses).toFixed(2)}</li></ul> : "-"}</td>
                            <td className='ratingBox same'>{apiData.length > 0 ? <ul><li>Asysty: {((apiData[0].assists/(apiData[0].minutes/90)/bestAssistsPerMatch)*100).toFixed(2)}%</li><li>Kluczowe podania: {((apiData[0].keyPasses/(apiData[0].minutes/90)/bestKeyPassesPerMatch)*100).toFixed(2)}%</li><li>Stworzone niebezpieczne sytuacje: {((apiData[0].bigChancesCreated/(apiData[0].minutes/90)/bestBigChancesPerMatch)*100).toFixed(2)}%</li></ul> : "-"}</td>
                        </tr>             
                    </tbody>
                </Table>
                <h4>Legenda kolorów</h4>
                <Group style={{marginBottom:"20px"}}>
                    <div style={{backgroundColor:"#ad888166", height:"30px", width: "30px", borderRadius:"50%"}} /><span>Lepsza statystyka</span>
                    <div style={{backgroundColor:"#ad888150", height:"30px", width: "30px", borderRadius:"50%"}} /><span>Identyczna statystyka</span>
                    <div style={{backgroundColor:"#ad888133", height:"30px", width: "30px", borderRadius:"50%"}} /><span>Gorsza statystyka</span>
                </Group>
                <i>Kolory kolumn w tabeli są zależne od porównywania "nie gorszy niż" spośród obydwu gier</i>
                </> : <LoadingOverlay visible={true} />
            }
        </div>
    )
}
export default AdvancedPlayer;