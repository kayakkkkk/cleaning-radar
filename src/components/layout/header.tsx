"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 border-b px-6 flex items-center gap-4 bg-background/80 backdrop-blur sticky top-0 z-20">
      <div className="relative flex-1 max-w-md">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="광고·키워드 검색..."
          className="pl-9 h-9 bg-muted/40"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="알림">
          <Bell className="size-4" />
        </Button>
        <div className="size-8 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 grid place-items-center text-white text-xs font-semibold">
          PM
        </div>
      </div>
    </header>
  );
}
