"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  Cog,
  Car,
  Disc,
  CarFront,
  Zap,
  Wrench,
  Settings2,
  X,
} from "lucide-react";
import { sections } from "@/data/sections";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Info,
  Engine: Cog, // placeholder, use Cog for engine
  Cog,
  Car,
  Disc,
  CarFront,
  Zap,
  Wrench,
};

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800 lg:hidden">
          <span className="text-sm font-semibold">Навигация</span>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Разделы
          </div>
          <ul className="space-y-0.5">
            {sections.map((section) => {
              const Icon = iconMap[section.icon] || Settings2;
              const href = `/sections/${section.slug}`;
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={section.id}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#c3002f]/10 text-[#c3002f] dark:bg-[#c3002f]/15"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive
                          ? "text-[#c3002f]"
                          : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                      )}
                    />
                    <span className="truncate">{section.titleRu}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
          >
            <Settings2 className="h-3.5 w-3.5" />
            Админ-панель
          </Link>
        </div>
      </aside>
    </>
  );
}
