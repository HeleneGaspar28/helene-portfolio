// src/app/components/FeaturedProjectsCarousel.tsx
import Link from "next/link";
import Image from "next/image";

type CarouselProject = {
  id: string | number;
  title: string;
  subtitle: string | null;
  summary: string;
  slug: string;
  coverUrl: string | null;
  githubUrl: string | null;
};

export default function FeaturedProjectsCarousel({
  projects,
}: {
  projects: CarouselProject[];
}) {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="display-6 fw-semibold mb-3 text-primary text-center">Featured projects</h2>
        <p className="text-body-secondary mx-auto about-subtitle text-center mb-4">{"Projects I've worked on."}</p>
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {projects.map((p) => (
            <div key={p.id} className="col">
              <Link href={`/projects/${p.slug}`} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative ratio ratio-16x9 rounded-top overflow-hidden">
                    {p.coverUrl ? (
                      <Image
                        src={p.coverUrl}
                        alt={p.title}
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
                    {p.subtitle && (
                      <p className="card-text text-muted small mb-0">{p.subtitle}</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link className="text-decoration-none d-block my-4 text-center" href="/projects">See all</Link>
      </div>
    </section>
  );
}
