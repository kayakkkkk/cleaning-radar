"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { competitors } from "@/lib/mock-data";
import { useState } from "react";
import { CloudUpload, FileImage } from "lucide-react";

export default function ManualPage() {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<{ ok: boolean; message: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    console.log("[mock submit]", { ...payload, file: file?.name });
    setSubmitted({
      ok: true,
      message: `등록 완료 (mock): ${payload.competitor} / ${payload.platform}`,
    });
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">수동 입력</h1>
        <p className="text-sm text-muted-foreground mt-1">
          공개 광고 라이브러리가 없는 채널(카카오·네이버·당근·메일링·옥외 등)은 팀이 직접 등록.
        </p>
      </header>

      <Card className="p-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label className="mb-2 block">광고 이미지</Label>
            <label
              htmlFor="ad-file"
              className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <CloudUpload className="size-8 text-muted-foreground" />
              <div className="text-sm font-medium">
                {file ? file.name : "클릭하거나 파일을 끌어다 놓으세요"}
              </div>
              <div className="text-xs text-muted-foreground">
                PNG, JPG, GIF — 최대 10MB
              </div>
              <input
                id="ad-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="competitor" className="mb-2 block">경쟁사</Label>
              <Select name="competitor" defaultValue="miso">
                <SelectTrigger id="competitor">
                  <SelectValue>
                    {(v: string) => competitors.find((c) => c.id === v)?.name ?? "선택"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {competitors.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="platform" className="mb-2 block">플랫폼</Label>
              <Select name="platform" defaultValue="카카오모먼트">
                <SelectTrigger id="platform">
                  <SelectValue>{(v: string) => v ?? "선택"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="카카오모먼트">카카오모먼트</SelectItem>
                  <SelectItem value="네이버 GFA">네이버 GFA</SelectItem>
                  <SelectItem value="당근">당근</SelectItem>
                  <SelectItem value="메일링">메일링</SelectItem>
                  <SelectItem value="옥외광고">옥외광고</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="copy" className="mb-2 block">광고 카피</Label>
            <Textarea id="copy" name="copy" rows={3} placeholder="예: 신규 가입 30% 할인" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageText" className="mb-2 block">이미지 안 텍스트</Label>
              <Input id="imageText" name="imageText" placeholder="예: 미소 첫 청소 30% OFF" />
            </div>
            <div>
              <Label htmlFor="seenAt" className="mb-2 block">발견 날짜</Label>
              <Input id="seenAt" name="seenAt" type="date" defaultValue="2026-05-06" />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="mb-2 block">메모 (선택)</Label>
            <Textarea id="notes" name="notes" rows={2} placeholder="레퍼런스 의도, 후크 분석 등" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit">광고 등록</Button>
            <Button type="reset" variant="outline" onClick={() => { setFile(null); setSubmitted(null); }}>
              초기화
            </Button>
            {submitted?.ok && (
              <Badge variant="secondary" className="text-xs">
                <FileImage className="size-3 mr-1" />
                {submitted.message}
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">
            ⚠️ 현재 mock 모드 — 실제 저장은 다음 단계에서 Supabase 연결 후 동작합니다.
          </p>
        </form>
      </Card>
    </div>
  );
}
