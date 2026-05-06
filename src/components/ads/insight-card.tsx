import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InsightCardData } from "@/lib/types";
import { competitors } from "@/lib/mock-data";

interface Props {
  insight: InsightCardData;
}

export function InsightCard({ insight }: Props) {
  const competitor = competitors.find((c) => c.id === insight.competitor)!;
  return (
    <Card className="p-4 gap-2 relative overflow-hidden">
      <div
        className="absolute right-0 top-0 size-24 rounded-full opacity-15 -mr-8 -mt-8"
        style={{ backgroundColor: competitor.logoColor }}
      />
      <div className="relative space-y-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: competitor.logoColor }}
          />
          <Badge variant="outline" className="text-[10px]">
            {competitor.name}
          </Badge>
        </div>
        <div className="flex items-baseline gap-2">
          <div
            className="text-2xl font-bold tracking-tight"
            style={{ color: competitor.logoColor }}
          >
            {insight.highlight}
          </div>
          <div className="font-semibold text-sm">{insight.title}</div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {insight.body}
        </p>
      </div>
    </Card>
  );
}
