"use client";

import { EChart } from "./echarts-base";
import type { CalendarPoint, CompetitorId } from "@/lib/types";
import { competitors } from "@/lib/mock-data";

interface Props {
  data: CalendarPoint[];
  competitor?: CompetitorId | "all";
  height?: number;
}

export function CalendarHeatmap({ data, competitor = "all", height = 200 }: Props) {
  const filtered =
    competitor === "all"
      ? aggregateByDate(data)
      : data.filter((d) => d.competitor === competitor).map((d) => [d.date, d.count] as [string, number]);

  const max = Math.max(...filtered.map((d) => d[1]), 1);
  const dates = filtered.map((d) => d[0]).sort();
  const start = dates[0];
  const end = dates[dates.length - 1];

  const title =
    competitor === "all"
      ? "4사 합산 광고 발행 빈도"
      : `${competitors.find((c) => c.id === competitor)?.name} 광고 발행 패턴`;

  return (
    <EChart
      height={height}
      option={{
        tooltip: {
          formatter: (p: { value?: [string, number] }) => {
            if (!p.value) return "";
            const [date, count] = p.value;
            return `${date}<br/><b>${count}</b>건`;
          },
        },
        visualMap: {
          min: 0,
          max,
          calculable: false,
          orient: "horizontal",
          left: "center",
          bottom: 0,
          inRange: {
            color: ["#f1f5f9", "#bae6fd", "#38bdf8", "#0284c7", "#0c4a6e"],
          },
          textStyle: { fontSize: 10 },
        },
        calendar: {
          top: 30,
          left: 30,
          right: 30,
          cellSize: ["auto", 16],
          range: [start, end],
          itemStyle: { borderWidth: 1, borderColor: "#fff" },
          splitLine: { show: false },
          dayLabel: { fontSize: 10, color: "#64748b" },
          monthLabel: { fontSize: 10, color: "#64748b" },
          yearLabel: { show: false },
        },
        title: {
          text: title,
          textStyle: { fontSize: 12, color: "#475569", fontWeight: 500 },
          left: 0,
          top: 0,
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: filtered,
          },
        ],
      }}
    />
  );
}

function aggregateByDate(data: CalendarPoint[]): [string, number][] {
  const map = new Map<string, number>();
  for (const d of data) {
    map.set(d.date, (map.get(d.date) ?? 0) + d.count);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}
