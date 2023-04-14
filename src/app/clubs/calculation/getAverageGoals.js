export function getAverageGoals(teamScoreGoals, teamLoseGoals, teamScoreGoalsHA, teamLoseGoalsHA){
    let probabilityScoreGoals = ((teamScoreGoals/15)*2+(teamScoreGoalsHA/5))/3; // średnia goli z ostatnich 15 meczy z wagą 2 i średnia domowych/wyjazdowych z wagą 1, ale razy 3 bo 5 nie 15 meczy
    let probabilityLoseGoals = ((teamLoseGoals/15)*2+(teamLoseGoalsHA/5))/3;
    const probabilityGoals = {score: probabilityScoreGoals, lost: probabilityLoseGoals}
    return probabilityGoals;
}   