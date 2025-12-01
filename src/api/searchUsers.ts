import axios from "axios";

export interface GithubUser {
  login: string;
  avatar_url: string;
}

export async function searchUsers(query: string): Promise<GithubUser[]> {
  if (!query.trim()) return [];

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const res = await axios.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)} in:login&per_page=10`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return res.data.items.map((item: any) => ({
    login: item.login,
    avatar_url: item.avatar_url,
  }));
}
