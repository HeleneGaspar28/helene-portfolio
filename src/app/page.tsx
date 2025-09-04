import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FeaturedProjectsCarousel from "@/app/_components/FeaturedProjectsCarousel";

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      title: true,
      summary: true,
      slug: true,
      coverUrl: true,
      githubUrl: true,
    },
  });

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
            <a className="btn btn-lg btn-primary" href="/projects">Projects</a>
            <a className="btn btn-lg btn-outline-secondary" href="/about">About</a>
          </div>
        </div>
      </header>

      {/* Featured projects  */}
      <section className="section py-5 text-center">
        <div className="container">
          <h1 className="h4 section-title mb-4">Featured projects</h1>

          {projects.length === 0 ? (
            <p className="text-body-secondary">No projects yet.</p>
          ) : (
            <FeaturedProjectsCarousel projects={projects} />
          )}

          <Link className="text-decoration-none d-block my-4" href="/projects">
            See all
          </Link>
        </div>
      </section>

      {/* About Me */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="text-primary display-6 fw-semibold mb-2">About Me</h2>
            <p className="text-body-secondary mx-auto about-subtitle">
              I'm a unique blend of business acumen and technical expertise, focused on building products that scale.
            </p>
          </div>

          <div className="row g-4 align-items-start">
            {/* Left: narrative */}
            <div className="col-lg-7">
              <div className="vstack gap-3">
                <p className="mb-0">
                  As the first employee at Velopass, I learned what it takes to build a company from the ground up.
                  I led go-to-market strategy, built partnerships, and helped scale from 0 to €300K ARR and 1,500+ B2B clients across 3 countries.
                </p>
                <p className="mb-0">
                  Now I’m combining that business experience with full-stack development skills. I understand both sides:
                  how to grow a business and how to build the technology that powers it.
                </p>
                <p className="mb-0">
                  I’m looking for a full-stack role at a growth-stage company where I can drive both technical excellence and business impact.
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
          <a className="text-decoration-none d-block my-4 text-center" href="/about">Learn more</a>
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
                  <span className="badge rounded-pill text-bg-light">HTML5</span>
                  <span className="badge rounded-pill text-bg-light">CSS3</span>
                  <span className="badge rounded-pill text-bg-light">SCSS</span>
                  <span className="badge rounded-pill text-bg-light">Responsive Design</span>
                  <span className="badge rounded-pill text-bg-light">UI/UX</span>
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
                  <span className="badge rounded-pill text-bg-light">API Development</span>
                  <span className="badge rounded-pill text-bg-light">RESTful Services</span>
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
                  <span className="badge rounded-pill text-bg-light">Database Design</span>
                  <span className="badge rounded-pill text-bg-light">SQL</span>
                  <span className="badge rounded-pill text-bg-light">Data Modeling</span>
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
                  <span className="badge rounded-pill text-bg-light">Stripe API</span>
                  <span className="badge rounded-pill text-bg-light">Geocoder</span>
                  <span className="badge rounded-pill text-bg-light">Deployment</span>
                  <span className="badge rounded-pill text-bg-light">Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact"className="py-5 bg-light">
        <div className="container text-center mb-5">
          <h2 className="display-6 fw-semibold mb-2 text-primary">Let's Work Together</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: "70ch" }}>
            Ready to contribute to a growth-stage company. Available for full-stack developer roles.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm">
                <div className="row g-4 align-items-stretch">
                  {/* Left: contact details */}
                  <div className="col-12 col-md-6 text-start">
                    <h3 className="h5 fw-semibold mb-4">Get In Touch</h3>

                    <div className="d-flex align-items-start mb-3">
                      <span className="icon-badge me-3">✉️</span>
                      <div>
                        <div className="fw-medium">Email</div>
                        <a href="mailto:helene@example.com" className="text-body-secondary text-decoration-none">
                          helene@example.com
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-4">
                      <span className="icon-badge me-3">📍</span>
                      <div>
                        <div className="fw-medium">Location</div>
                        <div className="text-body-secondary">Paris, France</div>
                      </div>
                    </div>

                    <div>
                      <div className="fw-medium mb-2">Connect with me</div>
                      <div className="d-flex gap-2">
                        <a className="btn btn-light border" href="https://www.linkedin.com/in/your-handle" target="_blank">LinkedIn</a>
                        <a className="btn btn-light border" href="https://github.com/your-handle" target="_blank">GitHub</a>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA panel */}
                  <div className="col-12 col-md-6">
                    <div className="p-4 p-md-4 rounded-4 contact-cta h-100">
                      <div className="text-center mb-3">
                        <div className="h5 fw-semibold mb-1">Ready to hire?</div>
                        <div className="text-body-secondary">Download my resume or reach out to discuss opportunities.</div>
                      </div>

                      <div className="vstack gap-3">
                        <a className="btn btn-primary btn-lg w-100" href="/resume.pdf" download>
                          ⬇️&nbsp; Download Resume
                        </a>
                        <a className="btn btn-outline-dark btn-lg w-100" href="mailto:helene@example.com">
                          ✉️&nbsp; Send Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* /card */}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="text-primary display-6 fw-semibold mb-2">About Me</h2>
            <p className="text-body-secondary mx-auto about-subtitle">
              I'm a unique blend of business acumen and technical expertise, focused on building products that scale.
            </p>
          </div>

          <div className="row g-4 align-items-start">
            {/* Left: narrative */}
            <div className="col-lg-7">
              <div className="vstack gap-3">
                <p className="mb-0">
                  As the first employee at Velopass, I learned what it takes to build a company from the ground up.
                  I led go-to-market strategy, built partnerships, and helped scale from 0 to €300K ARR and 1,500+ B2B clients across 3 countries.
                </p>
                <p className="mb-0">
                  Now I’m combining that business experience with full-stack development skills. I understand both sides:
                  how to grow a business and how to build the technology that powers it.
                </p>
                <p className="mb-0">
                  I’m looking for a full-stack role at a growth-stage company where I can drive both technical excellence and business impact.
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
          <a className="text-decoration-none d-block my-4 text-center" href="/about">Learn more</a>
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
                  <span className="badge rounded-pill text-bg-light">HTML5</span>
                  <span className="badge rounded-pill text-bg-light">CSS3</span>
                  <span className="badge rounded-pill text-bg-light">SCSS</span>
                  <span className="badge rounded-pill text-bg-light">Responsive Design</span>
                  <span className="badge rounded-pill text-bg-light">UI/UX</span>
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
                  <span className="badge rounded-pill text-bg-light">API Development</span>
                  <span className="badge rounded-pill text-bg-light">RESTful Services</span>
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
                  <span className="badge rounded-pill text-bg-light">Database Design</span>
                  <span className="badge rounded-pill text-bg-light">SQL</span>
                  <span className="badge rounded-pill text-bg-light">Data Modeling</span>
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
                  <span className="badge rounded-pill text-bg-light">Stripe API</span>
                  <span className="badge rounded-pill text-bg-light">Geocoder</span>
                  <span className="badge rounded-pill text-bg-light">Deployment</span>
                  <span className="badge rounded-pill text-bg-light">Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact"className="py-5 bg-light">
        <div className="container text-center mb-5">
          <h2 className="display-6 fw-semibold mb-2 text-primary">Let's Work Together</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: "70ch" }}>
            Ready to contribute to a growth-stage company. Available for full-stack developer roles.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm">
                <div className="row g-4 align-items-stretch">
                  {/* Left: contact details */}
                  <div className="col-12 col-md-6 text-start">
                    <h3 className="h5 fw-semibold mb-4">Get In Touch</h3>

                    <div className="d-flex align-items-start mb-3">
                      <span className="icon-badge me-3">✉️</span>
                      <div>
                        <div className="fw-medium">Email</div>
                        <a href="mailto:helene@example.com" className="text-body-secondary text-decoration-none">
                          helene@example.com
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-4">
                      <span className="icon-badge me-3">📍</span>
                      <div>
                        <div className="fw-medium">Location</div>
                        <div className="text-body-secondary">Paris, France</div>
                      </div>
                    </div>

                    <div>
                      <div className="fw-medium mb-2">Connect with me</div>
                      <div className="d-flex gap-2">
                        <a className="btn btn-light border" href="https://www.linkedin.com/in/your-handle" target="_blank">LinkedIn</a>
                        <a className="btn btn-light border" href="https://github.com/your-handle" target="_blank">GitHub</a>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA panel */}
                  <div className="col-12 col-md-6">
                    <div className="p-4 p-md-4 rounded-4 contact-cta h-100">
                      <div className="text-center mb-3">
                        <div className="h5 fw-semibold mb-1">Ready to hire?</div>
                        <div className="text-body-secondary">Download my resume or reach out to discuss opportunities.</div>
                      </div>

                      <div className="vstack gap-3">
                        <a className="btn btn-primary btn-lg w-100" href="/resume.pdf" download>
                          ⬇️&nbsp; Download Resume
                        </a>
                        <a className="btn btn-outline-dark btn-lg w-100" href="mailto:helene@example.com">
                          ✉️&nbsp; Send Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* /card */}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
