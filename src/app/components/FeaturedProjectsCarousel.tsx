"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverUrl: string;
  githubUrl?: string | null;
};

export default function FeaturedProjectsCarousel({
  projects,
}: {
  projects?: Project[] | null;
}) {
  const list: Project[] = Array.isArray(projects) ? projects : [];
  const items = [...list, ...list];

  const secondsPerCard = 4;
  const duration = `${list.length * secondsPerCard || 1}s`;

  if (list.length === 0) return null;

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-primary display-6 fw-semibold mb-4 text-center">
          Featured Projects
        </h2>

        <div className="fp-wrapper">
          <div className="fp-track" style={{ animationDuration: duration }}>
            {items.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="card shadow-sm me-3" style={{ width: "400px" }}>
                {project.coverUrl && (
                  <div className="ratio ratio-16x9">
                    <Image
                      src={project.coverUrl}
                      alt={project.title}
                      fill
                      className="card-img-top rounded-top"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="card-body text-center">
                  <h5 className="card-title text-primary text-truncate">{project.title}</h5>
                  <p className="card-text text-muted small mb-3 text-truncate">{project.subtitle}</p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <a className="text-decoration-none d-block my-4 text-center" href="/projects">See all</a>
      </div>

      <style jsx>{`
        .fp-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .fp-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation-name: fp-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .fp-wrapper:hover .fp-track {
          animation-play-state: paused;
        }
        @keyframes fp-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
      `}</style>
    </section>
  );
}
