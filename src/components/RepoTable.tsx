import { useState, useMemo } from "react";
import { useRepoStore } from "../store/useRepoStore";

export default function RepoTable() {
  const { repos } = useRepoStore();

  const [languageFilter, setLanguageFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const languages = useMemo(() => {
    const setLang = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["all", ...Array.from(setLang)];
  }, [repos]);

  const filtered = useMemo(() => {
    return languageFilter === "all"
      ? repos
      : repos.filter((r) => r.language === languageFilter);
  }, [repos, languageFilter]);

  const pageCount = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <h2>Repositórios</h2>

      <select
        value={languageFilter}
        onChange={(e) => {
          setLanguageFilter(e.target.value);
          setPage(1);
        }}
      >
        {languages.map((l) => (
          <option key={l} value={l}>
            {l === "all" ? "Todas as linguagens" : l}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Linguagem</th>
            <th>Estrelas</th>
            <th>Forks</th>
            <th>Atualizado</th>
          </tr>
        </thead>

        <tbody>
          {current.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.language}</td>
              <td>{repo.stargazers_count}</td>
              <td>{repo.forks}</td>
              <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((n) => n - 1)}>
            {"<"}
          </button>

          <span>
            Página {page} de {pageCount}
          </span>

          <button
            disabled={page === pageCount}
            onClick={() => setPage((n) => n + 1)}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
