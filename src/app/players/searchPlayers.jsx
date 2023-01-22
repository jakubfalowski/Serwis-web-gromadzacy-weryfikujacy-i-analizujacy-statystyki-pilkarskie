import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, Button, Group } from '@mantine/core';
import { playerTabFunction } from "./fetchData";
import { sortByOverallFifa } from './sort';
import "../styles/App.scss";

export function SearchPlayers(){

    const playerTab = new Array(0);
    const names = new Array(0);
    const ref = useRef(null);
    const router = useRouter();

    useEffect(()=>{
      
        playerTabFunction().then((value) => {
          playerTab.push(value)
        }).then(addNamesTab).then(names.sort(sortByOverallFifa))
  
        function addNamesTab(){
          if(playerTab.length > 0){
            playerTab[0].sort(sortByOverallFifa);
          if(names.length < 1){
            for(let i = 0; i<426; i++){
              console.log(names, i)
                names.push(playerTab[0][i][0])
            }
          } 
        }
      }    
    },[names])
      
    return (
      <>
      <h2>Moduł zawodników</h2>
      <h4>Informacje szczegółowe dotyczące zawodników</h4>
        <Group className='buttonDown'>
            <Autocomplete
            label="Wyszukiwanie szczegółowe piłkarzy"
            placeholder="Wpisz nazwę zawodnika"
            data={names}
            ref={ref}
            />
            <Button variant="gradient" gradient={{ from: '#ad8881', to: '#4d331f', deg: 60 }} onClick={()=>{
                if (ref.current.value !== '') {
                    router.push(`/players/${ref.current.value}`, { replace: true });
                }
            }}>Przekieruj</Button>
        </Group>
      </>
      );
}
export default SearchPlayers;