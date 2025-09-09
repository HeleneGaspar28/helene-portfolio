// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { NewProjectSchema } from "@/lib/validation";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = NewProjectSchema.parse(json);

    const slug = slugify(data.title);

    const created = await prisma.project.create({
      data: {
        slug,
        title: data.title,
        subtitle: data.subtitle ?? null,
        summary: data.summary,
        githubUrl: data.githubUrl ?? null,
        websiteUrl: data.websiteUrl ?? null,
        coverUrl: data.coverUrl ?? null,
        techStack: data.techStack, // JSON column
        images: {
          create: data.images.map((img, i) => ({
            url: img.url,
            alt: img.alt,
            position: img.position ?? i,
          })),
        },
      },
      include: { images: true },
    });

    // revalidate list and detail pages (ignore if not configured)
    try {
      revalidatePath("/projects");
      revalidatePath(`/projects/${created.slug}`);
    } catch {}

    return NextResponse.json({ ok: true, project: created }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    console.error(err);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
