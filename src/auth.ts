import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      // issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      authorization: {
        params: {
          scope:
            'openid profile email offline_access User.Read Calendars.ReadWrite'
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, account, user, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.token = token;
      // @ts-ignore
      session.accessToken = token.accessToken;

      if (token.email) session.user.email = token.email;
      return session;
    }
  },
  pages: {
    signIn: '/sign-in'
  }
});
