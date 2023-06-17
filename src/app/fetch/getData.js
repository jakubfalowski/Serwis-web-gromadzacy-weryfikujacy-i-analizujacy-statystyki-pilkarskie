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
      console.log(body);
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
      console.log(body);
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
    queryKey: ["getCompare", stat],
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
      console.log(body);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}
