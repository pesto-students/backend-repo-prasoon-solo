import { z } from 'zod';

const problemSchema = z.object({
  title: z
    .string({ required_error: 'Password cannot be empty.' })
    .trim()
    .min(6, { message: 'Title must be atleast 6 characters long.' })
    .max(25, { message: 'Title cannot be more than 25 characters.' }),
  category: z
    .string({ required_error: 'Category cannot be empty.' })
    .trim()
    .min(5, { message: 'Category must be atleast 5 characters long.' })
    .max(25, { message: 'Category cannot be more than 25 characters.' }),
  order: z.number({ required_error: 'Order cannot be empty.' }),
  videoUrl: z.string().trim().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
});

export { problemSchema };
