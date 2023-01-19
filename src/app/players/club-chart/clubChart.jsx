"use client"
import { useState } from 'react';
import { LoadingOverlay, Anchor, Button} from '@mantine/core';
import { sortByOverallFifa, sortChartByAttack, sortChartByDefensive, sortChartByOverall, sortChartByPace, sortChartByPhysicality, sortChartByTechnique } from "../sort";
import Charts from './charts';
import { playerTabFunction } from "../fetchData";



const clubsName = ["Liverpool","Tottenham", "West Ham", "Wolves", "Brighton", "Crystal Palac", "West Brom", "Sheffield Uni", "Burnley", "Arsenal", "Fulham", "Leeds Utd", "Newcastle"
, "Leicester", "Southampton", "Manchester Un", "Manchester Ci", "Aston Villa", "Everton", "Chelsea"];

let clubsTab = [];
for(let a = 0; a < 20; a++){
    clubsTab.push(
        {name: clubsName[a], playersFifa: 0, ratingFifa: 0, paceFifa: 0, shotsFifa: 0, passFifa: 0,dribbleFifa: 0, defensiveFifa: 0,physicalityFifa: 0, 
            playersFm: 0, ratingFm: 0, attackFm: 0, defensiveFm: 0, techniqueFm: 0, mentalityFm: 0, physicalityFm: 0, paceFm: 0})
}

let render = 0;
let overallTab = [];
let paceTab = [];
let attackTab = [];
let defensiveTab = [];
let physicalityTab = [];
let techniqueTab = [];

export function ClubChart(){

    const [on, setOn] = useState(false)
    
      playerTabFunction().then((stat) => {
        const bestSquad = stat.sort(sortByOverallFifa);
        bestSquad.map(player =>{
            let clubIndex = clubsName.indexOf(player[15]);
            if(clubsTab[clubIndex]){
                if(clubsTab[clubIndex].playersFifa < 15 && clubsTab[clubIndex].playersFm < 15){
                    clubsTab[clubIndex].ratingFifa += parseInt(player[1]);
                    clubsTab[clubIndex].ratingFm += parseInt(player[2]);
                    clubsTab[clubIndex].paceFifa += parseInt(player[3]);
                    clubsTab[clubIndex].paceFm += parseInt(player[4]);
                    clubsTab[clubIndex].physicalityFifa += parseInt(player[5]);
                    clubsTab[clubIndex].physicalityFm += parseInt(player[6]);
                    clubsTab[clubIndex].shotsFifa += parseInt(player[7]);
                    clubsTab[clubIndex].attackFm += parseInt(player[8]);
                    clubsTab[clubIndex].defensiveFifa += parseInt(player[9]);
                    clubsTab[clubIndex].defensiveFm += parseInt(player[10]);
                    clubsTab[clubIndex].dribbleFifa += parseInt(player[11]);
                    clubsTab[clubIndex].passFifa += parseInt(player[12]);
                    clubsTab[clubIndex].techniqueFm += parseInt(player[13]);
                    clubsTab[clubIndex].mentalityFm += parseInt(player[14]);

                    clubsTab[clubIndex].playersFifa++;
                    clubsTab[clubIndex].playersFm++;
                } 
            }
        })

        if(render === 0){
          for(let x = 0; x <= clubsTab.length-1; x++){
            overallTab.push(clubsTab[x])
            paceTab.push(clubsTab[x])
            attackTab.push(clubsTab[x])
            defensiveTab.push(clubsTab[x])
            physicalityTab.push(clubsTab[x])
            techniqueTab.push({name: clubsTab[x].name ,techniqueFifa: ((parseInt(clubsTab[x].dribbleFifa)+parseInt(clubsTab[x].passFifa))/2).toFixed(0), techniqueFm: clubsTab[x].techniqueFm})
          }
          render++;
        }

        overallTab.sort(sortChartByOverall);
        paceTab.sort(sortChartByPace);
        attackTab.sort(sortChartByAttack);
        defensiveTab.sort(sortChartByDefensive);
        physicalityTab.sort(sortChartByPhysicality)
        techniqueTab.sort(sortChartByTechnique)

        setOn(true);
      })

      return (
        <div>
        { on === true ?
        <>
          <Charts data={overallTab} dataKey1="ratingFifa" dataKey2="ratingFm" description="Siła zespołów"/>
          <Charts data={techniqueTab} dataKey1="techniqueFifa" dataKey2="techniqueFm" description="Zespoły najlepsze technicznie"/>
          <Charts data={attackTab} dataKey1="shotsFifa" dataKey2="attackFm" description="Zespoły najlepsze w ofensywie"/>
          <Charts data={defensiveTab} dataKey1="defensiveFifa" dataKey2="defensiveFm" description="Zespoły najlepsze w defensywie"/>
          <Charts data={paceTab} dataKey1="paceFifa" dataKey2="paceFm" description="Najszybsze zespoły"/>
          <Charts data={physicalityTab} dataKey1="physicalityFifa" dataKey2="physicalityFm" description="Zespoły najlepsze fizycznie"/>
        </>
        : <LoadingOverlay visible={true} overlayBlur={2} />}
        <Anchor href="/players/game-chart">
            <Button variant="gradient" gradient={{ from: '#ad8881', to: '#4d331f', deg: 60 }}>Statystyki porównując gry</Button>
        </Anchor>
        </div>
      );

}
export default ClubChart;