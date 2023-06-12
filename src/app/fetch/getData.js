import { useQuery } from "@tanstack/react-query";
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
