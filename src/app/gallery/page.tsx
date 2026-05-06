"use client";

import { useMemo, useState } from "react";
import { ads } from "@/lib/mock-data";
import { AdGrid } from "@/components/ads/ad-grid";
import { AdFilter, defaultFilter, type FilterState } from "@/components/ads/ad-filter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  const filtered = useMemo(() => {
    let list = [...ads];
    if (filter.competitor !== "all") list = list.filter((a) => a.competitor === filter.competitor);
    if (filter.platform !== "all") list = list.filter((a) => a.platform === filter.platform);
    if (filter.format !== "all") list = list.filter((a) => a.format === filter.format);
    if (filter.status === "active") list = list.filter((a) => a.isActive);
    if (filter.status === "inactive") list = list.filter((a) => !a.isActive);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (a) =>
          a.copy.toLowerCase().includes(q) ||
          a.imageText.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filter.sort === "latest") {
      list.sort((a, b) => new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime());
    } else if (filter.sort === "lifespan") {
      list.sort((a, b) => b.lifespanDays - a.lifespanDays);
    } else if (filter.sort === "newest") {
      list.sort((a, b) => new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime());
    }
    return list;
  }, [filter]);

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">광고 갤러리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            경쟁사 광고를 한눈에 — 필터·정렬해서 찾고, 카드를 클릭하면 상세 보기
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {filtered.length} / {ads.length} 광고 표시
        </Badge>
      </header>

      <Card className="p-3">
        <AdFilter value={filter} onChange={setFilter} />
      </Card>

      <AdGrid ads={filtered} />
    </div>
  );
}
