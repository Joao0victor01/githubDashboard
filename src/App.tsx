import { useState, useEffect, useRef } from "react";
import { useRepoStore } from "./store/useRepoStore";
import RepoTable from "./components/RepoTable";
import { LanguageChart } from "./components/LanguageChart";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    repos,
    suggestions,
    username,
    setUsername,
    loadRepos,
    fetchSuggestions,
    clearSuggestions,
    error,
    loading,
  } = useRepoStore();

  const [inputValue, setInputValue] = useState("");
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(inputValue, 600);

  useEffect(() => {
    if (debouncedValue.trim().length > 1) {
      fetchSuggestions(debouncedValue);
    } else {
      clearSuggestions();
    }
  }, [debouncedValue, fetchSuggestions]);

  const handleConfirmUser = (name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setUsername(trimmed);
      setInputValue(trimmed);
      clearSuggestions();
      loadRepos();
    }
  };

  const isInputFocused = document.activeElement === inputRef.current;

  // REGRA FINAL: aparece se input focado OU mouse sobre o dropdown
  const showDropdown = suggestions.length > 0 && (isInputFocused || isDropdownHovered);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111418",
        color: "white",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>GitHub Dashboard</h1>

      {username && repos.length > 0 && (
        <h2 style={{ fontSize: "1.5rem", opacity: 0.9 }}>
          Repositórios de <strong>{username}</strong>
        </h2>
      )}

      <div style={{ position: "relative", width: "380px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar usuário do GitHub..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              handleConfirmUser(inputValue);
            }
          }}
          onFocus={() => inputValue.trim().length > 1 && fetchSuggestions(inputValue)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "none",
            fontSize: "1.1rem",
            outline: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            background: "#1f2937",
            color: "white",
          }}
        />

        {/* Dropdown com proteção contra clique perdido */}
        {showDropdown && (
          <ul
            onMouseEnter={() => setIsDropdownHovered(true)}
            onMouseLeave={() => setIsDropdownHovered(false)}
            style={{
              position: "absolute",
              top: "56px",
              left: "-5px",
              width: "calc(100% + 32px)",
              minWidth: "420px",
              background: "#1c1f24",
              borderRadius: "12px",
              padding: "12px 0",
              listStyle: "none",
              maxHeight: "340px",
              overflowY: "auto",
              zIndex: 20,
              boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
              border: "1px solid #333",
            }}
          >
            {suggestions.map((user) => (
              <li
                key={user.login}
                onClick={() => handleConfirmUser(user.login)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  cursor: "pointer",
                  gap: "12px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb33")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width={38}
                  height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ fontWeight: 600 }}>{user.login}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => handleConfirmUser(inputValue)}
        disabled={loading || !inputValue.trim()}
        style={{
          background: inputValue.trim() && !loading ? "#2563eb" : "#374151",
          padding: "12px 32px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: inputValue.trim() && !loading ? "pointer" : "not-allowed",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
        }}
      >
        {loading ? "Carregando repositórios..." : "Buscar Repositórios"}
      </button>

      {error && (
        <p style={{ color: "#ef4444", fontWeight: "bold", fontSize: "1.1rem" }}>
          {error}
        </p>
      )}

      {repos.length > 0 && (
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            display: "grid",
            gap: "50px",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "start",
          }}
        >
          <RepoTable />
          <LanguageChart repos={repos} />
        </div>
      )}

      {username && repos.length === 0 && !loading && !error && (
        <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>
          Este usuário não tem repositórios públicos.
        </p>
      )}
    </div>
  );
}

export default App;