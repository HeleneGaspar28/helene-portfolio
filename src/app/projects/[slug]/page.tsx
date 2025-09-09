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
      <div className="d-flex flex-wrap gap-3 align-items-end justify-content-between mb-3">
        <div>
          <h1 className="text-primary mb-1">{project.title}</h1>
          {project.subtitle && (
            <p className="text-muted lead mb-0">{project.subtitle}</p>
          )}
        </div>

        <div className="d-flex flex-column align-items-end gap-2">
          {/* back link */}
          <Link
            href="/projects"
            className="text-decoration-none text-muted small mb-4"
          >
            ← Back to Projects
          </Link>

          {/* buttons */}
          <div className="d-flex gap-2">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                className="btn btn-outline-secondary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            )}
            {project.websiteUrl && (
              <Link
                href={project.websiteUrl}
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Image gallery */}
      <ImageGallery
        coverUrl={project.coverUrl}
        images={project.images}
        title={project.title}
      />

      <div className="row g-4 mt-4 align-items-stretch">
        {/* Overview (left) */}
        <div className="col-12 col-lg-8 d-flex">
          <section className="card border-0 shadow-sm flex-fill">
            <div className="card-body">
              <h6 className="text-uppercase text-primary mb-3">Overview</h6>

              {project.summary ? (
                <>
                  {/* main paragraph */}
                  <p className="fs-6 lh-lg text-body">
                    {project.summary}
                  </p>
                </>
              ) : (
                <p className="text-muted mb-0">No summary yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Tech stack (right) */}
        <aside className="col-12 col-lg-4 d-flex">
          <div className="card border-0 shadow-sm flex-fill">
            <div className="card-body">
              <h6 className="text-uppercase text-primary mb-3">Tech Stack</h6>
              {entries.length === 0 ? (
                <p className="text-muted small mb-0">No tech listed.</p>
              ) : (
                entries.map(([section, values]) => (
                  <dl className="row mb-2 small" key={section}>
                    <dt className="col-4 text-muted">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </dt>
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
