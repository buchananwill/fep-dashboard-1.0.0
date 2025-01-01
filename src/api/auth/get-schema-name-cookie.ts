import { addMinutes } from 'date-fns';

('server only');

import { SCHEMA_NAME_COOKIE, SCHEMA_REFRESH_COOKIE } from '@/api/literals';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getSchemaNameCookie = async () => {
  console.log('reading schema name cookie');
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_NAME_COOKIE);
};

export const getSchemaRefreshCookie = async () => {
  console.log('reading schema refresh cookie');
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_REFRESH_COOKIE);
};

export type ExpirationStatus = 'valid' | 'refresh-window' | 'expired';
export function checkJwtExpiration(token: string): ExpirationStatus {
  // Decode the JWT
  const decoded = jwt.decode(token);

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
