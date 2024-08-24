import {
  NEXT_PUBLIC_API_ISSUER_ENDPOINT,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_APP_SECRET,
} from "@/lib/safe-env"
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "logto",
      name: "Logto",
      type: "oidc",
      style: {
        logo: "/logto.svg",
      },
      // You can get the issuer value from the Logto Application Details page,
      // in the field "Issuer endpoint"
      issuer: NEXT_PUBLIC_API_ISSUER_ENDPOINT,
      clientId: NEXT_PUBLIC_APP_ID,
      clientSecret: NEXT_PUBLIC_APP_SECRET,
      authorization: {
        params: { scope: "openid offline_access profile email" },
      },
      profile(profile) {
        // You can customize the user profile mapping here
        return {
          id: profile.sub,
          name: profile.name ?? profile.username,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
})
