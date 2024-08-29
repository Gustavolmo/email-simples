import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

async function refreshAccessToken(token: any) {
  if (!clientId || !clientSecret)
    throw new Error("clientId & clientSecret are missing");

  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

if (!clientId || !clientSecret)
  throw new Error("clientId & clientSecret are missing");
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.send",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    /*
     * JWT TOKEN
     */
    async jwt({ token, user, account }) {
      if (account && user) {
        const expiryTime = account.expires_at || new Date().getTime();
        return {
          accessToken: account.access_token,
          accessTokenExpires: expiryTime * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      if (Date.now() < (token.accessTokenExpires as any)) {
        return token;
      }
      return refreshAccessToken(token);
    },
    /*
     * SESSION TOKEN DEFINITION
     */
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user || session.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
