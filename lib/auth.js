import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent", // User is prompted to re-authorize api access every login.
          access_type: "offline", // A refresh token is provided on login
          response_type: "code",
          scope: "openid profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar"
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // First-time login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token")
 
        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID,
              client_secret: process.env.AUTH_GOOGLE_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token || (() => { throw new Error("Refresh token is required") })(),
            }),
          })
 
          const tokensOrError = await response.json()
 
          if (!response.ok) throw tokensOrError
 
          const newTokens = tokensOrError 
 
          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token:", error)
          token.error = "RefreshTokenError"
          return token
        }
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.access_token
        session.user.id = token.id
      }
      session.error = token.error
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
})