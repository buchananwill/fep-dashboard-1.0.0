'use server';
import { auth } from '@/auth';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import { NextRequest } from 'next/server';

export async function fetchXlsx(nextRequest: NextRequest) {
  const session = await auth();
  if (session?.user) {
    const databaseJwt = await getSchemaNameCookie();
    if (databaseJwt) {
      nextRequest.headers.append('authorization', `Bearer ${databaseJwt}`);
    }
  }

  return fetch(nextRequest);
}
