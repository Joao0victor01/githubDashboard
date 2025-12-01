export interface Repo {
  id: number;
  name: string;
  language: string | null;
  stargazers_count: number;
  forks: number;
  updated_at: string;
}
