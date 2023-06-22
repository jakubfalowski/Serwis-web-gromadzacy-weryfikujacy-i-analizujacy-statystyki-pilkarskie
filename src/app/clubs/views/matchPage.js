let ifMutate = true;
import { Grid } from "@mantine/core";

import {
  getAllMatches,
  getDBTeams,
  getMatchesData,
  getTeamsInfoData,
  setMatch,
  setTeam,
} from "../../fetch/getData";

export function PageIndex() {
  const { data } = getTeamsInfoData();
  const { mutate } = setTeam();
  const { data: matchData } = getMatchesData();
  const { data: teamData } = getDBTeams();
  const { mutate: mutateMatch } = setMatch();
  const { data: roundMatchData } = getAllMatches("34");

  function getIdFromName(name) {
    if (teamData) {
      const team = teamData.find((team) => team.name === name);
      return team ? parseInt(team.id) : null;
    }
  }

  function getNameFromId(id) {
    if (teamData) {
      const team = teamData.find((team) => team.id === id);
      return team ? team.name : null;
    }
  }

  function truncateRound(text) {
    return text.substring(8);
  }

  function convertUnixToDate(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
  }

  function handleAddTeams() {
    if (data && data.DATA[0] && data.DATA[0].ROWS)
      data.DATA[0].ROWS.map((club) =>
        mutate({
          name: club.TEAM_NAME,
          logoUrl: club.TEAM_IMAGE_PATH,
        })
      );
  }

  function handleAddMatches() {
    if (matchData && matchData.DATA[0] && matchData.DATA[0].EVENTS && ifMutate)
      matchData.DATA[0].EVENTS.map((match) => {
        mutateMatch({
          id_home: getIdFromName(match.HOME_NAME),
          id_away: getIdFromName(match.AWAY_NAME),
          homeGoals: parseInt(match.HOME_SCORE_CURRENT),
          awayGoals: parseInt(match.AWAY_SCORE_CURRENT),
          result: `${match.HOME_SCORE_CURRENT}-${match.AWAY_SCORE_CURRENT}`,
          date: convertUnixToDate(match.START_TIME),
          round: truncateRound(match.ROUND),
        });
        ifMutate = false;
      });
  }

  return (
    <div className="container container-bg mx-auto pl-8">
      <h2 className="text-2xl font-bold py-8">Ostatnia kolejka</h2>

      <Grid grow>
        {roundMatchData &&
          roundMatchData.map((match, i) => {
            return (
              <Grid.Col md={4} sm={6} xs={12}>
                <a
                  href={`/clubs/${match.id}/${match.id_home}/${match.id_away}`}
                  className="font-semibold"
                >
                  {getNameFromId(match.id_home)}{" "}
                  <span className="font-extrabold"> {match.result} </span>
                  {getNameFromId(match.id_away)} <br />
                </a>
                <p>{match.date}</p>
              </Grid.Col>
            );
          })}
      </Grid>
      {/* <button onClick={handleAddTeams}>Dodaj kluby</button>
      <button onClick={handleAddMatches}>Dodaj mecze</button> */}
    </div>
  );
}
export default PageIndex;
