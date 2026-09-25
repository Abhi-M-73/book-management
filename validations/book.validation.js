import { z } from "zod";

export const createBookSchema = z.object({
  title: z
    .string()
    .min(2, "Title is required"),

  author: z
    .string()
    .min(2, "Author is required"),

  category: z
    .string()
    .min(2, "Category is required"),

  description: z
    .string()
    .optional(),

  publishedYear: z
    .number()
    .optional(),

  totalCopies: z
    .number()
    .min(1, "At least one copy is required"),
});