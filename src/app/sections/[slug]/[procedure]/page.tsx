"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Play,
  Download,
  Bookmark,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { sections, sampleProcedure } from "@/data/sections";
import { cn } from "@/lib/utils";

export default function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string; procedure: string }>;
}) {
  const { slug, procedure: procedureSlug } = use(params);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const section = sections.find((s) => s.slug === slug);
  if (!section) notFound();

  // Demo: only one full procedure
  const procedure =
    procedureSlug === sampleProcedure.slug ? sampleProcedure : null;
  if (!procedure) notFound();

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1">
          {/* Header */}
          <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
              <Link
                href={`/sections/${section.slug}`}
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {section.titleRu}
              </Link>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-[#c3002f]/10 px-2 py-0.5 font-medium text-[#c3002f]">
                      Средняя сложность
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {procedure.estimatedTime}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                    {procedure.titleRu}
                  </h1>
                  <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
                    {procedure.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900">
                    <Bookmark className="h-3.5 w-3.5" />
                    Закладка
                  </button>
                  <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900">
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 lg:px-8">
            {/* Tools */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Wrench className="h-5 w-5 text-[#c3002f]" />
                Необходимые инструменты
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {procedure.tools.map((tool, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c3002f]" />
                    {tool}
                  </li>
                ))}
              </ul>
            </section>

            {/* Torque specs */}
            <section>
              <h2 className="mb-4 text-lg font-semibold">Моменты затяжки</h2>
              <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Деталь
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Момент
                      </th>
                      <th className="hidden px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400 sm:table-cell">
                        Примечание
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {procedure.torqueSpecs.map((tq) => (
                      <tr key={tq.id} className="bg-white dark:bg-zinc-950">
                        <td className="px-4 py-3 font-medium">{tq.part}</td>
                        <td className="px-4 py-3 font-mono text-[#c3002f]">
                          {tq.value}
                        </td>
                        <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">
                          {tq.notes || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Steps */}
            <section>
              <h2 className="mb-6 text-lg font-semibold">Пошаговая инструкция</h2>
              <div className="space-y-6">
                {procedure.steps.map((step) => (
                  <div
                    key={step.id}
                    className="relative rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c3002f] text-xs font-bold text-white">
                        {step.order}
                      </span>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {step.content}
                    </p>
                    {step.warning && (
                      <div className="mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{step.warning}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Videos placeholder */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Play className="h-5 w-5 text-[#c3002f]" />
                Видео
              </h2>
              <div className="aspect-video overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                  YouTube embed · {procedure.videos[0]?.title || "Видео будет добавлено"}
                </div>
              </div>
            </section>

            {/* Checklist */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <CheckCircle2 className="h-5 w-5 text-[#c3002f]" />
                Чек-лист после ремонта
              </h2>
              <ul className="space-y-2">
                {procedure.checklist.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => toggleCheck(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition",
                        checked[item.id]
                          ? "border-green-500/40 bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                          checked[item.id]
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-zinc-300 dark:border-zinc-600"
                        )}
                      >
                        {checked[item.id] && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </span>
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
