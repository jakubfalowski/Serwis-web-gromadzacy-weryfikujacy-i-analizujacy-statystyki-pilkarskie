import { options } from "./fetchOption";

export const FetchResults = async (team1, team2) =>{
    let matchArray = [[],[]];
    let ekstraklasaTab = [[],[]]
    try{
        const response1 = await fetch(
            `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${team1}&locale=en_GB&page=1`,options
        );
        const data1 = await response1.json();
        const data1Copy = data1.DATA;

        for(let i = 0; i < data1Copy.length; i++){
            if(data1Copy[i].NAME === "Poland: Ekstraklasa") ekstraklasaTab[0].push(i);
        }

        const response2 = await fetch(
            `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${team2}&locale=en_GB&page=1`,options
        );

        const data2 = await response2.json();
        const data2Copy = data2.DATA;


        for(let i = 0; i < data2Copy.length; i++){
            if(data2Copy[i].NAME === "Poland: Ekstraklasa") ekstraklasaTab[1].push(i);
        }

        for(let x = 0; x < 2; x++){
            ekstraklasaTab[x].forEach(element =>  
                x === 0 ? matchArray[x].push(...data1.DATA[element].EVENTS) :
                matchArray[x].push(...data2.DATA[element].EVENTS)) 
        }

        return matchArray;
    }

    catch(error){
        console.log(error)
    }
}

export default FetchResults;
