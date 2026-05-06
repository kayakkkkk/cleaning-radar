import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  delta?: number;
  spark?: number[];
  sparkColor?: string;
  hint?: string;
}

export function KpiCard({ label, value, delta, spark, sparkColor, hint }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="p-4 gap-2">
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
        {label}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {typeof delta === "number" && (
          <div
            className={cn(
              "flex items-center text-xs font-medium",
              positive ? "text-emerald-600" : "text-red-500"
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      {spark && spark.length > 0 && (
        <div className="mt-1">
          <Sparkline data={spark} color={sparkColor} />
        </div>
      )}
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </Card>
  );
}
