import { useEffect, useState } from "react";
import { convertToDate } from "../calculation/convertToDate"
import { options } from '../fetchOption';
import { Grid } from '@mantine/core';
import { dictClubs } from "../dictClubs";
import "../../styles/App.scss";

export let teamH;
export let teamA;

export function PageIndex(){
    const [dataset, setDataset] = useState();
    const [leagueName, setLeagueName] = useState();
    const date = new Date();
    let today = [];

    for(let i = 0; i < 14; i++){
        today[i] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()+i);
    } 
    let ifFetch = true;

    async function fetchData(query) {
        try{
            const response = await fetch(`https://flashscore.p.rapidapi.com/v1/tournaments/fixtures?tournament_stage_id=${query}&locale=en_GB&page=1`,options);
            const data = await response.json();
            setLeagueName(data.DATA[0].NAME);
            const results = data.DATA[0].EVENTS;
            setDataset(results);
        } catch(error){
          console.log(error)
        }
    }

      useEffect(() => {
        fetchData('4fofM1vn');
      }, [ifFetch]);

    return(
        <>
        <h2 className="leagueName">{leagueName}</h2>
        <Grid grow>
            { dataset && dataset.map((data, i) => {
                for(let daysMatch=14; daysMatch>=0; daysMatch--){
                    if(convertToDate(data.START_TIME).endsWith(today[daysMatch])){
                        return(
                            <Grid.Col md={4} sm={6} xs={12}>
                                <img className="clubLogo" src={`${data.HOME_IMAGES[0]}`} alt={data.HOME_NAME} /><img src={`${data.AWAY_IMAGES[0]}`} alt={data.AWAY_NAME} /><a href={`/clubs/${data.EVENT_ID}/${data.HOME_PARTICIPANT_IDS[0]}/${data.AWAY_PARTICIPANT_IDS[0]}`}>{dictClubs(data.HOME_NAME)} - {dictClubs(data.AWAY_NAME)} <br /></a><p>{convertToDate(data.START_TIME)}</p>
                            </Grid.Col>)
                    }
                }  
            })}
        </Grid>
        </>
    )
}
export default PageIndex