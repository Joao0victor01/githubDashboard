import ReactECharts from "echarts-for-react";
import type { Repo } from "../types";
import { useTranslation } from "react-i18next";
import type { EChartsOption } from "echarts";

interface Props {
  repos: Repo[];
}

export function LanguageChart({ repos }: Props) {
  const { t } = useTranslation();

  const languageCount: Record<string, number> = {};
  repos.forEach((repo) => {
    const lang = repo.language || "Outros";
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  const data = Object.entries(languageCount).map(([name, value]) => ({
    name,
    value,
  }));

  const option: EChartsOption = {
    backgroundColor: "transparent",

    title: {
      text: t("chart_title") || "Repositórios por Linguagem",
      left: "center",
      top: 30,
      textStyle: {
        color: "#ffffff",
        fontSize: 22,
        fontWeight: "bold",
      },
    },

    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.85)",
      borderWidth: 0,
      textStyle: { color: "#fff" },
    },

    series: [
      {
        name: "Linguagens",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
        top: 80,
        bottom: 100,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#111418",
          borderWidth: 3,
        },
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
        data,
      },
    ],

    legend: {
      orient: "horizontal",
      bottom: 30,
      left: "center",
      itemGap: 16,
      textStyle: {
        color: "#e2e8f0",
        fontSize: 14,
      },
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 520, width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
}
