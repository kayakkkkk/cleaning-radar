import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Donut } from "@/components/charts/donut";
import type { Ad, Competitor } from "@/lib/types";

interface Props {
  competitor: Competitor;
  ads: Ad[];
}

export function CompetitorCard({ competitor, ads }: Props) {
  const recent = ads.filter(
    (a) => Date.now() - new Date(a.firstSeen).getTime() <= 7 * 24 * 60 * 60 * 1000
  );
  const active = ads.filter((a) => a.isActive);
  const platforms = ["Meta", "Google", "TikTok"] as const;
  const platformCounts = platforms.map((p) => ({
    name: p,
    value: ads.filter((a) => a.platform === p).length,
    color:
      p === "Meta" ? "#1877F2" : p === "Google" ? "#EA4335" : "#000000",
  }));

  return (
    <Card className="p-4 gap-3">
      <div className="flex items-center gap-3">
        <div
          className="size-10 rounded-lg grid place-items-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: competitor.logoColor }}
        >
          {competitor.name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold leading-tight">{competitor.name}</div>
          <div className="text-[11px] text-muted-foreground truncate">
            {competitor.description}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        <Stat label="총 광고" value={ads.length} />
        <Stat label="신규(7일)" value={recent.length} />
        <Stat label="활성" value={active.length} />
      </div>
      <div className="-mb-2">
        <Donut
          data={platformCounts.filter((p) => p.value > 0)}
          height={120}
          innerRadius={28}
          outerRadius={48}
          showLegend
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {recent.length > 0 && (
          <Badge variant="secondary" className="text-[10px]">
            🆕 신규 {recent.length}건
          </Badge>
        )}
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-base font-semibold">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
