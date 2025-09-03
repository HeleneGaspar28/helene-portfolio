export default function HomePage() {
  return (
    <main className="container py-5">
      <h1 className="display-5 mb-3">Helene Portfolio</h1>
      <p className="lead mb-4">Rails dev learning full-stack JavaScript.</p>

      <div className="d-flex gap-3">
        <a className="btn btn-primary" href="/projects">View projects</a>
        <a className="btn btn-outline-secondary" href="/about">About</a>
      </div>
    </main>
  );
}
