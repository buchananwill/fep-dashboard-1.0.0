import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { getTenancy } from '@/api/auth/get-tenancy';
import { setSchemaNameCookie } from '@/api/actions-custom/schemas/set-schema-name-cookie';
import { redirect } from 'next/navigation';

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
    jwt: async ({ token, account, user, profile }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        const email = user.email ?? profile?.email;

        if (email) {
          const tenancyDtoPartial = await getTenancy(email);
          if (tenancyDtoPartial.schemaName) {
            await setSchemaNameCookie(tenancyDtoPartial);
          }
        }
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
