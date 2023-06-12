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

async function getScrappingFifaStats() {
  return client("http://localhost:3000/api/fifa");
}

export function getScrappingFifa() {
  const { data } = useQuery({
    queryFn: () => getScrappingFifaStats(),
  });

  return { data };
}

export function setFifaPlayers() {
  const { mutate } = useMutation({
    mutationFn: (body) =>
      client("http://localhost:4000/futhead/create-fifa-stats", {data: body}),
    onSuccess: () => {
      console.log(body);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
}
