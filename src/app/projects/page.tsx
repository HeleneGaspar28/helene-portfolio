import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container py-5">
      <div className="d-flex align-items-end justify-content-between mb-4">
        <h1 className="text-primary mb-0">Projects</h1>
        {/* optional subtext */}
        <span className="text-muted small">{projects.length} total</span>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-muted py-5">No projects yet.</div>
      ) : (
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {projects.map((project) => (
            <div key={project.id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                {/* 16:9 cover with proper cropping */}
                <div className="position-relative ratio ratio-16x9">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-fit-cover rounded-top"
                      sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={false}
                    />
                  ) : (
                    <div className="bg-light rounded-top w-100 h-100 d-flex align-items-center justify-content-center">
                      <span className="text-muted small">No image</span>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h5 className="card-title mb-2">{project.title}</h5>
                  {project.description && (
                    <p className="card-text text-muted small line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}

                  <div className="d-flex gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </Link>

                    {project.github && (
                      <a
                        href={project.github}
                        className="btn btn-outline-secondary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}

                    {project.website && (
                      <a
                        href={project.website}
                        className="btn btn-outline-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
