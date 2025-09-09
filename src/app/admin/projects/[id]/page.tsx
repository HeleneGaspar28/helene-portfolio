import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditProject({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return redirect("/admin/projects/new");

  const { slug } = project; // capture once for the action

  async function update(formData: FormData) {
    "use server";
    assertAdmin();

    await prisma.project.update({
      where: { id },
      data: {
        title: (formData.get("title") ?? "").toString(),
        summary: (formData.get("summary") ?? "").toString(),
        githubUrl: ((formData.get("githubUrl") ?? "") as string) || null,
        websiteUrl: ((formData.get("websiteUrl") ?? "") as string) || null,
        coverUrl: ((formData.get("coverUrl") ?? "") as string) || null,
      },
    });

    redirect(`/projects/${slug}`);
  }

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-4">Edit Project</h1>
      <form action={update} className="vstack gap-3">
        <input name="title" className="form-control" defaultValue={project.title} required />
        <textarea name="summary" className="form-control" rows={3} defaultValue={project.summary ?? ""} />
        <div className="row g-3">
          <div className="col-md-6">
            <input name="githubUrl" className="form-control" defaultValue={project.githubUrl ?? ""} />
          </div>
          <div className="col-md-6">
            <input name="websiteUrl" className="form-control" defaultValue={project.websiteUrl ?? ""} />
          </div>
        </div>
        <input name="coverUrl" className="form-control" defaultValue={project.coverUrl ?? ""} />
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </main>
  );
}
