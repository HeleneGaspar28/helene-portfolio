import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      summary: true,
      coverUrl: true,
      githubUrl: true,
      websiteUrl: true,
      images: { take: 1, orderBy: { id: "asc" }, select: { url: true, alt: true } },
    },
  });

  return (
    <main className="container py-5">
      <div className="d-flex align-items-end justify-content-between mb-4">
        <h1 className="text-primary mb-0">Projects</h1>
        <Link
          href="/"
          className="text-decoration-none text-muted small"
        >← Back to Homepage</Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-muted py-5">No projects yet.</div>
      ) : (
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {projects.map((p) => {
            const fallback = p.images?.[0];
            const cover = p.coverUrl ?? fallback?.url ?? null;
            const alt = p.coverUrl ? p.title : fallback?.alt ?? p.title;

            return (
              <div key={p.id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative ratio ratio-16x9 rounded-top overflow-hidden">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={alt}
                        fill
                        className="object-fit-cover"
                        sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                        <span className="text-muted small">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="card-body text-center">
                    <h5 className="card-title text-primary mb-2">{p.title}</h5>
                    {p.summary && (
                      <p className="card-text text-muted small mb-3" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {p.subtitle}
                      </p>
                    )}

                    <div className="d-flex justify-content-center gap-2">
                      <Link href={`/projects/${p.slug}`} className="btn btn-outline-secondary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
