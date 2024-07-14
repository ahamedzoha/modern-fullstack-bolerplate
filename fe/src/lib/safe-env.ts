import { z } from "zod"

/**
 * @file env.ts
 * @description This file contains the environment variables for the application.
 * It uses the zod library to validate the environment variables.
 * @exports API_BASE_URL - The base URL for the API.
 */

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_ID: z.string(),
  NEXT_PUBLIC_APP_SECRET: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_COOKIE_SECRET: z.string(),
})

const env = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_APP_SECRET: process.env.NEXT_PUBLIC_APP_SECRET,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_COOKIE_SECRET: process.env.NEXT_PUBLIC_COOKIE_SECRET,
})

if (!env.success) {
  console.error("Validation Errors:", env.error.format())
  throw new Error("Invalid environment variables")
}

export const {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_APP_SECRET,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_COOKIE_SECRET,
} = env.data // Access the variables
