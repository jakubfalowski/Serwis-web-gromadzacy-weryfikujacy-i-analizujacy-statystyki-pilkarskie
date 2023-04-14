export function getTeamStrength(lastMatches, teamID, ifHome){
    let strength = 0;
    let multiplier = 2;

    lastMatches.map((match, i) =>{
        multiplier = 2 - (i/7.5);
        if(match.ODDS_WINNER === 0) strength += multiplier;
        if (teamID === match.HOME_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 1 || teamID === match.AWAY_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 2 ) strength += 3*multiplier;
    })

    let HAstrength = 0;
    let i = 0;

    lastMatches.map(match =>{
        if(ifHome === true && teamID === match.HOME_PARTICIPANT_IDS[0]){
            i++;
            if(i <= 5){
                if(match.ODDS_WINNER === 0) HAstrength += 1;
                if(match.ODDS_WINNER === 1) HAstrength += 3;
            }
        }
        else if(ifHome === false && teamID === match.AWAY_PARTICIPANT_IDS[0]){
            i++;
            if(i <= 5){
                if(match.ODDS_WINNER === 0) HAstrength += 1;
                if(match.ODDS_WINNER === 2) HAstrength += 3;
            }
        }
    })
    
    const percentStrength = (((strength/45)*200 + (HAstrength/15)*100)/3).toFixed(2)
    return percentStrength;
}

