import { z } from "zod";

export const TechStackSchema = z.object({
  frontend: z.array(z.string()).default([]),
  backend: z.array(z.string()).default([]),
  databases: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
});

export const NewProjectSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  summary: z.string().min(1),
  githubUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  coverUrl: z.string().url().optional().or(z.literal("")),
  images: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().optional().default(""),
      position: z.number().int().nonnegative(),
    })
  ),
  techStack: TechStackSchema,
});
export type NewProjectInput = z.infer<typeof NewProjectSchema>;
