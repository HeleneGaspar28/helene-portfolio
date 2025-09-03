import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "helene-portfolio" },
    update: {},
    create: {
      slug: "helene-portfolio",
      title: "Helene Portfolio",
      summary: "Personal portfolio built with Next.js",
      githubUrl: "https://github.com/<your-username>/helene-portfolio",
      websiteUrl: "https://<your-deploy-host>.vercel.app",
      coverUrl: "/images/portfolio-cover.png",
    },
  });

  await prisma.project.upsert({
    where: { slug: "bike-id" },
    update: {},
    create: {
      slug: "bike-id",
      title: "Bike ID",
      summary: "Simple bike registry demo",
      githubUrl: "https://github.com/<your-username>/bike-id",
      websiteUrl: "https://bike-id.example.com",
      coverUrl: "/images/bike-cover.png",
    },
  });
}

main().finally(() => prisma.$disconnect());
