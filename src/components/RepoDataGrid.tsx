import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useRepoStore } from "../store/useRepoStore";
import { useTranslation } from "react-i18next";
import type { GridColDef, GridToolbarProps } from "@mui/x-data-grid";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

export default function RepoDataGrid() {
  const { repos } = useRepoStore();
  const { t } = useTranslation();

  const [languageFilter, setLanguageFilter] = useState<string>("all");

  const languages: string[] = [
    "all",
    ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])),
  ];

  const filteredRepos =
    languageFilter === "all"
      ? repos
      : repos.filter((r) => r.language === languageFilter);

  const columns: GridColDef[] = [
    { field: "name", headerName: t("column_name"), flex: 1, minWidth: 220 },
    { field: "language", headerName: t("column_language"), width: 150 },
    {
      field: "stargazers_count",
      headerName: t("column_stars"),
      width: 110,
      align: "center",
      headerAlign: "center",
      type: "number",
    },
    {
      field: "forks",
      headerName: t("column_forks"),
      width: 110,
      align: "center",
      headerAlign: "center",
      type: "number",
    },
    {
      field: "updated_at",
      headerName: t("column_updated"),
      width: 160,
      renderCell: (params) => {
        const dateStr = params.row?.updated_at as string | undefined;
        if (!dateStr) return <span style={{ color: "#888" }}>—</span>;

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return <span style={{ color: "#888" }}>—</span>;

        return date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        {t("table_title")}
      </Typography>

      <FormControl sx={{ minWidth: 240, mb: 3 }}>
        <InputLabel>{t("column_language")}</InputLabel>
        <Select
          value={languageFilter}
          label={t("column_language")}
          onChange={(e) => setLanguageFilter(e.target.value as string)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang === "all" ? "Todas as linguagens" : lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ height: 460, width: "100%" }}>
          <DataGrid
            rows={filteredRepos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            slots={{
              toolbar: null as unknown as React.JSXElementConstructor<GridToolbarProps>,
            }}
            rowHeight={52}
            sx={{
              border: "none",
              "& .MuiDataGrid-row:hover": {
                bgcolor: "rgba(37, 99, 235, 0.12)",
              },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "background.default",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid rgba(255,255,255,0.12)",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}