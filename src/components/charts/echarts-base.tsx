"use client";

import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";
import { useEffect } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface EChartProps {
  option: EChartsOption;
  height?: number | string;
  className?: string;
  loadWordCloud?: boolean;
}

export function EChart({ option, height = 300, className, loadWordCloud }: EChartProps) {
  useEffect(() => {
    if (loadWordCloud) {
      import("echarts-wordcloud");
    }
  }, [loadWordCloud]);

  return (
    <ReactECharts
      option={option}
      style={{ height, width: "100%" }}
      className={className}
      notMerge
      lazyUpdate
    />
  );
}
