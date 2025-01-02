import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { checkJwtExpiration } from '@/api/auth/get-schema-name-cookie';
import { SCHEMA_NAME_COOKIE, SCHEMA_REFRESH_COOKIE } from '@/api/literals';
import { requestRefreshSchemaCookies } from './api/actions-custom/schemas/request-refresh-schema-cookies';
import { requestNewSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';

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

function getEmailFromRefreshCookie(refreshCookie: string) {
  // Decode the JWT
  const decoded = jwt.decode(refreshCookie);

  if (!decoded || typeof decoded !== 'object') {
    throw Error('token not valid JWT');
  }

  // Extract the `exp` field
  const sub = decoded.sub as string | undefined;

  if (!sub) {
    throw Error('Token does not have a sub field');
  }

  return sub;
}

async function getTokens(
  refreshCookie: string | undefined,
  session: Session
): Promise<SchemaAccessTokenDto | undefined> {
  let tokens: Promise<undefined | SchemaAccessTokenDto> =
    Promise.resolve(undefined);
  if (!refreshCookie) {
    let email = session.user?.email;
    if (email) {
      tokens = requestNewSchemaCookies(email);
    }
  } else {
    if (checkJwtExpiration(refreshCookie) !== 'expired') {
      tokens = requestRefreshSchemaCookies(refreshCookie);
    } else {
      tokens = requestNewSchemaCookies(
        getEmailFromRefreshCookie(refreshCookie)
      );
    }
  }
  return tokens;
}

//
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the one starting with:
//      * - admin/create-schema
//      */
//   ]
// };
