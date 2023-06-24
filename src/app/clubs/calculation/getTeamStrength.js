export function getPoints(lastMatches, teamId, HAMatches) {
  let strength = 0;
  let multiplier = 2;
  let HAstrength = 0;
  const lastMatchesPoints = lastMatches.map((match, i) => {
    multiplier = 2 - i / 7.5;
    if (match.homeGoals === match.awayGoals) {
      strength += multiplier;
    } else if (
      (match.id_home === parseInt(teamId) &&
        match.homeGoals > match.awayGoals) ||
      (match.id_away === parseInt(teamId) && match.awayGoals > match.homeGoals)
    ) {
      strength += 3 * multiplier;
    }
    return strength;
  });

  const HAMPoints = HAMatches.map((match) => {
    if (match.homeGoals === match.awayGoals) HAstrength += 1;
    else if (
      (match.id_home === parseInt(teamId) &&
        match.homeGoals > match.awayGoals) ||
      (match.id_away === parseInt(teamId) && match.awayGoals > match.homeGoals)
    ) {
      HAstrength += 3;
    }
    return HAstrength;
  });

  const percentStrength = (
    ((lastMatchesPoints[14] / 45) * 200 + (HAMPoints[4] / 15) * 100) /
    3
  ).toFixed(2);
  return { percentStrength, lastMatchesPoints, HAMPoints };
}
