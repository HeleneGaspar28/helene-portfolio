import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery";

export const revalidate = 0;

type Props = { params: { slug: string } };

export default async function ProjectShowPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      subtitle: true,
      summary: true,
      coverUrl: true,
      githubUrl: true,
      websiteUrl: true,
      techStack: true,
      images: {
        orderBy: { id: "asc" },
        select: { id: true, url: true, alt: true },
      },
    },
  });

  if (!project) return notFound();

  const raw = (project.techStack ?? {}) as Record<string, unknown>;
  const entries = Object.entries(raw).filter(
    ([, v]) => Array.isArray(v) && v.length > 0
  ) as [string, string[]][];

  const label = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <main className="container py-5">
      <div className="mb-3">
        <Link href="/projects" className="text-decoration-none text-muted small">
          ← Back to Projects
        </Link>
      </div>

      <div className="d-flex flex-wrap gap-3 align-items-end justify-content-between mb-3">
        <h1 className="text-primary mb-0">{project.title}</h1>
        <div className="d-flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="btn btn-outline-secondary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              className="btn btn-primary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </div>

      {/* Image gallery */}
      <ImageGallery
        coverUrl={project.coverUrl}
        images={project.images}
        title={project.title}
      />

      <div className="row g-4 mt-4">
        <div className="col-12 col-lg-8">
          {project.summary ? (
            <div className="prose">
              <p>{project.summary}</p>
            </div>
          ) : (
            <p className="text-muted">No summary yet.</p>
          )}
        </div>

        <aside className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase text-primary mb-3">Tech Stack</h6>
              {entries.length === 0 ? (
                <p className="text-muted small mb-0">No tech listed.</p>
              ) : (
                entries.map(([section, values]) => (
                  <dl className="row mb-2 small" key={section}>
                    <dt className="col-4 text-muted">{label(section)}</dt>
                    <dd className="col-8">
                      <div className="d-flex flex-wrap gap-2">
                        {values.map((v) => (
                          <span className="badge rounded-pill text-bg-light" key={v}>
                            {v}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </dl>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
