export function getPoints(allMatches, home, away){
    let points = 0;
    allMatches.map(match =>{
        if(match.ODDS_WINNER === 0) points += 1;
        if (home === match.HOME_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 1 ||
            home === match.AWAY_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 2 ||
            away === match.AWAY_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 2 ||
            away === match.HOME_PARTICIPANT_IDS[0] && match.ODDS_WINNER === 1) points += 3
    })
    return points;
}

export function getHomePoints(allMatches, home){
    let points = 0;
    let i = 0;
    allMatches.map(match =>{
        if(home === match.HOME_PARTICIPANT_IDS[0]){
            i++;
            if(i <= 5){
                if(match.ODDS_WINNER === 0) points += 1;
                if(match.ODDS_WINNER === 1) points += 3;

            }
        }
    })
    return points;
}

export function getAwayPoints(allMatches, away){
    let points = 0;
    let i = 0;
    allMatches.map(match =>{
        if(away === match.AWAY_PARTICIPANT_IDS[0]){
            i++;
            if(i <= 5){
                if(match.ODDS_WINNER === 0) points += 1;
                if(match.ODDS_WINNER === 2) points += 3;
            }
        }

    })
    return points;
}