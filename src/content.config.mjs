import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    relatesTo: z.string().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/work',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    role: z.string(),
    stack: z.array(z.string()),
    status: z.string(),
    metrics: z.string().optional(),
    repository: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  }),
});

export const collections = { blog, work };
