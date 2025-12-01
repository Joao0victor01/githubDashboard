import axios from "axios";

interface GithubSearchUserResponse {
  items: {
    login: string;
    avatar_url: string;
    id: number;
    html_url: string;
    type: string;
  }[];
}

export interface GithubUser {
  login: string;
  avatar_url: string;
}

export async function searchUsers(query: string): Promise<GithubUser[]> {
  if (!query.trim()) return [];

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const res = await axios.get<GithubSearchUserResponse>(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)} in:login&per_page=10`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return res.data.items.map((item) => ({
    login: item.login,
    avatar_url: item.avatar_url,
  }));
}
