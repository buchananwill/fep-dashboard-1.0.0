'use server';
import {
  SchemaAccessTokenDto,
  TenancyDto
} from '@/api/generated-types/generated-types_';
import { cookies } from 'next/headers';
import { userToken } from '@/api/auth/schemaName';
import { SCHEMA_NAME_COOKIE, SCHEMA_REFRESH_COOKIE } from '@/api/literals';
import { BASE_URL } from '@/api/BASE_URL';
import { NextRequest } from 'next/server';

function getRetrieveSchemaKey() {
  const key = process.env.RETRIEVE_SCHEMA;
  if (key === undefined) {
    throw new Error('Missing retrieve schema key');
  }
  return key;
}

export async function setSchemaCookies(email: string) {
  const url = `${BASE_URL}/api/v2/tenancy/retrieve-schema`;
  const request = new NextRequest(url, { body: email, method: 'POST' });
  request.headers.append('retrieve-schema', getRetrieveSchemaKey());

  const schemaTokensResponse = await fetch(request);
  const tokens: SchemaAccessTokenDto = await schemaTokensResponse.json();

  await storeTokensInCookies(tokens);
}

async function storeTokensInCookies(tokens: SchemaAccessTokenDto) {
  const { accessToken, refreshToken } = tokens;

  const cookieStore = await cookies();

  cookieStore.set(SCHEMA_NAME_COOKIE, accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 // 1 hour in seconds
  });

  cookieStore.set(SCHEMA_REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week in seconds
  });
}
