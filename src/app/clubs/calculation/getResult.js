export function getResult(
  homePercent,
  drawPercent,
  awayPercent,
  probabilityScoreHomeGoals,
  probabilityLoseHomeGoals,
  probabilityScoreAwayGoals,
  probabilityLoseAwayGoals
) {
  let probabilityWin;
  let betterScoreGoals;
  let betterLoseGoals;
  let worseScoreGoals;
  let worseLoseGoals;

  if (homePercent > drawPercent && homePercent > awayPercent) {
    probabilityWin = homePercent;
    betterScoreGoals = probabilityScoreHomeGoals;
    betterLoseGoals = probabilityLoseHomeGoals;
    worseScoreGoals = probabilityScoreAwayGoals;
    worseLoseGoals = probabilityLoseAwayGoals;
  }

  if (awayPercent > homePercent && awayPercent > drawPercent) {
    probabilityWin = awayPercent;
    betterScoreGoals = probabilityScoreAwayGoals;
    betterLoseGoals = probabilityLoseAwayGoals;
    worseScoreGoals = probabilityScoreHomeGoals;
    worseLoseGoals = probabilityLoseHomeGoals;
  }

  if (drawPercent > homePercent && drawPercent > awayPercent)
    probabilityWin = drawPercent;

  let differenceGoals;

  if (probabilityWin !== drawPercent) {
    if (probabilityWin < 50) differenceGoals = 1;
    else if (probabilityWin >= 50 && probabilityWin < 66) differenceGoals = 2;
    else if (probabilityWin >= 66 && probabilityWin < 75) differenceGoals = 3;
    else if (probabilityWin >= 75 && probabilityWin < 90) differenceGoals = 4;
    else if (probabilityWin >= 90) differenceGoals = 5;
  } else {
    differenceGoals = 0;
  }

  let levelGoals;
  if (
    worseLoseGoals > 1 &&
    worseLoseGoals < 1.5 &&
    betterScoreGoals > 1 &&
    betterScoreGoals < 1.5
  )
    levelGoals = 1;
  else if (worseLoseGoals > 1.5 && betterScoreGoals > 1.5) levelGoals = 3;
  else if (worseLoseGoals > 1.5 || betterScoreGoals > 1.5) levelGoals = 2;
  else levelGoals = 0;

  let winGoals;
  let loseGoals;
  let drawGoals;

  if (differenceGoals === 1) {
    if (levelGoals === 0 || levelGoals === 1) {
      winGoals = 1;
      loseGoals = 0;
    } else if (levelGoals === 2) {
      winGoals = 2;
      loseGoals = 1;
    } else if (levelGoals === 3) {
      winGoals = 3;
      loseGoals = 2;
    }
  } else if (differenceGoals === 2) {
    if (levelGoals === 0 || levelGoals === 1) {
      winGoals = 2;
      loseGoals = 0;
    } else if (levelGoals === 2) {
      winGoals = 3;
      loseGoals = 1;
    } else if (levelGoals === 3) {
      winGoals = 4;
      loseGoals = 2;
    }
  } else if (differenceGoals === 3) {
    if (levelGoals === 0 || levelGoals === 1 || levelGoals === 2) {
      winGoals = 3;
      loseGoals = 0;
    } else if (levelGoals === 3) {
      winGoals = 4;
      loseGoals = 1;
    }
  } else if (differenceGoals === 4) {
    winGoals = 4;
    loseGoals = 0;
  } else if (differenceGoals === 5) {
    winGoals = 5;
    loseGoals = 0;
  } else if (differenceGoals === 0) {
    const allGoals =
      parseInt(probabilityScoreHomeGoals) +
      parseInt(probabilityLoseHomeGoals) +
      parseInt(probabilityScoreAwayGoals) +
      parseInt(probabilityLoseAwayGoals);
    if (allGoals < 2.8) drawGoals = 0;
    else if (allGoals >= 2.8 && allGoals <= 3.2) drawGoals = 1;
    else drawGoals = 2;
  }

  let result;

  if (probabilityWin === homePercent) result = `${winGoals}-${loseGoals}`;
  else if (probabilityWin === awayPercent) result = `${loseGoals}-${winGoals}`;
  else if (probabilityWin === drawPercent) result = `${drawGoals}-${drawGoals}`;

  return result;
}
