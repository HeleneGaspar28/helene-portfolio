import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FeaturedProjectsCarousel from "./components/FeaturedProjectsCarousel";

// what the carousel expects
type ProjectForCarousel = {
  id: string;
  title: string;
  subtitle: string | null;
  summary: string;
  slug: string;
  coverUrl: string | null;
  githubUrl: string | null;
};

export default async function HomePage() {
  const projectsRaw = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,              // number in DB
      title: true,
      subtitle: true,
      summary: true,
      slug: true,
      coverUrl: true,
      githubUrl: true,
    },
  });

  // normalize id -> string for the carousel
  const projects: ProjectForCarousel[] = projectsRaw.map((p) => ({
    ...p,
    id: String(p.id),
  }));

  return (
    <>
      {/* Hero */}
      <header className="hero bg-light py-5">
        <div className="container text-center">
          <Image
            src="/helene_foto.jpg"
            alt="Helene image"
            width={200}
            height={200}
            className="rounded-circle img-fluid border"
            priority
          />
          <h1 className="display-4 fw-bold hero-title text-primary">Helene Gaspar</h1>
          <p className="lead hero-subtitle text-body-secondary mx-auto text-center">
            Full-stack developer looking for my first software engineering role.
          </p>
          <div className="d-flex gap-2 mt-3 justify-content-center">
            <Link className="btn btn-lg btn-primary" href="/projects">Projects</Link>
            <Link className="btn btn-lg btn-outline-secondary" href="/about">About</Link>
          </div>
        </div>
      </header>

      {/* Featured projects */}
      <FeaturedProjectsCarousel projects={projects} />

      {/* …rest of the page unchanged… */}
    </>
  );
}
