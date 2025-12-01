  import React from "react";
  import ReactECharts from "echarts-for-react";
  import type { Repo } from "../types";

  interface Props {
    repos: Repo[];
  }

  export function LanguageChart({ repos }: Props) {
    // TODO: testar outros charts
    const languageCount: Record<string, number> = {};

    repos.forEach((repo) => {
      const lang = repo.language || "Sem linguagem";
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    });

    const data = Object.entries(languageCount).map(([name, value]) => ({
      name,
      value,
    }));

    const option = {
      title: {
        text: "Repositórios por Linguagem",
        left: "center",
        top: 20,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
      },
      series: [
        {
          name: "Linguagens",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };

    return (
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
        <ReactECharts option={option} style={{ height: 400 }} />
      </div>
    );
  }
