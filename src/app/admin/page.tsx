"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon, Save } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { uploadToImgbb } from "@/lib/imgbb";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    const result = await uploadToImgbb(file, file.name);
    setUploading(false);

    if (result) {
      setUploadedUrl(result.displayUrl);
    } else {
      setError(
        "Ошибка загрузки. Проверьте NEXT_PUBLIC_IMGBB_API_KEY в .env.local"
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1">
          <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                На главную
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Админ-панель</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Управление контентом · Загрузка фото через imgbb · Firebase
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 lg:px-8">
            {/* Upload demo */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 flex items-center gap-2 font-semibold">
                <ImageIcon className="h-5 w-5 text-[#c3002f]" />
                Загрузка изображения (imgbb)
              </h2>
              <p className="mb-4 text-sm text-zinc-500">
                Файл будет загружен на imgbb, после чего ссылка сохранится в
                Firestore (в полной версии).
              </p>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 transition hover:border-[#c3002f]/50 hover:bg-[#c3002f]/5 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-[#c3002f]/40">
                <Upload className="mb-2 h-8 w-8 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {uploading ? "Загрузка..." : "Выберите файл или перетащите"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>

              {error && (
                <p className="mt-3 text-sm text-red-500">{error}</p>
              )}
              {uploadedUrl && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Успешно загружено!
                  </p>
                  <img
                    src={uploadedUrl}
                    alt="Uploaded"
                    className="max-h-48 rounded-lg border border-zinc-200 dark:border-zinc-800"
                  />
                  <p className="break-all text-xs text-zinc-500">{uploadedUrl}</p>
                </div>
              )}
            </section>

            {/* Placeholder for procedures editor */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-2 font-semibold">Редактор процедур</h2>
              <p className="mb-4 text-sm text-zinc-500">
                Здесь будет форма создания/редактирования процедур с сохранением
                в Firestore. Пока используется локальный sample data.
              </p>
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 dark:bg-zinc-800"
              >
                <Save className="h-4 w-4" />
                Сохранить (скоро)
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
