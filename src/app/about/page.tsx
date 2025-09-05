import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  const tags = ["Problem Solver", "Coffee Enthusiast", "Full-stack Dev"];

  const story = [
    {
      title: "The Beginning",
      text:
        "Joined Velopass as employee #1 and learned by doing in a zero-to-one environment.",
      icon: "✈️",
    },
    {
      title: "The Growth",
      text:
        "Led go-to-market and partnerships while helping scale to €300K ARR across 3 countries.",
      icon: "📘",
    },
    {
      title: "The Evolution",
      text:
        "Decided to build. Completed full-stack training and shifted focus to engineering.",
      icon: "🧩",
    },
  ];

  const facts = [
    { label: "Coffee per day", value: "4+" , icon: "☕️" },
    { label: "ARR growth", value: "0→€300K", icon: "🚀" },
    { label: "Market expansion", value: "3 countries", icon: "🌍" },
    { label: "Ideas per minute", value: "∞", icon: "💡" },
  ];

  return (
    <main className="container py-5">
      {/* Back link */}
      <div className="mb-4">
        <Link href="/" className="text-muted text-decoration-none small">
          ← Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="row align-items-center g-4 mb-5">
        <div className="col-12 col-lg-6">
          <h1 className="text-primary display-4 fw-bold mb-3">Hi, I'm Helene! 👋</h1>
          <p className="lead text-muted mb-3">
            A business-minded developer who connects market needs with
            practical engineering.
          </p>

          <div className="d-flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="position-relative main-photo-wrapper">
            {/* Main profile photo */}
            <div className="ratio ratio-1x1 rounded-4 overflow-hidden shadow-sm">
              <Image
                src="/helene_foto.jpg"
                alt="Helene"
                fill
                className="object-fit-cover"
                priority
              />
            </div>

            {/* Top-right small photo */}
            <div className="floating-photo top-end">
              <Image
                src="/candid.jpg"
                alt="Candid"
                fill
                className="object-fit-cover rounded-3"
              />
            </div>

            {/* Bottom-left small photo */}
            <div className="floating-photo bottom-start">
              <Image
                src="/fun.jpg"
                alt="Fun"
                fill
                className="object-fit-cover rounded-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="mb-5">
        <h2 className="text-center fw-bold mb-4">My Story</h2>
        <div className="row g-4">
          {story.map((s, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="rounded-3 icon-pill mb-3">{s.icon}</div>
                  <h5 className="mb-2">{s.title}</h5>
                  <p className="text-muted mb-0">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What makes me different */}
      <section className="mb-5">
        <div className="row g-4 align-items-center rounded-4 p-4 bg-light-subtle">
          <div className="col-12 col-lg-7">
            <h3 className="mb-3">What Makes Me Different?</h3>
            <p className="text-muted mb-3">
              I’ve worked both on growth metrics and on product delivery. This
              helps me ship features that matter and measure the result.
            </p>
            <p className="text-muted mb-0">
              Outside of work: coffee shops, reading about product and infra, and
              planning the next trip.
            </p>
          </div>
          <div className="col-12 col-lg-5">
            <div
              className="position-relative rounded-4 overflow-hidden shadow-sm"
              style={{ aspectRatio: "16 / 10" }}
            >
              {/* Replace with a candid photo */}
              <Image
                src="/helene_foto.jpg"
                alt="Helene candid"
                fill
                className="object-fit-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="mb-5">
        <h3 className="text-center fw-bold mb-4">Random Facts About Me</h3>
        <div className="row g-3">
          {facts.map((f) => (
            <div className="col-12 col-md-6 col-lg-3" key={f.label}>
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body">
                  <div className="display-6 mb-2">{f.icon}</div>
                  <div className="h4 mb-1">{f.value}</div>
                  <div className="text-muted small">{f.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h3 className="fw-bold mb-2">Let’s Build Something Together</h3>
        <p className="text-muted mb-3">
          I’m looking for a team that values impact and clean execution.
        </p>
        <Link href="/projects" className="btn btn-primary">
          View My Work
        </Link>
      </section>
    </main>
  );
}
