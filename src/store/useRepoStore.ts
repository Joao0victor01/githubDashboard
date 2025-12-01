import { create } from "zustand";
import { fetchRepos } from "../api/github";
import { searchUsers } from "../api/searchUsers";
import type { Repo } from "../types";
import type { GithubUser } from "../api/searchUsers";

interface RepoStore {
  username: string;
  repos: Repo[];
  suggestions: GithubUser[];
  loading: boolean;
  error: string | null;

  setUsername: (name: string) => void;
  loadRepos: () => Promise<void>;
  fetchSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  username: "",
  repos: [],
  suggestions: [],
  loading: false,
  error: null,

  setUsername: (name) => set({ username: name }),

  fetchSuggestions: async (query) => {
    if (query.length < 2) {
      set({ suggestions: [] });
      return;
    }

    const users = await searchUsers(query);
    set({ suggestions: users });
  },

  clearSuggestions: () => set({ suggestions: [] }),

  loadRepos: async () => {
    const username = get().username;
    if (!username) {
      return set({ error: "Digite um usuário do GitHub." });
    }

    try {
      set({ loading: true, error: null, repos: [] });
      const repos = await fetchRepos(username);
      set({ repos });
    } catch {
      set({ error: "Usuário não encontrado." });
    } finally {
      set({ loading: false });
    }
  },
}));
