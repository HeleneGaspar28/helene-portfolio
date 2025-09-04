import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProjectsPage() {
  // Fetch all projects from the DB
  const projects = await prisma.project.findMany();

  return (
    <main className="container py-5">
      <h1 className="mb-4">Projects</h1>
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              {project.coverImage && (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <a className="btn btn-sm btn-primary" href={`/projects/${project.slug}`}>View</a>
                <div className="d-flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      className="btn btn-sm btn-outline-secondary"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      className="btn btn-sm btn-primary"
                      target="_blank"
                    >
                      View Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
