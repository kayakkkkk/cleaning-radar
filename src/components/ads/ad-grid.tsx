"use client";

import { useState } from "react";
import { AdCard } from "./ad-card";
import { AdDetail } from "./ad-detail";
import type { Ad } from "@/lib/types";

interface Props {
  ads: Ad[];
  columns?: number;
}

export function AdGrid({ ads, columns = 4 }: Props) {
  const [selected, setSelected] = useState<Ad | null>(null);

  if (ads.length === 0) {
    return (
      <div className="text-center py-20 text-sm text-muted-foreground">
        조건에 맞는 광고가 없습니다.
      </div>
    );
  }

  const colClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : columns === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2";

  return (
    <>
      <div className={`grid ${colClass} gap-4`}>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onClick={() => setSelected(ad)} />
        ))}
      </div>
      <AdDetail ad={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
