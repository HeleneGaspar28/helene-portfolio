import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FeaturedProjectsCarousel from "./components/FeaturedProjectsCarousel";

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

      {/* About Me */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="text-primary display-6 fw-semibold mb-2">About Me</h2>
            <p className="text-body-secondary mx-auto about-subtitle">
              {"I love working in team and I'm a good communicator."}
            </p>
          </div>

          <div className="row g-4 align-items-start">
            {/* Left: narrative */}
            <div className="col-lg-7">
              <div className="vstack gap-3">
                <p className="mb-0 about-text">
                  {"Hi, I’m Helene. I’m 26, from Belgium, and based in Paris."}
                </p>
                <p className="mb-0 about-text">
                  After graduating, I joined Velopass as the first employee. The company had no customers or revenue at the time. Over the past three years, I helped scale it to 1,500+ B2B clients across three countries and €300K ARR in 2024. I led go-to-market, built partnerships, worked with developers to prioritize features, and shaped the product roadmap. To drive expansion, I moved to France and joined an incubator at Station F.
                </p>
                <p className="mb-0 about-text">
                  Working closely with developers made me want to build myself, so I completed Le Wagon’s full-stack program. I’m now looking for a full-stack developer role where I can learn from experienced engineers.
                </p>
              </div>
            </div>

            {/* Right: highlight cards */}
            <div className="col-lg-5">
              <div className="vstack gap-3">
                <div className="feature-card d-flex align-items-start p-3 bg-white rounded-4 shadow-sm">
                  <span className="icon-badge me-3">📈</span>
                  <div>
                    <div className="fw-semibold">Business Growth</div>
                    <div className="text-body-secondary small">Scaled startup to €300K ARR</div>
                  </div>
                </div>

                <div className="feature-card d-flex align-items-start p-3 bg-white rounded-4 shadow-sm">
                  <span className="icon-badge me-3">🧑‍💻</span>
                  <div>
                    <div className="fw-semibold">Technical Skills</div>
                    <div className="text-body-secondary small">Full-stack development</div>
                  </div>
                </div>

                <div className="feature-card d-flex align-items-start p-3 bg-white rounded-4 shadow-sm">
                  <span className="icon-badge me-3">🧭</span>
                  <div>
                    <div className="fw-semibold">Team Leadership</div>
                    <div className="text-body-secondary small">First employee to growth lead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="text-decoration-none d-block my-4 text-center" href="/about">Learn more</Link>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="display-6 fw-semibold mb-2 text-primary">Technical Skills</h2>
          <p className="text-body-secondary mx-auto mb-5" style={{maxWidth: "70ch"}}>
            Modern web development technologies with a focus on full-stack solutions
          </p>

          <div className="row g-4">
            {/* Frontend */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-start">
                <div className="icon-badge mb-3">🌐</div>
                <h3 className="h5 fw-semibold mb-3">Frontend</h3>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-light">JavaScript</span>
                  <span className="badge rounded-pill text-bg-light">HTML</span>
                  <span className="badge rounded-pill text-bg-light">CSS</span>
                  <span className="badge rounded-pill text-bg-light">SCSS</span>
                  <span className="badge rounded-pill text-bg-light">Figma</span>
                  <span className="badge rounded-pill text-bg-light">UI/UX</span>
                  <span className="badge rounded-pill text-bg-light">React</span>
                  <span className="badge rounded-pill text-bg-light">TypeScript</span>
                  <span className="badge rounded-pill text-bg-light">Bootstrap</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-start">
                <div className="icon-badge mb-3">👨‍💻</div>
                <h3 className="h5 fw-semibold mb-3">Backend</h3>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-light">Ruby</span>
                  <span className="badge rounded-pill text-bg-light">Ruby on Rails</span>
                  <span className="badge rounded-pill text-bg-light">REST APIs</span>
                  <span className="badge rounded-pill text-bg-light">JavaScript</span>
                  <span className="badge rounded-pill text-bg-light">Next.Js</span>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-start">
                <div className="icon-badge mb-3">🗄️</div>
                <h3 className="h5 fw-semibold mb-3">Database</h3>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-light">PostgreSQL</span>
                  <span className="badge rounded-pill text-bg-light">SQL</span>
                  <span className="badge rounded-pill text-bg-light">Prisma ORM</span>
                </div>
              </div>
            </div>

            {/* Tools & Others */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-start">
                <div className="icon-badge mb-3">⚡</div>
                <h3 className="h5 fw-semibold mb-3">Tools & Others</h3>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-light">Git</span>
                  <span className="badge rounded-pill text-bg-light">Github</span>
                  <span className="badge rounded-pill text-bg-light">Stripe API</span>
                  <span className="badge rounded-pill text-bg-light">Cloudinary</span>
                  <span className="badge rounded-pill text-bg-light">Geocoder</span>
                  <span className="badge rounded-pill text-bg-light">Heroku</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
