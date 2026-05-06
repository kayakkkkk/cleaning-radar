"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ColorPaletteBar, ColorSwatchRow } from "@/components/charts/color-swatch";
import { Donut } from "@/components/charts/donut";
import { StackedBar } from "@/components/charts/stacked-bar";
import { HorizontalBar } from "@/components/charts/horizontal-bar";
import { TreemapChart } from "@/components/charts/treemap-chart";
import { WordCloudChart } from "@/components/charts/wordcloud-chart";
import { KpiCard } from "@/components/ads/kpi-card";
import { InsightCard } from "@/components/ads/insight-card";
import { ads, competitors, insights, wordcloudData } from "@/lib/mock-data";
import type { CompetitorId } from "@/lib/types";
import { Calendar, TrendingUp } from "lucide-react";

const VISUAL_TYPES = ["인물", "Before-After", "제품샷", "라이프스타일", "인포그래픽"] as const;
const TEXT_DENSITIES = ["Heavy", "Medium", "Minimal"] as const;
const ASPECT_RATIOS = ["1:1", "9:16", "16:9", "4:5"] as const;
const THEMES = ["청결", "가족", "전문가", "후기", "할인", "변화", "신뢰"] as const;

const visualColors: Record<string, string> = {
  "인물": "#8b5cf6",
  "Before-After": "#10b981",
  "제품샷": "#f59e0b",
  "라이프스타일": "#0ea5e9",
  "인포그래픽": "#ef4444",
};

const densityColors: Record<string, string> = {
  Heavy: "#0c4a6e",
  Medium: "#0ea5e9",
  Minimal: "#bae6fd",
};

const aspectColors = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6"];

