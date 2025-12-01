import { useRepoStore } from "../store/useRepoStore";

export default function SearchBar() {
  const { username, setUsername, loadRepos, loading } = useRepoStore();

  return (
    <div className="search-bar">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite um usuário do GitHub..."
      />

      <button onClick={loadRepos} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  );
}
