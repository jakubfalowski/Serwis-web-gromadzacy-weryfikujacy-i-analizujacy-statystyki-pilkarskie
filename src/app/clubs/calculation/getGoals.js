export function getGoals(lastMatches, teamId) {
  let Hgoals = 0;
  let Agoals = 0;
  lastMatches.map((match) => {
    if (match.id_home === parseInt(teamId)) {
      Hgoals += parseInt(match.homeGoals);
      Agoals += parseInt(match.awayGoals);
    } else if (match.id_away === parseInt(teamId)) {
      Hgoals += parseInt(match.awayGoals);
      Agoals += parseInt(match.homeGoals);
    }
  });
  const goals = { home: Hgoals, away: Agoals };
  return goals;
}

export function getHomeGoals(HAMatches) {
  let Hgoals = 0;
  let Agoals = 0;
  HAMatches.map((match) => {
    Hgoals += parseInt(match.homeGoals);
    Agoals += parseInt(match.awayGoals);
  });
  const goals = { home: Hgoals, away: Agoals };
  return goals;
}

export function getAwayGoals(HAMatches) {
    let Hgoals = 0;
    let Agoals = 0;
    HAMatches.map((match) => {
      Hgoals += parseInt(match.awayGoals);
      Agoals += parseInt(match.homeGoals);
    });
    const goals = { home: Hgoals, away: Agoals };
    return goals;
  }
