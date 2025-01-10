import { Session } from 'next-auth';
import { addMinutes } from 'date-fns';
import { cookies } from 'next/headers';
import {
  SCHEMA_NAME_COOKIE,
  SCHEMA_REFRESH_COOKIE
} from '@/api/server-literals';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import { requestNewSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';
import { requestRefreshSchemaCookies } from '@/api/actions-custom/schemas/request-refresh-schema-cookies';
import jwt from 'jsonwebtoken';

('server only');

export const getSchemaNameCookie = async () => {
  console.log('reading schema name cookie');
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_NAME_COOKIE)?.value;
};

export const getSchemaRefreshCookie = async () => {
  console.log('reading schema refresh cookie');
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_REFRESH_COOKIE)?.value;
};

export type ExpirationStatus = 'valid' | 'refresh-window' | 'expired';

export function checkJwtExpiration(token: string): ExpirationStatus {
  // Decode the JWT
  const decoded = parseJwt(token);

  if (!decoded || typeof decoded !== 'object') {
    throw Error('token not valid JWT');
  }

  // Extract the `exp` field
  const exp = decoded.exp as number | undefined;

  if (!exp) {
    throw Error('Token does not have an expiration field');
  }

  // Convert `exp` to a readable date
  const expirationDate = new Date(exp * 1000);

  // Check if the token is expired
  const now = new Date();
  if (now > expirationDate) {
    return 'expired';
  } else if (addMinutes(now, 10) > expirationDate) {
    return 'refresh-window';
  } else {
    return 'valid';
  }
}

function parseJwt(token: string): { iat: number; exp: number; sub: string } {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function getEmailFromRefreshCookie(refreshCookie: string) {
  // Decode the JWT
  const decoded = parseJwt(refreshCookie);

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

export async function getTokens(
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
