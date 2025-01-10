import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { exchangeEmailForSchemaTokens } from '@/exchangeEmailForSchemaTokens';
import Env from './api/environment.mjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    MicrosoftEntraID({
      clientId: Env.getMicrosoftEntraIdId(),
      clientSecret: Env.getMicrosoftEntraIdSecret(),
      authorization: {
        params: {
          scope:
            'openid profile email offline_access User.Read Calendars.ReadWrite'
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, account, user, profile }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        const email = user.email ?? profile?.email;
        await exchangeEmailForSchemaTokens(email);
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
