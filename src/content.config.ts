// Blog content collection (Astro 5 Content Layer API).
// Posts live as Markdown in src/content/blog/*.md; the glob loader picks them up.
// Schema is the single source of truth for post frontmatter — the listing and
// per-post pages read these typed fields. RSS deliberately omitted (Stage 4 decision).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Editorial series name, shown as the crimson chip (kept from the legacy posts). */
    series: z.string(),
    /** Human reading-time label, e.g. "5 min read". */
    readingTime: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
