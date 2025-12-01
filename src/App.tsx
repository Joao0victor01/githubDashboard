import { useState, useEffect } from "react";
import { useRepoStore } from "./store/useRepoStore";
import RepoDataGrid from "./components/RepoDataGrid";
import { LanguageChart } from "./components/LanguageChart";
import { useDebounce } from "./hooks/useDebounce";
import { useTranslation } from "react-i18next";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

function App() {
  const { t } = useTranslation();
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
  const [open, setOpen] = useState(false);

  const debouncedValue = useDebounce(inputValue, 600);

  useEffect(() => {
    if (debouncedValue.trim().length > 1) {
      fetchSuggestions(debouncedValue);
    } else {
      clearSuggestions();
    }
  }, [debouncedValue, fetchSuggestions]);

  const handleSelect = (login: string | null) => {
    if (login?.trim()) {
      setUsername(login.trim());
      setInputValue(login.trim());
      clearSuggestions();
      loadRepos();
    }
  };

  const showWelcomeScreen = !username && repos.length === 0 && !error;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {showWelcomeScreen && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          <Paper
            elevation={20}
            sx={{
              width: { xs: 120, sm: 160 },
              height: { xs: 120, sm: 160 },
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "white",
              p: 2,
            }}
          >
            <img
              src="/githubIcon.svg"
              alt="GitHub"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Paper>

          <Typography variant="h3" fontWeight="bold" textAlign="center">
            {t("title")}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          width: { xs: "100%", sm: 600 },
          maxWidth: 600,
          mx: "auto",
          px: 3,
          mt: showWelcomeScreen ? -4 : 4,
          mb: showWelcomeScreen ? 24 : 6,
          zIndex: 10,
        }}
      >
        <Autocomplete
          freeSolo
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          options={suggestions.map((u) => u.login)}
          loading={loading && suggestions.length === 0}
          inputValue={inputValue}
          onInputChange={(_, v) => setInputValue(v || "")}
          onChange={(_, v) => handleSelect(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("search_placeholder")}
              variant="outlined"
              fullWidth
              size="medium"
              onKeyDown={(e) => e.key === "Enter" && handleSelect(inputValue)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={24} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: "0 16px 50px rgba(0,0,0,0.6)" },
                  "&.Mui-focused": { boxShadow: "0 16px 50px rgba(37, 99, 235, 0.4)" },
                  "& fieldset": { border: "2px solid rgba(255,255,255,0.12)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                  "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: 2 },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#2563eb" },
              }}
            />
          )}
          renderOption={(props, option) => {
            const user = suggestions.find((u) => u.login === option);
            if (!user) return null;

            return (
              <Box component="li" {...props} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5 }}>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width={42}
                  height={42}
                  style={{ borderRadius: "50%" }}
                />
                <Typography fontWeight="bold" fontSize="1.1rem">
                  {user.login}
                </Typography>
              </Box>
            );
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => handleSelect(inputValue)}
          disabled={loading || !inputValue.trim()}
          sx={{
            mt: 2.5,
            py: 2,
            borderRadius: 4,
            fontSize: "1.15rem",
            fontWeight: "bold",
            textTransform: "none",
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
            "&:disabled": { bgcolor: "#374151" },
          }}
        >
          {loading ? t("loading_repos") : t("search_button")}
        </Button>
      </Box>

      {!showWelcomeScreen && (
        <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, pb: 12 }}>
          {username && repos.length > 0 && (
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={8}>
              Repositórios de <strong>{username}</strong>
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 6, maxWidth: 800, mx: "auto" }}>
              {error}
            </Alert>
          )}

          {repos.length > 0 && (
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                display: "grid",
                gap: 8,
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              }}
            >
              <RepoDataGrid />
              <LanguageChart repos={repos} />
            </Box>
          )}

          {username && repos.length === 0 && !loading && !error && (
            <Typography textAlign="center" color="text.secondary" variant="h6" mt={14}>
              {t("no_repos")}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;