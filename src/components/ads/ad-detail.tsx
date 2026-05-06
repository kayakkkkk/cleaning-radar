"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColorSwatchRow } from "@/components/charts/color-swatch";
import Image from "next/image";
import { ExternalLink, Heart, Tag, MessageSquare } from "lucide-react";
import type { Ad } from "@/lib/types";
import { competitors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Props {
  ad: Ad | null;
  onOpenChange: (open: boolean) => void;
}

export function AdDetail({ ad, onOpenChange }: Props) {
  if (!ad) return null;
  const competitor = competitors.find((c) => c.id === ad.competitor)!;

  return (
    <Dialog open={!!ad} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: competitor.logoColor }}
            />
            {competitor.name} · {ad.platform} · {ad.format}
          </DialogTitle>
          <DialogDescription>
            {ad.firstSeen} → {ad.lastSeen} (활성 {ad.lifespanDays}일)
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-5 mt-2">
          <div
            className={cn(
              "relative bg-muted rounded-lg overflow-hidden",
              ad.aspectRatio === "9:16"
                ? "aspect-[9/16]"
                : ad.aspectRatio === "1:1"
                ? "aspect-square"
                : ad.aspectRatio === "4:5"
                ? "aspect-[4/5]"
                : "aspect-video"
            )}
          >
            <Image src={ad.imageUrl} alt={ad.copy} fill className="object-cover" sizes="50vw" />
          </div>

          <div className="space-y-4 text-sm">
            <Section label="광고 카피">
              <p className="leading-relaxed">{ad.copy}</p>
            </Section>

            <Section label="이미지 안 텍스트">
              <p className="font-medium">{ad.imageText || "—"}</p>
            </Section>

            <Section label="CTA">
              <Badge>{ad.cta}</Badge>
            </Section>

            <Section label="컬러 팔레트">
              <ColorSwatchRow colors={ad.dominantColors} size={28} />
            </Section>

            <Section label="시각 분류">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{ad.visualType}</Badge>
                <Badge variant="outline">텍스트 {ad.textDensity}</Badge>
                <Badge variant="outline">{ad.aspectRatio}</Badge>
              </div>
            </Section>

            <Section label="비주얼 테마">
              <div className="flex flex-wrap gap-1.5">
                {ad.themes.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[11px]">
                    <Tag className="size-3 mr-1" />
                    {t}
                  </Badge>
                ))}
              </div>
            </Section>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={ad.landingUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <ExternalLink className="size-3.5" /> 랜딩 페이지
              </a>
              <Button variant="outline" size="sm">
                <Heart className="size-3.5" /> 즐겨찾기
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="size-3.5" /> 코멘트
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}
