"use client";

import Link from "next/link";
import { Search, Menu, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80",
        className
      )}
    >
      <button
        onClick={onMenuClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c3002f]">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        <div className="hidden flex-col leading-none sm:flex">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Nissan Note
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Service Manual · 2011 · CR14DE
          </span>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Поиск по мануалу..."
            className="h-9 w-64 rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c3002f]/30 focus:outline-none focus:ring-2 focus:ring-[#c3002f]/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
