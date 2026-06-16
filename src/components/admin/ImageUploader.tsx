"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ImageUploader({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const t = useTranslations("admin.form");
  const [url, setUrl] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError(null);
    setLoading(true);
    const fd = new FormData();
    fd.append("file", f);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) setError(data.message ?? "Upload failed");
      else setUrl(data.url);
    } catch {
      setError("Network error");
    }
    setLoading(false);
    e.target.value = "";
  }

  function remove() {
    if (url) fetch(`/api/admin/upload?url=${encodeURIComponent(url)}`, { method: "DELETE" }).catch(() => {});
    setUrl("");
  }

  const fileInput = (
    <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={onFile} disabled={loading} />
  );

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="thumbnail" className="h-32 w-full max-w-xs rounded-lg border border-hairline object-cover" />
          <div className="mt-2 flex gap-2">
            <label className="cursor-pointer rounded-md border border-hairline px-3 py-1.5 text-xs font-medium hover:border-terracotta hover:text-terracotta">
              {loading ? t("uploadLoading") : t("uploadChange")}
              {fileInput}
            </label>
            <button type="button" onClick={remove} className="rounded-md border border-hairline px-3 py-1.5 text-xs font-medium text-muted hover:border-red-400 hover:text-red-500">
              {t("uploadRemove")}
            </button>
          </div>
        </div>
      ) : (
        <label className="flex h-28 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-hairline text-xs text-muted hover:border-terracotta hover:text-terracotta">
          {loading ? t("uploadLoading") : `＋ ${t("uploadSelect")}`}
          {fileInput}
        </label>
      )}
      {error && <p className="mt-1 text-xs text-terracotta">{error}</p>}
      <p className="mt-1 text-[11px] text-muted">{t("uploadHint")}</p>
    </div>
  );
}
