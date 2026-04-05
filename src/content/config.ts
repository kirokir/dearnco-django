import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        category: z.enum(["Software", "Research", "Automation"]),
        date: z.date(),
        image: z.string().optional(),
    }),
});

export const collections = { blog };
