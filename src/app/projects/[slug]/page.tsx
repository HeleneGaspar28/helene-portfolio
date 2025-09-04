import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";


type Props = { params: { slug: string } };

export default async function ProjectShow({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return notFound();

  return (
    <main className="container py-5" style={{ maxWidth: 900 }}>
      <h1 className="mb-2">{project.title}</h1>
      <p className="text-body-secondary mb-4">{project.summary}</p>

      {project.coverUrl && (
        <Image
          src={project.coverUrl}      // e.g. "/images/portfolio-cover.png"
          alt={project.title}
          width={1200}
          height={675}
          className="img-fluid rounded mb-4"
        />
      )}

      <div className="d-flex gap-2">
        {project.githubUrl && (
          <a className="btn btn-outline-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {project.websiteUrl && (
          <a className="btn btn-primary" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        )}
      </div>
    </main>
  );
}
