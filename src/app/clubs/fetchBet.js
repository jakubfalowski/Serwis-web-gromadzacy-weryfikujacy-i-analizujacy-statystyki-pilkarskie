import { options } from "./fetchOption";

export async function FetchBet(matchID){

  try{
    const response = await fetch(`https://flashscore.p.rapidapi.com/v1/events/odds?locale=en_GB&event_id=${matchID}`,options);
    const data = await response.json();
    let homeOdds = data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_FIRST.VALUE;
    let drawOdds = data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_SECOND.VALUE;
    let awayOdds = data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_THIRD.VALUE;
    const odds = {home: homeOdds, draw: drawOdds, away: awayOdds}
    return odds;
  } catch(error){
      console.log(error)
    }
}

export default FetchBet;