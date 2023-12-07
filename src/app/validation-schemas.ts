import { z } from 'zod'

export const email = z.string().trim().min(1, 'Email is required').email('Invalid email')
export const password = z
  .string()
  .min(3, 'Password must contain at least 3 character(s)')
  .max(30, 'Password must contain at most 30 character(s)')

export const signIn = z.object({
  email,
  password: password,
  rememberMe: z.boolean().optional(),
})

export const signUp = z
  .object({
    confirmPassword: password,
    email,
    password,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  })
