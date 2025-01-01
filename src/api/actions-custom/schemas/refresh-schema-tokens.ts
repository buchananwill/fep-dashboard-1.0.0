'use server';
import { BASE_URL } from '@/api/BASE_URL';
import { NextRequest } from 'next/server';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import { getSchemaRefreshCookie } from '@/api/auth/get-schema-name-cookie';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';

async function requestRefreshSchemaCookies(token: string) {
  console.log('requesting refresh');
  const url = `${BASE_URL}/api/v2/tenancy/refresh`;
  const request = new NextRequest(url, { method: 'POST' });
  request.headers.append('authorization', `Bearer ${token}`);

  const schemaTokensResponse = await fetch(request);
  const tokens: SchemaAccessTokenDto = await schemaTokensResponse.json();

  await storeTokensInCookies(tokens);
}

export async function refreshSchemaTokens() {
  const refreshCookie = await getSchemaRefreshCookie();
  if (!refreshCookie) {
    throw Error('Refresh cookie not present');
  }
  const { value } = refreshCookie;

  await requestRefreshSchemaCookies(value);
}
