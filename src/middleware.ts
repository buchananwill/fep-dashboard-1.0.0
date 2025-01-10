import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  checkJwtExpiration,
  getTokens
} from '@/api/auth/get-schema-name-cookie';
import {
  SCHEMA_NAME_COOKIE,
  SCHEMA_REFRESH_COOKIE
} from '@/api/server-literals';

const custom = async (request: NextRequest) => {
  const requestCookieStore = request.cookies;
  let response = NextResponse.next();
  const responseCookieStore = response.cookies;
  const session = await auth();
  if (session) {
    const schemaName = requestCookieStore.get(SCHEMA_NAME_COOKIE)?.value;
    if (!schemaName || checkJwtExpiration(schemaName) !== 'valid') {
      const refreshCookie = requestCookieStore.get(
        SCHEMA_REFRESH_COOKIE
      )?.value;

      const tokens = await getTokens(refreshCookie, session);
      if (tokens) {
        const { accessToken, refreshToken } = tokens;
        if (accessToken && refreshToken) {
          responseCookieStore.set(SCHEMA_NAME_COOKIE, accessToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 // 1 hour in seconds
          });

          responseCookieStore.set(SCHEMA_REFRESH_COOKIE, refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week in seconds
          });
        }
      }
    }
  }
  return response; //NextResponse.next();
};

export default auth(custom);

//
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the one starting with:
//      * - admin/create-schema
//      */
//   ]
// };