export default function InsightsPage() {
  const [wcCompetitor, setWcCompetitor] = useState<CompetitorId | "all">("miso");

  // Aggregate dominant colors per competitor
  const colorPalettes = useMemo(() => {
    return competitors.map((c) => {
      const cAds = ads.filter((a) => a.competitor === c.id);
      const colorCount = new Map<string, number>();
      for (const ad of cAds) {
        for (const col of ad.dominantColors) {
          colorCount.set(col, (colorCount.get(col) ?? 0) + 1);
        }
      }
      const top = [...colorCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([color]) => color);
      return { competitor: c, colors: top };
    });
  }, []);

  // Visual type distribution per competitor (stacked bar)
  const visualData = useMemo(() => {
    return competitors.map((c) => {
      const cAds = ads.filter((a) => a.competitor === c.id);
      const row: Record<string, string | number> = { name: c.name };
      for (const v of VISUAL_TYPES) {
        row[v] = cAds.filter((a) => a.visualType === v).length;
      }
      return row;
    });
  }, []);

  const visualSeries = VISUAL_TYPES.map((v) => ({
    key: v,
    label: v,
    color: visualColors[v],
  }));

  // Aspect ratio donut
  const aspectData = useMemo(() => {
    return ASPECT_RATIOS.map((r, i) => ({
      name: r,
      value: ads.filter((a) => a.aspectRatio === r).length,
      color: aspectColors[i],
    })).filter((d) => d.value > 0);
  }, []);

  // Text density per competitor (stacked bar)
  const densityData = useMemo(() => {
    return competitors.map((c) => {
      const cAds = ads.filter((a) => a.competitor === c.id);
      const row: Record<string, string | number> = { name: c.name };
      for (const d of TEXT_DENSITIES) {
        row[d] = cAds.filter((a) => a.textDensity === d).length;
      }
      return row;
    });
  }, []);

  const densitySeries = TEXT_DENSITIES.map((d) => ({
    key: d,
    label: d,
    color: densityColors[d],
  }));

  // CTA distribution
  const ctaData = useMemo(() => {
    const map = new Map<string, number>();
    for (const ad of ads) {
      map.set(ad.cta, (map.get(ad.cta) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, []);

  // Theme treemap
  const themeData = useMemo(() => {
    return competitors.map((c) => {
      const cAds = ads.filter((a) => a.competitor === c.id);
      const themeCounts = THEMES.map((t) => ({
        name: t,
        value: cAds.filter((a) => a.themes.includes(t)).length,
        itemStyle: { color: shadeColor(c.logoColor, 0.5 - Math.random() * 0.3) },
      })).filter((t) => t.value > 0);
      return {
        name: c.name,
        value: themeCounts.reduce((s, t) => s + t.value, 0),
        itemStyle: { color: c.logoColor },
        children: themeCounts,
      };
    });
  }, []);

  // KPIs
  const peopleRate = Math.round(
    (ads.filter((a) => a.visualType === "인물").length / ads.length) * 100
  );
  const heavyRate = Math.round(
    (ads.filter((a) => a.textDensity === "Heavy").length / ads.length) * 100
  );
  const beforeAfterRate = Math.round(
    (ads.filter((a) => a.visualType === "Before-After").length / ads.length) * 100
  );

  // Long-running ads
  const longRunning = [...ads]
    .filter((a) => !a.isActive || a.lifespanDays > 20)
    .sort((a, b) => b.lifespanDays - a.lifespanDays)
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">이미지 크리에이티브 인사이트</h1>
        <p className="text-sm text-muted-foreground mt-1">
          4사 광고 이미지를 시각적으로 분해 — 컬러·구도·테마·CTA 패턴으로 다음 크리에이티브 영감 얻기.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="분석 광고" value={ads.length} hint="4사 합산" />
        <KpiCard label="인물 등장 비율" value={`${peopleRate}%`} hint="visualType = 인물" />
        <KpiCard label="텍스트 Heavy" value={`${heavyRate}%`} hint="이미지 텍스트 밀도" />
        <KpiCard label="Before-After" value={`${beforeAfterRate}%`} hint="비포·애프터 포맷" />
      </div>

      {/* Insight cards */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          🪄 자동 생성 인사이트
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((i, idx) => (
            <InsightCard key={idx} insight={i} />
          ))}
        </div>
      </section>

      {/* Color palettes */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          🎨 컬러 팔레트 분석
        </h2>
        <Card className="p-5 gap-4">
          <p className="text-xs text-muted-foreground">
            각 경쟁사 광고 이미지에서 가장 자주 등장하는 dominant color top 6.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {colorPalettes.map(({ competitor: c, colors }) => (
              <div key={c.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-3 rounded-full"
                    style={{ backgroundColor: c.logoColor }}
                  />
                  <span className="text-sm font-semibold">{c.name}</span>
                  <Badge variant="outline" className="text-[10px] ml-auto">
                    {colors.length} 색상
                  </Badge>
                </div>
                <ColorSwatchRow colors={colors} size={36} />
                <ColorPaletteBar colors={colors} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Visual + Aspect + Density grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 gap-3 lg:col-span-2">
          <div>
            <div className="text-sm font-semibold">시각 요소 분포</div>
            <div className="text-[11px] text-muted-foreground">
              인물 · Before-After · 제품샷 · 라이프스타일 · 인포그래픽 (4사 비교)
            </div>
          </div>
          <StackedBar
            data={visualData}
            xKey="name"
            series={visualSeries}
            height={300}
          />
        </Card>

        <Card className="p-5 gap-3">
          <div>
            <div className="text-sm font-semibold">광고 형식·비율</div>
            <div className="text-[11px] text-muted-foreground">
              1:1 / 9:16 / 16:9 / 4:5
            </div>
          </div>
          <Donut data={aspectData} height={260} />
        </Card>
      </section>

      {/* Text density + WordCloud */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5 gap-3">
          <div>
            <div className="text-sm font-semibold">이미지 텍스트 비중</div>
            <div className="text-[11px] text-muted-foreground">
              이미지 안 텍스트가 얼마나 빽빽한가 (Heavy → Minimal)
            </div>
          </div>
          <StackedBar
            data={densityData}
            xKey="name"
            series={densitySeries}
            height={260}
          />
        </Card>

        <Card className="p-5 gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">자주 등장하는 단어</div>
              <div className="text-[11px] text-muted-foreground">
                광고 카피·이미지 텍스트에서 추출
              </div>
            </div>
          </div>
          <Tabs
            value={wcCompetitor}
            onValueChange={(v) => setWcCompetitor(v as CompetitorId | "all")}
          >
            <TabsList>
              {competitors.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="text-xs">
                  {c.name}
                </TabsTrigger>
              ))}
              <TabsTrigger value="all" className="text-xs">전체</TabsTrigger>
            </TabsList>
            <TabsContent value={wcCompetitor} className="mt-2">
              <WordCloudChart
                data={wordcloudData}
                competitor={wcCompetitor}
                height={300}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* CTA + Theme treemap */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5 gap-3">
          <div>
            <div className="text-sm font-semibold">CTA 분포</div>
            <div className="text-[11px] text-muted-foreground">
              가장 많이 쓰이는 행동 유도 문구
            </div>
          </div>
          <HorizontalBar data={ctaData} height={300} color="#0ea5e9" />
        </Card>

        <Card className="p-5 gap-3">
          <div>
            <div className="text-sm font-semibold">비주얼 테마 분포</div>
            <div className="text-[11px] text-muted-foreground">
              경쟁사 × 테마 트리맵 — 어떤 메시지를 누가 가장 많이 쓰나
            </div>
          </div>
          <TreemapChart data={themeData} height={300} />
        </Card>
      </section>

      {/* Long running */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <TrendingUp className="size-4" />
          롱런 광고 Top 5
        </h2>
        <Card className="divide-y">
          {longRunning.map((ad, i) => {
            const c = competitors.find((cc) => cc.id === ad.competitor)!;
            return (
              <div key={ad.id} className="flex items-center gap-4 p-4 first:pt-5 last:pb-5">
                <div className="text-xl font-bold text-muted-foreground w-6">
                  {i + 1}
                </div>
                <div
                  className="size-10 rounded grid place-items-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: c.logoColor }}
                >
                  {c.name.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{ad.copy}</div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                    <span>{c.name}</span>
                    <span>·</span>
                    <span>{ad.platform}</span>
                    <span>·</span>
                    <Calendar className="size-3" />
                    <span>{ad.firstSeen} → {ad.lastSeen}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {ad.lifespanDays}일
                </Badge>
              </div>
            );
          })}
        </Card>
      </section>
    </div>
  );
}

// Lighten/darken hex color
function shadeColor(color: string, percent: number): string {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const adj = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c + (percent < 0 ? c * percent : (255 - c) * percent))));
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`;
}
