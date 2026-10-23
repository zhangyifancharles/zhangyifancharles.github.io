import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const shared = {
  title: z.string().min(1),
  summary: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase English words separated by hyphens.'),
  date: z.coerce.date(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  demo: z.boolean().default(false),
};
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    ...shared,
    lang: z.literal('en').default('en'),
    kind: z.enum(['technical', 'essay']),
    updated: z.coerce.date().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }).refine((data) => !data.cover || !!data.coverAlt, { message: 'A cover image requires coverAlt.', path: ['coverAlt'] }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...shared,
    state: z.enum(['in-progress', 'completed']),
    role: z.string().min(1),
    tags: z.array(z.string()).max(4).default([]),
    code: z.url().optional(),
    demoUrl: z.url().optional(),
  }),
});
export const collections = { writing, projects };
