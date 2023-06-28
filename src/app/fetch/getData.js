import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "./client";

async function getPosts() {
  return client("http://localhost:4000/blog/get-posts");
}

export function getBlogPosts() {
  const { data } = useQuery({
    queryFn: () => getPosts(),
  });

  return { data };
}

export function setFifaPlayers() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/futhead/create-fifa-stats", { data: body }),
    onSuccess: () => {
      console.log("udane");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}

export function setFmPlayers() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/fminside/create-fm-stats", { data: body }),
    onSuccess: () => {
      console.log("udane");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}

async function getCompareGames(stat, game, sortBy) {
  return client(
    `http://localhost:4000/fminside/get-compare-data?stat=${stat}&game=${game}&sortBy=${sortBy}`
  );
}

export function getCompare(stat, game, sortBy) {
  const { data } = useQuery({
    queryKey: ["getCompare", stat, game, sortBy],
    queryFn: () => getCompareGames(stat, game, sortBy),
    onError(err) {
      console.log(err);
    },
  });

  return { data };
}

const sofaHeader = {
  "X-RapidAPI-Key": "0c9455a446msh97e79af488aa513p1a114fjsneb4cb16023d6",
  "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
};

async function getSofaFromName(name) {
  return client(
    `https://sofascore.p.rapidapi.com/players/search?name=${name}`,
    { headers: sofaHeader }
  );
}

async function getSofaStats(id) {
  return client(
    `https://sofascore.p.rapidapi.com/players/get-statistics?playerId=${id}&tournamentId=17&seasonId=41886&typ=overall`,
    { headers: sofaHeader }
  );
}

export async function getSofaID(name) {
  const { data } = useQuery({
    queryFn: () => getSofaFromName(name),
    onError(err) {
      console.log(err);
    },
  });

  const statData = await getSofaStats(data.players[0].id);
  if (statData.statistics) return statData.statistics;
}

export function getSofa(id) {
  const { data } = useQuery({
    queryFn: () => getSofaStats(id),
    onError(err) {
      console.log(err);
    },
  });

  return { data };
}

export function setSofaPlayers() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/sofascore/create-sofa-stats", {
        data: body,
      }),
    onSuccess: () => {
      console.log("udane");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}

async function getAllPlayerData(name) {
  return client(
    `http://localhost:4000/sofascore/get-players-all-data?name=${name}`
  );
}

export function getPlayerData(name) {
  const { data } = useQuery({
    queryKey: ["playerData"],
    queryFn: () => getAllPlayerData(name),
  });

  return { data };
}

async function getMaxPlayerRatings() {
  return client(`http://localhost:4000/sofascore/get-max-ratings`);
}

export function getMaxRatings() {
  const { data } = useQuery({
    queryKey: ["maxRating"],
    queryFn: () => getMaxPlayerRatings(),
  });

  return { data };
}

async function getAvgPlayerRatings() {
  return client(`http://localhost:4000/fminside/get-average-ratings`);
}

export function getAverageRatings() {
  const { data } = useQuery({
    queryKey: ["averageRating"],
    queryFn: () => getAvgPlayerRatings(),
  });

  return { data };
}

async function getClubs(name) {
  return client(`http://localhost:4000/fminside/get-club-data?stat=${name}`);
}

export function getClubsData(stat) {
  const { data } = useQuery({
    queryKey: [`averageClubs: ${stat}`],
    queryFn: () => getClubs(stat),
  });

  return { data };
}

const flashscoreHeader = {
  "X-RapidAPI-Key": "0c9455a446msh97e79af488aa513p1a114fjsneb4cb16023d6",
  "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
};

async function getTeamsInfo() {
  return client(
    `https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings?locale=pl_PL&tournament_stage_id=4fofM1vn&standing_type=overall&tournament_season_id=WI1bjKHl`,
    { headers: flashscoreHeader }
  );
}

export function getTeamsInfoData() {
  const { data } = useQuery({
    queryKey: [`teamsInfo`],
    queryFn: () => getTeamsInfo(),
  });

  return { data };
}

export function setTeam() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/team/create-team", { data: body }),
    onSuccess: () => {
      console.log("udane dodawanie rekordu do bazy");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}

export function getMatches() {
  return client(
    `https://flashlive-sports.p.rapidapi.com/v1/tournaments/results?locale=pl_PL&tournament_stage_id=4fofM1vn&page=1`,
    { headers: flashscoreHeader }
  );
}

export function getMatchesData() {
  const { data } = useQuery({
    queryKey: [`matchesInfo`],
    queryFn: () => getMatches(),
  });

  return { data };
}

async function getDBTeamsInfo() {
  return client("http://localhost:4000/team/get-teams");
}

export function getDBTeams() {
  const { data } = useQuery({
    queryFn: () => getDBTeamsInfo(),
  });

  return { data };
}

export function setMatch() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/match/create-match", { data: body }),
    onSuccess: () => {
      console.log("udane dodawanie rekordu do bazy");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}

async function getRoundMatches(round) {
  return client(`http://localhost:4000/match/get-all-matches?round=${round}`);
}

export function getAllMatches(round) {
  const { data } = useQuery({
    queryKey: [`get matches from round: ${round}`],
    queryFn: () => getRoundMatches(round),
  });

  return { data };
}

async function getMatch(id) {
  return client(`http://localhost:4000/match/get-matches-by-id?id=${id}`);
}

export function getMatchById(id) {
  const { data } = useQuery({
    queryKey: [`get matches from id: ${id}`],
    queryFn: () => getMatch(id),
  });

  return { data };
}

async function getMatchesTeam(teamId) {
  return client(
    `http://localhost:4000/match/get-matches-team?teamId=${teamId}`
  );
}

export function getMatchesFromTeam(teamId) {
  const { data } = useQuery({
    queryKey: [`get matches from club id: ${teamId}`],
    queryFn: () => getMatchesTeam(teamId),
  });

  return { data };
}

async function getHomeMatchesTeam(teamId) {
  return client(
    `http://localhost:4000/match/get-home-matches-team?teamId=${teamId}`
  );
}

export function getHomeMatchesFromTeam(teamId) {
  const { data } = useQuery({
    queryKey: [`get matches from home club id: ${teamId}`],
    queryFn: () => getHomeMatchesTeam(teamId),
  });

  return { data };
}

async function getAwayMatchesTeam(teamId) {
  return client(
    `http://localhost:4000/match/get-away-matches-team?teamId=${teamId}`
  );
}

export function getAwayMatchesFromTeam(teamId) {
  const { data } = useQuery({
    queryKey: [`get matches from away club id: ${teamId}`],
    queryFn: () => getAwayMatchesTeam(teamId),
  });

  return { data };
}

async function getBetimateMatches() {
  return client("http://localhost:3000/api/betimate");
}

export function getBetimate() {
  const { data } = useQuery({
    queryKey: ["betimate"],
    queryFn: () => getBetimateMatches(),
  });

  return { data };
}
