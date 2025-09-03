import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="container">
          <h1 className="display-4 fw-bold hero-title text-primary">Helene Portfolio</h1>
          <p className="lead hero-subtitle text-body-secondary">
            Rails developer learning full-stack JavaScript with Next.js. Selected projects, notes, and experiments.
          </p>
          <div className="d-flex gap-2 mt-3">
            <a className="btn btn-primary" href="/projects">View projects</a>
            <a className="btn btn-outline-secondary" href="/about">About</a>
          </div>
        </div>
      </header>

      {/* Featured projects (optional preview grid) */}
      <section className="section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 section-title m-0">Featured projects</h2>
            <a className="text-decoration-underline" href="/projects">See all →</a>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-hover h-100">
                <Image
                  src="/images/portfolio-cover.png" /* put a file in /public/images */
                  alt="Helene Portfolio"
                  width={800}
                  height={450}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="h5 mb-1">Helene Portfolio</h3>
                  <p className="text-body-secondary mb-3">Personal site built with Next.js.</p>
                  <div className="d-flex gap-2">
                    <a className="btn btn-sm btn-outline-secondary" href="https://github.com/<you>/helene-portfolio">GitHub</a>
                    <a className="btn btn-sm btn-primary" href="/projects/helene-portfolio">View</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 (example) */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-hover h-100">
                <Image
                  src="/images/bike-cover.png"
                  alt="Bike ID"
                  width={800}
                  height={450}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="h5 mb-1">Bike ID</h3>
                  <p className="text-body-secondary mb-3">Simple bike registry demo.</p>
                  <div className="d-flex gap-2">
                    <a className="btn btn-sm btn-outline-secondary" href="https://github.com/<you>/bike-id">GitHub</a>
                    <a className="btn btn-sm btn-primary" href="/projects/bike-id">View</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Add more cards or replace these with DB-driven content */}
          </div>
        </div>
      </section>
    </>
  );
}
