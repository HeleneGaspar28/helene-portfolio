import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  const tags = ["Great teammate", "Vintage lover", "Full-stack Dev"];

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
        "Decided to build. Completed Le Wagon's full-stack bootcamp and shifted focus to engineering.",
      icon: "🧩",
    },
  ];

  const facts = [
    { label: "Is meditation for me", value: "Swimming" , icon: "🏊🏽‍♂️" },
    { label: "I sell vintage pieces online", value: "Vintage Lover", icon: "👗" },
    { label: "I lived in", value: "3 Countries", icon: "🌍" },
    { label: "Are my Grandparents", value: "My best friends", icon: "👵🏼" },
  ];

  return (
    <main className="container py-5">
      {/* Back link */}
      <div className="d-flex align-items-end justify-content-between mb-4">
        <Link
          href="/"
          className="text-decoration-none text-muted small"
        >← Back to Homepage</Link>
      </div>

      {/* Hero */}
      <div className="stack-6">
        <section className="row align-items-center g-4 mb-5">
          <div className="col-12 col-lg-6">
            <h1 className="text-primary display-4 fw-bold mb-3">Hi, I am Helene! 👋</h1>
            <p className="lead text-muted mb-3">
              By day I’m a full-stack developer, by night I’m hunting vintage treasures and mispronounce French verbs.
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
                  src="/helene_fun.jpg"
                  alt="Candid"
                  fill
                  className="object-fit-cover rounded-3"
                />
              </div>

              {/* Bottom-left small photo */}
              <div className="floating-photo bottom-start">
                <Image
                  src="/helene_left.jpeg"
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
          <h2 className="text-primary text-center display-6 fw-semibold mb-2">My Story</h2>
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
              <h3 className="text-primary mb-3">What Makes Me Different?</h3>
              <p className="text-muted mb-3 me-4">
                After graduating, I joined Velopass as the first employee. The company had no customers or revenue. Over three years, I helped scale it to 1,500+ B2B clients in three countries and €300K ARR. I led go-to-market, closed partnerships, worked with developers to turn feedback into features, and shaped the roadmap. To drive growth, I moved to France and joined Station F.
              </p>
              <p className="text-muted mb-3 me-4">
                Working side by side with developers made me want to build myself. I completed Le Wagon’s full-stack program and am now looking for my first software engineering role in a team where I can learn from experienced engineers.
              </p>
              <p className="text-muted mb-0 me-4">
                Outside of work, I enjoy hunting for vintage treasures online and movie nights with my boyfriend.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <div
                className="position-relative rounded-4 overflow-hidden shadow-sm"
                style={{ aspectRatio: "16 / 10" }}
              >
                {/* Replace with a candid photo */}
                <Image
                  src="/helene_adventure.jpg"
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
          <h3 className="text-primary text-center display-6 fw-semibold mb-2">Random Facts About Me</h3>
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
      </div>
    </main>
  );
}
