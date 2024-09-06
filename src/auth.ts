import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        params: {
          scope:
            'openid profile email https://graph.microsoft.com/user.read https://graph.microsoft.com/calendars.ReadWrite'
        }
      }
    })
  ],
  callbacks: {
    jwt({ token }) {
      console.log(token);

      return token;
    },
    session({ session, token }) {
      console.log(token, session);
      // @ts-ignore
      session.user.token = token;
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
});
