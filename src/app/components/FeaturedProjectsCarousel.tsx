"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  githubUrl?: string | null;
};

export default function FeaturedProjectsCarousel({ projects }: { projects: Project[] }) {
  // duplicate items to create a seamless loop
  const items = [...projects, ...projects];

  // choose a speed you like; larger = slower
  const secondsPerCard = 4;
  const duration = `${projects.length * secondsPerCard}s`;

  return (
    <div className="fp-wrapper">
      <div className="fp-track" style={{ animationDuration: duration }}>
        {items.map((project, idx) => (
          <div key={`${project.id}-${idx}`} className="fp-card">
            <div className="fp-media">
              {project.coverUrl ? (
                <Image
                  src={project.coverUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                />
              ) : null}
            </div>

            <div className="fp-body">
              <h3 className="h6 mb-2 text-truncate">{project.title}</h3>
              <div className="d-flex gap-2 justify-content-center">
                <Link className="btn btn-sm btn-outline-secondary" href={`/projects/${project.slug}`}>
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fp-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 8px 0;
        }
        .fp-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation-name: fp-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        /* pause on hover for usability */
        .fp-wrapper:hover .fp-track {
          animation-play-state: paused;
        }
        .fp-card {
          width: clamp(260px, 40vw, 420px);
          flex: 0 0 auto;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .fp-media {
          position: relative;
          aspect-ratio: 16 / 9;
        }
        .fp-media :global(img) {
          object-fit: cover;
        }
        .fp-body {
          padding: 12px;
        }
        @keyframes fp-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - 0.5rem)); }
        }
        /* The track contains items duplicated twice; moving by 50% loops seamlessly. */
      `}</style>
    </div>
  );
}
