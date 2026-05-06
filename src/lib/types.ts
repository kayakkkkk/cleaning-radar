export type CompetitorId = "miso" | "soomgo" | "laundrygo" | "yeolda";

export type Platform = "Meta" | "Google" | "TikTok" | "기타";

export type AspectRatio = "1:1" | "9:16" | "16:9" | "4:5";

export type Format = "이미지" | "동영상" | "캐러셀";

export type TextDensity = "Heavy" | "Medium" | "Minimal";

export type VisualType =
  | "인물"
  | "Before-After"
  | "제품샷"
  | "라이프스타일"
  | "인포그래픽";

export type Theme =
  | "청결"
  | "가족"
  | "전문가"
  | "후기"
  | "할인"
  | "변화"
  | "신뢰";

export interface Competitor {
  id: CompetitorId;
  name: string;
  logoColor: string;
  description: string;
  primaryColor: string;
}

export interface Ad {
  id: string;
  competitor: CompetitorId;
  platform: Platform;
  imageUrl: string;
  aspectRatio: AspectRatio;
  copy: string;
  imageText: string;
  cta: string;
  firstSeen: string;
  lastSeen: string;
  isActive: boolean;
  lifespanDays: number;
  format: Format;
  dominantColors: string[];
  textDensity: TextDensity;
  visualType: VisualType;
  themes: Theme[];
  landingUrl: string;
  tags: string[];
  notes?: string;
}

export interface CalendarPoint {
  competitor: CompetitorId;
  date: string;
  count: number;
}

export interface InsightCardData {
  competitor: CompetitorId;
  title: string;
  body: string;
  highlight: string;
}

export interface WordFreq {
  competitor: CompetitorId | "all";
  word: string;
  count: number;
}

export interface AlertItem {
  id: string;
  date: string;
  competitor: CompetitorId;
  message: string;
  type: "new_ad" | "renewed" | "stopped" | "milestone";
}
