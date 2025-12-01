import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchUsers } from "../api/searchUsers";
import type { GithubUser } from "../api/searchUsers";

export default function UserSearch({ onSelect }: { onSelect: (login: string) => void }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 600);

  useEffect(() => {
    const fetch = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchUsers(debouncedQuery);
        setUsers(data.slice(0, 10));
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [debouncedQuery]);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder="Buscar usuário no GitHub..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {loading && <p>Carregando...</p>}

      {users.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            width: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            listStyle: "none",
            padding: "0",
            margin: "0",
            zIndex: 10,
          }}
        >
          {users.map((u) => (
            <li
              key={u.login}
              onClick={() => {
                onSelect(u.login);
                setQuery(u.login);
                setUsers([]);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              {u.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
