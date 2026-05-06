"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Image as ImageIcon, Video, Layers } from "lucide-react";
import Image from "next/image";
import type { Ad } from "@/lib/types";
import { competitors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Props {
  ad: Ad;
  onClick?: () => void;
}

const platformColor: Record<string, string> = {
  Meta: "bg-[#1877F2] text-white",
  Google: "bg-[#EA4335] text-white",
  TikTok: "bg-black text-white",
  기타: "bg-slate-500 text-white",
};

const formatIcon = {
  이미지: ImageIcon,
  동영상: Video,
  캐러셀: Layers,
};

export function AdCard({ ad, onClick }: Props) {
  const competitor = competitors.find((c) => c.id === ad.competitor)!;
  const FormatIcon = formatIcon[ad.format];
  const ratioClass = {
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
    "16:9": "aspect-video",
    "4:5": "aspect-[4/5]",
  }[ad.aspectRatio];

  return (
    <Card
      className="overflow-hidden p-0 cursor-pointer hover:ring-2 hover:ring-sky-300 transition-all gap-0"
      onClick={onClick}
    >
      <div className={cn("relative bg-muted", ratioClass)}>
        <Image
          src={ad.imageUrl}
          alt={ad.copy}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge
            variant="secondary"
            className="text-[10px] backdrop-blur bg-white/90"
            style={{ color: competitor.logoColor }}
          >
            <span
              className="inline-block size-1.5 rounded-full mr-1"
              style={{ backgroundColor: competitor.logoColor }}
            />
            {competitor.name}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className={cn("text-[10px] py-0.5", platformColor[ad.platform])}>
            {ad.platform}
          </Badge>
          {ad.isActive && (
            <Badge className="text-[10px] py-0.5 bg-emerald-500 text-white">
              ACTIVE
            </Badge>
          )}
        </div>
        {ad.imageText && (
          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-[11px] backdrop-blur-sm font-medium line-clamp-1">
            {ad.imageText}
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="text-[12px] line-clamp-2 leading-snug">{ad.copy}</div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FormatIcon className="size-3" />
            <span>{ad.format}</span>
            <span>·</span>
            <span>{ad.lifespanDays}일</span>
          </div>
          <button
            className="hover:text-rose-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="즐겨찾기"
          >
            <Heart className="size-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
