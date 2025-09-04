import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadImage from "@/components/UploadImage";

export default function NewProjectPage() {
  async function create(formData: FormData) {
    "use server";
    assertAdmin();

    const title = String(formData.get("title") ?? "");
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const summary = String(formData.get("summary") ?? "");
    const githubUrl = String(formData.get("githubUrl") || "") || null;
    const websiteUrl = String(formData.get("websiteUrl") || "") || null;
    const coverUrl = String(formData.get("coverUrl") || "") || null;

    await prisma.project.create({
      data: { title, slug, summary, githubUrl, websiteUrl, coverUrl },
    });

    redirect(`/projects/${slug}`);
  }

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-4">New Project</h1>
      <form action={create} className="vstack gap-3">
        <input name="title" className="form-control" placeholder="Title" required />
        <textarea name="summary" className="form-control" rows={3} placeholder="Summary" />
        <input name="githubUrl" className="form-control" placeholder="GitHub URL" />
        <input name="websiteUrl" className="form-control" placeholder="Website URL" />

        <label className="form-label">Cover Image</label>
        <UploadImage name="coverUrl" />

        <button className="btn btn-primary mt-3">Create</button>
      </form>
    </main>
  );
}
