"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { competitors } from "@/lib/mock-data";

export interface FilterState {
  competitor: string;
  platform: string;
  format: string;
  status: string;
  sort: string;
  search: string;
}

export const defaultFilter: FilterState = {
  competitor: "all",
  platform: "all",
  format: "all",
  status: "all",
  sort: "latest",
  search: "",
};

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
}

const competitorLabels: Record<string, string> = {
  all: "모든 경쟁사",
  ...Object.fromEntries(competitors.map((c) => [c.id, c.name])),
};
const platformLabels: Record<string, string> = {
  all: "모든 플랫폼",
  Meta: "Meta",
  Google: "Google",
  TikTok: "TikTok",
  기타: "기타",
};
const formatLabels: Record<string, string> = {
  all: "모든 형식",
  이미지: "이미지",
  동영상: "동영상",
  캐러셀: "캐러셀",
};
const statusLabels: Record<string, string> = {
  all: "전체 상태",
  active: "활성",
  inactive: "종료",
};
const sortLabels: Record<string, string> = {
  latest: "최신순",
  lifespan: "라이프스팬",
  newest: "신규 발견순",
};

export function AdFilter({ value, onChange }: Props) {
  const set = (k: keyof FilterState, v: string) => onChange({ ...value, [k]: v });
  const isFiltered =
    value.competitor !== "all" ||
    value.platform !== "all" ||
    value.format !== "all" ||
    value.status !== "all" ||
    value.search !== "";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value.search}
          onChange={(e) => set("search", e.target.value)}
          placeholder="광고 카피·이미지 텍스트 검색..."
          className="pl-9 h-9"
        />
      </div>

      <Select value={value.competitor} onValueChange={(v) => set("competitor", v ?? "all")}>
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue>{(v: string) => competitorLabels[v] ?? "모든 경쟁사"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 경쟁사</SelectItem>
          {competitors.map((c) => (
            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.platform} onValueChange={(v) => set("platform", v ?? "all")}>
        <SelectTrigger className="h-9 w-[120px]">
          <SelectValue>{(v: string) => platformLabels[v] ?? "모든 플랫폼"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 플랫폼</SelectItem>
          <SelectItem value="Meta">Meta</SelectItem>
          <SelectItem value="Google">Google</SelectItem>
          <SelectItem value="TikTok">TikTok</SelectItem>
          <SelectItem value="기타">기타</SelectItem>
        </SelectContent>
      </Select>

      <Select value={value.format} onValueChange={(v) => set("format", v ?? "all")}>
        <SelectTrigger className="h-9 w-[120px]">
          <SelectValue>{(v: string) => formatLabels[v] ?? "모든 형식"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 형식</SelectItem>
          <SelectItem value="이미지">이미지</SelectItem>
          <SelectItem value="동영상">동영상</SelectItem>
          <SelectItem value="캐러셀">캐러셀</SelectItem>
        </SelectContent>
      </Select>

      <Select value={value.status} onValueChange={(v) => set("status", v ?? "all")}>
        <SelectTrigger className="h-9 w-[110px]">
          <SelectValue>{(v: string) => statusLabels[v] ?? "전체 상태"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 상태</SelectItem>
          <SelectItem value="active">활성</SelectItem>
          <SelectItem value="inactive">종료</SelectItem>
        </SelectContent>
      </Select>

      <Select value={value.sort} onValueChange={(v) => set("sort", v ?? "latest")}>
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue>{(v: string) => sortLabels[v] ?? "최신순"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">최신순</SelectItem>
          <SelectItem value="lifespan">라이프스팬</SelectItem>
          <SelectItem value="newest">신규 발견순</SelectItem>
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(defaultFilter)}
          className="h-9"
        >
          <X className="size-3.5" /> 초기화
        </Button>
      )}
    </div>
  );
}
