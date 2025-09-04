"use client";

import { useState } from "react";

export default function UploadImage({ name }: { name: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // local preview
    setPreview(URL.createObjectURL(file));

    // upload to /api/upload
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    setUrl(data.url);
  }

  return (
    <div className="vstack gap-2">
      <input type="file" accept="image/*" onChange={onChange} />
      {preview && <img src={preview} alt="preview" style={{ maxWidth: 200 }} />}
      {/* hidden input so server action can read it */}
      {url && <input type="hidden" name={name} value={url} />}
    </div>
  );
}
