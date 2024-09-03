import { z } from 'zod';

const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email cannot be empty.' })
    .trim()
    .email({ message: 'Invalid Email address.' }),
  password: z
    .string({ required_error: 'Password cannot be empty.' })
    .trim()
    .min(6, { message: 'Password must be atleast 6 characters long.' })
    .max(20, { message: 'Password cannot be more than 20 characters.' }),
});

const signupUserSchema = z.object({
  email: z
    .string({ required_error: 'Email cannot be empty.' })
    .trim()
    .email({ message: 'Invalid Email address.' }),
  password: z
    .string({ required_error: 'Password cannot be empty.' })
    .trim()
    .min(6, { message: 'Password must be atleast 6 characters long.' })
    .max(20, { message: 'Password cannot be more than 20 characters.' }),
  fullName: z
    .string({ required_error: 'Password cannot be empty.' })
    .trim()
    .min(6, { message: 'Full Name must be atleast 6 characters long.' })
    .max(25, { message: 'Full Name cannot be more than 25 characters.' }),
  role: z.enum(["USER","ADMIN","SUPERADMIN"]).default("USER")
});

export { loginUserSchema, signupUserSchema };
