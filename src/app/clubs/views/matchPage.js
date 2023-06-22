let ifMutate = true;

import {
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

  function getIdFromName(name) {
    const team = teamData.find((team) => team.name === name);
    return team ? parseInt(team.id) : null;
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

  function handleAddMatches(){
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
  

  //   const [dataset, setDataset] = useState();
  //   const [leagueName, setLeagueName] = useState();
  //   const date = new Date();

  //   let today = [];
  //   const futureDaysMatches = 14;
  //   const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //   let lastI;
  //   for (let i = 0; i < futureDaysMatches; i++) {
  //     if (date.getDate() + i <= dayInMonth[date.getMonth()]) {
  //       today[i] =
  //         date.getFullYear() +
  //         "-" +
  //         (date.getMonth() + 1) +
  //         "-" +
  //         (date.getDate() + i);
  //       lastI = i;
  //     } else {
  //       today[i] =
  //         date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + (i - lastI);
  //     }
  //   }
  //   let ifFetch = true;

  //   async function fetchData(query) {
  //     try {
  //       const response = await fetch(
  //         `https://flashscore.p.rapidapi.com/v1/tournaments/fixtures?tournament_stage_id=${query}&locale=en_GB&page=1`,
  //         options
  //       );
  //       console.log(response);
  //       const data = await response.json();
  //       setLeagueName(data.DATA[0].NAME);
  //       const results = data.DATA[0].EVENTS;
  //       setDataset(results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   useEffect(() => {
  //     fetchData("4fofM1vn");
  //   }, [ifFetch]);

  //   console.log(dataset);
  return (
    <>
      <h2 className="leagueName">aaa</h2>
      <button onClick={handleAddTeams}>Dodaj kluby</button>
      <button onClick={handleAddMatches}>Dodaj mecze</button>
      {/* <Grid grow>
        {dataset &&
          dataset.map((data, i) => {
            for (
              let daysMatch = futureDaysMatches;
              daysMatch >= 0;
              daysMatch--
            ) {
              if (convertToDate(data.START_TIME).endsWith(today[daysMatch])) {
                return (
                  <Grid.Col md={4} sm={6} xs={12}>
                    <img
                      className="clubLogo"
                      src={`${data.HOME_IMAGES[0]}`}
                      alt={data.HOME_NAME}
                    />
                    <img src={`${data.AWAY_IMAGES[0]}`} alt={data.AWAY_NAME} />
                    <a
                      href={`/clubs/${data.EVENT_ID}/${data.HOME_PARTICIPANT_IDS[0]}/${data.AWAY_PARTICIPANT_IDS[0]}`}
                    >
                      {dictClubs(data.HOME_NAME)} - {dictClubs(data.AWAY_NAME)}{" "}
                      <br />
                    </a>
                    <p>{convertToDate(data.START_TIME)}</p>
                  </Grid.Col>
                );
              }
            }
          })}
      </Grid> */}
    </>
  );
}
export default PageIndex;
