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
