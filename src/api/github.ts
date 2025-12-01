import axios from "axios";
import type { Repo } from "../types";

export async function fetchRepos(username: string): Promise<Repo[]> {
  const res = await axios.get<Repo[]>(
    `https://api.github.com/users/${username}/repos`
  );
  return res.data;
}
