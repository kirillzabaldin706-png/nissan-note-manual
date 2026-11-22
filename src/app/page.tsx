"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Clock,
  Wrench,
  BookOpen,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { sections, sampleProcedure } from "@/data/sections";
import { cn } from "@/lib/utils";

// 3D must be loaded only on the client (Three.js does not work on server)
const CarViewer = dynamic(
  () => import("@/components/3d/car-viewer").then((m) => m.CarViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-[#c3002f]" />
      </div>
    ),
  }
);

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleHotspot = (slug: string) => {
    router.push(`/sections/${slug}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1">
          {/* Hero with 3D */}
          <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-100/50 to-transparent dark:from-zinc-900/40" />
            <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c3002f]" />
                  Nissan Note E11 · 2011 · 1.4 CR14DE
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
                  Цифровой сервисный
                  <br />
                  <span className="text-[#c3002f]">мануал 2026</span>
                </h1>

                <p className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Интерактивные 3D-модели, пошаговые инструкции, моменты
                  затяжки и фотографии — всё в одном современном портале.
                  Официальный технический язык Nissan в удобной цифровой форме.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sections/engine"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#c3002f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#c3002f]/25 transition hover:bg-[#a80028]"
                  >
                    Перейти к двигателю
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/sections/engine/${sampleProcedure.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    Пример: замена ГРМ
                  </Link>
                </div>

                <div className="flex items-center gap-6 pt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    <span>8 разделов</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wrench className="h-4 w-4" />
                    <span>3D-модели</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Актуальные данные</span>
                  </div>
                </div>
              </div>

              {/* 3D Viewer */}
              <div className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-2xl dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:aspect-[16/10]">
                  <CarViewer
                    className="absolute inset-0 h-full w-full"
                    onHotspotClick={handleHotspot}
                  />
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/50 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur">
                    Вращайте · Приближайте · Кликайте по точкам
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sections grid */}
          <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Разделы мануала
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Выберите интересующий узел автомобиля
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`/sections/${section.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-[#c3002f]/40 hover:shadow-lg hover:shadow-[#c3002f]/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#c3002f]/40"
                  )}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-[#c3002f]/10 group-hover:text-[#c3002f] dark:bg-zinc-800 dark:text-zinc-400">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {section.titleRu}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {section.description}
                  </p>
                  <ArrowRight className="absolute right-4 top-5 h-4 w-4 text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-zinc-600" />
                </Link>
              ))}
            </div>
          </section>

          {/* Featured procedure */}
          <section className="border-t border-zinc-200 bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-900/30">
            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">
                  Популярная процедура
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Замена ремня ГРМ и водяного насоса — одна из самых востребованных работ
                </p>
              </div>

              <Link
                href={`/sections/engine/${sampleProcedure.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row"
              >
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#c3002f]">
                    <span className="rounded bg-[#c3002f]/10 px-2 py-0.5">
                      Средняя сложность
                    </span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-500">{sampleProcedure.estimatedTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#c3002f] dark:text-zinc-50">
                    {sampleProcedure.titleRu}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {sampleProcedure.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#c3002f]">
                    Открыть процедуру
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="flex items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950/50 sm:w-64">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-[#c3002f]/10">
                      <Wrench className="h-7 w-7 text-[#c3002f]" />
                    </div>
                    <p className="text-xs text-zinc-500">3D-модель двигателя</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-600">
          Nissan Note 2011 Service Manual · Неофициальный цифровой портал · 2026
        </footer>
      </div>
    </div>
  );
}
