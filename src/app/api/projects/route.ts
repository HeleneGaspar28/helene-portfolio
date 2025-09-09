// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NewProjectSchema } from "@/lib/validation";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = NewProjectSchema.parse(json);

    const slug = slugify(data.title);

    const created = await prisma.project.create({
      data: {
        slug,
        title: data.title,
        subtitle: data.subtitle || null,
        summary: data.summary,
        githubUrl: data.githubUrl || null,
        websiteUrl: data.websiteUrl || null,
        coverUrl: data.coverUrl || null,
        techStack: data.techStack, // Prisma Json
        images: {
          create: data.images.map((img) => ({
            url: img.url,
            alt: img.alt,
            position: img.position,
          })),
        },
      },
      include: { images: true },
    });

    // revalidate listing/detail pages if you have them
    try { revalidatePath("/projects"); } catch {}

    return NextResponse.json({ ok: true, project: created }, { status: 201 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
