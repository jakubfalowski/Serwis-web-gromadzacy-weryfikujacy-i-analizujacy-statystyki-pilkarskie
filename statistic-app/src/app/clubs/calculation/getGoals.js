export function getGoals(allMatches, home, away){
    let Hgoals = 0;
    let Agoals = 0;
    allMatches.map(match =>{
        if(home === match.HOME_PARTICIPANT_IDS[0] || away === match.HOME_PARTICIPANT_IDS[0]){
            Hgoals += parseInt(match.HOME_SCORE_CURRENT);
            Agoals += parseInt(match.AWAY_SCORE_CURRENT);
        }
        if(home === match.AWAY_PARTICIPANT_IDS[0] || away === match.AWAY_PARTICIPANT_IDS[0]){
            Hgoals += parseInt(match.AWAY_SCORE_CURRENT);
            Agoals += parseInt(match.HOME_SCORE_CURRENT);
        } 
    })
    const goals = {home: Hgoals, away: Agoals}
    return goals;
}

export function getHomeGoals(allMatches, home){
    let Hgoals = 0;
    let Agoals = 0;
    let i = 0;
    allMatches.map(match =>{
        if(home === match.HOME_PARTICIPANT_IDS[0] && i < 5){
            Hgoals += parseInt(match.HOME_SCORE_CURRENT);
            Agoals += parseInt(match.AWAY_SCORE_CURRENT);
            i++;
        } 
    })
    const goals = {home: Hgoals, away: Agoals}
    return goals;
}

export function getAwayGoals(allMatches, away){
    let Hgoals = 0;
    let Agoals = 0;
    let i = 0;
    allMatches.map(match =>{
        if(away === match.AWAY_PARTICIPANT_IDS[0] && i < 5){
            Hgoals += parseInt(match.HOME_SCORE_CURRENT);
            Agoals += parseInt(match.AWAY_SCORE_CURRENT);
            i++;
        } 
    })
    const goals = {home: Hgoals, away: Agoals}
    return goals;
}