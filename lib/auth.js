import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar"
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      } else if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token
      } else {
        try {
          if (!token.refresh_token) {
            throw new Error("No refresh token available")
          }

          const formData = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID?.trim(),
            client_secret: process.env.GOOGLE_CLIENT_SECRET?.trim(),
            grant_type: "refresh_token",
            refresh_token: token.refresh_token.trim()
          })

          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            body: formData.toString()
          })

          const tokens = await response.json()

          if (!response.ok) {
            console.error("Token refresh failed:", tokens)
            if (tokens.error === "invalid_grant") {
              return { ...token, error: "RefreshAccessTokenError" }
            }
            throw tokens
          }

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token:", error)
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error
      }
      
      if (session?.user) {
        session.accessToken = token.access_token
        session.user.id = token.sub ?? token.id
        session.user.name = token.name
      }
      
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})