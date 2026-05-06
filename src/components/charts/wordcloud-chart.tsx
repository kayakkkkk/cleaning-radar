"use client";

import { EChart } from "./echarts-base";
import type { CompetitorId, WordFreq } from "@/lib/types";
import { competitors } from "@/lib/mock-data";

interface Props {
  data: WordFreq[];
  competitor: CompetitorId | "all";
  height?: number;
}

const palettes: Record<CompetitorId | "all", string[]> = {
  miso: ["#FFC940", "#FFB300", "#FFE699", "#FF9800"],
  soomgo: ["#3D7AFE", "#1976D2", "#64B5F6", "#0D47A1"],
  laundrygo: ["#1ABC9C", "#16A085", "#A4E5DA", "#0D5C50"],
  yeolda: ["#FF6B6B", "#C9302C", "#FFB6C1", "#E91E63"],
  all: ["#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"],
};

export function WordCloudChart({ data, competitor, height = 280 }: Props) {
  const filtered =
    competitor === "all"
      ? data
      : data.filter((d) => d.competitor === competitor);
  const palette = palettes[competitor] ?? palettes.all;
  const items = filtered.map((d, i) => ({
    name: d.word,
    value: d.count,
    textStyle: { color: palette[i % palette.length] },
  }));

  const title =
    competitor === "all"
      ? "전체 자주 등장 단어"
      : `${competitors.find((c) => c.id === competitor)?.name} 광고 키워드`;

  return (
    <EChart
      loadWordCloud
      height={height}
      option={{
        title: {
          text: title,
          textStyle: { fontSize: 12, color: "#475569", fontWeight: 500 },
          left: 0,
          top: 0,
        },
        tooltip: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (p: any) =>
            `${p?.name ?? ""}: <b>${p?.value ?? 0}</b>회`,
        },
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            left: "center",
            top: 30,
            width: "100%",
            height: "85%",
            sizeRange: [12, 40],
            rotationRange: [0, 0],
            gridSize: 8,
            drawOutOfBound: false,
            data: items,
          },
        ],
      }}
    />
  );
}
