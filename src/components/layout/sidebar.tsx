"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Images, Sparkles, Plus, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/gallery", label: "광고 갤러리", icon: Images },
  { href: "/insights", label: "이미지 인사이트", icon: Sparkles },
  { href: "/manual", label: "수동 입력", icon: Plus },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="px-5 py-5 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 grid place-items-center text-white">
            <Sparkle className="size-5" />
          </div>
          <div>
            <div className="font-semibold text-sm leading-none">Cleaning Radar</div>
            <div className="text-[11px] text-muted-foreground mt-1">광고 크리에이티브 모니터</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-[11px] text-muted-foreground border-t">
        <div className="font-medium text-foreground mb-1">청소 O2O 시장</div>
        <div>미소 · 숨고 · 런드리고 · 열다</div>
      </div>
    </aside>
  );
}
