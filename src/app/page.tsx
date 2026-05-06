import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { KpiCard } from "@/components/ads/kpi-card";
import { CompetitorCard } from "@/components/ads/competitor-card";
import { CalendarHeatmap } from "@/components/charts/calendar-heatmap";
import { ads, alerts, calendarData, competitors, getCompetitor } from "@/lib/mock-data";
import { AdCard } from "@/components/ads/ad-card";
import Link from "next/link";
import { ArrowRight, BellRing, ChevronRight } from "lucide-react";

export default function Page() {
  const totalAds = ads.length;
  const recentAds = ads.filter((a) => {
    const days = (Date.now() - new Date(a.firstSeen).getTime()) / 86400000;
    return days <= 7;
  });
  const activeAds = ads.filter((a) => a.isActive);
  const avgLifespan = Math.round(
    ads.reduce((s, a) => s + a.lifespanDays, 0) / ads.length
  );
  const recent8 = [...ads]
    .sort((a, b) => new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            한국 O2O 청소 서비스 — 미소·숨고·런드리고·열다 광고 활동 종합
          </p>
        </div>
        <div className="text-xs text-muted-foreground">최근 갱신: 2026-05-06 09:00</div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="총 광고"
          value={totalAds}
          delta={12}
          spark={[18, 19, 22, 25, 26, 28, totalAds]}
          sparkColor="#0ea5e9"
        />
        <KpiCard
          label="신규 (7일)"
          value={recentAds.length}
          delta={33}
          spark={[3, 5, 4, 6, 7, 9, recentAds.length]}
          sparkColor="#10b981"
        />
        <KpiCard
          label="활성 광고"
          value={activeAds.length}
          delta={-3}
          spark={[20, 22, 24, 25, 26, 27, activeAds.length]}
          sparkColor="#f59e0b"
        />
        <KpiCard
          label="평균 라이프스팬"
          value={`${avgLifespan}일`}
          delta={8}
          spark={[12, 13, 14, 15, 16, 17, avgLifespan]}
          sparkColor="#8b5cf6"
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          경쟁사 활동
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {competitors.map((c) => (
            <CompetitorCard
              key={c.id}
              competitor={c}
              ads={ads.filter((a) => a.competitor === c.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              발행 빈도 (8주)
            </h2>
            <span className="text-[11px] text-muted-foreground">
              요일·날짜별 광고 발행 패턴
            </span>
          </div>
          <CalendarHeatmap data={calendarData} competitor="all" height={200} />
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              최근 신규 광고
            </h2>
            <Link href="/gallery" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              전체 보기 <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recent8.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        <Card className="p-5 gap-4 h-fit">
          <div className="flex items-center gap-2">
            <BellRing className="size-4 text-sky-600" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              알림 피드
            </h2>
          </div>
          <ul className="space-y-3">
            {alerts.map((a) => {
              const c = getCompetitor(a.competitor);
              return (
                <li key={a.id} className="flex gap-3 text-sm">
                  <div
                    className="size-7 rounded-full grid place-items-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: c.logoColor }}
                  >
                    {c.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-muted-foreground"> · {a.date}</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug">
                      {a.message}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/gallery" className={buttonVariants({ variant: "outline", size: "sm" })}>
            모든 활동 보기 <ChevronRight className="size-3.5" />
          </Link>
        </Card>
      </section>
    </div>
  );
}
