let ifFetch = 0;

export async function FetchSofaScore(nameOfPlayer){

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971',
      'X-RapidAPI-Host': 'sofascore.p.rapidapi.com'
    }
  };

  async function searchPlayer(){ 
    const response1 = await fetch(`https://sofascore.p.rapidapi.com/players/search?name=${nameOfPlayer}`,options);
    const data1 = await response1.json();
    return data1.players[0].id;
  }

  
    const returnData = () => {
      if(ifFetch === 0){
        const getData = searchPlayer().then(async (playerId) => {
          const response2 = await fetch(`https://sofascore.p.rapidapi.com/players/get-statistics?playerId=${playerId}&tournamentId=17&seasonId=29415&typ=overall`,options);
          const data2 = await response2.json();
          return data2;
        })
        ifFetch++;
        return getData;
    }
  }
      
  return returnData()
}
export default FetchSofaScore;