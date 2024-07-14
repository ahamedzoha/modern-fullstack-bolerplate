import {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_APP_SECRET,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_COOKIE_SECRET,
} from "@/lib/safe-env"

export const logtoConfig = {
  endpoint: NEXT_PUBLIC_API_BASE_URL,
  appId: NEXT_PUBLIC_APP_ID,
  appSecret: NEXT_PUBLIC_APP_SECRET,
  baseUrl: NEXT_PUBLIC_BASE_URL, // Change to your own base URL
  cookieSecret: NEXT_PUBLIC_COOKIE_SECRET, // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === "production",
}
