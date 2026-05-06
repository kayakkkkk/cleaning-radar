"use client";

import { EChart } from "./echarts-base";

export interface TreemapNode {
  name: string;
  value: number;
  children?: TreemapNode[];
  itemStyle?: { color: string };
}

interface Props {
  data: TreemapNode[];
  height?: number;
}

export function TreemapChart({ data, height = 320 }: Props) {
  return (
    <EChart
      height={height}
      option={{
        tooltip: {
          formatter: (p: { name: string; value: number }) =>
            `${p.name}: <b>${p.value}</b>`,
        },
        series: [
          {
            type: "treemap",
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            label: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              fontWeight: 500,
              fontSize: 12,
            },
            upperLabel: {
              show: true,
              height: 24,
              color: "#475569",
              fontSize: 11,
              fontWeight: 600,
            },
            levels: [
              {
                itemStyle: { borderColor: "#fff", borderWidth: 2, gapWidth: 2 },
              },
              {
                upperLabel: { show: true },
                itemStyle: { borderColor: "#f1f5f9", borderWidth: 4, gapWidth: 1 },
              },
            ],
            data,
          },
        ],
      }}
    />
  );
}
