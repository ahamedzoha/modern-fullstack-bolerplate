import { z } from "zod"

/**
 * @file env.ts
 * @description This file contains the environment variables for the application.
 * It uses the zod library to validate the environment variables.
 * @exports API_BASE_URL - The base URL for the API.
 */

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  // Add more variables here as needed
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error("Validation Errors:", env.error.format())
  throw new Error("Invalid environment variables")
}

export const { NEXT_PUBLIC_API_BASE_URL } = env.data // Access the variables
