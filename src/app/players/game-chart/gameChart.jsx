import { useState } from 'react';
import { playerTabFunction } from '../fetchData';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis,Tooltip, Legend } from "recharts";
import { LoadingOverlay, Anchor, Button} from '@mantine/core';

let playerTab = [];

export default function GameChart(){

  const [on, setOn] = useState(false)

  let average;
  const nameOfStat = ['Ocena ogólna','Ocena ogólna','Szybkość','Szybkość','Fizyczność','Fizyczność','Strzały','Atak','Defensywa','Defensywa','Drybling','Podania','Technika','Mentalność',];

    playerTabFunction().then((stat) => {
      if(on === false && playerTab.length < 1){
        for(let a = 0; a < 14; a++){
          average = 0;
          for(let i = 0; i < 426; i++){
            average += parseInt(stat[i][a+1])
          }
          average = average/425;
            if([0,2,4,6,8,10,11].includes(a)) playerTab.push({name: nameOfStat[a], fifa: average.toFixed(2)})
            else playerTab.push({name: nameOfStat[a], fm: average.toFixed(2)})
        }
      }
    }).then(()=>{
      setOn(true)
    })
    

  console.log(playerTab)
  
  return (
    <div>
    { on === true ?
      <div style={{
        backgroundColor: "#ffffff",
        width: "1600px"
      }}>
        <h2 className='center'>Średnia ocena danej statystyki</h2>
      <BarChart
      width={1500}
      height={400}
      data={playerTab}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis  />
      <Tooltip  />
      <Legend />
      <Bar dataKey="fifa" stackId="a" fill="#4d331f" />
      <Bar dataKey="fm" stackId="a" fill="#ad8881" />
    </BarChart>
    </div>
    : <LoadingOverlay visible={true} overlayBlur={2} />}
    <Anchor href="/players/club-chart">
        <Button variant="gradient" gradient={{ from: '#ad8881', to: '#4d331f', deg: 60 }} sx={{marginLeft:"10px"}}>Statystyki porównując atrybuty klubów</Button>
    </Anchor>
    </div>
    
  );
}