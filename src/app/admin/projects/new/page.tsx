// app/admin/projects/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUpload from "@/app/components/cloudinayUpload";
import type { NewProjectInput } from "@/lib/validation";

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState<NewProjectInput>({
    title: "",
    subtitle: "",
    summary: "",
    githubUrl: "",
    websiteUrl: "",
    coverUrl: "",
    techStack: { frontend: [], backend: [], databases: [], tools: [] },
    images: [],
  });

  const set = <K extends keyof NewProjectInput>(k: K, v: NewProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addImage = (url: string) =>
    setForm((f) => ({
      ...f,
      images: [...f.images, { url, alt: "", position: f.images.length }],
    }));

  const moveImage = (i: number, dir: -1 | 1) =>
    setForm((f) => {
      const arr = [...f.images];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return f;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return {
        ...f,
        images: arr.map((img, idx) => ({ ...img, position: idx })),
      };
    });

  const removeImage = (i: number) =>
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, idx) => idx !== i).map((img, idx) => ({ ...img, position: idx })),
    }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { project } = await res.json();
      router.push(`/projects/${project.slug}`);
    } else {
      const { error } = await res.json();
      alert(error || "Failed to create project");
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">New Project</h1>

      <form onSubmit={submit} className="space-y-6">
        {/* Title / Subtitle */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="block text-sm">Title</span>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </label>
          <label className="space-y-1">
            <span className="block text-sm">Subtitle</span>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={form.subtitle || ""}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </label>
        </div>

        {/* Summary */}
        <label className="space-y-1 block">
          <span className="block text-sm">Summary</span>
          <textarea
            className="w-full rounded-xl border px-3 py-2"
            rows={4}
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            required
          />
        </label>

        {/* Links */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="block text-sm">GitHub URL</span>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={form.githubUrl || ""}
              onChange={(e) => set("githubUrl", e.target.value)}
              placeholder="https://github.com/…"
            />
          </label>
          <label className="space-y-1">
            <span className="block text-sm">Website URL</span>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={form.websiteUrl || ""}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="https://…"
            />
          </label>
        </div>

        {/* Tech stack */}
        <fieldset className="space-y-3">
          <legend className="text-sm">Tech stack</legend>
          {(["frontend", "backend", "databases", "tools"] as const).map((k) => (
            <div key={k}>
              <label className="block text-xs uppercase">{k}</label>
              <TagInput
                values={form.techStack[k]}
                onChange={(vals) =>
                  set("techStack", { ...form.techStack, [k]: vals } as unknown)
                }
              />
            </div>
          ))}
        </fieldset>

        {/* Cover image */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Cover image</span>
            <CloudinaryUpload
              onUpload={(files) => {
                const [{ url }] = files;
                set("coverUrl", url);
              }}
            />
          </div>
          {form.coverUrl && (
            <img src={form.coverUrl} alt="Cover" className="h-40 w-full rounded-xl object-cover" />
          )}
        </div>

        {/* Gallery images */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Gallery images</span>
            <CloudinaryUpload multiple onUpload={(files) => files.forEach((f) => addImage(f.url))} />
          </div>

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {form.images.map((img, i) => (
              <li key={i} className="space-y-2">
                <img src={img.url} className="h-32 w-full rounded-xl object-cover" />
                <input
                  className="w-full rounded-xl border px-2 py-1 text-sm"
                  placeholder="Alt text"
                  value={img.alt}
                  onChange={(e) =>
                    setForm((f) => {
                      const arr = [...f.images];
                      arr[i] = { ...arr[i], alt: e.target.value };
                      return { ...f, images: arr };
                    })
                  }
                />
                <div className="flex gap-2">
                  <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => moveImage(i, -1)}>
                    ↑
                  </button>
                  <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => moveImage(i, 1)}>
                    ↓
                  </button>
                  <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => removeImage(i)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="rounded-xl bg-black px-4 py-2 text-white">
          Create project
        </button>
      </form>
    </div>
  );
}

/** simple comma-separated "chips" input */
function TagInput({
  values,
  onChange,
}: {
  values: string[];
  onChange: (vals: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...values, v]);
    setInput("");
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div className="rounded-xl border p-2">
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => (
          <span key={i} className="rounded-lg border px-2 py-1 text-xs">
            {v}{" "}
            <button type="button" onClick={() => remove(i)} aria-label="remove">
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-2 py-1 text-sm"
          placeholder="Type and press Add"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="rounded-lg border px-3 py-1 text-sm" onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
}
