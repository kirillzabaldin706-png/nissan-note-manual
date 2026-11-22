"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { sections, sampleProcedure } from "@/data/sections";

export function SectionClient({ slug }: { slug: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const section = sections.find((s) => s.slug === slug);
  if (!section) {
    notFound();
  }

  const procedures =
    section.slug === "engine"
      ? [sampleProcedure]
      : [
          {
            id: "placeholder",
            slug: "coming-soon",
            titleRu: "Процедуры скоро появятся",
            difficulty: "medium" as const,
            estimatedTime: "—",
            description:
              "Этот раздел находится в разработке. Контент будет добавлен через админ-панель.",
          },
        ];

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1">
          <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                На главную
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {section.titleRu}
              </h1>
              <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
                {section.description}
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
            <h2 className="mb-6 text-lg font-semibold">Процедуры ремонта</h2>
            <div className="space-y-4">
              {procedures.map((proc) => (
                <Link
                  key={proc.id}
                  href={
                    proc.slug === "coming-soon"
                      ? "#"
                      : `/sections/${section.slug}/${proc.slug}`
                  }
                  className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-[#c3002f]/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded bg-[#c3002f]/10 px-2 py-0.5 font-medium text-[#c3002f]">
                        {proc.difficulty === "easy"
                          ? "Лёгкая"
                          : proc.difficulty === "medium"
                            ? "Средняя"
                            : "Сложная"}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {proc.estimatedTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 group-hover:text-[#c3002f] dark:text-zinc-50">
                      {proc.titleRu}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {proc.description}
                    </p>
                  </div>
                  {proc.slug !== "coming-soon" && (
                    <ArrowRight className="h-5 w-5 shrink-0 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-[#c3002f]" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
